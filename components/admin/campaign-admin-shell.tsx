import { CampaignSettingsForm } from '@/components/admin/campaign-settings-form';
import { DocumentUploadPanel } from '@/components/admin/document-upload-panel';
import { EditorialReviewPanel } from '@/components/admin/editorial-review-panel';
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
  const vendorUrl = `/${campaign.slug}`;

  return (
    <main style={{ width: 'min(1180px, calc(100% - 32px))', margin: '0 auto', padding: '40px 0 60px' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 800, marginBottom: 10 }}>
          Campaign Workspace
        </div>
        <h1 style={{ margin: '0 0 8px' }}>{campaign.address}, {campaign.suburb}</h1>
        <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>
          This should operate as one campaign workspace: setup and shared market inputs at the top, then the split into the live vendor-facing page and the campaign-specific operating inputs underneath.
        </p>
      </div>

      <section style={heroBandStyle}>
        <div>
          <div style={sectionKickerStyle}>Live Split</div>
          <h2 style={{ margin: '0 0 8px', fontSize: 28 }}>One setup layer, then a clear vendor/admin split</h2>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.7 }}>
            Shared market inputs like article URLs and the current market pulse belong in setup. Campaign-specific reports, buyer feedback, and competition inputs belong in this campaign workspace. The vendor link is where the client sees the polished output.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href={vendorUrl} style={primaryLinkStyle}>Open live vendor page</a>
          <a href="/admin" style={secondaryLinkStyle}>Open setup landing page</a>
        </div>
      </section>

      <section style={sectionWrapStyle}>
        <div style={sectionKickerStyle}>Step 1</div>
        <h2 style={sectionHeadingStyle}>Campaign foundation and common market inputs</h2>
        <p style={sectionCopyStyle}>
          Start here. This top section should handle the initial campaign setup and the shared inputs that can influence Vendor Hub pages more broadly.
        </p>
        <CampaignSettingsForm campaign={campaign} />
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 18 }}>
        <section style={sectionWrapStyle}>
          <div style={sectionKickerStyle}>Step 3</div>
          <h2 style={sectionHeadingStyle}>Editorial review and vendor-facing output</h2>
          <p style={sectionCopyStyle}>
            This is where your team reviews the live presentation, refines the client wording, and explicitly marks sections draft or approved.
          </p>
          <VendorPreviewCard vendorUrl={vendorUrl} slug={campaign.slug} />
          <EditorialReviewPanel controls={campaign.sectionControls || outputContent.sectionControls || []} />
          <GeneratedOutputsPanel slug={campaign.slug} content={outputContent} />
        </section>

        <section style={sectionWrapStyle}>
          <div style={sectionKickerStyle}>Step 2</div>
          <h2 style={sectionHeadingStyle}>Per-campaign reports, feedback, and market data</h2>
          <p style={sectionCopyStyle}>
            This side is where the operational inputs live for this specific property: weekly feedback reports, REA, Domain, McGrath Digital, and the campaign-level market evidence.
          </p>
          <DocumentUploadPanel slug={campaign.slug} history={uploadHistory} />
          <MarketConditionsPanel marketConditions={campaign.marketConditions} />
        </section>
      </div>
    </main>
  );
}

function MarketConditionsPanel({ marketConditions }: { marketConditions: string }) {
  return (
    <section style={cardStyle}>
      <div style={sectionKickerStyle}>Current Market Pulse</div>
      <h2 style={{ margin: '0 0 8px', fontSize: 24 }}>On-The-Ground Read</h2>
      <p style={{ margin: '0 0 18px', color: 'var(--muted)', lineHeight: 1.6 }}>
        This should remain visible inside the campaign workspace because it shapes how the broader market story and recommendations should be framed.
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

function VendorPreviewCard({ vendorUrl, slug }: { vendorUrl: string; slug: string }) {
  return (
    <section style={cardStyle}>
      <div style={sectionKickerStyle}>Vendor Preview</div>
      <h2 style={{ margin: '0 0 8px', fontSize: 24 }}>Live vendor-facing page</h2>
      <p style={{ margin: '0 0 18px', color: 'var(--muted)', lineHeight: 1.6 }}>
        This is the client-style portal for `{slug}`. Use it to review the live presentation once campaign inputs and outputs have been updated here.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <a href={vendorUrl} style={primaryLinkStyle}>Open vendor hub</a>
      </div>
    </section>
  );
}

const heroBandStyle = {
  borderRadius: 26,
  padding: 24,
  background: 'linear-gradient(135deg, rgba(255,255,255,0.78), rgba(241,240,237,0.92))',
  border: '1px solid rgba(32,32,32,0.08)',
  boxShadow: '0 22px 48px rgba(33,27,20,0.08)',
  display: 'grid',
  gap: 18,
  marginBottom: 18,
} as const;

const sectionWrapStyle = {
  display: 'grid',
  gap: 16,
} as const;

const cardStyle = {
  borderRadius: 22,
  padding: 22,
  background: 'rgba(255,255,255,0.72)',
  border: '1px solid rgba(32,32,32,0.08)',
  boxShadow: '0 22px 48px rgba(33,27,20,0.08)',
} as const;

const sectionKickerStyle = {
  fontSize: 12,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: 'var(--orange)',
  fontWeight: 800,
  marginBottom: 10,
} as const;

const sectionHeadingStyle = {
  margin: '0 0 6px',
  fontSize: 28,
} as const;

const sectionCopyStyle = {
  margin: 0,
  color: 'var(--muted)',
  lineHeight: 1.7,
} as const;

const primaryLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 999,
  padding: '12px 18px',
  background: 'linear-gradient(135deg, var(--orange), var(--orange-deep))',
  color: 'white',
  fontWeight: 700,
  textDecoration: 'none',
} as const;

const secondaryLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 999,
  padding: '12px 18px',
  background: 'rgba(32,32,32,0.06)',
  color: 'var(--text)',
  fontWeight: 700,
  textDecoration: 'none',
} as const;
