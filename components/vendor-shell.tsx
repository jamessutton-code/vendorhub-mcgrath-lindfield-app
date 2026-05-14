'use client';

import { useState } from 'react';
import type { Campaign } from '@/lib/types';

type VendorTab = 'updates' | 'auction' | 'competition' | 'feedback' | 'projections' | 'admin';

type SetupItem = {
  label: string;
  placeholder: string;
  hint: string;
  multiline?: boolean;
  select?: boolean;
  options?: string[];
  dualSelect?: boolean;
  secondaryPlaceholder?: string;
};

const tabs: Array<{ id: VendorTab; label: string }> = [
  { id: 'updates', label: 'Latest Updates' },
  { id: 'auction', label: 'Auction Updates' },
  { id: 'competition', label: 'Market Competition' },
  { id: 'feedback', label: 'Buyer Feedback' },
  { id: 'projections', label: 'Projections' },
  { id: 'admin', label: 'Admin Update' },
];

const agentOptions = ['James Sutton', 'Brie Dickson', 'Cam Henderson', 'John Malek', 'Olivia Liu', 'Richard Madden', 'Will Geist'];
const supportOptions = ['Ashley Coates', 'Savanna-Rose McGaw', 'Sharon Richardson'];
const officeProfileUrl = 'https://www.mcgrath.com.au/offices/lindfield-a0v5g000003JhTaAAK';

const mcgrathLinks = [
  { label: 'Office', href: officeProfileUrl, text: 'McGrath Lindfield' },
  { label: 'James Sutton', href: 'https://www.mcgrath.com.au/agents/james-sutton-a1V5g0000007PDMEA2', text: 'Profile' },
  { label: 'Brie Dickson', href: 'https://www.mcgrath.com.au/agents/brie-dickson-a1VRE000000y4dR2AQ', text: 'Profile' },
  { label: 'Cam Henderson', href: 'https://www.mcgrath.com.au/agents/cam-henderson-a1V5g0000007my6EAA', text: 'Profile' },
  { label: 'John Malek', href: 'https://www.mcgrath.com.au/agents/john-malek-a1VRE000001K4bZ2AS', text: 'Profile' },
  { label: 'Olivia Liu', href: 'https://www.mcgrath.com.au/agents/olivia-liu-a1VRE000000jeXZ2AY', text: 'Profile' },
  { label: 'Richard Madden', href: 'https://www.mcgrath.com.au/agents/richard-madden-a1V5g0000007PPQEA2', text: 'Profile' },
  { label: 'Will Geist', href: 'https://www.mcgrath.com.au/agents/will-geist-a1V5g0000007PV8EAM', text: 'Profile' },
  { label: 'Ashley Coates', href: 'https://www.mcgrath.com.au/agents/ashley-coates-a1VRE000000yntt2AA', text: 'Profile' },
  { label: 'Savanna-Rose McGaw', href: 'https://www.mcgrath.com.au/agents/savanna-rose-mcgaw-a1VRE000001YvrJ2AS', text: 'Profile' },
  { label: 'Sharon Richardson', href: 'https://www.mcgrath.com.au/agents/sharon-richardson-a1V5g000005oEPdEAM', text: 'Profile' },
];

