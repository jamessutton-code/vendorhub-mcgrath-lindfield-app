'use client';

import { useMemo, useState } from 'react';
import type { Campaign, VendorSectionControl, VendorSectionKey } from '@/lib/types';

type VendorTab = 'updates' | 'auction' | 'competition' | 'feedback' | 'projections' | 'admin';

const tabs: Array<{ id: VendorTab; label: string }> = [
  { id: 'updates', label: 'Latest Updates' },
  { id: 'auction', label: 'Auction Updates' },
  { id: 'competition', label: 'Market Competition' },
  { id: 'feedback', label: 'Buyer Feedback' },
  { id: 'projections', label: 'Projections' },
  { id: 'admin', label: 'Admin Update' },
];

const officeProfileUrl = 'https://www.mcgrath.com.au/offices/lindfield-a0v5g000003JhTaAAK';

export function VendorShell({ campaign }: { campaign: Campaign }) {
  const [activeTab, setActiveTab] = useState<VendorTab>('updates');
  const listingUrl = campaign.mcgrathListingUrl || '#';
  const primaryAgents = campaign.primaryAgents?.length ? campaign.primaryAgents : [];
  const supportAgent = campaign.supportAgent;
  const heroImages = campaign.heroImages?.length ? campaign.heroImages : [{ kind: 'hero1', url: campaign.heroImage, altText: campaign.address }];
  const content = campaign.content || {};
  const sectionControls = campaign.sectionControls || [];
  const approvedCount = sectionControls.filter((section) => section.status === 'approved').length;

  const controlMap = useMemo(() => indexControls(sectionControls), [sectionControls]);

  return (
    <>
      <style jsx>{`
        .site-shell {
          width: min(1220px, calc(100% - 44px));
          margin: 0 auto;
          padding: 28px 0 72px;
        }

        .nav-wrap,
        .tabs-wrap,
        .panel,
        .vendor-feature,
        .insight-card,
        .article-card,
        .note-card,
        .status-card,
        .admin-card,
        .locked-card {
          background: rgba(255,255,255,0.72);
          border: 1px solid rgba(32,32,32,0.08);
          box-shadow: 0 22px 48px rgba(33,27,20,0.08);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .nav-wrap {
          border-radius: 999px;
          padding: 15px 22px;
          margin-bottom: 22px;
        }

        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .nav-logo-mark {
          height: 34px;
          width: auto;
          display: block;
          object-fit: contain;
        }

        .nav-mid {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--muted);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .nav-badge {
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(230,114,0,0.10);
          color: var(--orange-deep);
          font-weight: 700;
        }

        .hero {
          position: relative;
          overflow: hidden;
          border-radius: 36px;
          background-image:
            linear-gradient(120deg, rgba(18,16,14,0.78) 0%, rgba(24,21,18,0.58) 42%, rgba(30,24,20,0.40) 100%),
            url('${campaign.heroImage}');
          background-size: cover;
          background-position: center center;
          color: white;
          padding: 42px;
          margin-bottom: 28px;
          box-shadow: 0 34px 64px rgba(25,21,18,0.18);
        }

        .hero::after {
          content: '';
          position: absolute;
          right: -110px;
          bottom: -120px;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(230,114,0,0.24) 0%, rgba(230,114,0,0) 72%);
        }

        .hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 28px;
          align-items: end;
        }

        .hero-kicker {
          font-size: 0.76rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.66);
          margin-bottom: 12px;
          font-weight: 800;
        }

        .hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 5vw, 5rem);
          line-height: 0.96;
          margin: 0 0 16px;
        }

        .hero-copy {
          margin: 0;
          max-width: 760px;
          color: rgba(255,255,255,0.82);
          font-size: 1.02rem;
          line-height: 1.72;
        }

        .hero-band {
          margin-top: 18px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px 18px;
          color: rgba(255,255,255,0.84);
          font-size: 0.94rem;
          line-height: 1.55;
        }

        .hero-band strong {
          color: white;
          font-weight: 800;
        }

        .hero-band a,
        .mcgrath-link {
          color: #ffc98b;
          font-weight: 700;
          text-decoration: none;
        }

        .hero-band a:hover,
        .mcgrath-link:hover {
          text-decoration: underline;
        }

        .hero-meta-grid {
          display: grid;
          gap: 14px;
        }

        .hero-meta-card {
          border-radius: 22px;
          padding: 18px 18px 16px;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.12);
        }

        .hero-meta-card strong {
          display: block;
          font-size: 1.5rem;
          margin-bottom: 8px;
          font-family: 'Playfair Display', serif;
        }

        .hero-meta-card span {
          font-size: 0.74rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.62);
        }

        .status-card {
          border-radius: 22px;
          padding: 22px;
          background: linear-gradient(145deg, rgba(255,248,230,0.96), rgba(255,239,198,0.88));
          border: 1px solid rgba(232,179,72,0.24);
          color: #49331a;
        }

        .status-card strong {
          display: block;
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          margin-bottom: 6px;
        }

        .feature-band {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 18px;
          margin-bottom: 28px;
        }

        .vendor-feature {
          border-radius: 28px;
          padding: 28px;
          background: linear-gradient(145deg, rgba(255,255,255,0.72), rgba(255,255,255,0.48));
        }

        .vendor-feature h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          margin: 0 0 10px;
        }

        .hero-shot-stack {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-top: 22px;
        }

        .hero-shot {
          border-radius: 18px;
          min-height: 138px;
          overflow: hidden;
          background: rgba(32,32,32,0.06);
          border: 1px solid rgba(32,32,32,0.08);
        }

        .hero-shot img {
          width: 100%;
          height: 100%;
          min-height: 138px;
          object-fit: cover;
          display: block;
        }

        .tabs-wrap {
          border-radius: 999px;
          padding: 10px;
          position: sticky;
          top: 14px;
          z-index: 20;
          margin-bottom: 26px;
        }

        .tabs {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .tabs::-webkit-scrollbar {
          display: none;
        }

        .tab-btn {
          border: none;
          background: transparent;
          color: var(--muted);
          font-family: inherit;
          font-weight: 700;
          padding: 12px 18px;
          border-radius: 999px;
          cursor: pointer;
          white-space: nowrap;
          transition: 0.2s ease;
        }

        .tab-btn.active {
          background: linear-gradient(135deg, rgba(230,114,0,0.16), rgba(230,114,0,0.08));
          color: var(--orange-deep);
          box-shadow: inset 0 0 0 1px rgba(230,114,0,0.14);
        }

        .view {
          display: none;
        }

        .view.active {
          display: block;
        }

        .panel {
          border-radius: 30px;
          padding: 32px;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          margin: 0 0 10px;
        }

        .section-copy {
          margin: 0 0 24px;
          color: var(--muted);
          line-height: 1.75;
          max-width: 760px;
        }

        .section-stack {
          display: grid;
          gap: 18px;
        }

        .article-card,
        .insight-card,
        .note-card,
        .admin-card,
        .locked-card {
          border-radius: 24px;
          padding: 22px;
        }

        .article-card.gold {
          background: linear-gradient(145deg, rgba(255,248,230,0.96), rgba(255,239,198,0.88));
          border-color: rgba(232,179,72,0.24);
        }

        .card-kicker,
        .tiny-label {
          display: block;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--orange);
          font-weight: 800;
          margin-bottom: 10px;
        }

        .article-title,
        .insight-card strong {
          display: block;
          font-family: 'Playfair Display', serif;
          font-size: 1.38rem;
          line-height: 1.2;
          margin-bottom: 10px;
        }

        .muted {
          color: var(--muted);
          line-height: 1.72;
        }

        .insight-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .note-card {
          background: rgba(249,247,242,0.92);
        }

        .locked-card {
          background: linear-gradient(145deg, rgba(250,245,238,0.98), rgba(247,242,235,0.92));
        }

        .view-anchor {
          scroll-margin-top: 104px;
        }

        @media (max-width: 1040px) {
          .hero-grid,
          .feature-band,
          .insight-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 780px) {
          .site-shell {
            width: min(100%, calc(100% - 20px));
            padding-top: 14px;
          }

          .hero,
          .panel,
          .vendor-feature,
          .article-card,
          .insight-card,
          .note-card,
          .admin-card,
          .locked-card,
          .status-card {
            padding: 22px 18px;
          }

          .nav {
            flex-direction: column;
            align-items: start;
          }

          .tabs-wrap {
            top: 8px;
          }

          .hero h1 {
            font-size: 2.5rem;
          }

          .hero-shot-stack {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="site-shell">
        <div className="nav-wrap">
          <div className="nav">
            <img className="nav-logo-mark" src="/mcgrath-logo.png" alt="McGrath logo" />
            <div className="nav-mid">
              <span>Vendor Hub</span>
              <span className="nav-badge">Private campaign view</span>
            </div>
            <div className="nav-mid">McGrath Lindfield</div>
          </div>
        </div>

        <section className="hero">
          <div className="hero-grid">
            <div>
              <div className="hero-kicker">McGrath Lindfield Vendor Advisory</div>
              <h1>{campaign.address},<br />{campaign.suburb}</h1>
              <p className="hero-copy">
                {campaign.advertisingCopy || 'A premium vendor-facing campaign hub built to give a clear view of market movement, buyer sentiment, local competition, and strategic price positioning, all in one place.'}
              </p>
              <div className="hero-band">
                <span><strong>Your Agents:</strong> {renderAgentBand(primaryAgents)}</span>
                <span><strong>Campaign Support:</strong> {supportAgent?.name || 'Support Person'} {supportAgent?.profileUrl ? <a href={supportAgent.profileUrl}>View profile</a> : null} · <a href={supportAgent?.mobile ? `tel:${supportAgent.mobile}` : officeProfileUrl}>Call office</a></span>
                <span><strong>Live Web Link:</strong> <a className="mcgrath-link" href={listingUrl}>Open campaign web page</a></span>
              </div>
            </div>
            <div className="hero-meta-grid">
              <HeroMetaCard value={campaign.daysOnMarket} label="Days on market" />
              <HeroMetaCard value={campaign.contractsOut} label="Contracts out" />
              <HeroMetaCard value={campaign.displayPrice} label="Display price" />
              <div className="status-card">
                <strong>{approvedCount} / {sectionControls.length || 5}</strong>
                <span>Sections approved for vendor-facing review</span>
              </div>
            </div>
          </div>
        </section>

        <div className="feature-band">
          <div className="vendor-feature">
            <span className="card-kicker">Campaign Advisory Read</span>
            <h3>Clearer vendor decision-making</h3>
            <div className="muted">
              This portal is designed to turn campaign evidence into a cleaner decision framework: what the market is doing, how buyers are reacting, where competing stock sits, and what the recommended next move should be.
            </div>
            <div className="hero-shot-stack">
              {heroImages.slice(0, 3).map((image, index) => (
                <div key={`${image.kind}-${index}`} className="hero-shot">
                  <img src={image.url} alt={image.altText || `${campaign.address} image ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="vendor-feature">
            <span className="card-kicker">Property Snapshot</span>
            <h3>{campaign.propertyType || 'Property'} in {campaign.suburb}</h3>
            <div className="muted">
              {[campaign.bedrooms ? `${campaign.bedrooms} bed` : '', campaign.bathrooms ? `${campaign.bathrooms} bath` : '', campaign.carSpaces ? `${campaign.carSpaces} car` : '', campaign.landSize || ''].filter(Boolean).join(' · ') || 'Property details will appear here as campaign setup is completed.'}
            </div>
            <div className="note-card" style={{ marginTop: 22 }}>
              <span className="tiny-label">Campaign Positioning</span>
              <div className="muted">{campaign.recommendedStrategyBody || campaign.marketConditions || campaign.notesInternal || 'Strategic positioning, notes, and market feel entered in admin will surface here as the campaign setup becomes more complete.'}</div>
            </div>
          </div>
        </div>

        <div className="tabs-wrap">
          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                type="button"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <section id="view-updates" className={`view view-anchor ${activeTab === 'updates' ? 'active' : ''}`}>
          <div className="panel">
            <h2 className="section-title">Latest Updates</h2>
            <p className="section-copy">A concise, vendor-ready read on the broader market and what it means for this campaign right now.</p>
            {renderApprovedSection(controlMap.updates, (
              <div className="section-stack">
                <ArticleCard kicker="Market Brief" title="Clear read on the current market">{content.latestUpdatesSummary || 'No market brief has been approved yet.'}</ArticleCard>
                <ArticleCard kicker="Campaign Implication" title="What this means for your campaign" gold>{content.latestUpdatesImplication || 'No campaign implication has been approved yet.'}</ArticleCard>
                <div className="insight-grid">
                  <InsightCard label="Stock Tone" value={content.stockTone || 'TBC'}>How local supply currently feels.</InsightCard>
                  <InsightCard label="Buyer Mood" value={content.buyerMood || 'TBC'}>Confidence and decisiveness in active buyers.</InsightCard>
                  <InsightCard label="Outlook" value={content.outlook || campaign.projectionHeadline || 'TBC'}>Short-form forward-looking read.</InsightCard>
                  <InsightCard label="Source Basis" value={controlMap.updates.sourceBasis || 'TBC'}>{controlMap.updates.internalSummary || 'No internal basis recorded yet.'}</InsightCard>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="view-auction" className={`view view-anchor ${activeTab === 'auction' ? 'active' : ''}`}>
          <div className="panel">
            <h2 className="section-title">Auction Updates</h2>
            <p className="section-copy">A cleaner view of auction conditions and what they signal about buyer urgency and confidence.</p>
            {renderApprovedSection(controlMap.auction, (
              <div className="section-stack">
                <ArticleCard kicker="Auction Commentary" title="Sydney and local auction pulse">{content.auctionHeadline || 'No auction commentary has been approved yet.'}</ArticleCard>
                <div className="insight-grid">
                  <InsightCard label="Sydney Clearance" value={content.sydneyClearance || 'TBC'}>Weekly Sydney auction context.</InsightCard>
                  <InsightCard label="Local Clearance" value={content.localClearance || 'TBC'}>Relevant local suburb read.</InsightCard>
                  <InsightCard label="Auction Pulse" value={content.auctionPulse || 'TBC'}>Interpretation of current clearance conditions.</InsightCard>
                  <InsightCard label="Source Basis" value={controlMap.auction.sourceBasis || 'TBC'}>{controlMap.auction.internalSummary || 'No internal basis recorded yet.'}</InsightCard>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="view-competition" className={`view view-anchor ${activeTab === 'competition' ? 'active' : ''}`}>
          <div className="panel">
            <h2 className="section-title">Market Competition</h2>
            <p className="section-copy">A focused interpretation of the stock and recent results that genuinely matter to this campaign.</p>
            {renderApprovedSection(controlMap.competition, (
              <div className="section-stack">
                <ArticleCard kicker="On-Market Competition" title="Current comparable set">{content.competitionOnMarket || 'No on-market competition summary has been approved yet.'}</ArticleCard>
                <ArticleCard kicker="Sold Evidence" title="Recent benchmark evidence">{content.competitionSold || 'No sold benchmark summary has been approved yet.'}</ArticleCard>
                <div className="insight-grid">
                  <InsightCard label="Primary Competition Area" value={campaign.compPrimarySuburb || 'TBC'}>Most relevant comparable geography.</InsightCard>
                  <InsightCard label="Price Pressure" value={content.pricePressure || 'TBC'}>Where buyers may compare hardest on value.</InsightCard>
                  <InsightCard label="Strategic Edge" value={content.strategicEdge || campaign.compPrimarySuburb || 'TBC'}>{campaign.compNotes || 'Where this property can stand apart.'}</InsightCard>
                  <InsightCard label="Source Basis" value={controlMap.competition.sourceBasis || 'TBC'}>{controlMap.competition.internalSummary || 'No internal basis recorded yet.'}</InsightCard>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="view-feedback" className={`view view-anchor ${activeTab === 'feedback' ? 'active' : ''}`}>
          <div className="panel">
            <h2 className="section-title">Buyer Feedback</h2>
            <p className="section-copy">An organised view of what buyers are responding to, what needs managing, and where genuine intent sits.</p>
            {renderApprovedSection(controlMap.feedback, (
              <div className="section-stack">
                <ArticleCard kicker="What’s Landing Well" title="Positive buyer response">{content.positiveFeedback || 'No positive buyer-feedback summary has been approved yet.'}</ArticleCard>
                <ArticleCard kicker="What Needs Managing" title="Recurring objections and friction points">{content.watchouts || 'No watchout summary has been approved yet.'}</ArticleCard>
                <ArticleCard kicker="Warm and Hot Buyers" title="Where intent is strongest" gold>{content.warmHotBuyers || 'No buyer-intent summary has been approved yet.'}</ArticleCard>
                <div className="insight-grid">
                  <InsightCard label="Contract Holders" value={content.contractHolders || 'TBC'}>Latest contract-holder signal.</InsightCard>
                  <InsightCard label="Price Feedback" value={content.priceFeedback || 'TBC'}>Recurring price response themes.</InsightCard>
                  <InsightCard label="Campaign Heat" value={content.campaignHeatDetail || campaign.campaignHeat || 'TBC'}>Current campaign traction read.</InsightCard>
                  <InsightCard label="Source Basis" value={controlMap.feedback.sourceBasis || 'TBC'}>{controlMap.feedback.internalSummary || 'No internal basis recorded yet.'}</InsightCard>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="view-projections" className={`view view-anchor ${activeTab === 'projections' ? 'active' : ''}`}>
          <div className="panel">
            <h2 className="section-title">Projections</h2>
            <p className="section-copy">A balanced forward-looking view of likely conditions and the recommended strategic response.</p>
            {renderApprovedSection(controlMap.projections, (
              <div className="section-stack">
                <ArticleCard kicker="Market Outlook" title="Near-term campaign outlook">{content.marketOutlook || 'No market outlook has been approved yet.'}</ArticleCard>
                <ArticleCard kicker="Recommended Response" title="Our advised approach" gold>{content.recommendedResponse || campaign.recommendedStrategyBody || 'No strategic recommendation has been approved yet.'}</ArticleCard>
                <div className="insight-grid">
                  <InsightCard label="Buyer Behaviour" value={content.buyerBehaviourOutlook || 'TBC'}>Likely buyer posture if conditions hold.</InsightCard>
                  <InsightCard label="Pricing Pressure" value={content.pricingPressureWatch || 'TBC'}>Read on whether the current guide is being supported.</InsightCard>
                  <InsightCard label="Scenario Planning" value={content.scenarioPlanning || 'TBC'}>Conditional pathways from here.</InsightCard>
                  <InsightCard label="Source Basis" value={controlMap.projections.sourceBasis || 'TBC'}>{controlMap.projections.internalSummary || 'No internal basis recorded yet.'}</InsightCard>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="view-admin" className={`view view-anchor ${activeTab === 'admin' ? 'active' : ''}`}>
          <div className="panel">
            <h2 className="section-title">Admin Update</h2>
            <p className="section-copy">Editing controls sit on the protected admin route so the vendor page stays presentation-first.</p>
            <div className="section-stack">
              <div className="admin-card">
                <span className="card-kicker">Use the protected admin workspace</span>
                <div className="article-title">Open the real campaign control surface</div>
                <div className="muted">That is where your team should manage setup, evidence intake, editorial review, section approval, and campaign-specific updates.</div>
                <div style={{ marginTop: 18 }}>
                  <a className="mcgrath-link" href={`/admin/campaigns/${campaign.slug}`}>Open campaign admin</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function renderAgentBand(agents: Campaign['primaryAgents']) {
  if (!agents?.length) {
    return 'Agent details coming soon';
  }

  return agents.map((agent, index) => (
    <span key={`${agent.role}-${agent.name}`}>
      {index > 0 ? ' · ' : ''}
      {agent.name} {agent.profileUrl ? <a href={agent.profileUrl}>View profile</a> : null}
    </span>
  ));
}

function renderApprovedSection(control: VendorSectionControl, children: React.ReactNode) {
  if (control.status !== 'approved') {
    return (
      <div className="locked-card">
        <span className="card-kicker">In Preparation</span>
        <div className="article-title">This section is still being refined</div>
        <div className="muted">The McGrath Lindfield team is still reviewing this section before it is presented as part of the live vendor-facing advisory view.</div>
      </div>
    );
  }

  return children;
}

function HeroMetaCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="hero-meta-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function ArticleCard({ kicker, title, gold = false, children }: { kicker: string; title?: string; gold?: boolean; children: React.ReactNode }) {
  return (
    <div className={`article-card ${gold ? 'gold' : ''}`}>
      <span className="card-kicker">{kicker}</span>
      {title ? <div className="article-title">{title}</div> : null}
      <div className="muted">{children}</div>
    </div>
  );
}

function InsightCard({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div className="insight-card">
      <span className="tiny-label">{label}</span>
      <strong>{value}</strong>
      <div className="muted">{children}</div>
    </div>
  );
}

function indexControls(controls: VendorSectionControl[]) {
  const fallback = (key: VendorSectionKey, label: string): VendorSectionControl => ({
    key,
    label,
    status: 'draft',
    lastUpdated: '',
    internalSummary: '',
    vendorSummary: '',
    sourceBasis: '',
  });

  return {
    updates: controls.find((control) => control.key === 'updates') || fallback('updates', 'Latest Updates'),
    auction: controls.find((control) => control.key === 'auction') || fallback('auction', 'Auction Updates'),
    competition: controls.find((control) => control.key === 'competition') || fallback('competition', 'Market Competition'),
    feedback: controls.find((control) => control.key === 'feedback') || fallback('feedback', 'Buyer Feedback'),
    projections: controls.find((control) => control.key === 'projections') || fallback('projections', 'Projections'),
  };
}
