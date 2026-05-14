'use server';

import { redirect } from 'next/navigation';
import { SALES_AGENTS, SUPPORT_AGENTS } from '@/lib/agents';
import { generateCampaignPassword } from '@/lib/passwords';
import { slugifyAddress } from '@/lib/format';
import { getSupabaseServiceClient } from '@/lib/supabase-server';
import { hashCampaignPassword } from '@/lib/security';

export async function createCampaignAction(formData: FormData) {
  const address = String(formData.get('address') || '').trim();
  const suburb = String(formData.get('suburb') || '').trim();
  const displayPrice = String(formData.get('displayPrice') || '').trim();
  const slugInput = String(formData.get('slug') || '').trim();
  const slug = slugInput || slugifyAddress(`${address} ${suburb}`.trim());
  const generatedPassword = String(formData.get('generatedPassword') || '').trim() || generateCampaignPassword();
  const propertyType = String(formData.get('propertyType') || '').trim();
  const bedrooms = String(formData.get('bedrooms') || '').trim();
  const bathrooms = String(formData.get('bathrooms') || '').trim();
  const carSpaces = String(formData.get('carSpaces') || '').trim();
  const landSize = String(formData.get('landSize') || '').trim();
  const goLiveDate = String(formData.get('goLiveDate') || '').trim();
  const campaignMethod = String(formData.get('campaignMethod') || '').trim();
  const advertisingCopy = String(formData.get('advertisingCopy') || '').trim();
  const initialProjection = String(formData.get('initialProjection') || '').trim();
  const mcgrathUrl = String(formData.get('mcgrathUrl') || '').trim();
  const compRules = String(formData.get('compRules') || '').trim();
  const agentNotes = String(formData.get('agentNotes') || '').trim();
  const firstAgent = String(formData.get('firstAgent') || '').trim();
  const secondAgent = String(formData.get('secondAgent') || '').trim();
  const supportAgent = String(formData.get('supportAgent') || '').trim();
  const marketPulse = String(formData.get('marketPulse') || '').trim();
  const articleUrlsRaw = String(formData.get('articleUrls') || '').trim();
  const hashedPassword = hashCampaignPassword(generatedPassword);

  if (!address || !suburb || !slug) {
    throw new Error('Address, suburb, and slug are required.');
  }

  const supabase = getSupabaseServiceClient();

  if (!supabase) {
    redirect(`/admin/campaigns?draftSlug=${encodeURIComponent(slug)}`);
  }

  const { data: campaign, error } = await supabase
    .from('campaigns')
    .insert({
      slug,
      address,
      suburb,
      display_price: displayPrice || null,
      campaign_heat_score: null,
      contracts_out: null,
      status: 'draft',
      campaign_password_hash: hashedPassword,
      property_type: propertyType || null,
      bedrooms: parseOptionalNumber(bedrooms),
      bathrooms: parseOptionalNumber(bathrooms),
      car_spaces: parseOptionalNumber(carSpaces),
      land_size: landSize || null,
      go_live_date: goLiveDate || null,
      campaign_method: campaignMethod || null,
      mcgrath_listing_url: mcgrathUrl || null,
      advertising_copy: advertisingCopy || null,
      notes_internal: agentNotes || null,
    })
    .select('id')
    .single();

  if (error || !campaign) {
    throw new Error(error?.message || 'Campaign creation failed.');
  }

  const agentRows = [
    firstAgent ? buildAgentRow(campaign.id, 'lead', firstAgent, 0) : null,
    secondAgent ? buildAgentRow(campaign.id, 'second', secondAgent, 1) : null,
    supportAgent ? buildAgentRow(campaign.id, 'support', supportAgent, 2) : null,
  ].filter(Boolean);

  if (agentRows.length) {
    const { error: agentError } = await supabase.from('campaign_agents').insert(agentRows);
    if (agentError) {
      throw new Error(agentError.message);
    }
  }

  if (compRules) {
    const { error: compError } = await supabase.from('campaign_comp_rules').insert({
      campaign_id: campaign.id,
      notes: compRules,
      primary_suburb: suburb,
      price_band_pct: 10,
    });
    if (compError) {
      throw new Error(compError.message);
    }
  }

  if (initialProjection) {
    const { error: projectionError } = await supabase.from('campaign_projections').insert({
      campaign_id: campaign.id,
      effective_date: goLiveDate || new Date().toISOString().slice(0, 10),
      recommended_response: initialProjection,
    });
    if (projectionError) {
      throw new Error(projectionError.message);
    }
  }

  if (marketPulse) {
    const { error: marketError } = await supabase.from('market_conditions_inputs').insert({
      effective_date: new Date().toISOString().slice(0, 10),
      entered_by: 'admin',
      notes: marketPulse,
    });
    if (marketError) {
      throw new Error(marketError.message);
    }
  }

  const articleUrls = articleUrlsRaw.split('\n').map((url) => url.trim()).filter(Boolean);
  if (articleUrls.length) {
    const { error: articleError } = await supabase.from('article_sources').insert(
      articleUrls.map((url) => ({ url, status: 'active' })),
    );
    if (articleError) {
      throw new Error(articleError.message);
    }
  }

  redirect(`/admin/campaigns/${encodeURIComponent(slug)}?created=1`);
}

function parseOptionalNumber(value: string) {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function buildAgentRow(campaignId: string, role: 'lead' | 'second' | 'support', name: string, sortOrder: number) {
  const source = role === 'support'
    ? SUPPORT_AGENTS.find((agent) => agent.name === name)
    : SALES_AGENTS.find((agent) => agent.name === name);

  return {
    campaign_id: campaignId,
    role,
    name,
    profile_url: source?.profileUrl || null,
    sort_order: sortOrder,
  };
}
