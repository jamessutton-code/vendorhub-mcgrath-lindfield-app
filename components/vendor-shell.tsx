import type { Campaign } from '@/lib/types';

const tabs = ['Latest Updates', 'Auction Updates', 'Market Competition', 'Buyer Feedback', 'Projections', 'Admin Update'];

const snapshotCards = [
  {
    kicker: 'Stock tone',
    title: 'TBC',
    body: 'AI summary of whether local supply feels tight, balanced, or building.',
  },
  {
    kicker: 'Buyer mood',
    title: 'TBC',
    body: 'AI read on the confidence level of active buyers in the market.',
  },
  {
    kicker: 'Outlook',
    title: 'TBC',
    body: 'Forward-looking view refreshed daily from the current active source set.',
    gold: true,
  },
];

export function VendorShell({ campaign }: { campaign: Campaign }) {
  return (
    <main className="vh-shell">
      <div style={navWrapStyle} className="vh-glass">
        <div style={navStyle}>
          <div style={navLogoStyle}>
            <span>McGrath logo</span>
          </div>
          <div style={navMidStyle}>
            <span>Vendor Hub</span>
            <span style={navBadgeStyle}>Master Template</span>
          </div>
          <div style={navRightStyle}>Private campaign view</div>
        </div>
      </div>

      <section style={heroStyle}>
        <div style={heroGridStyle}>
          <div>
            <div style={heroKickerStyle}>Campaign intelligence dashboard</div>
            <h1 style={heroHeadingStyle}>
              {campaign.address},<br />{campaign.suburb}
            </h1>
            <p style={heroCopyStyle}>
              A premium vendor-facing campaign hub built to give a clear view of market movement,
              buyer sentiment, local competition, and strategic price positioning, all in one place.
            </p>
            <div style={heroAgentBandStyle}>
              <span><strong>Your Agent:</strong> Agent Name <a href="#">View profile</a> · <a href="#">Call mobile</a></span>
              <span><strong>Campaign Support:</strong> Support Agent / Office <a href="#">View office profile</a> · <a href="#">Call office</a></span>
              <span><strong>Live Web Link:</strong> <a href="#">Open campaign web page</a></span>
            </div>
          </div>
          <div style={heroMetaGridStyle}>
            <HeroMetaCard value={campaign.daysOnMarket} label="Days on market" />
            <HeroMetaCard value={campaign.contractsOut} label="Contracts out" />
            <HeroMetaCard value={campaign.displayPrice} label="Display price" />
            <HeroMetaCard value={campaign.campaignHeat} label="Campaign heat" warm />
          </div>
        </div>
      </section>

      <div style={tabsWrapStyle} className="vh-glass">
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
          {tabs.map((tab, index) => (
            <button key={tab} style={index === 0 ? activeTabStyle : tabStyle}>{tab}</button>
          ))}
        </div>
      </div>

      <section style={sectionGridStyle}>
        <div className="vh-glass" style={panelStyle}>
          <h2 style={sectionTitleStyle}>Latest Updates</h2>
          <p style={sectionCopyStyle}>
            This tab is intended to be the same across every vendor hub link. It will become an AI-generated market brief built from the active news articles and sources entered in the protected admin section, then refreshed every 24 hours.
          </p>
          <div style={{ display: 'grid', gap: 14 }}>
            <InsightCard
              kicker="Update method"
              title="Clearer, cleaner market briefing"
              body="This tab stays tighter and cleaner by keeping the daily AI market brief here, while auction-rate analysis can live in a clearer dedicated view within the updates workflow."
            />
            <InsightCard
              kicker="Vendor translation"
              title="What the market story means for this campaign"
              body="The vendor-facing interpretation should connect the broader market read back to this home, this suburb, and the campaign stage without cluttering the page."
              gold
            />
          </div>
        </div>

        <div className="vh-glass" style={panelStyle}>
          <h2 style={sectionTitleStyle}>Market Snapshot</h2>
          <p style={sectionCopyStyle}>A cleaner summary of the daily AI market brief without the auction detail cluttering the page.</p>
          <div style={{ display: 'grid', gap: 14 }}>
            {snapshotCards.map((card) => (
              <InsightCard key={card.kicker} kicker={card.kicker} title={card.title} body={card.body} gold={card.gold} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function HeroMetaCard({ value, label, warm = false }: { value: string; label: string; warm?: boolean }) {
  return (
    <div style={{ ...heroMetaCardStyle, ...(warm ? heroWarmCardStyle : {}) }}>
      <strong style={{ display: 'block', fontSize: 30, marginBottom: 8, fontFamily: 'Playfair Display, serif', lineHeight: 1 }}>{value}</strong>
      <span style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: warm ? 'rgba(78,54,0,0.7)' : 'rgba(255,255,255,0.62)' }}>{label}</span>
    </div>
  );
}

function InsightCard({ kicker, title, body, gold = false }: { kicker: string; title: string; body: string; gold?: boolean }) {
  return (
    <div style={{ ...insightCardStyle, ...(gold ? goldCardStyle : {}) }}>
      <span style={cardKickerStyle}>{kicker}</span>
      <strong style={{ display: 'block', fontFamily: 'Playfair Display, serif', fontSize: 28, lineHeight: 1.02, marginBottom: 8 }}>{title}</strong>
      <div style={{ color: 'var(--muted)', lineHeight: 1.58 }}>{body}</div>
    </div>
  );
}

const navWrapStyle = {
  borderRadius: 999,
  padding: '14px 20px',
  marginBottom: 18,
} as const;

const navStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
  flexWrap: 'wrap',
} as const;

const navLogoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  letterSpacing: '0.24em',
  fontWeight: 800,
  fontSize: '0.9rem',
  minWidth: 180,
} as const;

const navMidStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  color: 'var(--muted)',
  fontSize: '0.82rem',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
} as const;

