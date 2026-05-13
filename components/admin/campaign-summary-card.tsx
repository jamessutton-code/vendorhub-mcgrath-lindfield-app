type CampaignSummaryCardProps = {
  slug: string;
  status: string;
  updated: string;
};

export function CampaignSummaryCard({ slug, status, updated }: CampaignSummaryCardProps) {
  return (
    <div style={{ borderRadius: 20, padding: 18, background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(32,32,32,0.08)' }}>
      <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--orange)', fontWeight: 800, marginBottom: 10 }}>
        Campaign
      </div>
      <div style={{ fontWeight: 800, marginBottom: 6 }}>{slug}</div>
      <div style={{ color: 'var(--muted)', marginBottom: 6 }}>Status: {status}</div>
      <div style={{ color: 'var(--muted)' }}>Updated: {updated}</div>
    </div>
  );
}
