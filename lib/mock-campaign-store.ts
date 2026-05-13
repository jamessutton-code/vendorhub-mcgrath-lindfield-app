import type { Campaign } from '@/lib/types';

const campaignDrafts = new Map<string, Campaign>();

export function saveMockCampaign(campaign: Campaign) {
  campaignDrafts.set(campaign.slug, campaign);
}

export function getMockCampaign(slug: string) {
  return campaignDrafts.get(slug) || null;
}
