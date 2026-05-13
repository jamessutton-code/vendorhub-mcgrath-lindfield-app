'use client';

import { useState } from 'react';
import type { Campaign } from '@/lib/types';

type VendorTab = 'updates' | 'auction' | 'competition' | 'feedback' | 'projections' | 'admin';

const tabs: Array<{ id: VendorTab; label: string }> = [
  { id: 'updates', label: 'Latest Updates' },
  { id: 'auction', label: 'Auction Updates' },
  { id: 'competition', label: 'Market Competition' },
  { id: 'feedback', label: 'Buyer Feedback' },
  { id: 'projections', label: 'Projections' },
  { id: 'admin', label: 'Admin Update' },
];

export function VendorShell({ campaign }: { campaign: Campaign }) {
  const [activeTab, setActiveTab] = useState<VendorTab>('updates');

  return (
    <main className="vh-shell">
      <div style={navWrapStyle} className="vh-glass">
        <div style={navStyle}>
          <div style={navLogoStyle}>McGrath logo</div>
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
            <div style={heroKickerStyle}>Campaign Intelligence Dashboard</div>
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
              <span><strong>Live Web Link:</strong> <a href={campaign.mcgrathListingUrl || '#'}>Open campaign web page</a></span>
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
        <div style={tabsRowStyle}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={activeTab === tab.id ? activeTabStyle : tabStyle}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'updates' && <LatestUpdatesView />}
      {activeTab === 'auction' && <AuctionUpdatesView />}
      {activeTab === 'competition' && <MarketCompetitionView />}
      {activeTab === 'feedback' && <BuyerFeedbackView />}
      {activeTab === 'projections' && <ProjectionsView />}
      {activeTab === 'admin' && <AdminUpdateView />}
    </main>
  );
}

function LatestUpdatesView() {
  return (
    <section style={sectionGridStyle}>
      <div className="vh-glass" style={panelStyle}>
        <h2 style={sectionTitleStyle}>Latest Updates</h2>
        <p style={sectionCopyStyle}>
          This tab is intended to be the same across every vendor hub link. It will become an AI-generated market brief
          built from the active news articles and sources entered in the protected admin section, then refreshed every 24 hours.
        </p>

        <div style={singleColumnGridStyle}>
          <ArticleCard
            kicker="Update Method"
            body="This tab stays tighter and cleaner by keeping the daily AI market brief here, while detailed auction-rate analysis can live in a cleaner dedicated view within the updates workflow."
          />
          <ArticleCard
            kicker="AI Market Brief"
            title="Clear read on the current market"
            body="Placeholder for the daily AI-generated summary of buyer confidence, stock levels, competition intensity, and likely short-term direction in the Upper North Shore market."
          />
          <ArticleCard
            kicker="What This Means For Your Campaign"
            title="Market interpretation for this vendor audience"
            body="Placeholder for the AI-generated vendor-facing interpretation of the broader market: whether conditions favour urgency, patience, sharper pricing discipline, or a stronger focus on buyer depth and negotiation pressure."
            gold
          />
          <ArticleCard
            kicker="Refresh Logic"
            body="Market updates shown here will be prepared behind the scenes in the protected admin area, where article URLs are added and assessed. The website should then refresh this briefing every 24 hours, rewording and re-framing the commentary while staying anchored to the active source material."
          />
        </div>
      </div>

      <div className="vh-glass" style={panelStyle}>
        <h2 style={sectionTitleStyle}>Market Snapshot</h2>
        <p style={sectionCopyStyle}>A cleaner summary of the daily AI market brief without the auction detail cluttering the page.</p>
        <div style={metricGridStyle}>
          <MetricInsightCard kicker="Stock Tone" value="TBC" body="AI summary of whether local supply feels tight, balanced, or building." />
          <MetricInsightCard kicker="Buyer Mood" value="TBC" body="AI read on the confidence level of active buyers in the market." />
          <MetricInsightCard kicker="Outlook" value="TBC" body="Forward-looking view refreshed daily from the current active article set." gold />
        </div>
      </div>
    </section>
  );
}

