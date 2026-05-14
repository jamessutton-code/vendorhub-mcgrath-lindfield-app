'use server';

import { redirect } from 'next/navigation';
import { extractReportData, summariseText } from '@/lib/automation';
import { getSupabaseServiceClient } from '@/lib/supabase-server';

export async function uploadCampaignDocumentAction(formData: FormData) {
  const slug = String(formData.get('slug') || '').trim();
  const documentType = String(formData.get('documentType') || '').trim();
  const file = formData.get('file');
  const sourceText = String(formData.get('sourceText') || '').trim();
  const sourceTitle = String(formData.get('sourceTitle') || '').trim();

  if (!slug || !documentType) {
    throw new Error('Slug and document type are required.');
  }

  const supabase = getSupabaseServiceClient();

  if (!supabase) {
    redirect(`/admin/campaigns/${slug}?upload=mock`);
  }

  const { data: campaign } = await supabase
    .from('campaigns')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();

  if (!campaign?.id) {
    throw new Error('Campaign not found for upload record.');
  }

  let uploadId: string | null = null;

  if (file instanceof File && file.size > 0) {
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

    const { data: uploadRow, error: insertError } = await supabase.from('uploads').insert({
      campaign_id: campaign.id,
      document_type: documentType,
      storage_path: storagePath,
      file_name: file.name,
      processing_status: sourceText ? 'processed' : 'pending',
      processed_at: sourceText ? new Date().toISOString() : null,
    }).select('id').single();

    if (insertError) {
      throw new Error(insertError.message);
    }

    uploadId = uploadRow.id;
  }

  if (sourceText) {
    const { data: textInput, error: textInputError } = await supabase
      .from('upload_text_inputs')
      .insert({
        campaign_id: campaign.id,
        document_type: documentType,
        title: sourceTitle || null,
        source_text: sourceText,
      })
      .select('id')
      .single();

    if (textInputError) {
      throw new Error(textInputError.message);
    }

    const extracted = extractReportData(documentType, sourceText);

    if (documentType === 'vendor_report') {
      const { error: extractionError } = await supabase.from('vendor_report_extractions').insert({
        upload_id: uploadId,
        upload_text_input_id: textInput.id,
        contracts_out: extracted.contractsOut,
        warm_buyer_summary: extracted.warmBuyers,
        hot_buyer_summary: extracted.hotBuyers,
        contract_holder_summary: extracted.contractHolders,
        price_feedback_summary: extracted.priceFeedback,
        positive_themes_summary: extracted.positiveFeedback,
        watchouts_summary: extracted.watchouts,
      });

      if (extractionError) {
        throw new Error(extractionError.message);
      }

      const { error: campaignUpdateError } = await supabase
        .from('campaigns')
        .update({ contracts_out: extracted.contractsOut === 'TBC' ? null : extracted.contractsOut })
        .eq('id', campaign.id);

      if (campaignUpdateError) {
        throw new Error(campaignUpdateError.message);
      }
    }

    if (documentType === 'rea' || documentType === 'domain' || documentType === 'mcgrath_digital') {
      await supabase.from('campaign_comp_snapshots').insert({
        campaign_id: campaign.id,
        effective_date: new Date().toISOString().slice(0, 10),
        on_market_summary: documentType === 'rea' ? summariseText(sourceText, 280) : null,
        sold_summary: documentType === 'domain' ? summariseText(sourceText, 280) : null,
        strategic_edge_read: documentType === 'mcgrath_digital' ? summariseText(sourceText, 280) : null,
      });
    }
  }

  redirect(`/admin/campaigns/${slug}?upload=1`);
}
