import type { Campaign } from '@/lib/types';

const tabs = ['Latest Updates', 'Auction Updates', 'Market Competition', 'Buyer Feedback', 'Projections'];

export function VendorShell({ campaign }: { campaign: Campaign }) {
  return (
    <main style={{ width: 'min(1280px, calc(100% - 32px))', margin: '0 auto', padding: '22px 0 48px' }}>
      <div style={pillWrapStyle}>
        <div style={navStyle}>
          <strong>McGRATH</strong>
          <div style={{ display: 'flex', gap: 12, color: 'var(--muted)', fontSize: 13, textTransform: 'uppercase' }}>
            <span>Vendor Hub</span>
            <span style={badgeStyle}>{campaign.address}, {campaign.suburb}</span>
          </div>
          <span style={{ color: 'var(--muted)', fontSize: 13, textTransform: 'uppercase' }}>Private campaign view</span>
        </div>
      </div>

      <div style={pillWrapStyle}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
          {tabs.map((tab, index) => (
            <button key={tab} style={index === 0 ? activeTabStyle : tabStyle}>{tab}</button>
          ))}
        </div>
      </div>

      <section style={heroStyle}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: 22 }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.66)', marginBottom: 10, fontWeight: 800 }}>
              Campaign Intelligence Dashboard
            </div>
            <h1 style={{ margin: '0 0 12px', fontSize: 'clamp(2.4rem, 5vw, 4.6rem)', lineHeight: 0.95 }}>
              {campaign.address},<br />{campaign.suburb}
            </h1>
            <p style={{ margin: 0, maxWidth: 760, color: 'rgba(255,255,255,0.78)', lineHeight: 1.55 }}>
              A premium vendor-facing campaign hub built to give a clear view of market movement, buyer sentiment,
              local competition, and strategic price positioning.
            </p>
            <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: '10px 18px', color: 'rgba(255,255,255,0.82)' }}>
              <span><strong>Your Agents:</strong> First Agent · Second Agent</span>
              <span><strong>Campaign Support:</strong> Support Person</span>
              <span><strong>Live Web Link:</strong> McGrath listing</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
            <MetricCard label="Days on market" value={campaign.daysOnMarket} />
            <MetricCard label="Contracts out" value={campaign.contractsOut} />
            <MetricCard label="Display price" value={campaign.displayPrice} />
            <MetricCard label="Campaign heat" value={campaign.campaignHeat} />
          </div>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 18 }}>
        <div style={panelStyle}>
          <h2 style={sectionTitleStyle}>Latest Updates</h2>
          <p style={sectionCopyStyle}>
            Shared AI-generated market brief refreshed daily around 5:00 AM AEST from active article sources.
          </p>
          <div style={{ display: 'grid', gap: 14 }}>
            <Card kicker="AI Market Brief" title="Clear read on the current market" body="Daily AI-generated summary of buyer confidence, stock levels, competition intensity, and likely short-term market direction." />
            <Card kicker="What This Means For Your Campaign" title="Market interpretation for this vendor audience" body="Vendor-facing translation of the broader market read, framed as practical guidance rather than certainty." highlight />
          </div>
        </div>
        <div style={panelStyle}>
          <h2 style={sectionTitleStyle}>Market Snapshot</h2>
          <p style={sectionCopyStyle}>Fast visual summary of the market environment.</p>
          <div style={{ display: 'grid', gap: 14 }}>
            <Card kicker="Stock Tone" title="TBC" body="Whether local supply feels tight, balanced, or building." />
            <Card kicker="Buyer Mood" title="TBC" body="Confidence level of active buyers in the market." />
            <Card kicker="Outlook" title="TBC" body="Forward-looking view refreshed daily from the active source set." highlight />
          </div>
        </div>
      </section>
    </main>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ borderRadius: 18, padding: 16, background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.10)' }}>
      <strong style={{ display: 'block', fontSize: 24, marginBottom: 6 }}>{value}</strong>
      <span style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.62)' }}>{label}</span>
    </div>
  );
}

function Card({ kicker, title, body, highlight = false }: { kicker: string; title: string; body: string; highlight?: boolean }) {
  return (
    <div style={{ ...cardStyle, ...(highlight ? highlightCardStyle : {}) }}>
      <span style={kickerStyle}>{kicker}</span>
      <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 6 }}>{title}</div>
      <div style={{ color: 'var(--muted)', lineHeight: 1.55 }}>{body}</div>
    </div>
  );
}

const pillWrapStyle = {
  borderRadius: 999,
  padding: 14,
  marginBottom: 18,
  background: 'var(--card)',
  border: '1px solid var(--border)',
  boxShadow: 'var(--shadow)',
  backdropFilter: 'blur(18px)',
} as const;

const navStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
} as const;

const badgeStyle = {
  padding: '8px 12px',
  borderRadius: 999,
  background: 'rgba(230,114,0,0.10)',
  color: 'var(--orange-deep)',
  fontWeight: 700,
} as const;

const tabStyle = {
  border: 'none',
  background: 'transparent',
  color: 'var(--muted)',
  fontWeight: 700,
  padding: '12px 18px',
  borderRadius: 999,
} as const;

const activeTabStyle = {
  ...tabStyle,
  background: 'linear-gradient(135deg, rgba(230,114,0,0.18), rgba(230,114,0,0.08))',
  color: 'var(--orange-deep)',
  boxShadow: 'inset 0 0 0 1px rgba(230,114,0,0.14)',
} as const;

const heroStyle = {
  borderRadius: 'var(--radius-xl)',
  color: 'white',
  padding: 34,
  marginBottom: 18,
  boxShadow: '0 28px 58px rgba(25,21,18,0.16)',
  background: 'linear-gradient(120deg, rgba(19,17,15,0.86) 0%, rgba(25,21,18,0.70) 38%, rgba(28,22,18,0.48) 62%, rgba(31,24,19,0.64) 100%)',
} as const;

const panelStyle = {
  borderRadius: 'var(--radius-lg)',
  padding: 22,
  background: 'var(--card)',
  border: '1px solid var(--border)',
  boxShadow: 'var(--shadow)',
  backdropFilter: 'blur(18px)',
} as const;

const sectionTitleStyle = {
  margin: '0 0 8px',
  fontSize: 28,
} as const;

const sectionCopyStyle = {
  margin: '0 0 18px',
  color: 'var(--muted)',
  lineHeight: 1.6,
} as const;

const cardStyle = {
  borderRadius: 20,
  padding: 18,
  background: 'rgba(255,255,255,0.72)',
  border: '1px solid rgba(32,32,32,0.08)',
} as const;

const highlightCardStyle = {
  background: 'linear-gradient(145deg, rgba(255,248,230,0.94) 0%, rgba(255,239,198,0.88) 52%, rgba(255,229,160,0.82) 100%)',
  border: '1px solid rgba(232,179,72,0.24)',
} as const;

const kickerStyle = {
  display: 'block',
  fontSize: 12,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.12em',
  color: 'var(--orange)',
  fontWeight: 800,
  marginBottom: 10,
} as const;
