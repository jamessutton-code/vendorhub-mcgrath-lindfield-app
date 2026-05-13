import { sampleCampaign } from '@/lib/mock-data';
import { getSupabaseServerClient } from '@/lib/supabase-server';

export type CampaignAdminData = {
  slug: string;
  address: string;
  suburb: string;
  displayPrice: string;
  campaignHeat: string;
  contractsOut: string;
  mcgrathUrl: string;
  notesInternal: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  carSpaces: string;
  landSize: string;
  goLiveDate: string;
  campaignMethod: string;
  advertisingCopy: string;
  leadAgentName: string;
  leadAgentProfileUrl: string;
  leadAgentMobile: string;
  secondAgentName: string;
  secondAgentProfileUrl: string;
  secondAgentMobile: string;
  supportAgentName: string;
  supportAgentProfileUrl: string;
  supportAgentMobile: string;
  agentContactNotes: string;
  heroImage1: string;
  heroImage2: string;
  heroImage3: string;
  heroImage1Alt: string;
  heroImage2Alt: string;
  heroImage3Alt: string;
  compPrimarySuburb: string;
  compNearbySuburbs: string;
  compBedroomRule: string;
  compBathroomRule: string;
  compCarRule: string;
  compPriceBandPct: string;
  compPropertyTypeRule: string;
  compNotes: string;
  projectionHeadline: string;
  recommendedStrategyLabel: string;
  recommendedStrategyBody: string;
  marketConditions: string;
};

