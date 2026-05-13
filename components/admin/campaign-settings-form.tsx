import { updateCampaignSettingsAction } from '@/app/admin/campaigns/[slug]/actions';
import type { CampaignAdminData } from '@/lib/campaign-admin';

export function CampaignSettingsForm({ campaign }: { campaign: CampaignAdminData }) {
  return (
    <form action={updateCampaignSettingsAction} style={cardStyle}>
      <input type="hidden" name="slug" value={campaign.slug} />
      <div style={kickerStyle}>Campaign Settings</div>
      <h2 style={headingStyle}>{campaign.address}, {campaign.suburb}</h2>
      <p style={copyStyle}>
        Edit the campaign-level fields that drive the live vendor page so the master-template layout is backed by real campaign data rather than placeholders.
      </p>

      <Section title="Top-Line Campaign">
        <div style={gridStyle}>
          <input name="displayPrice" defaultValue={campaign.displayPrice} style={inputStyle} placeholder="Display price" />
          <input name="campaignHeat" defaultValue={campaign.campaignHeat} style={inputStyle} placeholder="Campaign heat score (1-10)" />
          <input name="contractsOut" defaultValue={campaign.contractsOut} style={inputStyle} placeholder="Contracts out" />
          <input name="mcgrathUrl" defaultValue={campaign.mcgrathUrl} style={inputStyle} placeholder="McGrath listing URL" />
          <input name="propertyType" defaultValue={campaign.propertyType} style={inputStyle} placeholder="Property type" />
          <input name="campaignMethod" defaultValue={campaign.campaignMethod} style={inputStyle} placeholder="Campaign method" />
          <input name="bedrooms" defaultValue={campaign.bedrooms} style={inputStyle} placeholder="Bedrooms" />
          <input name="bathrooms" defaultValue={campaign.bathrooms} style={inputStyle} placeholder="Bathrooms" />
          <input name="carSpaces" defaultValue={campaign.carSpaces} style={inputStyle} placeholder="Car spaces" />
          <input name="landSize" defaultValue={campaign.landSize} style={inputStyle} placeholder="Land size" />
          <input name="goLiveDate" type="date" defaultValue={campaign.goLiveDate} style={inputStyle} placeholder="Go-live date" />
        </div>
      </Section>

      <Section title="Hero Copy + Notes">
        <div style={{ display: 'grid', gap: 14 }}>
          <textarea name="advertisingCopy" defaultValue={campaign.advertisingCopy} style={textareaStyle} placeholder="Advertising copy / vendor-facing hero support copy" />
          <textarea name="notesInternal" defaultValue={campaign.notesInternal} style={textareaStyle} placeholder="Internal campaign notes, sensitivities, or positioning instructions" />
          <textarea name="agentContactNotes" defaultValue={campaign.agentContactNotes} style={textareaStyle} placeholder="Agent mobile numbers or campaign-specific contact notes" />
        </div>
      </Section>

      <Section title="Agents">
        <div style={gridStyle}>
          <input name="leadAgentName" defaultValue={campaign.leadAgentName} style={inputStyle} placeholder="Lead agent name" />
          <input name="leadAgentProfileUrl" defaultValue={campaign.leadAgentProfileUrl} style={inputStyle} placeholder="Lead agent profile URL" />
          <input name="leadAgentMobile" defaultValue={campaign.leadAgentMobile} style={inputStyle} placeholder="Lead agent mobile" />
          <input name="secondAgentName" defaultValue={campaign.secondAgentName} style={inputStyle} placeholder="Second agent name" />
          <input name="secondAgentProfileUrl" defaultValue={campaign.secondAgentProfileUrl} style={inputStyle} placeholder="Second agent profile URL" />
          <input name="secondAgentMobile" defaultValue={campaign.secondAgentMobile} style={inputStyle} placeholder="Second agent mobile" />
          <input name="supportAgentName" defaultValue={campaign.supportAgentName} style={inputStyle} placeholder="Support agent name" />
          <input name="supportAgentProfileUrl" defaultValue={campaign.supportAgentProfileUrl} style={inputStyle} placeholder="Support agent profile URL" />
          <input name="supportAgentMobile" defaultValue={campaign.supportAgentMobile} style={inputStyle} placeholder="Support agent mobile" />
        </div>
      </Section>

      <Section title="Hero Images">
        <div style={gridStyle}>
          <input name="heroImage1" defaultValue={campaign.heroImage1} style={inputStyle} placeholder="Hero image 1 URL or storage path" />
          <input name="heroImage1Alt" defaultValue={campaign.heroImage1Alt} style={inputStyle} placeholder="Hero image 1 alt text" />
          <input name="heroImage2" defaultValue={campaign.heroImage2} style={inputStyle} placeholder="Hero image 2 URL or storage path" />
          <input name="heroImage2Alt" defaultValue={campaign.heroImage2Alt} style={inputStyle} placeholder="Hero image 2 alt text" />
          <input name="heroImage3" defaultValue={campaign.heroImage3} style={inputStyle} placeholder="Hero image 3 URL or storage path" />
          <input name="heroImage3Alt" defaultValue={campaign.heroImage3Alt} style={inputStyle} placeholder="Hero image 3 alt text" />
        </div>
      </Section>

      <Section title="Competition Rules">
        <div style={gridStyle}>
          <input name="compPrimarySuburb" defaultValue={campaign.compPrimarySuburb} style={inputStyle} placeholder="Primary suburb" />
          <input name="compNearbySuburbs" defaultValue={campaign.compNearbySuburbs} style={inputStyle} placeholder="Nearby suburbs" />
          <input name="compBedroomRule" defaultValue={campaign.compBedroomRule} style={inputStyle} placeholder="Bedroom rule" />
          <input name="compBathroomRule" defaultValue={campaign.compBathroomRule} style={inputStyle} placeholder="Bathroom rule" />
          <input name="compCarRule" defaultValue={campaign.compCarRule} style={inputStyle} placeholder="Car rule" />
          <input name="compPriceBandPct" defaultValue={campaign.compPriceBandPct} style={inputStyle} placeholder="Price band %" />
          <input name="compPropertyTypeRule" defaultValue={campaign.compPropertyTypeRule} style={inputStyle} placeholder="Property type rule" />
        </div>
        <div style={{ marginTop: 14 }}>
          <textarea name="compNotes" defaultValue={campaign.compNotes} style={textareaStyle} placeholder="Competition notes" />
        </div>
      </Section>

      <Section title="Projection + Market Conditions">
        <div style={{ display: 'grid', gap: 14 }}>
          <input name="projectionHeadline" defaultValue={campaign.projectionHeadline} style={inputStyle} placeholder="Projection headline / market outlook" />
          <input name="recommendedStrategyLabel" defaultValue={campaign.recommendedStrategyLabel} style={inputStyle} placeholder="Recommended strategy label / buyer behaviour outlook" />
          <textarea name="recommendedStrategyBody" defaultValue={campaign.recommendedStrategyBody} style={textareaStyle} placeholder="Recommended strategy body" />
          <textarea name="marketConditions" defaultValue={campaign.marketConditions} style={textareaStyle} placeholder="Current on-the-ground market conditions" />
        </div>
      </Section>

      <div style={{ marginTop: 22 }}>
        <button type="submit" style={buttonStyle}>Save campaign settings</button>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ display: 'grid', gap: 14 }}>
      <div style={sectionTitleStyle}>{title}</div>
      {children}
    </section>
  );
}

const cardStyle = {
  borderRadius: 22,
  padding: 22,
  background: 'rgba(255,255,255,0.72)',
  border: '1px solid rgba(32,32,32,0.08)',
  boxShadow: '0 22px 48px rgba(33,27,20,0.08)',
  display: 'grid',
  gap: 22,
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
  margin: '0 0 4px',
  color: 'var(--muted)',
  lineHeight: 1.6,
} as const;

const sectionTitleStyle = {
  fontSize: 13,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: 'var(--orange-deep)',
  fontWeight: 800,
} as const;

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 14,
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
  minHeight: 120,
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
