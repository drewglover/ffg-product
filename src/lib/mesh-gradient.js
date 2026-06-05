/**
 * mesh-gradient.js
 * Animated Coons-patch mesh gradient renderer (WebGL).
 * Vertices are laid out on a rows×cols grid; each cell is a bicubic
 * Coons patch tessellated into triangles and rendered with Gouraud shading.
 *
 * Handle naming (relative offsets from vertex position):
 *   e = toward next column (+x)   w = toward previous column (−x)
 *   n = toward next row    (+y)   s = toward previous row   (−y)
 * Null handles default to [0, 0] (linear edge in that direction).
 */

// ── shaders ──────────────────────────────────────────────────────────────────

const VERT_SRC = `
  attribute vec2 a_pos;
  attribute vec3 a_col;
  varying   vec3 v_col;
  void main() {
    /* map [0,1] y-down coords → WebGL clip space (y-up) */
    gl_Position = vec4(a_pos.x * 2.0 - 1.0, 1.0 - a_pos.y * 2.0, 0.0, 1.0);
    v_col = a_col;
  }
`;

const FRAG_SRC = `
  precision mediump float;
  varying vec3 v_col;
  void main() {
    gl_FragColor = vec4(v_col, 1.0);
  }
`;

// ── math helpers ─────────────────────────────────────────────────────────────

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

/** Evaluate a cubic Bezier at t. */
function cubicBez(t, p0, p1, p2, p3) {
  const u = 1 - t;
  return [
    u*u*u*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t*t*t*p3[0],
    u*u*u*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t*t*t*p3[1],
  ];
}

/** Bilinear interpolation of a scalar across four corners. */
function bilerp(a, b, c, d, u, v) {
  return a*(1-u)*(1-v) + b*u*(1-v) + c*(1-u)*v + d*u*v;
}

/**
 * Coons patch: bilinear blend of four cubic Bezier edge curves.
 *
 * p00=top-left, p10=top-right, p01=bottom-left, p11=bottom-right
 * e* = east  handle of left  vertices (toward +x)
 * w* = west  handle of right vertices (toward −x)
 * n* = north handle of top   vertices (toward +y / next row)
 * s* = south handle of bot   vertices (toward −y / prev row)
 */
function coonsSample(u, v,
  p00, p10, p01, p11,
  e00, w10, e01, w11,
  n00, s01, n10, s11
) {
  const top  = cubicBez(u, p00, [p00[0]+e00[0], p00[1]+e00[1]], [p10[0]+w10[0], p10[1]+w10[1]], p10);
  const bot  = cubicBez(u, p01, [p01[0]+e01[0], p01[1]+e01[1]], [p11[0]+w11[0], p11[1]+w11[1]], p11);
  const lft  = cubicBez(v, p00, [p00[0]+n00[0], p00[1]+n00[1]], [p01[0]+s01[0], p01[1]+s01[1]], p01);
  const rgt  = cubicBez(v, p10, [p10[0]+n10[0], p10[1]+n10[1]], [p11[0]+s11[0], p11[1]+s11[1]], p11);

  // H-blend + V-blend − bilinear correction
  return [
    (1-v)*top[0] + v*bot[0] + (1-u)*lft[0] + u*rgt[0] - bilerp(p00[0], p10[0], p01[0], p11[0], u, v),
    (1-v)*top[1] + v*bot[1] + (1-u)*lft[1] + u*rgt[1] - bilerp(p00[1], p10[1], p01[1], p11[1], u, v),
  ];
}

// ── easing ───────────────────────────────────────────────────────────────────

const easeOutCubic    = t => 1 - Math.pow(1 - t, 3);
const easeInOutCubic  = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;

// ── MeshGradient class ───────────────────────────────────────────────────────

export class MeshGradient {
  constructor(opts = {}) {
    this._bg        = hexToRgb(opts.bgColor        || '#ffffff');
    this._introDur  = opts.introDuration            || 1800;
    this._outroDur  = opts.outroDuration            || 1400;
    this._floatAmp  = opts.floatAmplitude           || 0.025;
    this._floatSpd  = opts.floatSpeed               || 0.00018;
    this._rows      = opts.rows                     || 4;
    this._cols      = opts.cols                     || 4;

    // Pre-process vertices: parse colors, default null handles to [0,0]
    this._verts = (opts.vertices || []).map(v => ({
      pos       : v.position,
      colorRgb  : hexToRgb(v.color),
      introFrom : v.introFrom || v.position,
      outroTo   : v.outroTo   || v.position,
      h: {
        e: v.handles?.e || [0, 0],
        w: v.handles?.w || [0, 0],
        n: v.handles?.n || [0, 0],
        s: v.handles?.s || [0, 0],
      },
    }));

    this._phase  = 'idle';  // idle | intro | floating | outro
    this._phaseT = 0;
    this._subdiv = 24;      // tessellation subdivisions per cell edge

    this._initCanvas();
    this._initGL();
    this._buildIBO();
    this._startLoop();
  }

