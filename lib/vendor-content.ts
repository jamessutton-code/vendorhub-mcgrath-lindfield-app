import { fetchAndSummariseArticle } from '@/lib/automation';
import { sampleCampaign } from '@/lib/mock-data';
import { getSupabaseServerClient, getSupabaseServiceClient } from '@/lib/supabase-server';
import type { VendorSectionControl } from '@/lib/types';

export type VendorOutputContent = {
  latestUpdatesSummary: string;
  latestUpdatesImplication: string;
  stockTone: string;
  buyerMood: string;
  outlook: string;
  auctionHeadline: string;
  auctionCommentary: string;
  sydneyClearance: string;
  localClearance: string;
  auctionPulse: string;
  competitionOnMarket: string;
  competitionSold: string;
  pricePressure: string;
  strategicEdge: string;
  soldBenchmark: string;
  positiveFeedback: string;
  watchouts: string;
  warmHotBuyers: string;
  contractHolders: string;
  priceFeedback: string;
  campaignViews: string;
  campaignEnquiries: string;
  campaignSaves: string;
  campaignHeatDetail: string;
  marketOutlook: string;
  buyerBehaviourOutlook: string;
  pricingPressureWatch: string;
  scenarioPlanning: string;
  riskFactors: string;
  opportunityFactors: string;
  recommendedResponse: string;
  articleUrls: string;
  sectionControls?: VendorSectionControl[];
};

