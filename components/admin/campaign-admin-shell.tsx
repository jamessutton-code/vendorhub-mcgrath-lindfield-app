import { CampaignSettingsForm } from '@/components/admin/campaign-settings-form';
import { DocumentUploadPanel } from '@/components/admin/document-upload-panel';
import { GeneratedOutputsPanel } from '@/components/admin/generated-outputs-panel';
import type { CampaignAdminData } from '@/lib/campaign-admin';
import type { UploadHistoryItem } from '@/lib/upload-history';
import type { VendorOutputContent } from '@/lib/vendor-content';

type CampaignAdminShellProps = {
  campaign: CampaignAdminData;
  uploadHistory: UploadHistoryItem[];
  outputContent: VendorOutputContent;
};

export function CampaignAdminShell({ campaign, uploadHistory, outputContent }: CampaignAdminShellProps) {
  return (
    <main style={{ width: 'min(1180px, calc(100% - 32px))', margin: '0 auto', padding: '40px 0 60px' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 800, marginBottom: 10 }}>
          Campaign Admin
        </div>
        <h1 style={{ margin: '0 0 8px' }}>{campaign.slug}</h1>
        <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>
          Internal management surface for this campaign. This area now covers campaign settings, uploads, article/news input, vendor-facing output content, and section-level testing before broader automation is finished.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <CampaignSettingsForm campaign={campaign} />
        <DocumentUploadPanel slug={campaign.slug} history={uploadHistory} />
        <GeneratedOutputsPanel slug={campaign.slug} content={outputContent} />
        <MarketConditionsPanel marketConditions={campaign.marketConditions} />
      </div>
    </main>
  );
}

function MarketConditionsPanel({ marketConditions }: { marketConditions: string }) {
  return (
    <section style={{ borderRadius: 22, padding: 22, background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(32,32,32,0.08)', boxShadow: '0 22px 48px rgba(33,27,20,0.08)' }}>
      <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 800, marginBottom: 10 }}>
        Market Conditions
      </div>
      <h2 style={{ margin: '0 0 8px', fontSize: 24 }}>On-The-Ground Read</h2>
      <p style={{ margin: '0 0 18px', color: 'var(--muted)', lineHeight: 1.6 }}>
        James’s live market feel should influence the tone of latest updates, auction commentary, comp interpretation, and projections during the daily refresh cycle.
      </p>
      <textarea
        readOnly
        value={marketConditions || ''}
        style={{ width: '100%', minHeight: 140, border: '1px solid rgba(32,32,32,0.10)', background: 'rgba(255,255,255,0.86)', borderRadius: 14, padding: '12px 14px', resize: 'vertical' }}
        placeholder="Write the current on-the-ground market read here..."
      />
    </section>
  );
}
