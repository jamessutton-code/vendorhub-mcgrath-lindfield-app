import Link from 'next/link';
import { CampaignSetupForm } from '@/components/admin/campaign-setup-form';

export default function AdminPage() {
  return (
    <main style={{ width: 'min(1100px, calc(100% - 32px))', margin: '0 auto', padding: '40px 0 60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: '0 0 8px' }}>Admin</h1>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            Internal workflow area for campaign creation, uploads, article sources, market conditions, and approvals.
          </p>
        </div>
        <Link href="/admin/campaigns">View campaigns</Link>
      </div>

      <CampaignSetupForm />
    </main>
  );
}