export async function getVendorOutputContent(slug: string): Promise<VendorOutputContent> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return getDefaultVendorOutputContent();
  }

  const { data: campaign } = await supabase
    .from('campaigns')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();

  if (!campaign?.id) {
    return getDefaultVendorOutputContent();
  }

  const [{ data: sharedUpdate }, { data: auctionUpdate }, { data: compSnapshot }, { data: projection }, { data: uploads }, { data: articleSources }] = await Promise.all([
    supabase
      .from('shared_market_updates')
      .select('market_brief, campaign_implication_template, stock_tone, buyer_mood, outlook')
      .order('effective_date', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from('auction_updates')
      .select('commentary, sydney_clearance_rate, local_clearance_rate, local_suburbs_scope')
      .order('effective_date', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from('campaign_comp_snapshots')
      .select('on_market_summary, sold_summary, price_pressure_read, strategic_edge_read')
      .eq('campaign_id', campaign.id)
      .order('effective_date', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from('campaign_projections')
      .select('market_outlook, buyer_behaviour_outlook, pricing_pressure_watch, scenario_planning, risk_factors, opportunity_factors, recommended_response')
      .eq('campaign_id', campaign.id)
      .order('effective_date', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from('uploads')
      .select('document_type, file_name')
      .eq('campaign_id', campaign.id)
      .order('uploaded_at', { ascending: false }),
    supabase
      .from('article_sources')
      .select('url, title, source_note')
      .eq('status', 'active')
      .order('created_at', { ascending: false }),
  ]);

  const vendorReportUploads = (uploads || []).filter((upload) => upload.document_type === 'vendor_report');
  const vendorReportUploadNames = vendorReportUploads.map((upload) => upload.file_name);
  let vendorExtraction = null;

  if (vendorReportUploadNames.length) {
    const { data: extractionRows } = await supabase
      .from('vendor_report_extractions')
      .select('warm_buyer_summary, hot_buyer_summary, contract_holder_summary, price_feedback_summary, positive_themes_summary, watchouts_summary, upload_id')
      .order('extracted_at', { ascending: false })
      .limit(10);

    vendorExtraction = extractionRows?.[0] || null;
  }
  const reaUploads = (uploads || []).filter((upload) => upload.document_type === 'rea');
  const domainUploads = (uploads || []).filter((upload) => upload.document_type === 'domain');

  const next: VendorOutputContent = {
    latestUpdatesSummary: sharedUpdate?.market_brief || 'Placeholder for the daily AI-generated summary of buyer confidence, stock levels, competition intensity, and likely short-term direction in the Upper North Shore market.',
    latestUpdatesImplication: sharedUpdate?.campaign_implication_template || 'Placeholder for the vendor-facing interpretation of what the broader market means for this campaign right now.',
    stockTone: sharedUpdate?.stock_tone || 'TBC',
    buyerMood: sharedUpdate?.buyer_mood || 'TBC',
    outlook: sharedUpdate?.outlook || (projection?.market_outlook || 'TBC'),
    auctionHeadline: auctionUpdate?.commentary || 'Placeholder for AI commentary combining Sydney clearance rates with local reads from SQM Research across the relevant campaign suburbs.',
    auctionCommentary: auctionUpdate?.local_suburbs_scope || 'Auction data should refresh automatically each day at around 5:00 AM AEST on the same cadence as the latest news brief.',
    sydneyClearance: auctionUpdate?.sydney_clearance_rate || 'TBC',
    localClearance: auctionUpdate?.local_clearance_rate || 'TBC',
    auctionPulse: auctionUpdate?.commentary || 'Short AI interpretation of what current clearance rates mean for current conditions.',
    competitionOnMarket: compSnapshot?.on_market_summary || 'Placeholder for the most directly relevant active competitors in the subject suburb and nearby premium pockets.',
    competitionSold: compSnapshot?.sold_summary || 'Placeholder for selected sold comparables that help anchor buyer perception, pricing confidence, and likely campaign positioning.',
    pricePressure: compSnapshot?.price_pressure_read || 'TBC',
    strategicEdge: compSnapshot?.strategic_edge_read || 'TBC',
    soldBenchmark: compSnapshot?.sold_summary || 'TBC',
    positiveFeedback: vendorExtraction?.positive_themes_summary || 'Placeholder for the strongest recurring positives buyers are responding to.',
    watchouts: vendorExtraction?.watchouts_summary || 'Placeholder for objections or recurring hesitation points that need to be handled.',
    warmHotBuyers: [vendorExtraction?.hot_buyer_summary, vendorExtraction?.warm_buyer_summary].filter(Boolean).join(' | ') || 'This area will pull forward the buyers showing the strongest level of intent and make them impossible to miss.',
    contractHolders: vendorExtraction?.contract_holder_summary || `${vendorReportUploads.length ? `${vendorReportUploads.length} vendor report upload(s)` : 'TBC'} tracking contract-holder signals`,
    priceFeedback: vendorExtraction?.price_feedback_summary || 'TBC',
    campaignViews: reaUploads.length ? `${reaUploads.length} REA report(s)` : 'TBC',
    campaignEnquiries: domainUploads.length ? `${domainUploads.length} Domain report(s)` : 'TBC',
    campaignSaves: vendorReportUploads.length ? `${vendorReportUploads.length} vendor report(s)` : 'TBC',
    campaignHeatDetail: sampleCampaign.campaignHeat,
    marketOutlook: projection?.market_outlook || 'TBC',
    buyerBehaviourOutlook: projection?.buyer_behaviour_outlook || 'TBC',
    pricingPressureWatch: projection?.pricing_pressure_watch || 'TBC',
    scenarioPlanning: projection?.scenario_planning || 'TBC',
    riskFactors: projection?.risk_factors || 'TBC',
    opportunityFactors: projection?.opportunity_factors || 'TBC',
    recommendedResponse: projection?.recommended_response || 'TBC',
    articleUrls: (articleSources || []).map((article) => article.url).join('\n'),
  };

  next.sectionControls = buildSectionControls(next);
  return next;
}

export async function saveVendorOutputContent(slug: string, content: VendorOutputContent) {
  const supabase = getSupabaseServiceClient();

  if (!supabase) {
    return;
  }

  const { data: campaign } = await supabase
    .from('campaigns')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();

  if (!campaign?.id) {
    throw new Error('Campaign not found.');
  }

  const today = new Date().toISOString().slice(0, 10);

  await Promise.all([
    supabase.from('shared_market_updates').insert({
      effective_date: today,
      market_brief: content.latestUpdatesSummary || null,
      campaign_implication_template: content.latestUpdatesImplication || null,
      stock_tone: content.stockTone || null,
      buyer_mood: content.buyerMood || null,
      outlook: content.outlook || null,
    }),
    supabase.from('auction_updates').insert({
      effective_date: today,
      commentary: content.auctionHeadline || null,
      sydney_clearance_rate: content.sydneyClearance || null,
      local_clearance_rate: content.localClearance || null,
      local_suburbs_scope: content.auctionCommentary || null,
    }),
    supabase.from('campaign_comp_snapshots').insert({
      campaign_id: campaign.id,
      effective_date: today,
      on_market_summary: content.competitionOnMarket || null,
      sold_summary: content.competitionSold || null,
      price_pressure_read: content.pricePressure || null,
      strategic_edge_read: content.strategicEdge || null,
    }),
    supabase.from('campaign_projections').insert({
      campaign_id: campaign.id,
      effective_date: today,
      market_outlook: content.marketOutlook || content.outlook || null,
      buyer_behaviour_outlook: content.buyerBehaviourOutlook || null,
      pricing_pressure_watch: content.pricingPressureWatch || null,
      scenario_planning: content.scenarioPlanning || null,
      risk_factors: content.riskFactors || null,
      opportunity_factors: content.opportunityFactors || null,
      recommended_response: content.recommendedResponse || null,
    }),
    supabase.from('market_conditions_inputs').insert({
      effective_date: today,
      entered_by: 'admin',
      notes: content.priceFeedback || null,
    }),
  ]);

  const urls = content.articleUrls
    .split('\n')
    .map((url) => url.trim())
    .filter(Boolean);

  if (urls.length) {
    for (const url of urls) {
      const { fetchedText, summary } = await fetchAndSummariseArticle(url);
      await supabase.from('article_sources').insert({
        url,
        status: 'active',
        fetched_text: fetchedText || null,
        generated_summary: summary || null,
      });
    }

    const { data: activeArticles } = await supabase
      .from('article_sources')
      .select('id')
      .eq('status', 'active')
      .order('created_at', { ascending: true });

    if ((activeArticles || []).length > 15) {
      const overflow = activeArticles!.slice(0, activeArticles!.length - 15).map((article) => article.id);
      if (overflow.length) {
        await supabase.from('article_sources').delete().in('id', overflow);
      }
    }
  }
}

function getDefaultVendorOutputContent(): VendorOutputContent {
  const next: VendorOutputContent = {
    latestUpdatesSummary: 'Placeholder for the daily AI-generated summary of buyer confidence, stock levels, competition intensity, and likely short-term direction in the Upper North Shore market.',
    latestUpdatesImplication: 'Placeholder for the vendor-facing interpretation of what the broader market means for this campaign right now.',
    stockTone: 'TBC',
    buyerMood: 'TBC',
    outlook: 'TBC',
    auctionHeadline: 'Placeholder for AI commentary combining Sydney clearance rates with local reads from SQM Research across the relevant campaign suburbs.',
    auctionCommentary: 'Auction data should refresh automatically each day at around 5:00 AM AEST on the same cadence as the latest news brief.',
    sydneyClearance: 'TBC',
    localClearance: 'TBC',
    auctionPulse: 'TBC',
    competitionOnMarket: 'Placeholder for the most directly relevant active competitors in the subject suburb and nearby premium pockets.',
    competitionSold: 'Placeholder for selected sold comparables that help anchor buyer perception, pricing confidence, and likely campaign positioning.',
    pricePressure: 'TBC',
    strategicEdge: 'TBC',
    soldBenchmark: 'TBC',
    positiveFeedback: 'Placeholder for the strongest recurring positives buyers are responding to.',
    watchouts: 'Placeholder for objections or recurring hesitation points that need to be handled.',
    warmHotBuyers: 'This area will pull forward the buyers showing the strongest level of intent and make them impossible to miss.',
    contractHolders: 'TBC',
    priceFeedback: 'TBC',
    campaignViews: 'TBC',
    campaignEnquiries: 'TBC',
    campaignSaves: 'TBC',
    campaignHeatDetail: sampleCampaign.campaignHeat,
    marketOutlook: 'TBC',
    buyerBehaviourOutlook: 'TBC',
    pricingPressureWatch: 'TBC',
    scenarioPlanning: 'TBC',
    riskFactors: 'TBC',
    opportunityFactors: 'TBC',
    recommendedResponse: 'TBC',
    articleUrls: '',
  };

  next.sectionControls = buildSectionControls(next);
  return next;
}

function buildSectionControls(content: VendorOutputContent): VendorSectionControl[] {
  const today = new Date().toISOString().slice(0, 10);

  return [
    {
      key: 'updates',
      label: 'Latest Updates',
      status: hasVendorFacingContent([content.latestUpdatesSummary, content.latestUpdatesImplication]) ? 'approved' : 'draft',
      lastUpdated: today,
      internalSummary: content.articleUrls || 'No shared article set entered yet.',
      vendorSummary: content.latestUpdatesSummary || '',
      sourceBasis: 'Shared article inputs and current market pulse',
    },
    {
      key: 'auction',
      label: 'Auction Updates',
      status: hasVendorFacingContent([content.auctionHeadline, content.auctionCommentary]) ? 'approved' : 'draft',
      lastUpdated: today,
      internalSummary: [content.sydneyClearance, content.localClearance].filter(Boolean).join(' | ') || 'No auction evidence loaded yet.',
      vendorSummary: content.auctionHeadline || '',
      sourceBasis: 'Auction-rate inputs and commentary',
    },
    {
      key: 'competition',
      label: 'Market Competition',
      status: hasVendorFacingContent([content.competitionOnMarket, content.competitionSold]) ? 'approved' : 'draft',
      lastUpdated: today,
      internalSummary: [content.pricePressure, content.strategicEdge].filter(Boolean).join(' | ') || 'No competition interpretation loaded yet.',
      vendorSummary: content.competitionOnMarket || '',
      sourceBasis: 'Campaign-specific competition evidence',
    },
    {
      key: 'feedback',
      label: 'Buyer Feedback',
      status: hasVendorFacingContent([content.positiveFeedback, content.watchouts, content.warmHotBuyers]) ? 'approved' : 'draft',
      lastUpdated: today,
      internalSummary: [content.contractHolders, content.priceFeedback].filter(Boolean).join(' | ') || 'No feedback evidence loaded yet.',
      vendorSummary: content.positiveFeedback || '',
      sourceBasis: 'Vendor reports and buyer response signals',
    },
    {
      key: 'projections',
      label: 'Projections',
      status: hasVendorFacingContent([content.marketOutlook, content.recommendedResponse]) ? 'approved' : 'draft',
      lastUpdated: today,
      internalSummary: [content.riskFactors, content.opportunityFactors].filter(Boolean).join(' | ') || 'No strategic rationale loaded yet.',
      vendorSummary: content.recommendedResponse || '',
      sourceBasis: 'Internal interpretation and recommendation',
    },
  ];
}

function hasVendorFacingContent(values: Array<string | undefined>) {
  return values.some((value) => Boolean(value && value.trim() && !value.startsWith('Placeholder') && value !== 'TBC'));
}
