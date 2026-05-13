import { hashCampaignPassword } from '@/lib/security';
import { getSupabaseServiceClient } from '@/lib/supabase-server';

export async function seedInitialCampaign() {
  const supabase = getSupabaseServiceClient();

  if (!supabase) {
    return { ok: false, reason: 'missing-supabase-env' };
  }

  const passwordHash = hashCampaignPassword('Prestige27');

  const { error } = await supabase.from('campaigns').upsert(
    {
      slug: '7-wyvern-avenue-roseville',
      address: '7 Wyvern Avenue',
      suburb: 'Roseville',
      display_price: '$2.7m-$3.0m',
      campaign_heat_score: 6,
      contracts_out: 'TBC',
      status: 'draft',
      campaign_password_hash: passwordHash,
    },
    { onConflict: 'slug' },
  );

  if (error) {
    return { ok: false, reason: error.message };
  }

  return { ok: true };
}
