export type CampaignAgentRole = 'lead' | 'second' | 'support';

export type CampaignAgent = {
  role: CampaignAgentRole;
  name: string;
  profileUrl?: string;
  mobile?: string;
  sortOrder?: number;
};

export type CampaignImage = {
  kind: 'hero1' | 'hero2' | 'hero3';
  url: string;
  altText?: string;
  sortOrder?: number;
};

export type VendorSectionStatus = 'draft' | 'approved';

export type VendorSectionKey = 'updates' | 'auction' | 'competition' | 'feedback' | 'projections';

export type VendorSectionControl = {
  key: VendorSectionKey;
  label: string;
  status: VendorSectionStatus;
  lastUpdated?: string;
  internalSummary?: string;
  vendorSummary?: string;
  sourceBasis?: string;
};

export type VendorContent = {
  latestUpdatesSummary?: string;
  latestUpdatesImplication?: string;
  stockTone?: string;
  buyerMood?: string;
  outlook?: string;
  auctionHeadline?: string;
  auctionCommentary?: string;
  sydneyClearance?: string;
  localClearance?: string;
  auctionPulse?: string;
  competitionOnMarket?: string;
  competitionSold?: string;
  pricePressure?: string;
  strategicEdge?: string;
  soldBenchmark?: string;
  positiveFeedback?: string;
  watchouts?: string;
  warmHotBuyers?: string;
  contractHolders?: string;
  priceFeedback?: string;
  campaignViews?: string;
  campaignEnquiries?: string;
  campaignSaves?: string;
  campaignHeatDetail?: string;
  marketOutlook?: string;
  buyerBehaviourOutlook?: string;
  pricingPressureWatch?: string;
  scenarioPlanning?: string;
  riskFactors?: string;
  opportunityFactors?: string;
  recommendedResponse?: string;
  articleUrls?: string;
  sectionControls?: VendorSectionControl[];
};

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
  heroImages: CampaignImage[];
  status?: string;
  mcgrathListingUrl?: string;
  requiresPassword?: boolean;
  propertyType?: string;
  bedrooms?: string;
  bathrooms?: string;
  carSpaces?: string;
  landSize?: string;
  goLiveDate?: string;
  campaignMethod?: string;
  advertisingCopy?: string;
  notesInternal?: string;
  primaryAgents: CampaignAgent[];
  supportAgent?: CampaignAgent;
  agentContactNotes?: string;
  compPrimarySuburb?: string;
  compNearbySuburbs?: string;
  compBedroomRule?: string;
  compBathroomRule?: string;
  compCarRule?: string;
  compPriceBandPct?: string;
  compPropertyTypeRule?: string;
  compNotes?: string;
  projectionHeadline?: string;
  recommendedStrategyLabel?: string;
  recommendedStrategyBody?: string;
  marketConditions?: string;
  content?: VendorContent;
  sectionControls?: VendorSectionControl[];
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
  property_type?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  car_spaces?: number | null;
  land_size?: string | null;
  go_live_date?: string | null;
  campaign_method?: string | null;
  advertising_copy?: string | null;
  notes_internal?: string | null;
};

export type CampaignAgentRecord = {
  role: CampaignAgentRole;
  name: string;
  profile_url: string | null;
  mobile: string | null;
  sort_order: number | null;
};

export type CampaignImageRecord = {
  kind: 'hero1' | 'hero2' | 'hero3';
  storage_path: string;
  alt_text: string | null;
  sort_order: number | null;
};

export type CampaignCompRuleRecord = {
  primary_suburb: string | null;
  allowed_nearby_suburbs: string | null;
  bedroom_rule: string | null;
  bathroom_rule: string | null;
  car_rule: string | null;
  price_band_pct: number | null;
  property_type_rule: string | null;
  notes: string | null;
};

export type CampaignProjectionRecord = {
  market_outlook: string | null;
  buyer_behaviour_outlook: string | null;
  pricing_pressure_watch: string | null;
  scenario_planning: string | null;
  risk_factors: string | null;
  opportunity_factors: string | null;
  recommended_response: string | null;
};

export type MarketConditionsInputRecord = {
  notes: string | null;
};