  // ── public API ──────────────────────────────────────────────────────────────

  playIntro() {
    this._phase  = 'intro';
    this._phaseT = performance.now();
    this._ensureLoop();
  }

  playOutro() {
    if (this._phase === 'outro') return;
    this._phase  = 'outro';
    this._phaseT = performance.now();
    this._ensureLoop();
  }

  _ensureLoop() {
    if (!this._loopActive) {
      this._loopActive = true;
      requestAnimationFrame(now => this._tick(now));
    }
  }

  // ── canvas + GL setup ───────────────────────────────────────────────────────

  _initCanvas() {
    const cvs = this._cvs = document.createElement('canvas');
    Object.assign(cvs.style, {
      position        : 'fixed',
      top             : '0',
      right           : '0',
      left            : '0',
      width           : '100%',
      height          : '100%',
      pointerEvents   : 'none',
      zIndex          : '0',
      display         : 'block',
      transformOrigin : 'top right',
      willChange      : 'opacity, transform',
    });
    document.body.prepend(cvs);
    this._handleResize();
    window.addEventListener('resize', () => this._handleResize());
    // Scroll: opacity fade + parallax (initialise immediately)
    this._handleScroll();
    window.addEventListener('scroll', () => this._handleScroll(), { passive: true });
  }

  _handleScroll() {
    const scrollY   = window.scrollY || 0;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const ratio     = Math.min(1, scrollY / maxScroll);

    // Opacity: 1.0 → 0.2 by end of page
    this._cvs.style.opacity = 1 - ratio * 0.8;

    // Parallax: shift canvas upward as user scrolls (stacks on the -50px anchor offset)
    this._cvs.style.transform = `translateY(${-50 - scrollY * 0.15}px)`;
  }

  _handleResize() {
    // Resize clears the canvas — redraw a single frame if the loop is paused.
    this._cvs.width  = window.innerWidth;
    this._cvs.height = window.innerHeight;
    if (this._gl) this._gl.viewport(0, 0, this._cvs.width, this._cvs.height);
    if (!this._loopActive) this._drawFrame(performance.now());
  }

