import Link from 'next/link';

const pillars = [
  {
    label: 'Daily market story',
    body: 'Fresh vendor-facing updates shaped from article sources, campaign conditions, and local auction tone.',
  },
  {
    label: 'Campaign visibility',
    body: 'A clean view of competition, buyer feedback, contracts out, projections, and campaign heat in one place.',
  },
  {
    label: 'Private by campaign',
    body: 'Each vendor sees only their own campaign page through a dedicated password-protected route.',
  },
];

const rollout = [
  'Campaign creation and edit flows connected to Supabase',
  'Protected live campaign route operating on Vercel',
  'Admin shell for settings, uploads, generated outputs, and market conditions',
  'Foundation in place for article ingestion, buyer feedback extraction, and vendor reporting',
];

export default function HomePage() {
  return (
    <main className="vh-shell" style={{ paddingTop: 26 }}>
      <section
        style={{
          borderRadius: 32,
          padding: '34px clamp(22px, 4vw, 40px)',
          marginBottom: 20,
          color: 'white',
          overflow: 'hidden',
          position: 'relative',
          background:
            'linear-gradient(120deg, rgba(19,17,15,0.94) 0%, rgba(28,21,17,0.88) 42%, rgba(49,33,21,0.82) 100%)',
          boxShadow: '0 30px 60px rgba(20, 16, 12, 0.18)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at top right, rgba(230,114,0,0.28), transparent 24%), radial-gradient(circle at bottom left, rgba(255,255,255,0.08), transparent 18%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: 24, alignItems: 'end' }}>
          <div>
            <div style={kickerStyle}>McGrath Lindfield</div>
            <h1 style={{ margin: '0 0 14px', fontSize: 'clamp(2.8rem, 6vw, 5rem)', lineHeight: 0.94 }}>Vendor Hub</h1>
            <p style={{ margin: 0, maxWidth: 780, color: 'rgba(255,255,255,0.8)', lineHeight: 1.65, fontSize: 17 }}>
              A premium vendor-facing campaign portal built to keep sellers informed with better structure, sharper market context,
              and a more polished campaign experience than a weekly PDF alone.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
              <Link href="/7-wyvern-avenue-roseville" className="vh-button">
                View live sample campaign
              </Link>
              <Link href="/admin" className="vh-button vh-button-secondary">
                Open admin workspace
              </Link>
            </div>
          </div>
          <div className="vh-glass" style={{ borderRadius: 24, padding: 20, background: 'rgba(255,255,255,0.09)' }}>
            <div style={heroMetricLabelStyle}>Current live base</div>
            <div style={heroMetricValueStyle}>Vercel runtime live</div>
            <div style={{ color: 'rgba(255,255,255,0.74)', lineHeight: 1.6 }}>
              Hosting is no longer the blocker. The focus can now shift to product quality, campaign content, and operational workflows.
            </div>
          </div>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 18, marginBottom: 20 }}>
        {pillars.map((pillar) => (
          <article key={pillar.label} className="vh-card" style={{ padding: 22, minHeight: 190 }}>
            <div style={cardKickerStyle}>{pillar.label}</div>
            <h2 style={{ margin: '0 0 10px', fontSize: 30 }}>{pillar.label}</h2>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65 }}>{pillar.body}</p>
          </article>
        ))}
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1.08fr 0.92fr', gap: 18 }}>
        <article className="vh-glass" style={{ borderRadius: 26, padding: 24 }}>
          <div style={cardKickerStyle}>Platform direction</div>
          <h2 style={{ margin: '0 0 10px', fontSize: 34 }}>What this portal is becoming</h2>
          <p style={{ margin: '0 0 18px', color: 'var(--muted)', lineHeight: 1.7 }}>
            The aim is not just a prettier vendor login. It is an operational portal where updates, competition, buyer feedback,
            projections, and admin-side campaign intelligence all live in one structured system.
          </p>
          <div style={{ display: 'grid', gap: 12 }}>
            {rollout.map((item) => (
              <div key={item} style={rolloutItemStyle}>
                <span style={rolloutDotStyle} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="vh-card" style={{ padding: 24 }}>
          <div style={cardKickerStyle}>Fast links</div>
          <h2 style={{ margin: '0 0 18px', fontSize: 34 }}>Live entry points</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            <Link href="/admin" style={linkCardStyle}>
              <strong>Admin workspace</strong>
              <span>Campaign creation, settings, uploads, outputs, and market conditions.</span>
            </Link>
            <Link href="/admin/campaigns" style={linkCardStyle}>
              <strong>Campaign list</strong>
              <span>Open existing campaigns and move into the management surface.</span>
            </Link>
            <Link href="/7-wyvern-avenue-roseville" style={linkCardStyle}>
              <strong>Sample vendor page</strong>
              <span>Current live campaign route protected by campaign password.</span>
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}

const kickerStyle = {
  fontSize: 12,
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: 'rgba(255,255,255,0.66)',
  fontWeight: 800,
  marginBottom: 12,
};

const heroMetricLabelStyle = {
  fontSize: 11,
  letterSpacing: '0.16em',
  textTransform: 'uppercase' as const,
  color: 'rgba(255,255,255,0.62)',
  fontWeight: 800,
  marginBottom: 8,
};

const heroMetricValueStyle = {
  fontSize: 28,
  fontWeight: 800,
  marginBottom: 8,
};

const cardKickerStyle = {
  fontSize: 12,
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  color: 'var(--orange)',
  fontWeight: 800,
  marginBottom: 10,
};

const rolloutItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '14px 16px',
  borderRadius: 16,
  background: 'rgba(255,255,255,0.65)',
  border: '1px solid rgba(32,32,32,0.06)',
};

const rolloutDotStyle = {
  width: 10,
  height: 10,
  borderRadius: 999,
  background: 'linear-gradient(135deg, var(--orange) 0%, var(--orange-deep) 100%)',
  flexShrink: 0,
};

const linkCardStyle = {
  display: 'grid',
  gap: 6,
  padding: 18,
  borderRadius: 18,
  background: 'rgba(255,255,255,0.68)',
  border: '1px solid rgba(32,32,32,0.08)',
  boxShadow: 'var(--shadow-soft)',
} as const;
