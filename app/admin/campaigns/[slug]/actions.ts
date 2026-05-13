'use server';

import { redirect } from 'next/navigation';
import { getSupabaseServiceClient } from '@/lib/supabase-server';

export async function updateCampaignSettingsAction(formData: FormData) {
  const slug = String(formData.get('slug') || '').trim();
  const displayPrice = String(formData.get('displayPrice') || '').trim();
  const campaignHeat = String(formData.get('campaignHeat') || '').trim();
  const contractsOut = String(formData.get('contractsOut') || '').trim();
  const propertyType = String(formData.get('propertyType') || '').trim();
  const bedrooms = String(formData.get('bedrooms') || '').trim();
  const bathrooms = String(formData.get('bathrooms') || '').trim();
  const carSpaces = String(formData.get('carSpaces') || '').trim();
  const landSize = String(formData.get('landSize') || '').trim();
  const goLiveDate = String(formData.get('goLiveDate') || '').trim();
  const campaignMethod = String(formData.get('campaignMethod') || '').trim();
  const mcgrathUrl = String(formData.get('mcgrathUrl') || '').trim();
  const notesInternal = String(formData.get('notesInternal') || '').trim();

  if (!slug) {
    throw new Error('Campaign slug is required.');
  }

  const supabase = getSupabaseServiceClient();

  if (!supabase) {
    redirect(`/admin/campaigns/${slug}?saved=mock`);
  }

  const { error } = await supabase
    .from('campaigns')
    .update({
      display_price: displayPrice || null,
      campaign_heat_score: campaignHeat ? Number(campaignHeat) : null,
      contracts_out: contractsOut || null,
      property_type: propertyType || null,
      bedrooms: bedrooms ? Number(bedrooms) : null,
      bathrooms: bathrooms ? Number(bathrooms) : null,
      car_spaces: carSpaces ? Number(carSpaces) : null,
      land_size: landSize || null,
      go_live_date: goLiveDate || null,
      campaign_method: campaignMethod || null,
      mcgrath_listing_url: mcgrathUrl || null,
      notes_internal: notesInternal || null,
    })
    .eq('slug', slug);

  if (error) {
    throw new Error(error.message);
  }

  redirect(`/admin/campaigns/${slug}?saved=1`);
}