  _initGL() {
    const gl = this._gl = this._cvs.getContext('webgl', {
      antialias: false, premultipliedAlpha: false,
    });
    if (!gl) return;

    const compileShader = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        throw new Error('MeshGradient shader error: ' + gl.getShaderInfoLog(s));
      }
      return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, compileShader(gl.VERTEX_SHADER,   VERT_SRC));
    gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, FRAG_SRC));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    this._prog = prog;
    this._aPos = gl.getAttribLocation(prog, 'a_pos');
    this._aCol = gl.getAttribLocation(prog, 'a_col');
    this._vbo  = gl.createBuffer();
    this._ibo  = gl.createBuffer();

    gl.enableVertexAttribArray(this._aPos);
    gl.enableVertexAttribArray(this._aCol);
  }

  /** Build the static index buffer (topology never changes). */
  _buildIBO() {
    const S = this._subdiv;
    const N = S + 1;                                      // vertices per cell edge
    const cells = (this._rows - 1) * (this._cols - 1);
    const idxArr = [];

    for (let cell = 0; cell < cells; cell++) {
      const base = cell * N * N;
      for (let j = 0; j < S; j++) {
        for (let i = 0; i < S; i++) {
          const tl = base + j * N + i;
          const tr = tl + 1;
          const bl = tl + N;
          const br = bl + 1;
          idxArr.push(tl, tr, bl,  tr, br, bl);
        }
      }
    }

    this._idxCount = idxArr.length;
    const gl = this._gl;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(idxArr), gl.STATIC_DRAW);
  }

  // ── animation state ─────────────────────────────────────────────────────────

  /** Returns {ip: introProgress[0→1], op: outroProgress[0→1]}. */
  _getProgress(now) {
    const elapsed = now - this._phaseT;
    if (this._phase === 'intro') {
      const raw = Math.min(1, elapsed / this._introDur);
      if (raw >= 1) this._phase = 'floating';
      return { ip: easeOutCubic(raw), op: 0 };
    }
    if (this._phase === 'outro') {
      const raw = Math.min(1, elapsed / this._outroDur);
      return { ip: 1, op: easeInOutCubic(raw) };
    }
    // floating or idle
    return { ip: 1, op: 0 };
  }

  /** Compute the animated [x, y] for one vertex given current intro/outro progress. */
  _animPos(v, ip, op) {
    const [px, py] = v.pos;

    // Base = final rest position (no float)
    let x = px;
    let y = py;

    // Intro: blend from introFrom → rest
    if (ip < 1) {
      const [ix, iy] = v.introFrom;
      x = ix * (1 - ip) + px * ip;
      y = iy * (1 - ip) + py * ip;
    }

    // Outro: blend from current → outroTo
    if (op > 0) {
      const [ox, oy] = v.outroTo;
      x = x * (1 - op) + ox * op;
      y = y * (1 - op) + oy * op;
    }

    return [x, y];
  }

  // ── mesh tessellation ───────────────────────────────────────────────────────

  _buildVBO(now) {
    const { ip, op } = this._getProgress(now);
    const rows = this._rows, cols = this._cols;
    const S = this._subdiv, N = S + 1;
    const cells = (rows - 1) * (cols - 1);
    const FLOATS_PER_VERT = 5;  // x, y, r, g, b
    const data = new Float32Array(cells * N * N * FLOATS_PER_VERT);

    // Resolve animated positions for all grid vertices
    const av = this._verts.map(v => ({
      pos : this._animPos(v, ip, op),
      col : v.colorRgb,
      h   : v.h,
    }));

    let off = 0;
    for (let row = 0; row < rows - 1; row++) {
      for (let col = 0; col < cols - 1; col++) {
        const i00 = row * cols + col;
        const i10 = i00 + 1;
        const i01 = (row + 1) * cols + col;
        const i11 = i01 + 1;
        const v00 = av[i00], v10 = av[i10], v01 = av[i01], v11 = av[i11];

        for (let j = 0; j <= S; j++) {
          const vt = j / S;
          for (let i = 0; i <= S; i++) {
            const ut = i / S;

            const xy = coonsSample(
              ut, vt,
              v00.pos, v10.pos, v01.pos, v11.pos,
              v00.h.e, v10.h.w, v01.h.e, v11.h.w,   // horizontal handles
              v00.h.n, v01.h.s, v10.h.n, v11.h.s,   // vertical handles
            );

            data[off++] = xy[0];
            data[off++] = xy[1];
            data[off++] = bilerp(v00.col[0], v10.col[0], v01.col[0], v11.col[0], ut, vt);
            data[off++] = bilerp(v00.col[1], v10.col[1], v01.col[1], v11.col[1], ut, vt);
            data[off++] = bilerp(v00.col[2], v10.col[2], v01.col[2], v11.col[2], ut, vt);
          }
        }
      }
    }
    return data;
  }

  // ── render loop ─────────────────────────────────────────────────────────────

  /** Single GL draw pass — extracted so resize can trigger a one-off redraw. */
  _drawFrame(now) {
    const gl    = this._gl;
    if (!gl) return;
    const STRIDE = 5 * 4;
    const data   = this._buildVBO(now);

    gl.clearColor(this._bg[0], this._bg[1], this._bg[2], 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(this._aPos, 2, gl.FLOAT, false, STRIDE, 0);
    gl.vertexAttribPointer(this._aCol, 3, gl.FLOAT, false, STRIDE, 2 * 4);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo);
    gl.drawElements(gl.TRIANGLES, this._idxCount, gl.UNSIGNED_SHORT, 0);
  }

  /** Called by _ensureLoop; each frame renders and re-schedules itself until
   *  the phase settles to 'floating' (static) or 'idle', then stops. */
  _tick(now) {
    // Canvas is static — stop the loop; _ensureLoop restarts it for outro.
    if (this._phase === 'floating' || this._phase === 'idle') {
      this._loopActive = false;
      return;
    }

    this._drawFrame(now);
    requestAnimationFrame(now => this._tick(now));
  }

  _startLoop() {
    // Loop is demand-driven: started by playIntro() / playOutro() via _ensureLoop().
    this._loopActive = false;
  }
}
