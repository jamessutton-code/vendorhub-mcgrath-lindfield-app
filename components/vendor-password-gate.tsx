import { unlockCampaignAction } from '@/app/[campaignSlug]/actions';

export function VendorPasswordGate({ slug, address }: { slug: string; address: string }) {
  return (
    <main style={{ width: 'min(560px, calc(100% - 32px))', margin: '80px auto', padding: 24 }}>
      <form action={unlockCampaignAction} style={{ borderRadius: 28, padding: 24, background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(32,32,32,0.08)', boxShadow: '0 22px 48px rgba(33,27,20,0.08)' }}>
        <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 800, marginBottom: 10 }}>
          Vendor Access
        </div>
        <h1 style={{ margin: '0 0 10px' }}>{address}</h1>
        <p style={{ margin: '0 0 18px', color: 'var(--muted)', lineHeight: 1.6 }}>
          This campaign page is password protected. The live app validates the campaign password and creates a vendor session before access is granted.
        </p>
        <input type="hidden" name="slug" value={slug} />
        <input
          name="password"
          type="password"
          placeholder="Enter campaign password"
          style={{ width: '100%', border: '1px solid rgba(32,32,32,0.10)', background: 'rgba(255,255,255,0.86)', borderRadius: 14, padding: '12px 14px', marginBottom: 12 }}
        />
        <button type="submit" style={{ border: 'none', borderRadius: 999, padding: '12px 16px', background: 'linear-gradient(135deg, var(--orange), var(--orange-deep))', color: 'white', fontWeight: 700 }}>
          Unlock campaign
        </button>
      </form>
    </main>
  );
}
