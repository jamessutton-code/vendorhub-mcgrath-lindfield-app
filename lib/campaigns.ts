import { sampleCampaign } from '@/lib/mock-data';
import { getSupabaseServerClient } from '@/lib/supabase-server';
import { getVendorOutputContent } from '@/lib/vendor-content';
import type {
  Campaign,
  CampaignAgent,
  CampaignCompRuleRecord,
  CampaignImage,
  CampaignProjectionRecord,
  CampaignRecord,
  MarketConditionsInputRecord,
} from '@/lib/types';

export async function getCampaignBySlug(slug: string): Promise<Campaign | null> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    if (sampleCampaign.slug === slug) {
      return sampleCampaign;
    }

    return { ...sampleCampaign, slug, requiresPassword: true };
  }

  const { data, error } = await supabase
    .from('campaigns')
    .select('id, slug, address, suburb, display_price, campaign_heat_score, contracts_out, status, mcgrath_listing_url, property_type, bedrooms, bathrooms, car_spaces, land_size, go_live_date, campaign_method, advertising_copy, notes_internal')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  const [{ data: agents }, { data: images }, { data: compRules }, { data: projections }, { data: marketConditions }, content] = await Promise.all([
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
    getVendorOutputContent(slug),
  ]);

  return mapCampaignRecord(data, agents || [], images || [], compRules || null, projections || null, marketConditions || null, content);
}

function mapCampaignRecord(
  record: CampaignRecord,
  agents: any[],
  images: any[],
  compRules: CampaignCompRuleRecord | null,
  projections: CampaignProjectionRecord | null,
  marketConditions: MarketConditionsInputRecord | null,
  content: Awaited<ReturnType<typeof getVendorOutputContent>>,
): Campaign {
  const mappedAgents: CampaignAgent[] = agents.map((agent) => ({
    role: agent.role,
    name: agent.name,
    profileUrl: agent.profile_url || undefined,
    mobile: agent.mobile || undefined,
    sortOrder: agent.sort_order || 0,
  }));

  const primaryAgents = mappedAgents.filter((agent) => agent.role === 'lead' || agent.role === 'second').sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  const supportAgent = mappedAgents.find((agent) => agent.role === 'support');

  const heroImages: CampaignImage[] = images.length
    ? images.map((image) => ({
        kind: image.kind,
        url: image.storage_path,
        altText: image.alt_text || undefined,
        sortOrder: image.sort_order || 0,
      }))
    : sampleCampaign.heroImages;

  const goLiveDate = record.go_live_date || '';
  const daysOnMarket = getDaysOnMarket(goLiveDate);

  return {
    id: record.id,
    slug: record.slug,
    address: record.address,
    suburb: record.suburb,
    displayPrice: record.display_price || 'TBC',
    campaignHeat: record.campaign_heat_score ? `${record.campaign_heat_score}/10` : 'TBC',
    daysOnMarket,
    contractsOut: record.contracts_out || 'TBC',
    heroImage: heroImages[0]?.url || sampleCampaign.heroImage,
    heroImages,
    status: record.status,
    mcgrathListingUrl: record.mcgrath_listing_url || undefined,
    requiresPassword: true,
    propertyType: record.property_type || undefined,
    bedrooms: record.bedrooms != null ? String(record.bedrooms) : undefined,
    bathrooms: record.bathrooms != null ? String(record.bathrooms) : undefined,
    carSpaces: record.car_spaces != null ? String(record.car_spaces) : undefined,
    landSize: record.land_size || undefined,
    goLiveDate,
    campaignMethod: record.campaign_method || undefined,
    advertisingCopy: record.advertising_copy || undefined,
    notesInternal: record.notes_internal || undefined,
    primaryAgents: primaryAgents.length ? primaryAgents : sampleCampaign.primaryAgents,
    supportAgent: supportAgent || sampleCampaign.supportAgent,
    agentContactNotes: mappedAgents.filter((agent) => agent.mobile).map((agent) => `${agent.name} | ${agent.mobile}`).join('\n') || sampleCampaign.agentContactNotes,
    compPrimarySuburb: compRules?.primary_suburb || undefined,
    compNearbySuburbs: compRules?.allowed_nearby_suburbs || undefined,
    compBedroomRule: compRules?.bedroom_rule || undefined,
    compBathroomRule: compRules?.bathroom_rule || undefined,
    compCarRule: compRules?.car_rule || undefined,
    compPriceBandPct: compRules?.price_band_pct != null ? String(compRules.price_band_pct) : undefined,
    compPropertyTypeRule: compRules?.property_type_rule || undefined,
    compNotes: compRules?.notes || undefined,
    projectionHeadline: projections?.market_outlook || undefined,
    recommendedStrategyLabel: projections?.buyer_behaviour_outlook || undefined,
    recommendedStrategyBody: projections?.recommended_response || undefined,
    marketConditions: marketConditions?.notes || undefined,
    content,
  };
}

function getDaysOnMarket(goLiveDate: string) {
  if (!goLiveDate) {
    return 'TBC';
  }

  const liveDate = new Date(goLiveDate);
  if (Number.isNaN(liveDate.getTime())) {
    return 'TBC';
  }

  const today = new Date();
  const diffMs = today.getTime() - liveDate.getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  return String(diffDays);
}
