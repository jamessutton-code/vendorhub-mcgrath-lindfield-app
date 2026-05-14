type ExtractedReport = {
  contractsOut: string;
  positiveFeedback: string;
  watchouts: string;
  warmBuyers: string;
  hotBuyers: string;
  contractHolders: string;
  priceFeedback: string;
};

export function summariseText(text: string, maxLength = 420) {
  const cleaned = normaliseWhitespace(text);
  if (!cleaned) return '';
  if (cleaned.length <= maxLength) return cleaned;
  return `${cleaned.slice(0, maxLength - 1).trimEnd()}…`;
}

export function extractReportData(documentType: string, sourceText: string): ExtractedReport {
  const text = normaliseWhitespace(sourceText);
  const contractsOutMatch = text.match(/contracts?\s+out[^\d]*(\d+)/i);

  return {
    contractsOut: contractsOutMatch ? contractsOutMatch[1] : 'TBC',
    positiveFeedback: pickSection(text, ['positive', 'strength', 'liked', 'appeal']) || summariseText(text, 260),
    watchouts: pickSection(text, ['objection', 'watch', 'hesitation', 'concern']) || 'No clear watchouts extracted yet.',
    warmBuyers: pickSection(text, ['warm buyer', 'warm buyers']) || fallbackCountSummary(text, 'warm'),
    hotBuyers: pickSection(text, ['hot buyer', 'hot buyers']) || fallbackCountSummary(text, 'hot'),
    contractHolders: pickSection(text, ['contract holder', 'contract holders']) || (documentType === 'vendor_report' ? 'Monitor from weekly vendor report.' : 'TBC'),
    priceFeedback: pickSection(text, ['price feedback', 'pricing feedback', 'price point']) || 'No clear price feedback extracted yet.',
  };
}

export async function fetchAndSummariseArticle(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        'user-agent': 'Mozilla/5.0 VendorHubBot/1.0',
      },
      next: { revalidate: 0 },
    });

    const html = await response.text();
    const text = normaliseWhitespace(stripHtml(html));

    return {
      fetchedText: text,
      summary: summariseText(text, 700),
    };
  } catch {
    return {
      fetchedText: '',
      summary: '',
    };
  }
}

function pickSection(text: string, keywords: string[]) {
  const sentences = text.split(/(?<=[.!?])\s+/).map((sentence) => sentence.trim()).filter(Boolean);
  const matches = sentences.filter((sentence) => keywords.some((keyword) => sentence.toLowerCase().includes(keyword)));
  return matches.length ? summariseText(matches.join(' '), 260) : '';
}

function fallbackCountSummary(text: string, label: string) {
  const regex = new RegExp(`${label}[^\d]{0,20}(\d+)`, 'i');
  const match = text.match(regex);
  return match ? `${match[1]} ${label} buyer signal(s)` : 'TBC';
}

function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function normaliseWhitespace(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}