function AuctionUpdatesView() {
  return (
    <section style={sectionGridStyle}>
      <div className="vh-glass" style={panelStyle}>
        <h2 style={sectionTitleStyle}>Auction Updates</h2>
        <p style={sectionCopyStyle}>
          This tab will house the SQM Research read, including Sydney clearance rates, local clearance rates,
          and AI commentary on what auction conditions mean for the current market.
        </p>
        <div style={singleColumnGridStyle}>
          <ArticleCard
            kicker="Auction Clearance Read"
            title="Sydney + local market pulse"
            body="Placeholder for AI commentary combining Sydney clearance rates with local reads from SQM Research across the relevant campaign suburbs."
            gold
          />
          <ArticleCard
            kicker="Update Logic"
            body="Auction data should refresh automatically each day at around 5:00 AM AEST on the same cadence as the latest news brief, so the vendor portal stays current even when commentary is being reworded from the same source set."
          />
        </div>
      </div>

      <div className="vh-glass" style={panelStyle}>
        <h2 style={sectionTitleStyle}>Auction Pulse</h2>
        <p style={sectionCopyStyle}>A clear, vendor-friendly read of the weekly clearance environment.</p>
        <div style={metricGridStyle}>
          <MetricInsightCard kicker="Sydney Clearance" value="TBC" body="Weekly Sydney clearance context sourced from SQM." />
          <MetricInsightCard kicker="Local Clearance" value="TBC" body="Combined read across the relevant local suburbs for this campaign." />
          <MetricInsightCard kicker="Auction Commentary" value="TBC" body="Short AI interpretation of what those clearance rates mean for current conditions." gold />
        </div>
      </div>
    </section>
  );
}

function MarketCompetitionView() {
  return (
    <section style={sectionGridStyle}>
      <div className="vh-glass" style={panelStyle}>
        <h2 style={sectionTitleStyle}>Market Competition</h2>
        <p style={sectionCopyStyle}>
          This section will show only the most relevant competing and comparable listings, both on market and sold,
          translated into a clean client-facing story rather than a messy spreadsheet. Comp data should also refresh automatically each day at around 5:00 AM AEST.
        </p>

        <div style={singleColumnGridStyle}>
          <CompCard
            kicker="Comparable Group"
            title="Primary competition set"
            chip="On Market"
            body="Placeholder for the most directly relevant active competitors in the subject suburb and nearby premium pockets."
          />
          <CompCard
            kicker="Sold Evidence"
            title="Recent result set"
            chip="Sold"
            chipWarm
            body="Placeholder for selected sold comparables that help anchor buyer perception, pricing confidence, and likely campaign positioning."
          />
        </div>
      </div>

      <div className="vh-glass" style={panelStyle}>
        <h2 style={sectionTitleStyle}>Competition Read</h2>
        <p style={sectionCopyStyle}>A simpler, more vendor-friendly interpretation of the local battleground.</p>
        <div style={insightGridStyle}>
          <MetricInsightCard kicker="Most Relevant Stock" value="TBC" body="Will identify which listings genuinely matter to this campaign." compact />
          <MetricInsightCard kicker="Price Pressure" value="TBC" body="Will summarise where buyers may compare harder on value." compact />
          <MetricInsightCard kicker="Strategic Edge" value="TBC" body="Will highlight where this property can stand apart from direct rivals." gold compact />
          <MetricInsightCard kicker="Sold Benchmark" value="TBC" body="Will show which recent result best informs likely buyer expectations." compact />
        </div>
      </div>
    </section>
  );
}

