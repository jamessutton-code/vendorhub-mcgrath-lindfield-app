import { updateCampaignSettingsAction } from '@/app/admin/campaigns/[slug]/actions';
import type { CampaignAdminData } from '@/lib/campaign-admin';

export function CampaignSettingsForm({ campaign }: { campaign: CampaignAdminData }) {
  return (
    <form action={updateCampaignSettingsAction} style={{ borderRadius: 22, padding: 22, background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(32,32,32,0.08)', boxShadow: '0 22px 48px rgba(33,27,20,0.08)' }}>
      <input type="hidden" name="slug" value={campaign.slug} />
      <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 800, marginBottom: 10 }}>
        Campaign Settings
      </div>
      <h2 style={{ margin: '0 0 8px', fontSize: 24 }}>{campaign.address}, {campaign.suburb}</h2>
      <p style={{ margin: '0 0 18px', color: 'var(--muted)', lineHeight: 1.6 }}>
        Edit the campaign-level settings that shape the live vendor page.
      </p>

      <div style={{ display: 'grid', gap: 14 }}>
        <input name="displayPrice" defaultValue={campaign.displayPrice} style={inputStyle} placeholder="Display price" />
        <input name="campaignHeat" defaultValue={campaign.campaignHeat} style={inputStyle} placeholder="Campaign heat score (1-10)" />
        <input name="contractsOut" defaultValue={campaign.contractsOut} style={inputStyle} placeholder="Contracts out" />
        <input name="propertyType" defaultValue={campaign.propertyType} style={inputStyle} placeholder="Property type" />
        <input name="bedrooms" defaultValue={campaign.bedrooms} style={inputStyle} placeholder="Bedrooms" />
        <input name="bathrooms" defaultValue={campaign.bathrooms} style={inputStyle} placeholder="Bathrooms" />
        <input name="carSpaces" defaultValue={campaign.carSpaces} style={inputStyle} placeholder="Car spaces" />
        <input name="landSize" defaultValue={campaign.landSize} style={inputStyle} placeholder="Land size" />
        <input name="goLiveDate" type="date" defaultValue={campaign.goLiveDate} style={inputStyle} placeholder="Go-live date" />
        <input name="campaignMethod" defaultValue={campaign.campaignMethod} style={inputStyle} placeholder="Campaign method" />
        <input name="mcgrathUrl" defaultValue={campaign.mcgrathUrl} style={inputStyle} placeholder="McGrath listing URL" />
        <textarea name="notesInternal" defaultValue={campaign.notesInternal} style={textareaStyle} placeholder="Internal campaign notes, sensitivities, or positioning instructions" />
      </div>

      <div style={{ marginTop: 18 }}>
        <button type="submit" style={buttonStyle}>Save campaign settings</button>
      </div>
    </form>
  );
}

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
