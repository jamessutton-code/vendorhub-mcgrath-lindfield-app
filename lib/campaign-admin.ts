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
};

export async function getCampaignAdminData(slug: string): Promise<CampaignAdminData> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return {
      slug,
      address: '7 Wyvern Avenue',
      suburb: 'Roseville',
      displayPrice: '$2.7m-$3.0m',
      campaignHeat: '6',
      contractsOut: 'TBC',
      mcgrathUrl: '',
      notesInternal: '',
      propertyType: 'House',
      bedrooms: '3',
      bathrooms: '3',
      carSpaces: '2',
      landSize: '860sqm',
      goLiveDate: '',
      campaignMethod: 'Auction',
    };
  }

  const { data } = await supabase
    .from('campaigns')
    .select('slug, address, suburb, display_price, campaign_heat_score, contracts_out, mcgrath_listing_url, notes_internal, property_type, bedrooms, bathrooms, car_spaces, land_size, go_live_date, campaign_method')
    .eq('slug', slug)
    .maybeSingle();

  return {
    slug,
    address: data?.address || 'Unknown address',
    suburb: data?.suburb || 'Unknown suburb',
    displayPrice: data?.display_price || '',
    campaignHeat: data?.campaign_heat_score ? String(data.campaign_heat_score) : '',
    contractsOut: data?.contracts_out || '',
    mcgrathUrl: data?.mcgrath_listing_url || '',
    notesInternal: data?.notes_internal || '',
    propertyType: data?.property_type || '',
    bedrooms: data?.bedrooms != null ? String(data.bedrooms) : '',
    bathrooms: data?.bathrooms != null ? String(data.bathrooms) : '',
    carSpaces: data?.car_spaces != null ? String(data.car_spaces) : '',
    landSize: data?.land_size || '',
    goLiveDate: data?.go_live_date || '',
    campaignMethod: data?.campaign_method || '',
  };
}
