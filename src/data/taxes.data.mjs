/**
 * Income Tax query slabs dataset for SEO landing pages
 */

export const TAX_QUERY_SLABS = [
  { income: 500000, slug: '5-lakh', label: '₹5 Lakh' },
  { income: 600000, slug: '6-lakh', label: '₹6 Lakh' },
  { income: 700000, slug: '7-lakh', label: '₹7 Lakh' },
  { income: 750000, slug: '7-5-lakh', label: '₹7.5 Lakh' },
  { income: 800000, slug: '8-lakh', label: '₹8 Lakh' },
  { income: 900000, slug: '9-lakh', label: '₹9 Lakh' },
  { income: 1000000, slug: '10-lakh', label: '₹10 Lakh' },
  { income: 1100000, slug: '11-lakh', label: '₹11 Lakh' },
  { income: 1200000, slug: '12-lakh', label: '₹12 Lakh' },
  { income: 1300000, slug: '13-lakh', label: '₹13 Lakh' },
  { income: 1400000, slug: '14-lakh', label: '₹14 Lakh' },
  { income: 1500000, slug: '15-lakh', label: '₹15 Lakh' },
  { income: 1600000, slug: '16-lakh', label: '₹16 Lakh' },
  { income: 1800000, slug: '18-lakh', label: '₹18 Lakh' },
  { income: 2000000, slug: '20-lakh', label: '₹20 Lakh' },
  { income: 2200000, slug: '22-lakh', label: '₹22 Lakh' },
  { income: 2500000, slug: '25-lakh', label: '₹25 Lakh' },
  { income: 3000000, slug: '30-lakh', label: '₹30 Lakh' },
  { income: 4000000, slug: '40-lakh', label: '₹40 Lakh' },
  { income: 5000000, slug: '50-lakh', label: '₹50 Lakh' }
];

export function getTaxSlabBySlug(slug) {
  return TAX_QUERY_SLABS.find((s) => s.slug === slug);
}
