import { CampaignAdminShell } from '@/components/admin/campaign-admin-shell';
import { getCampaignAdminData } from '@/lib/campaign-admin';
import { getUploadHistory } from '@/lib/upload-history';
import { getVendorOutputContent } from '@/lib/vendor-content';

type CampaignAdminPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CampaignAdminPage({ params }: CampaignAdminPageProps) {
  const { slug } = await params;
  const [campaign, uploadHistory, outputContent] = await Promise.all([
    getCampaignAdminData(slug),
    getUploadHistory(slug),
    getVendorOutputContent(slug),
  ]);

  return <CampaignAdminShell campaign={campaign} uploadHistory={uploadHistory} outputContent={outputContent} />;
}
