'use server';

import { redirect } from 'next/navigation';
import type { VendorSectionControl } from '@/lib/types';
import { saveVendorOutputContent, type VendorOutputContent } from '@/lib/vendor-content';

export async function saveVendorOutputsAction(formData: FormData) {
  const slug = String(formData.get('slug') || '').trim();

  if (!slug) {
    throw new Error('Campaign slug is required.');
  }

  const sectionControls: VendorSectionControl[] = [
    buildSectionControl(formData, 'updates', 'Latest Updates'),
    buildSectionControl(formData, 'auction', 'Auction Updates'),
    buildSectionControl(formData, 'competition', 'Market Competition'),
    buildSectionControl(formData, 'feedback', 'Buyer Feedback'),
    buildSectionControl(formData, 'projections', 'Projections'),
  ];

  const content: VendorOutputContent = {
    latestUpdatesSummary: String(formData.get('latestUpdatesSummary') || '').trim(),
    latestUpdatesImplication: String(formData.get('latestUpdatesImplication') || '').trim(),
    stockTone: String(formData.get('stockTone') || '').trim(),
    buyerMood: String(formData.get('buyerMood') || '').trim(),
    outlook: String(formData.get('outlook') || '').trim(),
    auctionHeadline: String(formData.get('auctionHeadline') || '').trim(),
    auctionCommentary: String(formData.get('auctionCommentary') || '').trim(),
    sydneyClearance: String(formData.get('sydneyClearance') || '').trim(),
    localClearance: String(formData.get('localClearance') || '').trim(),
    auctionPulse: String(formData.get('auctionPulse') || '').trim(),
    competitionOnMarket: String(formData.get('competitionOnMarket') || '').trim(),
    competitionSold: String(formData.get('competitionSold') || '').trim(),
    pricePressure: String(formData.get('pricePressure') || '').trim(),
    strategicEdge: String(formData.get('strategicEdge') || '').trim(),
    soldBenchmark: String(formData.get('soldBenchmark') || '').trim(),
    positiveFeedback: String(formData.get('positiveFeedback') || '').trim(),
    watchouts: String(formData.get('watchouts') || '').trim(),
    warmHotBuyers: String(formData.get('warmHotBuyers') || '').trim(),
    contractHolders: String(formData.get('contractHolders') || '').trim(),
    priceFeedback: String(formData.get('priceFeedback') || '').trim(),
    campaignViews: String(formData.get('campaignViews') || '').trim(),
    campaignEnquiries: String(formData.get('campaignEnquiries') || '').trim(),
    campaignSaves: String(formData.get('campaignSaves') || '').trim(),
    campaignHeatDetail: String(formData.get('campaignHeatDetail') || '').trim(),
    marketOutlook: String(formData.get('marketOutlook') || '').trim(),
    buyerBehaviourOutlook: String(formData.get('buyerBehaviourOutlook') || '').trim(),
    pricingPressureWatch: String(formData.get('pricingPressureWatch') || '').trim(),
    scenarioPlanning: String(formData.get('scenarioPlanning') || '').trim(),
    riskFactors: String(formData.get('riskFactors') || '').trim(),
    opportunityFactors: String(formData.get('opportunityFactors') || '').trim(),
    recommendedResponse: String(formData.get('recommendedResponse') || '').trim(),
    articleUrls: String(formData.get('articleUrls') || '').trim(),
    sectionControls,
  };

  await saveVendorOutputContent(slug, content);
  redirect(`/admin/campaigns/${slug}?outputs=1`);
}

function buildSectionControl(formData: FormData, key: VendorSectionControl['key'], label: string): VendorSectionControl {
  return {
    key,
    label,
    status: String(formData.get(`${key}Status`) || 'draft').trim() === 'approved' ? 'approved' : 'draft',
    lastUpdated: new Date().toISOString().slice(0, 10),
    internalSummary: String(formData.get(`${key}InternalSummary`) || '').trim(),
    vendorSummary: String(formData.get(`${key}VendorSummary`) || '').trim(),
    sourceBasis: String(formData.get(`${key}SourceBasis`) || '').trim(),
  };
}