export async function getCampaignAdminData(slug: string): Promise<CampaignAdminData> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return mapMockCampaign(slug);
  }

  const { data } = await supabase
    .from('campaigns')
    .select('id, slug, address, suburb, display_price, campaign_heat_score, contracts_out, mcgrath_listing_url, notes_internal, property_type, bedrooms, bathrooms, car_spaces, land_size, go_live_date, campaign_method, advertising_copy')
    .eq('slug', slug)
    .maybeSingle();

  if (!data?.id) {
    return mapMockCampaign(slug);
  }

  const [{ data: agents }, { data: images }, { data: compRules }, { data: projections }, { data: marketConditions }] = await Promise.all([
    supabase
      .from('campaign_agents')
      .select('role, name, profile_url, mobile, sort_order')
      .eq('campaign_id', data.id)
      .order('sort_order', { ascending: true }),
    supabase
      .from('campaign_images')
      .select('kind, storage_path, alt_text, sort_order')
      .eq('campaign_id', data.id)
      .order('sort_order', { ascending: true }),
    supabase
      .from('campaign_comp_rules')
      .select('primary_suburb, allowed_nearby_suburbs, bedroom_rule, bathroom_rule, car_rule, price_band_pct, property_type_rule, notes')
      .eq('campaign_id', data.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from('campaign_projections')
      .select('market_outlook, buyer_behaviour_outlook, pricing_pressure_watch, scenario_planning, risk_factors, opportunity_factors, recommended_response')
      .eq('campaign_id', data.id)
      .order('effective_date', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from('market_conditions_inputs')
      .select('notes')
      .order('effective_date', { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const lead = (agents || []).find((agent) => agent.role === 'lead');
  const second = (agents || []).find((agent) => agent.role === 'second');
  const support = (agents || []).find((agent) => agent.role === 'support');
  const hero1 = (images || []).find((image) => image.kind === 'hero1');
  const hero2 = (images || []).find((image) => image.kind === 'hero2');
  const hero3 = (images || []).find((image) => image.kind === 'hero3');

  return {
    slug,
    address: data.address || sampleCampaign.address,
    suburb: data.suburb || sampleCampaign.suburb,
    displayPrice: data.display_price || '',
    campaignHeat: data.campaign_heat_score != null ? String(data.campaign_heat_score) : '',
    contractsOut: data.contracts_out || '',
    mcgrathUrl: data.mcgrath_listing_url || '',
    notesInternal: data.notes_internal || '',
    propertyType: data.property_type || '',
    bedrooms: data.bedrooms != null ? String(data.bedrooms) : '',
    bathrooms: data.bathrooms != null ? String(data.bathrooms) : '',
    carSpaces: data.car_spaces != null ? String(data.car_spaces) : '',
    landSize: data.land_size || '',
    goLiveDate: data.go_live_date || '',
    campaignMethod: data.campaign_method || '',
    advertisingCopy: data.advertising_copy || '',
    leadAgentName: lead?.name || '',
    leadAgentProfileUrl: lead?.profile_url || '',
    leadAgentMobile: lead?.mobile || '',
    secondAgentName: second?.name || '',
    secondAgentProfileUrl: second?.profile_url || '',
    secondAgentMobile: second?.mobile || '',
    supportAgentName: support?.name || '',
    supportAgentProfileUrl: support?.profile_url || '',
    supportAgentMobile: support?.mobile || '',
    agentContactNotes: [lead?.name && lead?.mobile ? `${lead.name} | ${lead.mobile}` : '', second?.name && second?.mobile ? `${second.name} | ${second.mobile}` : ''].filter(Boolean).join('\n'),
    heroImage1: hero1?.storage_path || sampleCampaign.heroImages[0]?.url || '',
    heroImage2: hero2?.storage_path || sampleCampaign.heroImages[1]?.url || '',
    heroImage3: hero3?.storage_path || sampleCampaign.heroImages[2]?.url || '',
    heroImage1Alt: hero1?.alt_text || 'Hero image 1',
    heroImage2Alt: hero2?.alt_text || 'Hero image 2',
    heroImage3Alt: hero3?.alt_text || 'Hero image 3',
    compPrimarySuburb: compRules?.primary_suburb || '',
    compNearbySuburbs: compRules?.allowed_nearby_suburbs || '',
    compBedroomRule: compRules?.bedroom_rule || '',
    compBathroomRule: compRules?.bathroom_rule || '',
    compCarRule: compRules?.car_rule || '',
    compPriceBandPct: compRules?.price_band_pct != null ? String(compRules.price_band_pct) : '',
    compPropertyTypeRule: compRules?.property_type_rule || '',
    compNotes: compRules?.notes || '',
    projectionHeadline: projections?.market_outlook || '',
    recommendedStrategyLabel: projections?.buyer_behaviour_outlook || '',
    recommendedStrategyBody: projections?.recommended_response || '',
    marketConditions: marketConditions?.notes || '',
  };
}

function mapMockCampaign(slug: string): CampaignAdminData {
  return {
    slug,
    address: sampleCampaign.address,
    suburb: sampleCampaign.suburb,
    displayPrice: sampleCampaign.displayPrice,
    campaignHeat: sampleCampaign.campaignHeat.replace('/10', ''),
    contractsOut: sampleCampaign.contractsOut,
    mcgrathUrl: sampleCampaign.mcgrathListingUrl || '',
    notesInternal: sampleCampaign.notesInternal || '',
    propertyType: sampleCampaign.propertyType || '',
    bedrooms: sampleCampaign.bedrooms || '',
    bathrooms: sampleCampaign.bathrooms || '',
    carSpaces: sampleCampaign.carSpaces || '',
    landSize: sampleCampaign.landSize || '',
    goLiveDate: sampleCampaign.goLiveDate || '',
    campaignMethod: sampleCampaign.campaignMethod || '',
    advertisingCopy: sampleCampaign.advertisingCopy || '',
    leadAgentName: sampleCampaign.primaryAgents[0]?.name || '',
    leadAgentProfileUrl: sampleCampaign.primaryAgents[0]?.profileUrl || '',
    leadAgentMobile: sampleCampaign.primaryAgents[0]?.mobile || '',
    secondAgentName: sampleCampaign.primaryAgents[1]?.name || '',
    secondAgentProfileUrl: sampleCampaign.primaryAgents[1]?.profileUrl || '',
    secondAgentMobile: sampleCampaign.primaryAgents[1]?.mobile || '',
    supportAgentName: sampleCampaign.supportAgent?.name || '',
    supportAgentProfileUrl: sampleCampaign.supportAgent?.profileUrl || '',
    supportAgentMobile: sampleCampaign.supportAgent?.mobile || '',
    agentContactNotes: sampleCampaign.agentContactNotes || '',
    heroImage1: sampleCampaign.heroImages[0]?.url || sampleCampaign.heroImage,
    heroImage2: sampleCampaign.heroImages[1]?.url || sampleCampaign.heroImage,
    heroImage3: sampleCampaign.heroImages[2]?.url || sampleCampaign.heroImage,
    heroImage1Alt: sampleCampaign.heroImages[0]?.altText || 'Hero image 1',
    heroImage2Alt: sampleCampaign.heroImages[1]?.altText || 'Hero image 2',
    heroImage3Alt: sampleCampaign.heroImages[2]?.altText || 'Hero image 3',
    compPrimarySuburb: sampleCampaign.compPrimarySuburb || '',
    compNearbySuburbs: sampleCampaign.compNearbySuburbs || '',
    compBedroomRule: sampleCampaign.compBedroomRule || '',
    compBathroomRule: sampleCampaign.compBathroomRule || '',
    compCarRule: sampleCampaign.compCarRule || '',
    compPriceBandPct: sampleCampaign.compPriceBandPct || '',
    compPropertyTypeRule: sampleCampaign.compPropertyTypeRule || '',
    compNotes: sampleCampaign.compNotes || '',
    projectionHeadline: sampleCampaign.projectionHeadline || '',
    recommendedStrategyLabel: sampleCampaign.recommendedStrategyLabel || '',
    recommendedStrategyBody: sampleCampaign.recommendedStrategyBody || '',
    marketConditions: sampleCampaign.marketConditions || '',
  };
}
