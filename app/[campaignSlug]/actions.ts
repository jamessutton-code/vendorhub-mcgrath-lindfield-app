'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSupabaseServerClient } from '@/lib/supabase-server';
import { verifyCampaignPassword } from '@/lib/security';

export async function unlockCampaignAction(formData: FormData) {
  const slug = String(formData.get('slug') || '').trim();
  const password = String(formData.get('password') || '');

  if (!slug || !password) {
    redirect(`/${slug}`);
  }

  const supabase = getSupabaseServerClient();

  if (!supabase) {
    const cookieStore = await cookies();
    cookieStore.set(`vendorhub:${slug}`, 'unlocked', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8,
    });
    redirect(`/${slug}`);
  }

  const { data, error } = await supabase
    .from('campaigns')
    .select('campaign_password_hash')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data?.campaign_password_hash) {
    redirect(`/${slug}`);
  }

  const isValid = verifyCampaignPassword(password, data.campaign_password_hash);

  if (!isValid) {
    redirect(`/${slug}?error=invalid-password`);
  }

  const cookieStore = await cookies();
  cookieStore.set(`vendorhub:${slug}`, 'unlocked', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  });

  redirect(`/${slug}`);
}
