import type { Campaign } from '@/lib/types';

const tabs = ['Latest Updates', 'Auction Updates', 'Market Competition', 'Buyer Feedback', 'Projections'];

const marketSignals = [
  {
    kicker: 'Stock tone',
    title: 'Tight premium stock in focus',
    body: 'The current read should eventually reflect both suburb-level competition and campaign-specific pressure points.',
  },
  {
    kicker: 'Buyer mood',
    title: 'Measured, active, selective',
    body: 'Serious buyers are still moving, but they want stronger confidence around value, scarcity, and momentum.',
  },
  {
    kicker: 'Outlook',
    title: 'Early-campaign posture matters',
    body: 'The portal should help the vendor see how early enquiry, contracts out, and competition shape negotiating leverage.',
    highlight: true,
  },
];

const buyerSignals = [
  'Warm buyer commentary and objections will live here once report extraction is wired in.',
  'Contract-holder status and pricing feedback will become readable without needing a long PDF decode.',
  'Vendor-side messaging will stay plain-English, premium, and useful rather than overly technical.',
];

export function VendorShell({ campaign }: { campaign: Campaign }) {
  return (
    <main className="vh-shell">
      <div style={topRailStyle} className="vh-glass">
        <div style={brandLockupStyle}>
          <strong style={{ fontSize: 18, letterSpacing: '0.08em' }}>McGRATH</strong>
          <span style={topMetaStyle}>Lindfield Vendor Hub</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={badgeStyle}>Private campaign view</span>
          <span style={subtleBadgeStyle}>{campaign.address}, {campaign.suburb}</span>
        </div>
      </div>

      <div style={tabRailStyle} className="vh-glass">
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
          {tabs.map((tab, index) => (
            <button key={tab} style={index === 0 ? activeTabStyle : tabStyle}>{tab}</button>
          ))}
        </div>
      </div>

      <section style={heroStyle}>
        <div style={heroOverlayStyle} />
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.32fr 0.95fr', gap: 24, alignItems: 'end' }}>
          <div>
            <div style={heroKickerStyle}>Campaign intelligence dashboard</div>
            <h1 style={{ margin: '0 0 14px', fontSize: 'clamp(2.6rem, 6vw, 5rem)', lineHeight: 0.94 }}>
              {campaign.address},<br />{campaign.suburb}
            </h1>
            <p style={{ margin: 0, maxWidth: 760, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, fontSize: 17 }}>
              A premium campaign portal designed to give vendors a clearer view of local competition, buyer behaviour,
              campaign momentum, and the strategic story around price and positioning.
            </p>
            <div style={heroPeopleRowStyle}>
              <span><strong>Your agents:</strong> James Sutton · Team McGrath Lindfield</span>
              <span><strong>Support:</strong> Campaign operations and reporting</span>
              <span><strong>Status:</strong> Protected live vendor route</span>
            </div>
          </div>
          <div style={heroMetricsGridStyle}>
            <MetricCard label="Days on market" value={campaign.daysOnMarket} />
            <MetricCard label="Contracts out" value={campaign.contractsOut} />
            <MetricCard label="Display price" value={campaign.displayPrice} />
            <MetricCard label="Campaign heat" value={campaign.campaignHeat} />
          </div>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 18, marginBottom: 18 }}>
        <div className="vh-glass" style={panelStyle}>
          <div style={panelKickerStyle}>Latest updates</div>
          <h2 style={sectionTitleStyle}>Daily campaign read</h2>
          <p style={sectionCopyStyle}>
            This area is where the vendor will receive the clean daily market brief, the translated campaign takeaway,
            and the practical read on what it means for their sale campaign.
          </p>
          <div style={{ display: 'grid', gap: 14 }}>
            <Card
              kicker="AI market brief"
              title="Broader market movement in plain English"
              body="A structured read on buyer confidence, available stock, local intensity, and short-term market tone sourced from the article and reporting workflow."
            />
            <Card
              kicker="What it means for your campaign"
              title="Campaign interpretation, not just raw information"
              body="The vendor-facing translation layer should connect the broader market story back to this listing, this suburb, and the current campaign stage."
              highlight
            />
          </div>
        </div>

        <div className="vh-glass" style={panelStyle}>
          <div style={panelKickerStyle}>Market snapshot</div>
          <h2 style={sectionTitleStyle}>Fast read</h2>
          <p style={sectionCopyStyle}>A quick-glance summary of supply, buyer tone, and short-term campaign outlook.</p>
          <div style={{ display: 'grid', gap: 14 }}>
            {marketSignals.map((item) => (
              <Card key={item.kicker} kicker={item.kicker} title={item.title} body={item.body} highlight={item.highlight} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <div className="vh-card" style={secondaryPanelStyle}>
          <div style={panelKickerStyle}>Buyer feedback</div>
          <h2 style={sectionTitleStyle}>What this section will show</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {buyerSignals.map((item) => (
              <div key={item} style={signalRowStyle}>
                <span style={signalDotStyle} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="vh-card" style={secondaryPanelStyle}>
          <div style={panelKickerStyle}>Vendor experience</div>
          <h2 style={sectionTitleStyle}>Built for confidence and clarity</h2>
          <p style={{ margin: '0 0 16px', color: 'var(--muted)', lineHeight: 1.65 }}>
            The target experience is a premium seller portal that feels deliberate, readable, and calm while still giving a genuine live read on the campaign.
          </p>
          <div style={{ display: 'grid', gap: 12 }}>
            <InfoStrip label="Auction updates" value="Dedicated local + Sydney clearance view" />
            <InfoStrip label="Market competition" value="Comparable campaign watchlist and interpretation" />
            <InfoStrip label="Projections" value="Admin-managed outlook for vendor review" />
          </div>
        </div>
      </section>
    </main>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={metricCardStyle}>
      <strong style={{ display: 'block', fontSize: 26, marginBottom: 8 }}>{value}</strong>
      <span style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.64)' }}>{label}</span>
    </div>
  );
}

function Card({ kicker, title, body, highlight = false }: { kicker: string; title: string; body: string; highlight?: boolean }) {
  return (
    <div style={{ ...cardStyle, ...(highlight ? highlightCardStyle : {}) }}>
      <span style={panelKickerStyle}>{kicker}</span>
      <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 6 }}>{title}</div>
      <div style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{body}</div>
    </div>
  );
}

function InfoStrip({ label, value }: { label: string; value: string }) {
  return (
    <div style={infoStripStyle}>
      <span style={{ color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: 11, fontWeight: 800 }}>{label}</span>
      <strong style={{ fontSize: 15 }}>{value}</strong>
    </div>
  );
}

const topRailStyle = {
  borderRadius: 999,
  padding: 14,
  marginBottom: 18,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
  flexWrap: 'wrap',
} as const;

const brandLockupStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  flexWrap: 'wrap',
} as const;

