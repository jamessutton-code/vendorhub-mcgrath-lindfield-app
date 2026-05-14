import { saveVendorOutputsAction } from '@/app/admin/campaigns/[slug]/content-actions';
import type { VendorSectionControl } from '@/lib/types';
import type { VendorOutputContent } from '@/lib/vendor-content';

export function GeneratedOutputsPanel({ slug, content }: { slug: string; content: VendorOutputContent }) {
  const controls = indexControls(content.sectionControls || []);

  return (
    <section style={cardStyle}>
      <div style={kickerStyle}>Editorial Output Layer</div>
      <h2 style={headingStyle}>Draft, refine, and approve client-facing sections</h2>
      <p style={copyStyle}>
        This is where raw campaign evidence becomes polished vendor communication. Each section now carries an explicit draft or approved state so your team can control what is client-ready.
      </p>

      <form action={saveVendorOutputsAction} style={{ display: 'grid', gap: 18 }}>
        <input type="hidden" name="slug" value={slug} />

        <OutputSection title="Latest Updates" control={controls.updates} sectionKey="updates">
          <textarea name="latestUpdatesSummary" defaultValue={content.latestUpdatesSummary} style={textareaStyle} placeholder="Latest market brief" />
          <textarea name="latestUpdatesImplication" defaultValue={content.latestUpdatesImplication} style={textareaStyle} placeholder="What this means for your campaign" />
          <div style={gridStyle}>
            <input name="stockTone" defaultValue={content.stockTone} style={inputStyle} placeholder="Stock tone" />
            <input name="buyerMood" defaultValue={content.buyerMood} style={inputStyle} placeholder="Buyer mood" />
            <input name="outlook" defaultValue={content.outlook} style={inputStyle} placeholder="Outlook" />
          </div>
          <textarea name="articleUrls" defaultValue={content.articleUrls} style={textareaStyle} placeholder="One news article URL per line" />
        </OutputSection>

        <OutputSection title="Auction Updates" control={controls.auction} sectionKey="auction">
          <textarea name="auctionHeadline" defaultValue={content.auctionHeadline} style={textareaStyle} placeholder="Auction headline / commentary" />
          <textarea name="auctionCommentary" defaultValue={content.auctionCommentary} style={textareaStyle} placeholder="Auction update logic / locality commentary" />
          <div style={gridStyle}>
            <input name="sydneyClearance" defaultValue={content.sydneyClearance} style={inputStyle} placeholder="Sydney clearance" />
            <input name="localClearance" defaultValue={content.localClearance} style={inputStyle} placeholder="Local clearance" />
            <input name="auctionPulse" defaultValue={content.auctionPulse} style={inputStyle} placeholder="Auction pulse" />
          </div>
        </OutputSection>

        <OutputSection title="Market Competition" control={controls.competition} sectionKey="competition">
          <textarea name="competitionOnMarket" defaultValue={content.competitionOnMarket} style={textareaStyle} placeholder="On-market competition summary" />
          <textarea name="competitionSold" defaultValue={content.competitionSold} style={textareaStyle} placeholder="Sold competition summary" />
          <div style={gridStyle}>
            <input name="pricePressure" defaultValue={content.pricePressure} style={inputStyle} placeholder="Price pressure" />
            <input name="strategicEdge" defaultValue={content.strategicEdge} style={inputStyle} placeholder="Strategic edge" />
            <input name="soldBenchmark" defaultValue={content.soldBenchmark} style={inputStyle} placeholder="Sold benchmark" />
          </div>
        </OutputSection>

        <OutputSection title="Buyer Feedback" control={controls.feedback} sectionKey="feedback">
          <textarea name="positiveFeedback" defaultValue={content.positiveFeedback} style={textareaStyle} placeholder="Positive buyer feedback" />
          <textarea name="watchouts" defaultValue={content.watchouts} style={textareaStyle} placeholder="Watchouts / objections" />
          <textarea name="warmHotBuyers" defaultValue={content.warmHotBuyers} style={textareaStyle} placeholder="Warm and hot buyers summary" />
          <div style={gridStyle}>
            <input name="contractHolders" defaultValue={content.contractHolders} style={inputStyle} placeholder="Contract holders" />
            <input name="priceFeedback" defaultValue={content.priceFeedback} style={inputStyle} placeholder="Price feedback" />
            <input name="campaignViews" defaultValue={content.campaignViews} style={inputStyle} placeholder="Campaign views" />
            <input name="campaignEnquiries" defaultValue={content.campaignEnquiries} style={inputStyle} placeholder="Campaign enquiries" />
            <input name="campaignSaves" defaultValue={content.campaignSaves} style={inputStyle} placeholder="Campaign saves / favourites" />
            <input name="campaignHeatDetail" defaultValue={content.campaignHeatDetail} style={inputStyle} placeholder="Campaign heat detail" />
          </div>
        </OutputSection>

        <OutputSection title="Projections" control={controls.projections} sectionKey="projections">
          <div style={gridStyle}>
            <input name="marketOutlook" defaultValue={content.marketOutlook} style={inputStyle} placeholder="Market outlook" />
            <input name="buyerBehaviourOutlook" defaultValue={content.buyerBehaviourOutlook} style={inputStyle} placeholder="Buyer behaviour outlook" />
            <input name="pricingPressureWatch" defaultValue={content.pricingPressureWatch} style={inputStyle} placeholder="Pricing pressure watch" />
            <input name="scenarioPlanning" defaultValue={content.scenarioPlanning} style={inputStyle} placeholder="Scenario planning" />
            <input name="riskFactors" defaultValue={content.riskFactors} style={inputStyle} placeholder="Risk factors" />
            <input name="opportunityFactors" defaultValue={content.opportunityFactors} style={inputStyle} placeholder="Opportunity factors" />
          </div>
          <textarea name="recommendedResponse" defaultValue={content.recommendedResponse} style={textareaStyle} placeholder="Recommended agency response" />
        </OutputSection>

        <div>
          <button type="submit" style={buttonStyle}>Save editorial content</button>
        </div>
      </form>
    </section>
  );
}