const navBadgeStyle = {
  padding: '8px 12px',
  borderRadius: 999,
  background: 'rgba(230,114,0,0.10)',
  color: 'var(--orange-deep)',
  fontWeight: 700,
} as const;

const navRightStyle = {
  color: 'var(--muted)',
  fontSize: '0.82rem',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
} as const;

const heroStyle = {
  position: 'relative' as const,
  overflow: 'hidden',
  borderRadius: 'var(--radius-xl)',
  color: 'white',
  padding: 34,
  marginBottom: 18,
  boxShadow: '0 28px 58px rgba(25,21,18,0.16)',
  background: 'linear-gradient(120deg, rgba(19,17,15,0.86) 0%, rgba(25,21,18,0.70) 38%, rgba(28,22,18,0.48) 62%, rgba(31,24,19,0.64) 100%)',
} as const;

const heroGridStyle = {
  position: 'relative' as const,
  zIndex: 1,
  display: 'grid',
  gridTemplateColumns: '1.45fr 1fr',
  gap: 22,
  alignItems: 'end',
} as const;

const heroKickerStyle = {
  fontSize: '0.75rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: 'rgba(255,255,255,0.66)',
  marginBottom: 10,
  fontWeight: 800,
} as const;

const heroHeadingStyle = {
  margin: '0 0 12px',
  fontSize: 'clamp(2.4rem, 5vw, 4.6rem)',
  lineHeight: 0.95,
} as const;

const heroCopyStyle = {
  margin: 0,
  maxWidth: 760,
  color: 'rgba(255,255,255,0.78)',
  fontSize: '1rem',
  lineHeight: 1.55,
} as const;

const heroAgentBandStyle = {
  marginTop: 18,
  display: 'flex',
  flexWrap: 'wrap' as const,
  gap: '10px 18px',
  alignItems: 'center',
  color: 'rgba(255,255,255,0.82)',
  fontSize: '0.95rem',
  lineHeight: 1.5,
} as const;

const heroMetaGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 12,
} as const;

const heroMetaCardStyle = {
  borderRadius: 18,
  padding: 16,
  background: 'rgba(255,255,255,0.09)',
  border: '1px solid rgba(255,255,255,0.10)',
} as const;

const heroWarmCardStyle = {
  background: 'linear-gradient(145deg, rgba(255,248,230,0.94) 0%, rgba(255,239,198,0.88) 52%, rgba(255,229,160,0.82) 100%)',
  border: '1px solid rgba(232,179,72,0.24)',
  color: '#4d3517',
} as const;

const tabsWrapStyle = {
  borderRadius: 999,
  padding: 10,
  marginBottom: 22,
  position: 'sticky' as const,
  top: 14,
  zIndex: 20,
} as const;

const tabStyle = {
  border: 'none',
  background: 'transparent',
  color: 'var(--muted)',
  fontWeight: 700,
  padding: '12px 18px',
  borderRadius: 999,
  whiteSpace: 'nowrap' as const,
} as const;

const activeTabStyle = {
  ...tabStyle,
  background: 'linear-gradient(135deg, rgba(230,114,0,0.18), rgba(230,114,0,0.08))',
  color: 'var(--orange-deep)',
  boxShadow: 'inset 0 0 0 1px rgba(230,114,0,0.14)',
} as const;

const sectionGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1.15fr 0.85fr',
  gap: 18,
} as const;

const panelStyle = {
  borderRadius: 'var(--radius-lg)',
  padding: 22,
} as const;

const sectionTitleStyle = {
  margin: '0 0 8px',
  fontSize: '1.55rem',
} as const;

const sectionCopyStyle = {
  margin: '0 0 18px',
  color: 'var(--muted)',
  lineHeight: 1.6,
} as const;

const insightCardStyle = {
  borderRadius: 20,
  padding: 18,
  background: 'rgba(255,255,255,0.72)',
  border: '1px solid rgba(32,32,32,0.08)',
  boxShadow: 'var(--shadow-soft)',
} as const;

const goldCardStyle = {
  position: 'relative' as const,
  overflow: 'hidden' as const,
  background: 'linear-gradient(145deg, rgba(255,248,230,0.94) 0%, rgba(255,239,198,0.88) 52%, rgba(255,229,160,0.82) 100%)',
  border: '1px solid rgba(232,179,72,0.24)',
  boxShadow: '0 18px 36px rgba(196,146,39,0.12), inset 0 1px 0 rgba(255,255,255,0.66)',
} as const;

const cardKickerStyle = {
  display: 'block',
  fontSize: '0.72rem',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.12em',
  color: 'var(--orange)',
  fontWeight: 800,
  marginBottom: 10,
} as const;