const topMetaStyle = {
  color: 'var(--muted)',
  fontSize: 13,
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  fontWeight: 700,
} as const;

const badgeStyle = {
  padding: '8px 12px',
  borderRadius: 999,
  background: 'linear-gradient(135deg, rgba(230,114,0,0.18), rgba(230,114,0,0.08))',
  color: 'var(--orange-deep)',
  fontWeight: 700,
} as const;

const subtleBadgeStyle = {
  padding: '8px 12px',
  borderRadius: 999,
  background: 'rgba(255,255,255,0.62)',
  border: '1px solid rgba(32,32,32,0.08)',
  color: 'var(--text)',
  fontWeight: 600,
} as const;

const tabRailStyle = {
  borderRadius: 999,
  padding: 14,
  marginBottom: 18,
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
  position: 'relative' as const,
  overflow: 'hidden',
  borderRadius: 'var(--radius-xl)',
  color: 'white',
  padding: 34,
  marginBottom: 18,
  boxShadow: '0 28px 58px rgba(25,21,18,0.16)',
  background: 'linear-gradient(120deg, rgba(19,17,15,0.94) 0%, rgba(28,21,17,0.88) 38%, rgba(49,33,21,0.78) 100%)',
} as const;

const heroOverlayStyle = {
  position: 'absolute' as const,
  inset: 0,
  background:
    'radial-gradient(circle at top right, rgba(230,114,0,0.28), transparent 24%), radial-gradient(circle at bottom left, rgba(255,255,255,0.08), transparent 18%)',
  pointerEvents: 'none' as const,
} as const;

const heroKickerStyle = {
  fontSize: 12,
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: 'rgba(255,255,255,0.66)',
  marginBottom: 10,
  fontWeight: 800,
} as const;

const heroPeopleRowStyle = {
  marginTop: 18,
  display: 'flex',
  flexWrap: 'wrap' as const,
  gap: '10px 18px',
  color: 'rgba(255,255,255,0.82)',
  lineHeight: 1.5,
} as const;

const heroMetricsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 12,
} as const;

const metricCardStyle = {
  borderRadius: 18,
  padding: 16,
  background: 'rgba(255,255,255,0.09)',
  border: '1px solid rgba(255,255,255,0.10)',
  backdropFilter: 'blur(10px)',
} as const;

const panelStyle = {
  borderRadius: 'var(--radius-lg)',
  padding: 22,
} as const;

const secondaryPanelStyle = {
  padding: 22,
} as const;

const sectionTitleStyle = {
  margin: '0 0 8px',
  fontSize: 30,
} as const;

const sectionCopyStyle = {
  margin: '0 0 18px',
  color: 'var(--muted)',
  lineHeight: 1.65,
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

const panelKickerStyle = {
  display: 'block',
  fontSize: 12,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.12em',
  color: 'var(--orange)',
  fontWeight: 800,
  marginBottom: 10,
} as const;

const signalRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '14px 16px',
  borderRadius: 16,
  background: 'rgba(255,255,255,0.66)',
  border: '1px solid rgba(32,32,32,0.08)',
} as const;

const signalDotStyle = {
  width: 10,
  height: 10,
  borderRadius: 999,
  background: 'linear-gradient(135deg, var(--orange) 0%, var(--orange-deep) 100%)',
  flexShrink: 0,
} as const;

const infoStripStyle = {
  display: 'grid',
  gap: 6,
  padding: '14px 16px',
  borderRadius: 16,
  background: 'rgba(255,255,255,0.66)',
  border: '1px solid rgba(32,32,32,0.08)',
} as const;
