/**
 * Formatting utilities for Indian Currency (₹ Lakhs & Crores)
 */

export function formatINR(amount, { showSymbol = true } = {}) {
  const rounded = Math.round(Number(amount) || 0);
  const formatted = rounded.toLocaleString('en-IN');
  return showSymbol ? `₹${formatted}` : formatted;
}

export function formatLakhs(amount) {
  const num = Number(amount) || 0;
  if (num >= 10000000) {
    const cr = (num / 10000000).toFixed(2).replace(/\.00$/, '');
    return `₹${cr} Cr`;
  }
  if (num >= 100000) {
    const lpa = (num / 100000).toFixed(2).replace(/\.00$/, '');
    return `₹${lpa} Lakh`;
  }
  return formatINR(num);
}

export function parseLPA(slug) {
  // e.g. "12-lpa" -> 1200000, "1-cr" -> 10000000, "6-5-lpa" -> 650000
  if (!slug) return 1200000;
  const clean = slug.toLowerCase().replace('-in-hand-salary', '').replace('-in-hand', '');
  
  if (clean.includes('-cr')) {
    const num = parseFloat(clean.replace('-cr', '').replace('-', '.'));
    return Math.round(num * 10000000);
  }
  if (clean.includes('-lpa')) {
    const num = parseFloat(clean.replace('-lpa', '').replace('-', '.'));
    return Math.round(num * 100000);
  }
  if (clean.includes('-lakh')) {
    const num = parseFloat(clean.replace('-lakh', '').replace('-', '.'));
    return Math.round(num * 100000);
  }
  const numeric = parseInt(clean.replace(/[^0-9]/g, ''), 10);
  return numeric || 1200000;
}
