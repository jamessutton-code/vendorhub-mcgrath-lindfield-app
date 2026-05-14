import { NextResponse } from 'next/server';
import { extractReportData, summariseText } from '@/lib/automation';
import { getSupabaseServiceClient } from '@/lib/supabase-server';
import { saveVendorOutputContent } from '@/lib/vendor-content';

export async function GET() {
  const supabase = getSupabaseServiceClient();

  if (!supabase) {
    return NextResponse.json({ ok: false, message: 'Missing Supabase service credentials.' }, { status: 500 });
  }

  const { data: campaigns, error } = await supabase.from('campaigns').select('id, slug, campaign_heat_score');

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  for (const campaign of campaigns || []) {
    const [{ data: articleSources }, { data: textInputs }, { data: projections }, { data: compRules }] = await Promise.all([
      supabase.from('article_sources').select('generated_summary, fetched_text, url').eq('status', 'active').order('created_at', { ascending: false }).limit(15),
      supabase.from('upload_text_inputs').select('document_type, source_text, created_at').eq('campaign_id', campaign.id).order('created_at', { ascending: false }).limit(20),
      supabase.from('campaign_projections').select('recommended_response').eq('campaign_id', campaign.id).order('effective_date', { ascending: false }).limit(1).maybeSingle(),
      supabase.from('campaign_comp_rules').select('primary_suburb, notes').eq('campaign_id', campaign.id).order('created_at', { ascending: false }).limit(1).maybeSingle(),
    ]);

    const latestVendorReport = (textInputs || []).find((item) => item.document_type === 'vendor_report');
    const latestRea = (textInputs || []).find((item) => item.document_type === 'rea');
    const latestDomain = (textInputs || []).find((item) => item.document_type === 'domain');
    const latestDigital = (textInputs || []).find((item) => item.document_type === 'mcgrath_digital');

    const reportData = latestVendorReport ? extractReportData('vendor_report', latestVendorReport.source_text) : null;
    const articleSummary = summariseText((articleSources || []).map((article) => article.generated_summary || article.fetched_text || article.url).join(' '), 900);

    await saveVendorOutputContent(campaign.slug, {
      latestUpdatesSummary: articleSummary || 'No article summaries available yet.',
      latestUpdatesImplication: articleSummary ? `Current article set suggests: ${summariseText(articleSummary, 260)}` : 'Add articles to generate a market implication summary.',
      stockTone: articleSummary ? 'Live' : 'TBC',
      buyerMood: articleSummary ? 'Tracking' : 'TBC',
      outlook: articleSummary ? summariseText(articleSummary, 120) : 'TBC',
      auctionHeadline: 'Daily refresh scaffold in place for auction commentary.',
      auctionCommentary: 'Auction section is ready for automated SQM-driven commentary once the source feed is connected.',
      sydneyClearance: 'TBC',
      localClearance: 'TBC',
      auctionPulse: 'TBC',
      competitionOnMarket: latestRea ? summariseText(latestRea.source_text, 320) : 'Awaiting REA on-market report input.',
      competitionSold: latestDomain ? summariseText(latestDomain.source_text, 320) : 'Awaiting Domain sold report input.',
      pricePressure: latestDomain ? summariseText(latestDomain.source_text, 120) : 'TBC',
      strategicEdge: latestDigital ? summariseText(latestDigital.source_text, 120) : (compRules?.primary_suburb || 'TBC'),
      soldBenchmark: latestDomain ? summariseText(latestDomain.source_text, 120) : 'TBC',
      positiveFeedback: reportData?.positiveFeedback || 'Awaiting vendor report text input.',
      watchouts: reportData?.watchouts || 'Awaiting vendor report text input.',
      warmHotBuyers: [reportData?.hotBuyers, reportData?.warmBuyers].filter(Boolean).join(' | ') || 'Awaiting vendor report text input.',
      contractHolders: reportData?.contractHolders || 'TBC',
      priceFeedback: reportData?.priceFeedback || 'TBC',
      campaignViews: latestRea ? 'REA report loaded' : 'TBC',
      campaignEnquiries: latestDomain ? 'Domain report loaded' : 'TBC',
      campaignSaves: latestDigital ? 'McGrath Digital loaded' : 'TBC',
      campaignHeatDetail: campaign.campaign_heat_score ? `${campaign.campaign_heat_score}/10` : 'TBC',
      marketOutlook: articleSummary ? summariseText(articleSummary, 140) : 'TBC',
      buyerBehaviourOutlook: reportData?.warmBuyers || 'TBC',
      pricingPressureWatch: latestDomain ? summariseText(latestDomain.source_text, 140) : 'TBC',
      scenarioPlanning: projections?.recommended_response || 'TBC',
      riskFactors: reportData?.watchouts || 'TBC',
      opportunityFactors: reportData?.positiveFeedback || 'TBC',
      recommendedResponse: projections?.recommended_response || articleSummary || 'TBC',
      articleUrls: (articleSources || []).map((article) => article.url).join('\n'),
    });
  }

  return NextResponse.json({ ok: true, campaigns: campaigns?.length || 0, message: 'Daily refresh completed.' });
}
