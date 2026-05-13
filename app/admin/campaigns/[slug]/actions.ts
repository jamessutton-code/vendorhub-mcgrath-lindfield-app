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
  const advertisingCopy = String(formData.get('advertisingCopy') || '').trim();
  const leadAgentName = String(formData.get('leadAgentName') || '').trim();
  const leadAgentProfileUrl = String(formData.get('leadAgentProfileUrl') || '').trim();
  const leadAgentMobile = String(formData.get('leadAgentMobile') || '').trim();
  const secondAgentName = String(formData.get('secondAgentName') || '').trim();
  const secondAgentProfileUrl = String(formData.get('secondAgentProfileUrl') || '').trim();
  const secondAgentMobile = String(formData.get('secondAgentMobile') || '').trim();
  const supportAgentName = String(formData.get('supportAgentName') || '').trim();
  const supportAgentProfileUrl = String(formData.get('supportAgentProfileUrl') || '').trim();
  const supportAgentMobile = String(formData.get('supportAgentMobile') || '').trim();
  const agentContactNotes = String(formData.get('agentContactNotes') || '').trim();
  const heroImage1 = String(formData.get('heroImage1') || '').trim();
  const heroImage2 = String(formData.get('heroImage2') || '').trim();
  const heroImage3 = String(formData.get('heroImage3') || '').trim();
  const heroImage1Alt = String(formData.get('heroImage1Alt') || '').trim();
  const heroImage2Alt = String(formData.get('heroImage2Alt') || '').trim();
  const heroImage3Alt = String(formData.get('heroImage3Alt') || '').trim();
  const compPrimarySuburb = String(formData.get('compPrimarySuburb') || '').trim();
  const compNearbySuburbs = String(formData.get('compNearbySuburbs') || '').trim();
  const compBedroomRule = String(formData.get('compBedroomRule') || '').trim();
  const compBathroomRule = String(formData.get('compBathroomRule') || '').trim();
  const compCarRule = String(formData.get('compCarRule') || '').trim();
  const compPriceBandPct = String(formData.get('compPriceBandPct') || '').trim();
  const compPropertyTypeRule = String(formData.get('compPropertyTypeRule') || '').trim();
  const compNotes = String(formData.get('compNotes') || '').trim();
  const projectionHeadline = String(formData.get('projectionHeadline') || '').trim();
  const recommendedStrategyLabel = String(formData.get('recommendedStrategyLabel') || '').trim();
  const recommendedStrategyBody = String(formData.get('recommendedStrategyBody') || '').trim();
  const marketConditions = String(formData.get('marketConditions') || '').trim();

  if (!slug) {
    throw new Error('Campaign slug is required.');
  }

  const supabase = getSupabaseServiceClient();

  if (!supabase) {
    redirect(`/admin/campaigns/${slug}?saved=mock`);
  }

  const { data: campaignRow, error: campaignLookupError } = await supabase
    .from('campaigns')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();

  if (campaignLookupError || !campaignRow?.id) {
    throw new Error(campaignLookupError?.message || 'Campaign not found.');
  }

  const campaignId = campaignRow.id;

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
      advertising_copy: advertisingCopy || null,
    })
    .eq('id', campaignId);

  if (error) {
    throw new Error(error.message);
  }

  await supabase.from('campaign_agents').delete().eq('campaign_id', campaignId);

  const agentRows = [
    leadAgentName ? { campaign_id: campaignId, role: 'lead', name: leadAgentName, profile_url: leadAgentProfileUrl || null, mobile: leadAgentMobile || null, sort_order: 0 } : null,
    secondAgentName ? { campaign_id: campaignId, role: 'second', name: secondAgentName, profile_url: secondAgentProfileUrl || null, mobile: secondAgentMobile || null, sort_order: 1 } : null,
    supportAgentName ? { campaign_id: campaignId, role: 'support', name: supportAgentName, profile_url: supportAgentProfileUrl || null, mobile: supportAgentMobile || null, sort_order: 0 } : null,
  ].filter(Boolean);

  if (agentRows.length) {
    const { error: agentError } = await supabase.from('campaign_agents').insert(agentRows);
    if (agentError) {
      throw new Error(agentError.message);
    }
  }

  await supabase.from('campaign_images').delete().eq('campaign_id', campaignId);

  const imageRows = [
    heroImage1 ? { campaign_id: campaignId, kind: 'hero1', storage_path: heroImage1, alt_text: heroImage1Alt || null, sort_order: 0 } : null,
    heroImage2 ? { campaign_id: campaignId, kind: 'hero2', storage_path: heroImage2, alt_text: heroImage2Alt || null, sort_order: 1 } : null,
    heroImage3 ? { campaign_id: campaignId, kind: 'hero3', storage_path: heroImage3, alt_text: heroImage3Alt || null, sort_order: 2 } : null,
  ].filter(Boolean);

  if (imageRows.length) {
    const { error: imageError } = await supabase.from('campaign_images').insert(imageRows);
    if (imageError) {
      throw new Error(imageError.message);
    }
  }

  await supabase.from('campaign_comp_rules').delete().eq('campaign_id', campaignId);

  if (compPrimarySuburb || compNearbySuburbs || compBedroomRule || compBathroomRule || compCarRule || compPriceBandPct || compPropertyTypeRule || compNotes) {
    const { error: compError } = await supabase.from('campaign_comp_rules').insert({
      campaign_id: campaignId,
      primary_suburb: compPrimarySuburb || null,
      allowed_nearby_suburbs: compNearbySuburbs || null,
      bedroom_rule: compBedroomRule || null,
      bathroom_rule: compBathroomRule || null,
      car_rule: compCarRule || null,
      price_band_pct: compPriceBandPct ? Number(compPriceBandPct) : null,
      property_type_rule: compPropertyTypeRule || null,
      notes: compNotes || null,
    });

    if (compError) {
      throw new Error(compError.message);
    }
  }

  await supabase.from('campaign_projections').delete().eq('campaign_id', campaignId);

  if (projectionHeadline || recommendedStrategyLabel || recommendedStrategyBody) {
    const { error: projectionError } = await supabase.from('campaign_projections').insert({
      campaign_id: campaignId,
      effective_date: new Date().toISOString().slice(0, 10),
      market_outlook: projectionHeadline || null,
      buyer_behaviour_outlook: recommendedStrategyLabel || null,
      recommended_response: recommendedStrategyBody || null,
    });

    if (projectionError) {
      throw new Error(projectionError.message);
    }
  }

  if (marketConditions) {
    const { error: marketConditionsError } = await supabase.from('market_conditions_inputs').insert({
      effective_date: new Date().toISOString().slice(0, 10),
      entered_by: 'admin',
      notes: marketConditions,
    });

    if (marketConditionsError) {
      throw new Error(marketConditionsError.message);
    }
  }

  redirect(`/admin/campaigns/${slug}?saved=1`);
}
