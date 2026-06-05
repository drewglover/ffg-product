#!/usr/bin/env node
/**
 * import-ffg-components.mjs — STOPGAP component importer.
 *
 * Pulls themed shadcn components from the separately-maintained library
 * (Niftic-Agency/ffg-components) into this repo's `src/components/ui`.
 *
 * Why this exists
 * ───────────────
 * The library's public manifest (https://factory-for-goodcomponents.vercel.app/
 * manifest.json) is a Brand-OS catalogue: its `code` field is a usage *demo*,
 * not component source, so it can't be consumed by the shadcn CLI. Until the
 * library exposes a real shadcn registry endpoint (`/r/<name>.json` — already
 * wired in components.json under the "@ffg" namespace), this script bridges the
 * gap by fetching the actual `components/ui/*.tsx` source from the library's
 * GitHub repo via the `gh` CLI, resolving internal `@/` deps recursively.
 *
 * Requirements: `gh` CLI installed and authenticated with read access to the
 * (private) Niftic-Agency/ffg-components repo.
 *
 * Usage
 * ─────
 *   node scripts/import-ffg-components.mjs --list          # show the catalogue
 *   node scripts/import-ffg-components.mjs button badge     # import specific slugs
 *   node scripts/import-ffg-components.mjs --all            # import everything
 *
 * Once the library ships its /r registry, prefer:
 *   npx shadcn@latest add @ffg/button
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = 'Niftic-Agency/ffg-components';
const REF = 'main';
const MANIFEST_URL = 'https://factory-for-goodcomponents.vercel.app/manifest.json';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Map the library's `@/` import aliases → (local dir, repo dir).
const ALIASES = [
  { prefix: '@/components/ui/', localDir: 'src/components/ui', repoDir: 'components/ui' },
  { prefix: '@/components/', localDir: 'src/components', repoDir: 'components' },
  { prefix: '@/hooks/', localDir: 'src/hooks', repoDir: 'hooks' },
  { prefix: '@/lib/', localDir: 'src/lib', repoDir: 'lib' },
];

// We ship our own JS cn() at src/lib/utils.js — never overwrite it.
const SKIP_IMPORTS = new Set(['@/lib/utils']);

const EXTS = ['.tsx', '.ts'];

function gh(path) {
  return execFileSync(
    'gh',
    ['api', `repos/${REPO}/contents/${path}?ref=${REF}`, '-H', 'Accept: application/vnd.github.raw'],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
  );
}

function fetchFirst(repoBase) {
  for (const ext of EXTS) {
    try {
      return { content: gh(`${repoBase}${ext}`), ext };
    } catch {
      /* try next extension */
    }
  }
  return null;
}

/** Extract every `from "..."` / `import "..."` specifier. */
function importsOf(src) {
  const specs = new Set();
  const re = /(?:from|import)\s*["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(src))) specs.add(m[1]);
  return [...specs];
}

/** Bare npm package name from a specifier (@scope/name or name). */
function pkgOf(spec) {
  if (spec.startsWith('@')) return spec.split('/').slice(0, 2).join('/');
  return spec.split('/')[0];
}

async function loadManifest() {
  const res = await fetch(MANIFEST_URL);
  if (!res.ok) throw new Error(`manifest fetch failed: HTTP ${res.status}`);
  return res.json();
}

const visited = new Set();
const externalPkgs = new Set();
const written = [];

function resolveAlias(spec) {
  for (const a of ALIASES) {
    if (spec.startsWith(a.prefix)) {
      const name = spec.slice(a.prefix.length);
      return { ...a, name };
    }
  }
  return null;
}

function importFile(repoBase, localBase) {
  if (visited.has(repoBase)) return;
  visited.add(repoBase);

  const found = fetchFirst(repoBase);
  if (!found) {
    console.warn(`  ⚠ not found in library: ${repoBase}{${EXTS.join(',')}}`);
    return;
  }
  const { content, ext } = found;
  const outPath = resolve(ROOT, `${localBase}${ext}`);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, content);
  written.push(outPath.replace(`${ROOT}/`, ''));

  for (const spec of importsOf(content)) {
    if (SKIP_IMPORTS.has(spec)) continue;
    const alias = resolveAlias(spec);
    if (alias) {
      importFile(`${alias.repoDir}/${alias.name}`, `${alias.localDir}/${alias.name}`);
    } else if (spec !== 'react' && spec !== 'react-dom' && !spec.startsWith('react/') && !spec.startsWith('react-dom/')) {
      externalPkgs.add(pkgOf(spec));
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  const manifest = await loadManifest();
  const slugs = manifest.components.map((c) => c.slug);

  if (args.length === 0 || args.includes('--help')) {
    console.log('Usage: node scripts/import-ffg-components.mjs [--list | --all | <slug>...]');
    console.log(`Catalogue: ${slugs.length} components available from @ffg (${manifest.client}).`);
    return;
  }

  if (args.includes('--list')) {
    const byCat = {};
    for (const c of manifest.components) (byCat[c.category] ??= []).push(c.slug);
    for (const [cat, items] of Object.entries(byCat)) {
      console.log(`\n${cat}`);
      for (const s of items.sort()) console.log(`  ${s}`);
    }
    console.log(`\n${slugs.length} components total.`);
    return;
  }

  const wanted = args.includes('--all') ? slugs : args;
  const unknown = wanted.filter((s) => !slugs.includes(s));
  if (unknown.length) {
    console.error(`Unknown slug(s): ${unknown.join(', ')}`);
    console.error('Run with --list to see the catalogue.');
    process.exitCode = 1;
    return;
  }

  console.log(`Importing from ${REPO}@${REF} → src/components/ui …\n`);
  for (const slug of wanted) {
    console.log(`• ${slug}`);
    importFile(`components/ui/${slug}`, `src/components/ui/${slug}`);
  }

  console.log(`\n✔ wrote ${written.length} file(s):`);
  for (const f of written) console.log(`  ${f}`);

  // Drop our own React + utils from the suggested install list.
  externalPkgs.delete('@/lib/utils');
  if (externalPkgs.size) {
    const list = [...externalPkgs].sort();
    console.log('\nExternal packages these components import — ensure they are installed:');
    console.log(`  npm install ${list.join(' ')}`);
  }
  console.log('\nNote: components are vendored as .tsx (compiled by Vite/esbuild). Theme tokens');
  console.log('live in src/index.css. Re-run after the library updates to pull changes.');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exitCode = 1;
});
