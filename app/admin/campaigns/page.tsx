import Link from 'next/link';
import { CampaignSummaryCard } from '@/components/admin/campaign-summary-card';

const campaignRows = [
  { slug: '7-wyvern-avenue-roseville', status: 'draft', updated: 'TBC' },
];

export default function AdminCampaignsPage() {
  return (
    <main style={{ width: 'min(1100px, calc(100% - 32px))', margin: '0 auto', padding: '40px 0 60px' }}>
      <h1 style={{ margin: '0 0 8px' }}>Campaigns</h1>
      <p style={{ margin: '0 0 18px', color: 'var(--muted)' }}>
        This route will hold the campaign list, creation flow, and internal management surfaces.
      </p>

      <div style={{ display: 'grid', gap: 14 }}>
        {campaignRows.map((row) => (
          <Link key={row.slug} href={`/admin/campaigns/${row.slug}`}>
            <CampaignSummaryCard slug={row.slug} status={row.status} updated={row.updated} />
          </Link>
        ))}
      </div>
    </main>
  );
}

const cellHead = {
  padding: '14px 16px',
  borderBottom: '1px solid rgba(32,32,32,0.08)',
  fontSize: 13,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
} as const;

const cellBody = {
  padding: '14px 16px',
  borderBottom: '1px solid rgba(32,32,32,0.08)',
} as const;
