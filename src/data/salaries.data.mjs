/**
 * Programmatic salary slabs dataset for SEO landing pages
 */

export const POPULAR_SLABS = [
  { ctc: 300000, slug: '3-lpa', label: '3 LPA', popular: true },
  { ctc: 350000, slug: '3-5-lpa', label: '3.5 LPA', popular: false },
  { ctc: 400000, slug: '4-lpa', label: '4 LPA', popular: true },
  { ctc: 450000, slug: '4-5-lpa', label: '4.5 LPA', popular: false },
  { ctc: 500000, slug: '5-lpa', label: '5 LPA', popular: true },
  { ctc: 550000, slug: '5-5-lpa', label: '5.5 LPA', popular: false },
  { ctc: 600000, slug: '6-lpa', label: '6 LPA', popular: true },
  { ctc: 650000, slug: '6-5-lpa', label: '6.5 LPA', popular: false },
  { ctc: 700000, slug: '7-lpa', label: '7 LPA', popular: true },
  { ctc: 750000, slug: '7-5-lpa', label: '7.5 LPA', popular: false },
  { ctc: 800000, slug: '8-lpa', label: '8 LPA', popular: true },
  { ctc: 850000, slug: '8-5-lpa', label: '8.5 LPA', popular: false },
  { ctc: 900000, slug: '9-lpa', label: '9 LPA', popular: true },
  { ctc: 950000, slug: '9-5-lpa', label: '9.5 LPA', popular: false },
  { ctc: 1000000, slug: '10-lpa', label: '10 LPA', popular: true },
  { ctc: 1100000, slug: '11-lpa', label: '11 LPA', popular: false },
  { ctc: 1200000, slug: '12-lpa', label: '12 LPA', popular: true },
  { ctc: 1300000, slug: '13-lpa', label: '13 LPA', popular: false },
  { ctc: 1400000, slug: '14-lpa', label: '14 LPA', popular: false },
  { ctc: 1500000, slug: '15-lpa', label: '15 LPA', popular: true },
  { ctc: 1600000, slug: '16-lpa', label: '16 LPA', popular: false },
  { ctc: 1700000, slug: '17-lpa', label: '17 LPA', popular: false },
  { ctc: 1800000, slug: '18-lpa', label: '18 LPA', popular: true },
  { ctc: 1900000, slug: '19-lpa', label: '19 LPA', popular: false },
  { ctc: 2000000, slug: '20-lpa', label: '20 LPA', popular: true },
  { ctc: 2200000, slug: '22-lpa', label: '22 LPA', popular: false },
  { ctc: 2400000, slug: '24-lpa', label: '24 LPA', popular: true },
  { ctc: 2500000, slug: '25-lpa', label: '25 LPA', popular: true },
  { ctc: 2800000, slug: '28-lpa', label: '28 LPA', popular: false },
  { ctc: 3000000, slug: '30-lpa', label: '30 LPA', popular: true },
  { ctc: 3200000, slug: '32-lpa', label: '32 LPA', popular: false },
  { ctc: 3500000, slug: '35-lpa', label: '35 LPA', popular: true },
  { ctc: 4000000, slug: '40-lpa', label: '40 LPA', popular: true },
  { ctc: 4500000, slug: '45-lpa', label: '45 LPA', popular: false },
  { ctc: 5000000, slug: '50-lpa', label: '50 LPA', popular: true },
  { ctc: 6000000, slug: '60-lpa', label: '60 LPA', popular: false },
  { ctc: 7500000, slug: '75-lpa', label: '75 LPA', popular: false },
  { ctc: 10000000, slug: '1-cr', label: '1 Crore', popular: true },
  { ctc: 15000000, slug: '1-5-cr', label: '1.5 Crore', popular: false },
  { ctc: 20000000, slug: '2-cr', label: '2 Crore', popular: true }
];

export function getSlabBySlug(slug) {
  return POPULAR_SLABS.find((s) => s.slug === slug);
}