function BuyerFeedbackView() {
  return (
    <section style={sectionGridStyle}>
      <div className="vh-glass" style={panelStyle}>
        <h2 style={sectionTitleStyle}>Buyer Feedback</h2>
        <p style={sectionCopyStyle}>
          This section will analyse buyer feedback PDFs and campaign reporting, separating the positive signals,
          friction points, and the buyers showing the strongest intent.
        </p>

        <div style={toggleRowStyle}>
          <TogglePill label="Warm Buyers" active />
          <TogglePill label="Hot Buyers" />
          <TogglePill label="Contract Holders" />
          <TogglePill label="Price Feedback" />
        </div>

        <div style={singleColumnGridStyle}>
          <FeedbackCard
            kicker="What’s landing well"
            body="Placeholder for the strongest recurring positives buyers are responding to, presentation, location, floorplan, emotional appeal, renovation quality, or value relative to alternatives."
          />
          <FeedbackCard
            kicker="What needs managing"
            body="Placeholder for objections or recurring hesitation points that need to be handled through positioning, pricing discipline, or campaign communication."
            watchout
          />
          <FeedbackCard
            kicker="Warm + hot buyers"
            body="This area will pull forward the buyers showing the strongest level of intent and make them impossible to miss."
            gold
            chips={[
              { label: 'Hot buyers: TBC', hot: true },
              { label: 'Warm buyers: TBC', warm: true },
            ]}
          />
        </div>
      </div>

      <div className="vh-glass" style={panelStyle}>
        <h2 style={sectionTitleStyle}>Campaign Momentum</h2>
        <p style={sectionCopyStyle}>
          This will become the vendor-facing campaign momentum board powered by realestate.com.au and Domain reporting.
        </p>
        <div style={insightGridStyle}>
          <MetricInsightCard kicker="Views" value="TBC" body="Audience attention over the campaign." compact />
          <MetricInsightCard kicker="Enquiries" value="TBC" body="Serious buyer action and response levels." compact />
          <MetricInsightCard kicker="Saves / Favourites" value="TBC" body="Early signal of buyer attachment." compact />
          <MetricInsightCard kicker="Campaign Heat" value="TBC" body="A more dynamic, Momentum Lab-style read of campaign traction." gold compact />
        </div>
      </div>
    </section>
  );
}

function ProjectionsView() {
  return (
    <section style={sectionGridStyle}>
      <div className="vh-glass" style={panelStyle}>
        <h2 style={sectionTitleStyle}>Projections</h2>
        <p style={sectionCopyStyle}>
          This section should present a forward-looking agency analysis based on current indicators, not fixed promises.
          It should combine article sentiment, auction data, comparable-market movement, buyer feedback, and on-the-ground market feel.
        </p>

        <div style={singleColumnGridStyle}>
          <ProjectionCard kicker="Near-Term Market Outlook" value="TBC" body="Forward-looking view over the next 2-4 weeks based on the current data and article set." />
          <ProjectionCard kicker="Buyer Behaviour Outlook" value="TBC" body="Likely buyer behaviour if current conditions hold: urgency, hesitation, negotiation pressure, or selectivity." />
          <ProjectionCard kicker="Pricing Pressure Watch" value="TBC" body="A read on whether the market is supporting the current guide, resisting it, or creating premium opportunity." />
          <ProjectionCard kicker="Scenario Planning" value="TBC" body="Conditional pathways such as if momentum strengthens, stays steady, or softens from here." gold />
        </div>
      </div>

      <div className="vh-glass" style={panelStyle}>
        <h2 style={sectionTitleStyle}>Risks, Opportunities, Strategy</h2>
        <p style={sectionCopyStyle}>This keeps the guidance balanced and clearly framed as professional interpretation of current conditions.</p>
        <div style={singleColumnGridStyle}>
          <ProjectionCard kicker="Risk Factors We’re Watching" value="TBC" body="Potential drags such as weaker clearance rates, rising stock, softer urgency, or stronger competing listings." />
          <ProjectionCard kicker="Opportunity Factors" value="TBC" body="Positive forces such as thin quality stock, strong presentation, healthy enquiry, or standout local positioning." />
          <ProjectionCard kicker="Recommended Agency Response" value="TBC" body="The advised selling strategy based on the current balance of evidence, with language framed as analysis rather than certainty." gold />
        </div>
      </div>
    </section>
  );
}

