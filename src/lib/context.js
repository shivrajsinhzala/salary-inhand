/**
 * Per-slab editorial context. Programmatic pages that differ only by numbers
 * read as duplicates to Google; this gives each CTC band its own prose,
 * peer comparisons and cross-cluster links.
 */
import { POPULAR_SLABS } from '../data/salaries.data.mjs';
import { TAX_QUERY_SLABS } from '../data/taxes.data.mjs';

const BANDS = [
  {
    max: 600000,
    tier: 'Entry-level',
    audience:
      'fresher and first-job offers across IT services, BPO, banking operations and campus placements',
    note:
      'At this level almost the entire package is cash. Income tax is usually nil after the standard deduction and the Section 87A rebate, so EPF and Professional Tax are the only meaningful deductions — which is why in-hand stays a high share of CTC.'
  },
  {
    max: 1000000,
    tier: 'Early-career',
    audience:
      'two-to-five year experience bands in software engineering, analytics, sales and core engineering roles',
    note:
      'This is the band where TDS starts to bite. Crossing the ₹7 Lakh taxable threshold ends the Section 87A rebate, so a small CTC increase here can produce a disproportionate jump in monthly tax.'
  },
  {
    max: 2000000,
    tier: 'Mid-senior',
    audience:
      'senior engineers, team leads, product managers and finance professionals with five to ten years of experience',
    note:
      'Variable pay and joining bonuses typically appear in the offer at this level. Only the fixed component drives your monthly credit — annual bonuses are taxed in the month they are paid, which distorts that month’s take-home.'
  },
  {
    max: 5000000,
    tier: 'Senior leadership',
    audience:
      'engineering managers, directors, and senior specialists at product companies, consultancies and multinational firms',
    note:
      'Most of the marginal rupee is taxed at 30% plus 4% cess here. Employer NPS contributions under Section 80CCD(2) remain deductible even in the New Regime, making them one of the few levers left to reduce taxable income.'
  },
  {
    max: Infinity,
    tier: 'Executive',
    audience:
      'CXO, vice-president and partner-level compensation, often with a significant ESOP or RSU component',
    note:
      'Surcharge applies above ₹50 Lakh of taxable income — 10% between ₹50 Lakh and ₹1 Crore, and 15% above ₹1 Crore under the New Regime. Equity vesting is taxed as a perquisite on the vest date and is not reflected in this cash calculation.'
  }
];

export function getSlabContext(slab) {
  return BANDS.find(b => slab.ctc <= b.max);
}

/** Nearest income-tax bracket page, for cross-cluster internal linking. */
export function nearestTaxSlab(ctc) {
  return TAX_QUERY_SLABS.reduce((best, s) =>
    Math.abs(s.income - ctc) < Math.abs(best.income - ctc) ? s : best
  );
}

/** Nearest CTC slab page for an income figure — the reverse link. */
export function nearestSalarySlab(income) {
  return POPULAR_SLABS.reduce((best, s) =>
    Math.abs(s.ctc - income) < Math.abs(best.ctc - income) ? s : best
  );
}

/** The slabs immediately below and above, for "compare with" links. */
export function adjacentSlabs(slug) {
  const i = POPULAR_SLABS.findIndex(s => s.slug === slug);
  return {
    prev: i > 0 ? POPULAR_SLABS[i - 1] : null,
    next: i >= 0 && i < POPULAR_SLABS.length - 1 ? POPULAR_SLABS[i + 1] : null
  };
}

export function adjacentTaxSlabs(slug) {
  const i = TAX_QUERY_SLABS.findIndex(s => s.slug === slug);
  return {
    prev: i > 0 ? TAX_QUERY_SLABS[i - 1] : null,
    next: i >= 0 && i < TAX_QUERY_SLABS.length - 1 ? TAX_QUERY_SLABS[i + 1] : null
  };
}
