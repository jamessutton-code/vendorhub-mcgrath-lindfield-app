import { seedInitialCampaign } from '@/lib/campaign-seed';

export default async function SeedPage() {
  const result = await seedInitialCampaign();

  return (
    <main style={{ width: 'min(900px, calc(100% - 32px))', margin: '0 auto', padding: '40px 0 60px' }}>
      <h1>Seed Initial Campaign</h1>
      <pre style={{ whiteSpace: 'pre-wrap', color: 'var(--muted)' }}>{JSON.stringify(result, null, 2)}</pre>
    </main>
  );
}
