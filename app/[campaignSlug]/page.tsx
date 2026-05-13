import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { VendorShell } from '@/components/vendor-shell';
import { VendorPasswordGate } from '@/components/vendor-password-gate';
import { getCampaignBySlug } from '@/lib/campaigns';

export default async function CampaignPage({ params }: { params: Promise<{ campaignSlug: string }> }) {
  const { campaignSlug } = await params;
  const campaign = await getCampaignBySlug(campaignSlug);

  if (!campaign) {
    notFound();
  }

  const cookieStore = await cookies();
  const unlocked = cookieStore.get(`vendorhub:${campaign.slug}`)?.value === 'unlocked';
  const showPasswordGate = campaign.requiresPassword !== false && !unlocked;

  if (showPasswordGate) {
    return <VendorPasswordGate slug={campaign.slug} address={`${campaign.address}, ${campaign.suburb}`} />;
  }

  return <VendorShell campaign={campaign} />;
}
