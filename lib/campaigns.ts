import { sampleCampaign } from '@/lib/mock-data';
import { getSupabaseServerClient } from '@/lib/supabase-server';
import type { Campaign, CampaignRecord } from '@/lib/types';

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
    .select('id, slug, address, suburb, display_price, campaign_heat_score, contracts_out, status, mcgrath_listing_url')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapCampaignRecord(data);
}

function mapCampaignRecord(record: CampaignRecord): Campaign {
  return {
    id: record.id,
    slug: record.slug,
    address: record.address,
    suburb: record.suburb,
    displayPrice: record.display_price || 'TBC',
    campaignHeat: record.campaign_heat_score ? `${record.campaign_heat_score}/10` : 'TBC',
    daysOnMarket: 'TBC',
    contractsOut: record.contracts_out || 'TBC',
    heroImage: '/placeholder-hero.jpg',
    status: record.status,
    mcgrathListingUrl: record.mcgrath_listing_url || undefined,
    requiresPassword: true,
  };
}
