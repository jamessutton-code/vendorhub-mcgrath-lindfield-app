const REAL_ESTATE_WORDS = [
  'Auction',
  'Prestige',
  'Harbour',
  'Listing',
  'Vendor',
  'Keys',
  'Market',
  'Reserve',
  'Sold',
  'Inspect',
  'Domain',
  'Campaign',
];

export function generateCampaignPassword() {
  const word = REAL_ESTATE_WORDS[Math.floor(Math.random() * REAL_ESTATE_WORDS.length)];
  const number = Math.floor(Math.random() * 90) + 10;
  return `${word}${number}`;
}
