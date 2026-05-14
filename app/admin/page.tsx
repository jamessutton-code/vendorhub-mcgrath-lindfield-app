import Link from 'next/link';
import { CampaignSetupForm } from '@/components/admin/campaign-setup-form';

export default function AdminPage() {
  return (
    <main style={{ width: 'min(1100px, calc(100% - 32px))', margin: '0 auto', padding: '40px 0 60px' }}>
      <section style={{ borderRadius: 26, padding: 24, background: 'linear-gradient(135deg, rgba(255,255,255,0.78), rgba(241,240,237,0.92))', border: '1px solid rgba(32,32,32,0.08)', boxShadow: '0 22px 48px rgba(33,27,20,0.08)', marginBottom: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 18, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 800, marginBottom: 10 }}>Campaign Setup Landing Page</div>
            <h1 style={{ margin: '0 0 8px' }}>Vendor Hub Setup</h1>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.7 }}>
              This should be the first stop: create the campaign, capture the common market inputs, and then move into the specific campaign workspace where the vendor-facing page and campaign-level reports split apart.
            </p>
          </div>
          <Link href="/admin/campaigns" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 999, padding: '12px 18px', background: 'rgba(32,32,32,0.06)', color: 'var(--text)', fontWeight: 700, textDecoration: 'none' }}>View existing campaigns</Link>
        </div>
      </section>

      <CampaignSetupForm />
    </main>
  );
}
