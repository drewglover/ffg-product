import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Living gallery for the themed shadcn instance (@/components/ui/*).
// Doubles as the verification surface — route: /shadcn-demo.
const BUTTON_VARIANTS = ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'];
const BADGE_VARIANTS = ['default', 'secondary', 'outline', 'destructive', 'ghost', 'link'];
const SIZES = ['xs', 'sm', 'default', 'lg'];

export default function ShadcnDemo() {
  const [dark, setDark] = useState(false);

  return (
    <div
      data-theme={dark ? 'dark' : 'light'}
      style={{ minHeight: '100vh', padding: '48px', background: 'var(--background)', color: 'var(--foreground)' }}
    >
      <div style={{ maxWidth: 880, margin: '0 auto', display: 'grid', gap: 40 }}>
        <header style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontWeight: 300, fontSize: 32, margin: 0 }}>
              FFG · shadcn instance
            </h1>
            <p style={{ color: 'var(--muted-foreground)', margin: '6px 0 0' }}>
              Themed components from <code>@ffg</code> · <code>@/components/ui/*</code>
            </p>
          </div>
          <Button variant="outline" onClick={() => setDark((d) => !d)}>
            {dark ? 'Light' : 'Dark'} mode
          </Button>
        </header>

        <section style={{ display: 'grid', gap: 16 }}>
          <h2 style={{ fontSize: 18, margin: 0 }}>Button — variants</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {BUTTON_VARIANTS.map((v) => (
              <Button key={v} variant={v}>
                {v}
              </Button>
            ))}
          </div>
          <h2 style={{ fontSize: 18, margin: '8px 0 0' }}>Button — sizes</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            {SIZES.map((s) => (
              <Button key={s} size={s}>
                {s}
              </Button>
            ))}
            <Button disabled>disabled</Button>
          </div>
        </section>

        <section style={{ display: 'grid', gap: 16 }}>
          <h2 style={{ fontSize: 18, margin: 0 }}>Badge — variants</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {BADGE_VARIANTS.map((v) => (
              <Badge key={v} variant={v}>
                {v}
              </Badge>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
