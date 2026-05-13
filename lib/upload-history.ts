import { getSupabaseServerClient } from '@/lib/supabase-server';
import { DOCUMENT_TYPES } from '@/lib/uploads';

export type UploadHistoryItem = {
  fileName: string;
  documentType: string;
  status: string;
};

export async function getUploadHistory(slug: string): Promise<UploadHistoryItem[]> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return [
      { fileName: `sample-${slug}-vendor-report.pdf`, documentType: 'Vendor Report', status: 'Pending extraction' },
    ];
  }

  const { data: campaign } = await supabase
    .from('campaigns')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();

  if (!campaign?.id) {
    return [];
  }

  const { data } = await supabase
    .from('uploads')
    .select('file_name, document_type, processing_status, uploaded_at')
    .eq('campaign_id', campaign.id)
    .order('uploaded_at', { ascending: false });

  return (data || []).map((item) => ({
    fileName: item.file_name,
    documentType: DOCUMENT_TYPES.find((type) => type.value === item.document_type)?.label || item.document_type,
    status: item.processing_status,
  }));
}
