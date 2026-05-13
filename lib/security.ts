import crypto from 'node:crypto';

export function hashCampaignPassword(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function verifyCampaignPassword(password: string, hash: string) {
  const passwordHash = hashCampaignPassword(password);
  return crypto.timingSafeEqual(Buffer.from(passwordHash), Buffer.from(hash));
}
