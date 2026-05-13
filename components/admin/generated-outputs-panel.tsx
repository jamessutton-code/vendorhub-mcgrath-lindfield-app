export function GeneratedOutputsPanel() {
  return (
    <section style={{ borderRadius: 22, padding: 22, background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(32,32,32,0.08)', boxShadow: '0 22px 48px rgba(33,27,20,0.08)' }}>
      <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 800, marginBottom: 10 }}>
        Generated Outputs
      </div>
      <h2 style={{ margin: '0 0 8px', fontSize: 24 }}>AI Review Surface</h2>
      <p style={{ margin: '0 0 18px', color: 'var(--muted)', lineHeight: 1.6 }}>
        This panel will become the approval layer for market briefs, auction updates, comp reads, buyer feedback extraction, and projections.
      </p>
      <div style={{ display: 'grid', gap: 12 }}>
        {['Latest Updates', 'Auction Updates', 'Market Competition', 'Buyer Feedback', 'Projections'].map((item) => (
          <div key={item} style={{ padding: 16, borderRadius: 18, background: 'rgba(32,32,32,0.04)', border: '1px solid rgba(32,32,32,0.06)' }}>
            <strong>{item}</strong>
            <div style={{ color: 'var(--muted)', marginTop: 6 }}>Pending real data wiring and approval actions.</div>
          </div>
        ))}
      </div>
    </section>
  );
}