function AdminUpdateView() {
  return (
    <section>
      <div className="vh-glass" style={panelStyle}>
        <h2 style={sectionTitleStyle}>Admin Update</h2>
        <p style={sectionCopyStyle}>This tab is intended to be password protected for agency-only updates, file uploads, and strategic recommendation control.</p>

        <div style={adminGridStyle}>
          <AdminCard
            kicker="Campaign status controls"
            body="Controls and reference fields for the status strip near the top of the vendor hub. Some fields may become AI-derived rather than manually maintained."
          >
            <div style={formGridStyle}>
              <input placeholder="Days on market" />
              <input placeholder="Contracts out (AI-derived from weekly vendor report PDF)" />
              <input placeholder="Display price" />
              <select defaultValue="">
                <option value="" disabled>Campaign heat score</option>
                {[1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
          </AdminCard>

          <AdminCard
            kicker="Projection controls"
            body="Manual strategy and recommendation updates for the vendor-facing projections tab."
          >
            <div style={formGridStyle}>
              <input placeholder="Projection headline" />
              <input placeholder="Recommended strategy label" />
            </div>
            <div style={{ marginTop: 12 }}>
              <textarea placeholder="Write strategic agency recommendation here..." />
            </div>
          </AdminCard>

          <AdminCard
            kicker="McGrath web link"
            body="Use this campaign-level field to add or update the live McGrath listing URL after the vendor hub has already been built. This should exist in every vendor hub because the web link may not be available at launch."
          >
            <div style={formGridStyle}>
              <input placeholder="Paste live McGrath web listing URL" />
              <input placeholder="Optional label or status, e.g. add later / live" />
            </div>
            <div style={adminActionsStyle}>
              <button className="vh-button">Save McGrath link</button>
            </div>
          </AdminCard>

          <AdminCard
            kicker="Document uploads"
            body="This area is intended to support PDF uploads for the weekly vendor report, which is primarily buyer feedback but also contains other campaign signals such as contracts out, plus REA reports, Domain reports, McGrath Digital marketing material, and any other campaign files you want analysed."
          >
            <div style={adminActionsStyle}>
              <button className="vh-button">Upload weekly vendor report PDF</button>
              <button className="vh-button vh-button-secondary">Upload REA / Domain PDF</button>
              <button className="vh-button vh-button-secondary">Upload McGrath Digital PDF</button>
            </div>
          </AdminCard>

          <AdminCard
            kicker="Latest updates article intake"
            body="Add external article URLs here so the system can assess what matters, build a shared vendor-facing market brief, and refresh the wording automatically every day at around 5:00 AM AEST without changing the underlying facts unless the source set changes."
          >
            <div style={formGridStyle}>
              <input placeholder="Paste article URL" />
              <input placeholder="Headline or source note" />
            </div>
            <div style={{ marginTop: 12 }}>
              <textarea placeholder="Optional notes on why this article matters..." />
            </div>
            <div style={adminActionsStyle}>
              <button className="vh-button">Add article</button>
              <button className="vh-button vh-button-secondary">Auto-refresh daily ~5:00 AM AEST</button>
            </div>
          </AdminCard>

          <AdminCard
            kicker="Market Conditions Read"
            body="James can describe how the market feels on the ground here. That qualitative read should influence tone across latest updates, auction commentary, projections, and comp commentary during the daily automatic refresh at around 5:00 AM AEST."
          >
            <div style={{ marginTop: 12 }}>
              <textarea placeholder="Write the current on-the-ground market feel here..." />
            </div>
            <div style={adminActionsStyle}>
              <button className="vh-button">Save market conditions</button>
              <button className="vh-button vh-button-secondary">Apply tone across portal</button>
            </div>
          </AdminCard>

          <AdminCard
            kicker="New campaign setup checklist"
            body="Use this guided intake form when building a fresh vendor hub from the master template."
          >
            <div style={singleColumnGridStyle}>
              {setupItems.map((item) => (
                <div key={item.label} style={setupItemStyle}>
                  <label style={setupLabelStyle}>{item.label}</label>
                  {item.multiline ? <textarea placeholder={item.placeholder} /> : item.select ? <select defaultValue=""><option value="" disabled>{item.placeholder}</option>{item.options?.map((option) => <option key={option}>{option}</option>)}</select> : <input placeholder={item.placeholder} />}
                  <div style={setupHintStyle}>{item.hint}</div>
                </div>
              ))}
            </div>
          </AdminCard>

          <AdminCard kicker="Shared McGrath links" body="These are the reusable office and agent profile links available across all vendor hub builds.">
            <div style={mutedListStyle}>
              Office: <a href="https://www.mcgrath.com.au/offices/lindfield-a0v5g000003JhTaAAK">McGrath Lindfield</a><br />
              James Sutton: <a href="https://www.mcgrath.com.au/agents/james-sutton-a1V5g0000007PDMEA2">Profile</a><br />
              Brie Dickson: <a href="https://www.mcgrath.com.au/agents/brie-dickson-a1VRE000000y4dR2AQ">Profile</a><br />
              Cam Henderson: <a href="https://www.mcgrath.com.au/agents/cam-henderson-a1V5g0000007my6EAA">Profile</a><br />
              John Malek: <a href="https://www.mcgrath.com.au/agents/john-malek-a1VRE000001K4bZ2AS">Profile</a><br />
              Olivia Liu: <a href="https://www.mcgrath.com.au/agents/olivia-liu-a1VRE000000jeXZ2AY">Profile</a><br />
              Richard Madden: <a href="https://www.mcgrath.com.au/agents/richard-madden-a1V5g0000007PPQEA2">Profile</a><br />
              Will Geist: <a href="https://www.mcgrath.com.au/agents/will-geist-a1V5g0000007PV8EAM">Profile</a><br />
              Ashley Coates: <a href="https://www.mcgrath.com.au/agents/ashley-coates-a1VRE000000yntt2AA">Profile</a><br />
              Savanna-Rose McGaw: <a href="https://www.mcgrath.com.au/agents/savanna-rose-mcgaw-a1VRE000001YvrJ2AS">Profile</a><br />
              Sharon Richardson: <a href="https://www.mcgrath.com.au/agents/sharon-richardson-a1V5g000005oEPdEAM">Profile</a>
            </div>
          </AdminCard>

          <div style={{ ...adminCardStyle, ...goldCardStyle }}>
            <span style={cardKickerStyle}>Admin lock</span>
            <div style={{ color: 'var(--muted)', lineHeight: 1.55 }}>
              Final version will be campaign-specific and password-protected so vendors only see the polished client-facing output while the agency controls inputs and recommendations.
            </div>
            <div style={adminActionsStyle}>
              <button className="vh-button">Save update</button>
              <button className="vh-button vh-button-secondary">Lock admin</button>
            </div>
          </div>
        </div>
      </div>
    </section>
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

function ArticleCard({ kicker, title, body, gold = false }: { kicker: string; title?: string; body: string; gold?: boolean }) {
  return (
    <div style={{ ...articleCardStyle, ...(gold ? goldCardStyle : {}) }}>
      <span style={cardKickerStyle}>{kicker}</span>
      {title ? <div style={articleTitleStyle}>{title}</div> : null}
      <div style={{ color: 'var(--muted)', lineHeight: 1.58 }}>{body}</div>
    </div>
  );
}

function MetricInsightCard({ kicker, value, body, gold = false, compact = false }: { kicker: string; value: string; body: string; gold?: boolean; compact?: boolean }) {
  return (
    <div style={{ ...(compact ? insightCardStyle : metricCardStyle), ...(gold ? goldCardStyle : {}) }}>
      <span style={cardKickerStyle}>{kicker}</span>
      <strong style={metricValueStyle}>{value}</strong>
      <div style={{ color: 'var(--muted)', lineHeight: 1.55 }}>{body}</div>
    </div>
  );
}

function CompCard({ kicker, title, body, chip, chipWarm = false }: { kicker: string; title: string; body: string; chip: string; chipWarm?: boolean }) {
  return (
    <div style={compCardStyle}>
      <div style={compCardHeadStyle}>
        <div>
          <span style={cardKickerStyle}>{kicker}</span>
          <div style={articleTitleStyle}>{title}</div>
        </div>
        <div style={{ ...chipStyle, ...(chipWarm ? warmChipStyle : {}) }}>{chip}</div>
      </div>
      <div style={{ color: 'var(--muted)', lineHeight: 1.58 }}>{body}</div>
    </div>
  );
}

function TogglePill({ label, active = false }: { label: string; active?: boolean }) {
  return <button type="button" style={active ? activeTogglePillStyle : togglePillStyle}>{label}</button>;
}

function FeedbackCard({ kicker, body, gold = false, watchout = false, chips }: { kicker: string; body: string; gold?: boolean; watchout?: boolean; chips?: Array<{ label: string; hot?: boolean; warm?: boolean }> }) {
  return (
    <div style={{ ...feedbackCardStyle, ...(gold ? goldCardStyle : {}), ...(watchout ? watchoutCardStyle : goodCardStyle) }}>
      <span style={cardKickerStyle}>{kicker}</span>
      <div style={{ color: 'var(--muted)', lineHeight: 1.58 }}>{body}</div>
      {chips?.length ? (
        <div style={chipRowStyle}>
          {chips.map((chip) => (
            <div key={chip.label} style={{ ...chipStyle, ...(chip.hot ? hotChipStyle : {}), ...(chip.warm ? warmChipStyle : {}) }}>{chip.label}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ProjectionCard({ kicker, value, body, gold = false }: { kicker: string; value: string; body: string; gold?: boolean }) {
  return (
    <div style={{ ...projectionCardStyle, ...(gold ? goldCardStyle : {}) }}>
      <span style={cardKickerStyle}>{kicker}</span>
      <strong style={metricValueStyle}>{value}</strong>
      <div style={{ color: 'var(--muted)', lineHeight: 1.58 }}>{body}</div>
    </div>
  );
}

function AdminCard({ kicker, body, children }: { kicker: string; body: string; children: React.ReactNode }) {
  return (
    <div style={adminCardStyle}>
      <span style={cardKickerStyle}>{kicker}</span>
      <div style={{ color: 'var(--muted)', lineHeight: 1.58 }}>{body}</div>
      <div style={{ marginTop: 14 }}>{children}</div>
    </div>
  );
}

const setupItems = [
  {
    label: '1. Full property address and preferred URL slug',
    placeholder: 'Example: 7 Wyvern Avenue, Roseville / slug: 7-wyvern-avenue-roseville',
    hint: 'Format recommendation: full address first, then a clean lowercase slug using hyphens only.',
  },
  {
    label: '2. Campaign password',
    placeholder: 'Example: Prestige27',
    hint: 'Format recommendation: auto-generate using a real-estate term plus a number, e.g. Auction24, Harbour18, Prestige27.',
  },
  {
    label: '3. Bedrooms, bathrooms, car spaces, and land size',
    placeholder: 'Example: 3 bed, 3 bath, 2 car, 860sqm',
    hint: 'Format recommendation: keep this in a short property-spec line so comp matching can use it directly.',
  },
  {
    label: '4. Property type, standout features, and advertising copywriting',
    placeholder: 'Example: Renovated family home with north-to-rear garden, flexible living zones, and strong indoor-outdoor flow...',
    hint: 'Format recommendation: include both a short feature summary and the actual ad copy if already written.',
    multiline: true,
  },
  {
    label: '5. Display price or guide range',
    placeholder: 'Example: $2.7m-$3.0m',
    hint: 'Format recommendation: use the public-facing guide exactly as it should appear on the page.',
  },
  {
    label: '6. Date the property goes on market',
    placeholder: 'Example: 18 May 2026',
    hint: 'Format recommendation: use a readable date because this will drive days-on-market tracking.',
  },
  {
    label: '7. Campaign method',
    placeholder: 'Example: Auction',
    hint: 'Format recommendation: keep to Auction, Private Treaty, or Off-Market.',
  },
  {
    label: '8. Sales agents working on the property',
    placeholder: 'Select first agent',
    hint: 'Use the shared McGrath agent roster here. The hero should show both first and second agent together under Your Agents.',
    select: true,
    options: ['James Sutton', 'Brie Dickson', 'Cam Henderson', 'John Malek', 'Olivia Liu', 'Richard Madden', 'Will Geist'],
  },
  {
    label: '9. Campaign support person',
    placeholder: 'Select campaign support',
    hint: 'Choose the office support person who will help run the campaign. This should display separately from the sales agents.',
    select: true,
    options: ['Ashley Coates', 'Savanna-Rose McGaw', 'Sharon Richardson'],
  },
  {
    label: '10. Agent mobile numbers or campaign-specific contact notes',
    placeholder: 'Example: James Sutton | 04xx xxx xxx',
    hint: 'Profile URLs can come from the shared roster. Use this field for direct mobile numbers and any campaign-specific contact notes.',
    multiline: true,
  },
  {
    label: '11. McGrath web listing URL',
    placeholder: 'Example: Add later if not yet live',
    hint: 'Format recommendation: use the live URL if available, otherwise note add later.',
  },
  {
    label: '12. Three hero images for the page build',
    placeholder: 'Example: front exterior / garden / living room',
    hint: 'Format recommendation: nominate the three strongest images in display order.',
    multiline: true,
  },
  {
    label: '13. Suburb and comp rules for Market Competition',
    placeholder: 'Example: Roseville only, 3 bed only, +/-10% of display price, similar family-home product',
    hint: 'Format recommendation: define suburb, bedrooms, price band, and any must-match product filters.',
    multiline: true,
  },
  {
    label: '14. Starting campaign heat score and contracts-out count',
    placeholder: 'Example: Heat 6/10, Contracts out 2',
    hint: 'Format recommendation: use a heat score out of 10. Contracts out should eventually be read automatically from the weekly vendor report PDF.',
  },
  {
    label: '15. Available vendor report, REA, Domain, and McGrath Digital reports',
    placeholder: 'Example: Vendor report PDF week 1, REA report 10 May, Domain report 10 May, McGrath Digital social report 10 May',
    hint: 'Format recommendation: list files by source and date. The weekly vendor report is primarily buyer feedback and should also be used to extract contracts-out data. McGrath Digital should capture social-media marketing reporting.',
    multiline: true,
  },
  {
    label: '16. Initial projection / recommendation',
    placeholder: 'Example: Early enquiry is strong. Stay disciplined on guide and focus on building buyer depth before making any pricing move.',
    hint: 'Format recommendation: write this as professional analysis and guidance, not certainty or guarantee.',
    multiline: true,
  },
  {
    label: '17. Campaign-specific notes, sensitivities, or positioning instructions',
    placeholder: 'Example: Vendor sensitive to discount language. Emphasise quality scarcity and family appeal.',
    hint: 'Format recommendation: include anything that should shape tone, positioning, or what should be avoided.',
    multiline: true,
  },
];

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

const tabsRowStyle = {
  display: 'flex',
  gap: 8,
  overflowX: 'auto' as const,
  scrollbarWidth: 'none' as const,
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

const singleColumnGridStyle = {
  display: 'grid',
  gap: 14,
} as const;

const metricGridStyle = {
  display: 'grid',
  gap: 14,
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
} as const;

const insightGridStyle = {
  display: 'grid',
  gap: 14,
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
} as const;

const articleCardStyle = {
  borderRadius: 20,
  padding: 18,
  background: 'rgba(255,255,255,0.72)',
  border: '1px solid rgba(32,32,32,0.08)',
  boxShadow: 'var(--shadow-soft)',
} as const;

const metricCardStyle = {
  borderRadius: 20,
  padding: 18,
  background: 'rgba(255,255,255,0.72)',
  border: '1px solid rgba(32,32,32,0.08)',
  boxShadow: 'var(--shadow-soft)',
} as const;

const insightCardStyle = {
  ...metricCardStyle,
} as const;

const projectionCardStyle = {
  ...metricCardStyle,
} as const;

const feedbackCardStyle = {
  ...metricCardStyle,
} as const;

const compCardStyle = {
  ...metricCardStyle,
} as const;

const adminCardStyle = {
  ...metricCardStyle,
  marginTop: 0,
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

const articleTitleStyle = {
  fontWeight: 800,
  fontSize: '1rem',
  marginBottom: 6,
} as const;

const metricValueStyle = {
  display: 'block',
  fontFamily: 'Playfair Display, serif',
  fontSize: '1.7rem',
  lineHeight: 1,
  marginBottom: 8,
} as const;

const compCardHeadStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 16,
  marginBottom: 10,
} as const;

const chipStyle = {
  padding: '8px 12px',
  borderRadius: 999,
  fontSize: '0.8rem',
  fontWeight: 700,
  background: 'rgba(32,32,32,0.06)',
  color: 'var(--text)',
} as const;

const hotChipStyle = {
  background: 'rgba(230,114,0,0.14)',
  color: 'var(--orange-deep)',
} as const;

const warmChipStyle = {
  background: 'rgba(215,165,58,0.16)',
  color: '#8f6500',
} as const;

const toggleRowStyle = {
  display: 'grid',
  gap: 14,
  margin: '0 0 18px',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
} as const;

const togglePillStyle = {
  borderRadius: 20,
  padding: 18,
  background: 'rgba(255,255,255,0.72)',
  border: '1px solid rgba(32,32,32,0.08)',
  boxShadow: 'var(--shadow-soft)',
  cursor: 'pointer',
  fontWeight: 700,
  color: 'var(--muted)',
} as const;

const activeTogglePillStyle = {
  ...togglePillStyle,
  background: 'linear-gradient(135deg, rgba(230,114,0,0.18), rgba(230,114,0,0.08))',
  color: 'var(--orange-deep)',
  boxShadow: 'inset 0 0 0 1px rgba(230,114,0,0.14)',
} as const;

const goodCardStyle = {
  boxShadow: 'inset 0 0 0 1px rgba(31,138,87,0.14)',
} as const;

const watchoutCardStyle = {
  boxShadow: 'inset 0 0 0 1px rgba(230,114,0,0.14)',
} as const;

const chipRowStyle = {
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap' as const,
  marginTop: 12,
} as const;

const adminGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 18,
} as const;

const formGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 12,
} as const;

const adminActionsStyle = {
  display: 'flex',
  gap: 10,
  flexWrap: 'wrap' as const,
  marginTop: 14,
} as const;

const setupItemStyle = {
  padding: 16,
  borderRadius: 18,
  background: 'rgba(32,32,32,0.04)',
  border: '1px solid rgba(32,32,32,0.06)',
} as const;

const setupLabelStyle = {
  display: 'block',
  fontWeight: 800,
  marginBottom: 8,
  color: 'var(--text)',
} as const;

const setupHintStyle = {
  marginTop: 8,
  color: 'var(--muted)',
  fontSize: '0.88rem',
  lineHeight: 1.5,
} as const

const mutedListStyle = {
  marginTop: 12,
  color: 'var(--muted)',
  lineHeight: 1.7,
} as const