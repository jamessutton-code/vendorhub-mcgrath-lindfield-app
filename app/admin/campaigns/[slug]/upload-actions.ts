'use server';

import { redirect } from 'next/navigation';
import { getSupabaseServiceClient } from '@/lib/supabase-server';

export async function uploadCampaignDocumentAction(formData: FormData) {
  const slug = String(formData.get('slug') || '').trim();
  const documentType = String(formData.get('documentType') || '').trim();
  const file = formData.get('file');

  if (!slug || !documentType || !(file instanceof File)) {
    throw new Error('Slug, document type, and file are required.');
  }

  const supabase = getSupabaseServiceClient();

  if (!supabase) {
    redirect(`/admin/campaigns/${slug}?upload=mock`);
  }

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name}`;
  const storagePath = `${slug}/${documentType}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('campaign-documents')
    .upload(storagePath, fileBuffer, {
      contentType: file.type || 'application/pdf',
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data: campaign } = await supabase
    .from('campaigns')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();

  if (!campaign?.id) {
    throw new Error('Campaign not found for upload record.');
  }

  const { error: insertError } = await supabase.from('uploads').insert({
    campaign_id: campaign.id,
    document_type: documentType,
    storage_path: storagePath,
    file_name: file.name,
    processing_status: 'pending',
  });

  if (insertError) {
    throw new Error(insertError.message);
  }

  redirect(`/admin/campaigns/${slug}?upload=1`);
}
