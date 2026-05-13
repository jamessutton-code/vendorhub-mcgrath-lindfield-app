import { CampaignAdminShell } from '@/components/admin/campaign-admin-shell';
import { getCampaignAdminData } from '@/lib/campaign-admin';
import { getUploadHistory } from '@/lib/upload-history';

type CampaignAdminPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CampaignAdminPage({ params }: CampaignAdminPageProps) {
  const { slug } = await params;
  const [campaign, uploadHistory] = await Promise.all([
    getCampaignAdminData(slug),
    getUploadHistory(slug),
  ]);
  return <CampaignAdminShell campaign={campaign} uploadHistory={uploadHistory} />;
}