const setupItems: SetupItem[] = [
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
    placeholder: 'Example: Renovated family home with north-to-rear garden, flexible living zones, and strong indoor-outdoor flow...\n\nPaste campaign copy here.',
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
    secondaryPlaceholder: 'Select second agent',
    hint: 'Use the shared McGrath agent roster here. The hero should show both first and second agent together under Your Agents.',
    select: true,
    dualSelect: true,
    options: agentOptions,
  },
  {
    label: '9. Campaign support person',
    placeholder: 'Select campaign support',
    hint: 'Choose the office support person who will help run the campaign. This should display separately from the sales agents.',
    select: true,
    options: supportOptions,
  },
  {
    label: '10. Agent mobile numbers or campaign-specific contact notes',
    placeholder: 'Example: James Sutton | 04xx xxx xxx\nBrie Dickson | 04xx xxx xxx',
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

export function VendorShell({ campaign }: { campaign: Campaign }) {
  const [activeTab, setActiveTab] = useState<VendorTab>('updates');
  const listingUrl = campaign.mcgrathListingUrl || '#';
  const primaryAgents = campaign.primaryAgents?.length ? campaign.primaryAgents : [];
  const supportAgent = campaign.supportAgent;
  const heroImages = campaign.heroImages?.length ? campaign.heroImages : [{ kind: 'hero1', url: campaign.heroImage, altText: campaign.address }];
  const content = campaign.content || {};

  return (
    <>
      <style jsx>{`
        .site-shell {
          width: min(1280px, calc(100% - 32px));
          margin: 0 auto;
          padding: 22px 0 48px;
        }

        .nav-wrap,
        .tabs-wrap,
        .glass-card,
        .metric-card,
        .panel,
        .insight-card,
        .feedback-card,
        .projection-card,
        .admin-card,
        .empty-card,
        .article-card,
        .comp-card {
          background: var(--card);
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .nav-wrap {
          border-radius: 999px;
          padding: 14px 20px;
          margin-bottom: 18px;
        }

        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          letter-spacing: 0.24em;
          font-weight: 800;
          font-size: 0.9rem;
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
          font-size: 0.82rem;
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
          border-radius: var(--radius-xl);
          background-image:
            linear-gradient(120deg, rgba(19,17,15,0.86) 0%, rgba(25,21,18,0.70) 38%, rgba(28,22,18,0.48) 62%, rgba(31,24,19,0.64) 100%),
            url('${campaign.heroImage}');
          background-size: cover;
          background-position: center center;
          color: white;
          padding: 34px;
          margin-bottom: 18px;
          box-shadow: 0 28px 58px rgba(25,21,18,0.16);
        }

        .hero::after {
          content: '';
          position: absolute;
          right: -90px;
          bottom: -120px;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(230,114,0,0.42) 0%, rgba(230,114,0,0) 70%);
        }

        .hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.45fr 1fr;
          gap: 22px;
          align-items: end;
        }

        .hero-kicker {
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.66);
          margin-bottom: 10px;
          font-weight: 800;
        }

        .hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 5vw, 4.6rem);
          line-height: 0.95;
          margin: 0 0 12px;
        }

        .hero-copy {
          margin: 0;
          max-width: 760px;
          color: rgba(255,255,255,0.78);
          font-size: 1rem;
          line-height: 1.55;
        }

        .hero-agent-band {
          margin-top: 18px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px 18px;
          align-items: center;
          color: rgba(255,255,255,0.82);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .hero-agent-band strong {
          color: white;
          font-weight: 800;
        }

        .hero-agent-band a,
        .mcgrath-link {
          color: var(--orange-deep);
          font-weight: 700;
          text-decoration: none;
        }

        .hero-agent-band a:hover,
        .mcgrath-link:hover {
          text-decoration: underline;
        }

        .hero-meta-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .hero-meta-card {
          border-radius: 18px;
          padding: 16px;
          background: rgba(255,255,255,0.09);
          border: 1px solid rgba(255,255,255,0.10);
        }

        .hero-meta-card strong {
          display: block;
          font-size: 1.28rem;
          margin-bottom: 6px;
        }

        .hero-meta-card span {
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.62);
        }

        .hero-meta-card.heat-warm {
          background: linear-gradient(145deg, rgba(255,248,230,0.94) 0%, rgba(255,239,198,0.88) 52%, rgba(255,229,160,0.82) 100%);
          border-color: rgba(232,179,72,0.24);
        }

        .hero-meta-card.heat-warm strong,
        .hero-meta-card.heat-warm span {
          color: #4d3517;
        }

        .tabs-wrap {
          border-radius: 999px;
          padding: 10px;
          position: sticky;
          top: 14px;
          z-index: 20;
          margin-bottom: 22px;
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
          background: linear-gradient(135deg, rgba(230,114,0,0.18), rgba(230,114,0,0.08));
          color: var(--orange-deep);
          box-shadow: inset 0 0 0 1px rgba(230,114,0,0.14);
        }

        .view {
          display: none;
        }

        .view.active {
          display: block;
        }

        .section-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 18px;
        }

        .vendor-signature-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 18px;
          margin-bottom: 18px;
        }

        .vendor-feature {
          border-radius: var(--radius-lg);
          padding: 22px;
          min-height: 230px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(145deg, rgba(255,255,255,0.68), rgba(255,255,255,0.44));
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .vendor-feature::after {
          content: '';
          position: absolute;
          right: -30px;
          bottom: -45px;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(230,114,0,0.14) 0%, rgba(230,114,0,0) 72%);
        }

        .vendor-feature > * {
          position: relative;
          z-index: 1;
        }

        .vendor-feature h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          margin: 0 0 10px;
        }

        .hero-shot-stack {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          margin-top: 16px;
        }

        .hero-shot {
          border-radius: 16px;
          min-height: 122px;
          background: linear-gradient(145deg, rgba(32,32,32,0.08), rgba(32,32,32,0.03));
          border: 1px solid rgba(32,32,32,0.08);
          overflow: hidden;
          position: relative;
        }

        .hero-shot img {
          width: 100%;
          height: 100%;
          min-height: 122px;
          object-fit: cover;
          display: block;
        }

        .panel {
          border-radius: var(--radius-lg);
          padding: 22px;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.55rem;
          margin: 0 0 8px;
        }

        .section-copy {
          margin: 0 0 18px;
          color: var(--muted);
          line-height: 1.6;
        }

        .metric-grid,
        .insight-grid,
        .feedback-grid,
        .projection-grid,
        .article-grid,
        .comp-grid,
        .setup-form {
          display: grid;
          gap: 14px;
        }

        .feedback-toggle-row {
          display: grid;
          gap: 14px;
          margin: 0 0 18px;
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .toggle-pill {
          border-radius: 20px;
          padding: 18px;
          background: var(--card-strong);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-soft);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          cursor: pointer;
          font-weight: 700;
          color: var(--muted);
          transition: 0.2s ease;
        }

        .toggle-pill.active {
          background: linear-gradient(135deg, rgba(230,114,0,0.18), rgba(230,114,0,0.08));
          color: var(--orange-deep);
          box-shadow: inset 0 0 0 1px rgba(230,114,0,0.14);
        }

        .admin-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .setup-item {
          padding: 16px;
          border-radius: 18px;
          background: rgba(32,32,32,0.04);
          border: 1px solid rgba(32,32,32,0.06);
        }

        .setup-item label {
          display: block;
          font-weight: 800;
          margin-bottom: 8px;
          color: var(--text);
        }

        .setup-hint {
          margin-top: 8px;
          color: var(--muted);
          font-size: 0.88rem;
          line-height: 1.5;
        }

        .metric-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .insight-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .feedback-grid,
        .projection-grid,
        .article-grid,
        .comp-grid { grid-template-columns: 1fr; }

        .metric-card,
        .insight-card,
        .feedback-card,
        .projection-card,
        .article-card,
        .comp-card,
        .admin-card,
        .empty-card {
          border-radius: 20px;
          padding: 18px;
        }

        .metric-label,
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

        .metric-value,
        .insight-card strong,
        .projection-card strong,
        .comp-price {
          display: block;
          font-family: 'Playfair Display', serif;
          font-size: 1.7rem;
          line-height: 1;
          margin-bottom: 8px;
        }

        .muted {
          color: var(--muted);
          line-height: 1.55;
        }

        .gold-card {
          position: relative;
          overflow: hidden;
          background: linear-gradient(145deg, rgba(255,248,230,0.94) 0%, rgba(255,239,198,0.88) 52%, rgba(255,229,160,0.82) 100%);
          border: 1px solid rgba(232,179,72,0.24);
          box-shadow: 0 18px 36px rgba(196,146,39,0.12), inset 0 1px 0 rgba(255,255,255,0.66);
        }

        .gold-card::after {
          content: '';
          position: absolute;
          top: -38px;
          right: -32px;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0) 72%);
        }

        .gold-card > * {
          position: relative;
          z-index: 1;
        }

        .feedback-card.good {
          box-shadow: inset 0 0 0 1px rgba(31,138,87,0.14), var(--shadow-soft);
        }

        .feedback-card.watchout {
          box-shadow: inset 0 0 0 1px rgba(230,114,0,0.14), var(--shadow-soft);
        }

        .feedback-chip-row,
        .chip-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 12px;
        }

        .chip {
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 700;
          background: rgba(32,32,32,0.06);
          color: var(--text);
        }

        .chip.hot {
          background: rgba(230,114,0,0.14);
          color: var(--orange-deep);
        }

        .chip.warm {
          background: rgba(215,165,58,0.16);
          color: #8f6500;
        }

        .comp-card-head {
          display: flex;
          align-items: start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 10px;
        }

        .comp-title,
        .article-title {
          font-weight: 800;
          font-size: 1rem;
          margin-bottom: 6px;
        }

        .admin-actions,
        .form-grid {
          margin-top: 14px;
        }

        .admin-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btn {
          border: none;
          border-radius: 999px;
          padding: 12px 16px;
          cursor: pointer;
          font-family: inherit;
          font-weight: 700;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--orange), var(--orange-deep));
          color: white;
        }

        .btn-secondary {
          background: rgba(32,32,32,0.06);
          color: var(--text);
        }

        .admin-card {
          margin-top: 18px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .muted-list {
          margin-top: 12px;
        }

        .view-anchor {
          scroll-margin-top: 104px;
        }

        @media (max-width: 1040px) {
          .hero-grid,
          .section-grid,
          .metric-grid,
          .insight-grid,
          .form-grid,
          .vendor-signature-grid,
          .admin-grid,
          .feedback-toggle-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 780px) {
          .site-shell {
            width: min(100%, calc(100% - 18px));
            padding-top: 12px;
          }

          .hero,
          .panel,
          .metric-card,
          .insight-card,
          .feedback-card,
          .projection-card,
          .article-card,
          .comp-card,
          .admin-card,
          .empty-card {
            padding: 18px 16px;
          }

          .nav {
            flex-direction: column;
            align-items: start;
          }

          .tabs-wrap {
            top: 8px;
          }

          .hero h1 {
            font-size: 2.35rem;
          }
        }
      `}</style>

      <div className="site-shell">
        <div className="nav-wrap">
          <div className="nav">
            <div className="nav-logo">
              <img className="nav-logo-mark" src="/mcgrath-logo.png" alt="McGrath logo" />
            </div>
            <div className="nav-mid">
              <span>Vendor Hub</span>
              <span className="nav-badge">Master Template</span>
            </div>
            <div className="nav-mid">Private campaign view</div>
          </div>
        </div>

        <section className="hero">
          <div className="hero-grid">
            <div>
              <div className="hero-kicker">Campaign Intelligence Dashboard</div>
              <h1>{campaign.address},<br />{campaign.suburb}</h1>
              <p className="hero-copy">
                {campaign.advertisingCopy || 'A premium vendor-facing campaign hub built to give a clear view of market movement, buyer sentiment, local competition, and strategic price positioning, all in one place.'}
              </p>
              <div className="hero-agent-band">
                <span>
                  <strong>Your Agents:</strong> {renderAgentBand(primaryAgents)}
                </span>
                <span>
                  <strong>Campaign Support:</strong> {supportAgent?.name || 'Support Person'} {supportAgent?.profileUrl ? <a href={supportAgent.profileUrl}>View profile</a> : null} · <a href={supportAgent?.mobile ? `tel:${supportAgent.mobile}` : officeProfileUrl}>Call office</a>
                </span>
                <span><strong>Live Web Link:</strong> <a className="mcgrath-link" href={listingUrl}>Open campaign web page</a></span>
              </div>
            </div>
            <div className="hero-meta-grid">
              <HeroMetaCard value={campaign.daysOnMarket} label="Days on market" />
              <HeroMetaCard value={campaign.contractsOut} label="Contracts out" />
              <HeroMetaCard value={campaign.displayPrice} label="Display price" />
              <HeroMetaCard value={campaign.campaignHeat} label="Campaign heat" warm />
            </div>
          </div>
        </section>

        <div className="vendor-signature-grid">
          <div className="vendor-feature">
            <span className="card-kicker">Property Snapshot</span>
            <h3>{campaign.propertyType || 'Property'} in {campaign.suburb}</h3>
            <div className="muted">
              {[campaign.bedrooms ? `${campaign.bedrooms} bed` : '', campaign.bathrooms ? `${campaign.bathrooms} bath` : '', campaign.carSpaces ? `${campaign.carSpaces} car` : '', campaign.landSize || ''].filter(Boolean).join(' · ') || 'Property details will appear here as campaign setup is completed.'}
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
            <span className="card-kicker">Strategy Setup</span>
            <h3>{campaign.campaignMethod || 'Campaign method'} campaign</h3>
            <div className="muted">
              {campaign.recommendedStrategyBody || campaign.marketConditions || campaign.notesInternal || 'Strategic positioning, notes, and market feel entered in admin will surface here as the campaign setup becomes more complete.'}
            </div>
          </div>
        </div>

        <div className="tabs-wrap">
          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                data-tab={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <section id="view-updates" className={`view view-anchor ${activeTab === 'updates' ? 'active' : ''}`}>
          <div className="section-grid">
            <div className="panel">
              <h2 className="section-title">Latest Updates</h2>
              <p className="section-copy">
                This tab is intended to be the same across every vendor hub link. It will become an AI-generated market brief
                built from the active news articles and sources entered in the protected admin section, then refreshed every 24 hours.
              </p>

              <div className="article-grid">
                <ArticleCard kicker="Update Method">
                  This tab stays tighter and cleaner by keeping the daily AI market brief here, while detailed auction-rate analysis can live in a cleaner dedicated view within the updates workflow.
                </ArticleCard>
                <ArticleCard kicker="AI Market Brief" title="Clear read on the current market">
                  {content.latestUpdatesSummary || 'Placeholder for the daily AI-generated summary of buyer confidence, stock levels, competition intensity, and likely short-term direction in the Upper North Shore market.'}
                </ArticleCard>
                <ArticleCard kicker="What This Means For Your Campaign" title="Market interpretation for this vendor audience" gold>
                  {content.latestUpdatesImplication || 'Placeholder for the AI-generated vendor-facing interpretation of the broader market: whether conditions favour urgency, patience, sharper pricing discipline, or a stronger focus on buyer depth and negotiation pressure.'}
                </ArticleCard>
                <ArticleCard kicker="Refresh Logic">
                  Market updates shown here will be prepared behind the scenes in the protected admin area,
                  where article URLs are added and assessed. The website should then refresh this briefing every 24 hours,
                  rewording and re-framing the commentary while staying anchored to the active source material.
                </ArticleCard>
              </div>
            </div>

            <div className="panel">
              <h2 className="section-title">Market Snapshot</h2>
              <p className="section-copy">A cleaner summary of the daily AI market brief without the auction detail cluttering the page.</p>
              <div className="metric-grid">
                <MetricCard label="Stock Tone" value={content.stockTone || 'TBC'}>AI summary of whether local supply feels tight, balanced, or building.</MetricCard>
                <MetricCard label="Buyer Mood" value={content.buyerMood || 'TBC'}>AI read on the confidence level of active buyers in the market.</MetricCard>
                <MetricCard label="Outlook" value={content.outlook || campaign.projectionHeadline || 'TBC'} gold>Forward-looking view refreshed daily from the current active article set.</MetricCard>
              </div>
            </div>
          </div>
        </section>

        <section id="view-auction" className={`view view-anchor ${activeTab === 'auction' ? 'active' : ''}`}>
          <div className="section-grid">
            <div className="panel">
              <h2 className="section-title">Auction Updates</h2>
              <p className="section-copy">
                This tab will house the SQM Research read, including Sydney clearance rates, local clearance rates,
                and AI commentary on what auction conditions mean for the current market.
              </p>
              <div className="article-grid">
                <ArticleCard kicker="Auction Clearance Read" title="Sydney + local market pulse" gold>
                  {content.auctionHeadline || 'Placeholder for AI commentary combining Sydney clearance rates with local reads from SQM Research across the relevant campaign suburbs.'}
                </ArticleCard>
                <ArticleCard kicker="Update Logic">
                  {content.auctionCommentary || 'Auction data should refresh automatically each day at around 5:00 AM AEST on the same cadence as the latest news brief, so the vendor portal stays current even when commentary is being reworded from the same source set.'}
                </ArticleCard>
              </div>
            </div>

            <div className="panel">
              <h2 className="section-title">Auction Pulse</h2>
              <p className="section-copy">A clear, vendor-friendly read of the weekly clearance environment.</p>
              <div className="metric-grid">
                <MetricCard label="Sydney Clearance" value={content.sydneyClearance || 'TBC'}>Weekly Sydney clearance context sourced from SQM.</MetricCard>
                <MetricCard label="Local Clearance" value={content.localClearance || 'TBC'}>Combined read across the relevant local suburbs for this campaign.</MetricCard>
                <MetricCard label="Auction Commentary" value={content.auctionPulse || 'TBC'} gold>Short AI interpretation of what those clearance rates mean for current conditions.</MetricCard>
              </div>
            </div>
          </div>
        </section>

        <section id="view-competition" className={`view view-anchor ${activeTab === 'competition' ? 'active' : ''}`}>
          <div className="section-grid">
            <div className="panel">
              <h2 className="section-title">Market Competition</h2>
              <p className="section-copy">
                This section will show only the most relevant competing and comparable listings, both on market and sold,
                translated into a clean client-facing story rather than a messy spreadsheet. Comp data should also refresh automatically each day at around 5:00 AM AEST.
              </p>

              <div className="comp-grid">
                <CompCard kicker="Comparable Group" title="Primary competition set" chip="On Market">
                  {content.competitionOnMarket || 'Placeholder for the most directly relevant active competitors in the subject suburb and nearby premium pockets.'}
                </CompCard>
                <CompCard kicker="Sold Evidence" title="Recent result set" chip="Sold" chipClass="warm">
                  {content.competitionSold || 'Placeholder for selected sold comparables that help anchor buyer perception, pricing confidence, and likely campaign positioning.'}
                </CompCard>
              </div>
            </div>

            <div className="panel">
              <h2 className="section-title">Competition Read</h2>
              <p className="section-copy">A simpler, more vendor-friendly interpretation of the local battleground.</p>
              <div className="insight-grid">
                <InsightCard label="Most Relevant Stock" value={campaign.compPrimarySuburb || 'TBC'}>Will identify which listings genuinely matter to this campaign.</InsightCard>
                <InsightCard label="Price Pressure" value={content.pricePressure || 'TBC'}>Will summarise where buyers may compare harder on value.</InsightCard>
                <InsightCard label="Strategic Edge" value={content.strategicEdge || campaign.compPrimarySuburb || 'TBC'} gold>{campaign.compNotes || 'Will highlight where this property can stand apart from direct rivals.'}</InsightCard>
                <InsightCard label="Sold Benchmark" value={content.soldBenchmark || 'TBC'}>Will show which recent result best informs likely buyer expectations.</InsightCard>
              </div>
            </div>
          </div>
        </section>

        <section id="view-feedback" className={`view view-anchor ${activeTab === 'feedback' ? 'active' : ''}`}>
          <div className="section-grid">
            <div className="panel">
              <h2 className="section-title">Buyer Feedback</h2>
              <p className="section-copy">
                This section will analyse buyer feedback PDFs and campaign reporting, separating the positive signals,
                friction points, and the buyers showing the strongest intent.
              </p>

              <div className="feedback-toggle-row">
                <button className="toggle-pill active" type="button">Warm Buyers</button>
                <button className="toggle-pill" type="button">Hot Buyers</button>
                <button className="toggle-pill" type="button">Contract Holders</button>
                <button className="toggle-pill" type="button">Price Feedback</button>
              </div>

              <div className="feedback-grid">
                <FeedbackCard kicker="What’s landing well" variant="good">
                  {content.positiveFeedback || 'Placeholder for the strongest recurring positives buyers are responding to, presentation, location, floorplan, emotional appeal, renovation quality, or value relative to alternatives.'}
                </FeedbackCard>
                <FeedbackCard kicker="What needs managing" variant="watchout">
                  {content.watchouts || 'Placeholder for objections or recurring hesitation points that need to be handled through positioning, pricing discipline, or campaign communication.'}
                </FeedbackCard>
                <FeedbackCard kicker="Warm + hot buyers" gold chips={[{ label: `Contract holders: ${content.contractHolders || 'TBC'}`, className: 'hot' }, { label: `Price feedback: ${content.priceFeedback || 'TBC'}`, className: 'warm' }]}>
                  {content.warmHotBuyers || 'This area will pull forward the buyers showing the strongest level of intent and make them impossible to miss.'}
                </FeedbackCard>
              </div>
            </div>

            <div className="panel">
              <h2 className="section-title">Campaign Momentum</h2>
              <p className="section-copy">
                This will become the vendor-facing campaign momentum board powered by realestate.com.au and Domain reporting.
              </p>
              <div className="insight-grid">
                <InsightCard label="Views" value={content.campaignViews || 'TBC'}>Audience attention over the campaign.</InsightCard>
                <InsightCard label="Enquiries" value={content.campaignEnquiries || 'TBC'}>Serious buyer action and response levels.</InsightCard>
                <InsightCard label="Saves / Favourites" value={content.campaignSaves || 'TBC'}>Early signal of buyer attachment.</InsightCard>
                <InsightCard label="Campaign Heat" value={content.campaignHeatDetail || campaign.campaignHeat || 'TBC'} gold>A more dynamic, Momentum Lab-style read of campaign traction.</InsightCard>
              </div>
            </div>
          </div>
        </section>

        <section id="view-projections" className={`view view-anchor ${activeTab === 'projections' ? 'active' : ''}`}>
          <div className="section-grid">
            <div className="panel">
              <h2 className="section-title">Projections</h2>
              <p className="section-copy">
                This section should present a forward-looking agency analysis based on current indicators, not fixed promises.
                It should combine article sentiment, auction data, comparable-market movement, buyer feedback, and on-the-ground market feel.
              </p>

              <div className="projection-grid">
                <ProjectionCard kicker="Near-Term Market Outlook" value={content.marketOutlook || 'TBC'}>Forward-looking view over the next 2-4 weeks based on the current data and article set.</ProjectionCard>
                <ProjectionCard kicker="Buyer Behaviour Outlook" value={content.buyerBehaviourOutlook || 'TBC'}>Likely buyer behaviour if current conditions hold: urgency, hesitation, negotiation pressure, or selectivity.</ProjectionCard>
                <ProjectionCard kicker="Pricing Pressure Watch" value={content.pricingPressureWatch || 'TBC'}>A read on whether the market is supporting the current guide, resisting it, or creating premium opportunity.</ProjectionCard>
                <ProjectionCard kicker="Scenario Planning" value={content.scenarioPlanning || 'TBC'} gold>Conditional pathways such as if momentum strengthens, stays steady, or softens from here.</ProjectionCard>
              </div>
            </div>

            <div className="panel">
              <h2 className="section-title">Risks, Opportunities, Strategy</h2>
              <p className="section-copy">This keeps the guidance balanced and clearly framed as professional interpretation of current conditions.</p>
              <div className="projection-grid">
                <ProjectionCard kicker="Risk Factors We’re Watching" value={content.riskFactors || 'TBC'}>Potential drags such as weaker clearance rates, rising stock, softer urgency, or stronger competing listings.</ProjectionCard>
                <ProjectionCard kicker="Opportunity Factors" value={content.opportunityFactors || 'TBC'}>Positive forces such as thin quality stock, strong presentation, healthy enquiry, or standout local positioning.</ProjectionCard>
                <ProjectionCard kicker="Recommended Agency Response" value={campaign.recommendedStrategyLabel || content.buyerBehaviourOutlook || 'TBC'} gold>{content.recommendedResponse || campaign.recommendedStrategyBody || 'The advised selling strategy based on the current balance of evidence, with language framed as analysis rather than certainty.'}</ProjectionCard>
              </div>
            </div>
          </div>
        </section>

        <section id="view-admin" className={`view view-anchor ${activeTab === 'admin' ? 'active' : ''}`}>
          <div className="panel">
            <h2 className="section-title">Admin Update</h2>
            <p className="section-copy">This tab is intended to be password protected for agency-only updates, file uploads, and strategic recommendation control.</p>

            <div className="admin-grid">
              <AdminCard kicker="Campaign status controls">
                <div className="muted">Controls and reference fields for the status strip near the top of the vendor hub. Some fields may become AI-derived rather than manually maintained.</div>
                <div className="form-grid">
                  <input type="text" placeholder="Days on market" />
                  <input type="text" placeholder="Contracts out (AI-derived from weekly vendor report PDF)" />
                  <input type="text" placeholder="Display price" />
                  <select defaultValue="">
                    <option value="" disabled>Campaign heat score</option>
                    {[1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n}>{n}</option>)}
                  </select>
                </div>
              </AdminCard>

              <AdminCard kicker="Projection controls">
                <div className="muted">Manual strategy and recommendation updates for the vendor-facing projections tab.</div>
                <div className="form-grid">
                  <input type="text" placeholder="Projection headline" />
                  <input type="text" placeholder="Recommended strategy label" />
                </div>
                <div style={{ marginTop: 12 }}>
                  <textarea placeholder="Write strategic agency recommendation here..." />
                </div>
              </AdminCard>

              <AdminCard kicker="McGrath web link">
                <div className="muted">Use this campaign-level field to add or update the live McGrath listing URL after the vendor hub has already been built. This should exist in every vendor hub because the web link may not be available at launch.</div>
                <div className="form-grid">
                  <input type="text" placeholder="Paste live McGrath web listing URL" />
                  <input type="text" placeholder="Optional label or status, e.g. add later / live" />
                </div>
                <div className="admin-actions">
                  <button className="btn btn-primary" type="button">Save McGrath link</button>
                </div>
              </AdminCard>

              <AdminCard kicker="Document uploads">
                <div className="muted">This area is intended to support PDF uploads for the weekly vendor report, which is primarily buyer feedback but also contains other campaign signals such as contracts out, plus REA reports, Domain reports, McGrath Digital marketing material, and any other campaign files you want analysed.</div>
                <div className="admin-actions">
                  <button className="btn btn-primary" type="button">Upload weekly vendor report PDF</button>
                  <button className="btn btn-secondary" type="button">Upload REA / Domain PDF</button>
                  <button className="btn btn-secondary" type="button">Upload McGrath Digital PDF</button>
                </div>
              </AdminCard>

              <AdminCard kicker="Latest updates article intake">
                <div className="muted">Add external article URLs here so the system can assess what matters, build a shared vendor-facing market brief, and refresh the wording automatically every day at around 5:00 AM AEST without changing the underlying facts unless the source set changes.</div>
                <div className="form-grid">
                  <input type="text" placeholder="Paste article URL" />
                  <input type="text" placeholder="Headline or source note" />
                </div>
                <div style={{ marginTop: 12 }}>
                  <textarea placeholder="Optional notes on why this article matters..." />
                </div>
                <div className="admin-actions">
                  <button className="btn btn-primary" type="button">Add article</button>
                  <button className="btn btn-secondary" type="button">Auto-refresh daily ~5:00 AM AEST</button>
                </div>
              </AdminCard>

              <AdminCard kicker="Market Conditions Read">
                <div className="muted">James can describe how the market feels on the ground here. That qualitative read should influence tone across latest updates, auction commentary, projections, and comp commentary during the daily automatic refresh at around 5:00 AM AEST.</div>
                <div style={{ marginTop: 12 }}>
                  <textarea placeholder="Write the current on-the-ground market feel here..." />
                </div>
                <div className="admin-actions">
                  <button className="btn btn-primary" type="button">Save market conditions</button>
                  <button className="btn btn-secondary" type="button">Apply tone across portal</button>
                </div>
              </AdminCard>

              <AdminCard kicker="New campaign setup checklist">
                <div className="muted">Use this guided intake form when building a fresh vendor hub from the master template.</div>
                <div className="setup-form">
                  {setupItems.map((item) => (
                    <div key={item.label} className="setup-item">
                      <label>{item.label}</label>
                      {renderSetupField(item)}
                      <div className="setup-hint">{item.hint}</div>
                    </div>
                  ))}
                </div>
              </AdminCard>

              <AdminCard kicker="Shared McGrath links">
                <div className="muted">These are the reusable office and agent profile links available across all vendor hub builds.</div>
                <div className="muted muted-list">
                  {mcgrathLinks.map((link) => (
                    <div key={link.label}>
                      {link.label}: <a className="mcgrath-link" href={link.href}>{link.text}</a>
                    </div>
                  ))}
                </div>
              </AdminCard>

              <div className="admin-card gold-card">
                <span className="card-kicker">Admin lock</span>
                <div className="muted">Final version will be campaign-specific and password-protected so vendors only see the polished client-facing output while the agency controls inputs and recommendations.</div>
                <div className="admin-actions">
                  <button className="btn btn-primary" type="button">Save update</button>
                  <button className="btn btn-secondary" type="button">Lock admin</button>
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

function HeroMetaCard({ value, label, warm = false }: { value: string; label: string; warm?: boolean }) {
  return (
    <div className={`hero-meta-card ${warm ? 'heat-warm' : ''}`}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function ArticleCard({ kicker, title, gold = false, children }: { kicker: string; title?: string; gold?: boolean; children: React.ReactNode }) {
  return (
    <div className={`article-card ${gold ? 'gold-card' : ''}`}>
      <span className="card-kicker">{kicker}</span>
      {title ? <div className="article-title">{title}</div> : null}
      <div className="muted">{children}</div>
    </div>
  );
}

function MetricCard({ label, value, gold = false, children }: { label: string; value: string; gold?: boolean; children: React.ReactNode }) {
  return (
    <div className={`metric-card ${gold ? 'gold-card' : ''}`}>
      <span className="metric-label">{label}</span>
      <span className="metric-value">{value}</span>
      <div className="muted">{children}</div>
    </div>
  );
}

function InsightCard({ label, value, gold = false, children }: { label: string; value: string; gold?: boolean; children: React.ReactNode }) {
  return (
    <div className={`insight-card ${gold ? 'gold-card' : ''}`}>
      <span className="tiny-label">{label}</span>
      <strong>{value}</strong>
      <div className="muted">{children}</div>
    </div>
  );
}

function CompCard({ kicker, title, chip, chipClass, children }: { kicker: string; title: string; chip: string; chipClass?: string; children: React.ReactNode }) {
  return (
    <div className="comp-card">
      <div className="comp-card-head">
        <div>
          <span className="card-kicker">{kicker}</span>
          <div className="comp-title">{title}</div>
        </div>
        <div className={`chip ${chipClass || ''}`.trim()}>{chip}</div>
      </div>
      <div className="muted">{children}</div>
    </div>
  );
}

function FeedbackCard({ kicker, variant, gold = false, chips, children }: { kicker: string; variant?: 'good' | 'watchout'; gold?: boolean; chips?: Array<{ label: string; className?: string }>; children: React.ReactNode }) {
  return (
    <div className={`feedback-card ${variant || ''} ${gold ? 'gold-card' : ''}`.trim()}>
      <span className="card-kicker">{kicker}</span>
      <div className="muted">{children}</div>
      {chips?.length ? (
        <div className="feedback-chip-row">
          {chips.map((chip) => (
            <div key={chip.label} className={`chip ${chip.className || ''}`.trim()}>{chip.label}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ProjectionCard({ kicker, value, gold = false, children }: { kicker: string; value: string; gold?: boolean; children: React.ReactNode }) {
  return (
    <div className={`projection-card ${gold ? 'gold-card' : ''}`}>
      <span className="card-kicker">{kicker}</span>
      <strong>{value}</strong>
      <div className="muted">{children}</div>
    </div>
  );
}

function AdminCard({ kicker, children }: { kicker: string; children: React.ReactNode }) {
  return (
    <div className="admin-card">
      <span className="card-kicker">{kicker}</span>
      {children}
    </div>
  );
}

function renderSetupField(item: SetupItem) {
  if (item.dualSelect && item.options) {
    return (
      <div className="form-grid">
        <select defaultValue="">
          <option value="" disabled>{item.placeholder}</option>
          {item.options.map((option) => <option key={`primary-${option}`}>{option}</option>)}
        </select>
        <select defaultValue="">
          <option value="" disabled>{item.secondaryPlaceholder}</option>
          {item.options.map((option) => <option key={`secondary-${option}`}>{option}</option>)}
        </select>
      </div>
    );
  }

  if (item.select && item.options) {
    return (
      <select defaultValue="">
        <option value="" disabled>{item.placeholder}</option>
        {item.options.map((option) => <option key={option}>{option}</option>)}
      </select>
    );
  }

  if (item.multiline) {
    return <textarea placeholder={item.placeholder} />;
  }

  return <input type="text" placeholder={item.placeholder} />;
}
