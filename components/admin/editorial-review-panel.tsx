import type { VendorSectionControl } from '@/lib/types';

export function EditorialReviewPanel({ controls }: { controls: VendorSectionControl[] }) {
  return (
    <section style={cardStyle}>
      <div style={kickerStyle}>Editorial Review</div>
      <h2 style={headingStyle}>Section control and publish readiness</h2>
      <p style={copyStyle}>
        This is the internal review layer between raw campaign evidence and polished vendor-facing communication. Each section should move from draft to approved before the team treats it as client-ready.
      </p>

      <div style={{ display: 'grid', gap: 12 }}>
        {controls.map((control) => (
          <div key={control.key} style={rowStyle}>
            <div style={{ display: 'grid', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <div style={{ fontWeight: 800 }}>{control.label}</div>
                <span style={control.status === 'approved' ? approvedChipStyle : draftChipStyle}>{control.status === 'approved' ? 'Approved for vendor view' : 'Draft / needs review'}</span>
              </div>
              <div style={metaStyle}>Source basis: {control.sourceBasis || 'TBC'}</div>
              <div style={metaStyle}>Internal read: {control.internalSummary || 'No internal summary yet.'}</div>
              <div style={metaStyle}>Vendor-facing read: {control.vendorSummary || 'No vendor-facing wording approved yet.'}</div>
            </div>
            <div style={dateStyle}>Updated {control.lastUpdated || 'TBC'}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const cardStyle = {
  borderRadius: 22,
  padding: 22,
  background: 'rgba(255,255,255,0.72)',
  border: '1px solid rgba(32,32,32,0.08)',
  boxShadow: '0 22px 48px rgba(33,27,20,0.08)',
} as const;

const kickerStyle = {
  fontSize: 12,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: 'var(--orange)',
  fontWeight: 800,
  marginBottom: 10,
} as const;

const headingStyle = {
  margin: '0 0 8px',
  fontSize: 24,
} as const;

const copyStyle = {
  margin: '0 0 18px',
  color: 'var(--muted)',
  lineHeight: 1.6,
} as const;

const rowStyle = {
  display: 'grid',
  gap: 10,
  padding: 16,
  borderRadius: 18,
  background: 'rgba(32,32,32,0.04)',
  border: '1px solid rgba(32,32,32,0.06)',
} as const;

const metaStyle = {
  color: 'var(--muted)',
  lineHeight: 1.5,
  fontSize: 14,
} as const;

const dateStyle = {
  fontSize: 13,
  color: 'var(--muted)',
  fontWeight: 700,
} as const;

const approvedChipStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: 999,
  padding: '6px 10px',
  background: 'rgba(24,120,76,0.14)',
  color: '#18784c',
  fontWeight: 800,
  fontSize: 12,
} as const;

const draftChipStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: 999,
  padding: '6px 10px',
  background: 'rgba(190,80,24,0.14)',
  color: '#a24c14',
  fontWeight: 800,
  fontSize: 12,
} as const;