function OutputSection({ title, children, control, sectionKey }: { title: string; children: React.ReactNode; control: VendorSectionControl; sectionKey: string }) {
  return (
    <div style={sectionStyle}>
      <div style={{ display: 'grid', gap: 12, marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={sectionTitleStyle}>{title}</div>
          <span style={control.status === 'approved' ? approvedChipStyle : draftChipStyle}>{control.status === 'approved' ? 'Approved' : 'Draft'}</span>
        </div>
        <div style={gridStyle}>
          <select name={`${sectionKey}Status`} style={inputStyle} defaultValue={control.status}>
            <option value="draft">Draft</option>
            <option value="approved">Approved</option>
          </select>
          <input name={`${sectionKey}SourceBasis`} style={inputStyle} defaultValue={control.sourceBasis || ''} placeholder="Source basis" />
        </div>
        <textarea name={`${sectionKey}InternalSummary`} style={textareaCompactStyle} defaultValue={control.internalSummary || ''} placeholder="Internal interpretation / notes" />
        <textarea name={`${sectionKey}VendorSummary`} style={textareaCompactStyle} defaultValue={control.vendorSummary || ''} placeholder="Short vendor-facing summary" />
      </div>
      <div style={{ display: 'grid', gap: 14 }}>{children}</div>
    </div>
  );
}

function indexControls(controls: VendorSectionControl[]) {
  const fallback = (key: VendorSectionControl['key'], label: string): VendorSectionControl => ({
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

const sectionStyle = {
  padding: 16,
  borderRadius: 18,
  background: 'rgba(32,32,32,0.04)',
  border: '1px solid rgba(32,32,32,0.06)',
} as const;

const sectionTitleStyle = {
  fontWeight: 800,
  marginBottom: 0,
} as const;

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 12,
} as const;

const inputStyle = {
  width: '100%',
  border: '1px solid rgba(32,32,32,0.10)',
  background: 'rgba(255,255,255,0.86)',
  borderRadius: 14,
  padding: '12px 14px',
} as const;

const textareaStyle = {
  ...inputStyle,
  minHeight: 110,
  resize: 'vertical' as const,
} as const;

const textareaCompactStyle = {
  ...inputStyle,
  minHeight: 88,
  resize: 'vertical' as const,
} as const;

const buttonStyle = {
  border: 'none',
  borderRadius: 999,
  padding: '12px 18px',
  background: 'linear-gradient(135deg, var(--orange), var(--orange-deep))',
  color: 'white',
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
