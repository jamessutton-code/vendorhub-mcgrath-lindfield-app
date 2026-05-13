export type Campaign = {
  id?: string;
  slug: string;
  address: string;
  suburb: string;
  displayPrice: string;
  campaignHeat: string;
  daysOnMarket: string;
  contractsOut: string;
  heroImage: string;
  status?: string;
  mcgrathListingUrl?: string;
  requiresPassword?: boolean;
};

export type CampaignRecord = {
  id: string;
  slug: string;
  address: string;
  suburb: string;
  display_price: string | null;
  campaign_heat_score: number | null;
  contracts_out: string | null;
  status: string;
  mcgrath_listing_url: string | null;
};
