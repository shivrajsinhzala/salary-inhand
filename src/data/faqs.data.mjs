/**
 * SEO FAQs with Schema.org formatting for Google Rich Snippets
 */

export function getSalaryFaqs(lpaLabel, formattedCtc, monthlyInHand, monthlyTax) {
  return [
    {
      question: `What is the monthly in-hand salary for ${lpaLabel} CTC in India?`,
      answer: `For an annual CTC of ${formattedCtc} (${lpaLabel}), the estimated monthly in-hand (take-home) salary is approximately ₹${monthlyInHand.toLocaleString('en-IN')} under the New Tax Regime. This accounts for deductions including Employee PF (₹${Math.round(monthlyInHand * 0.08).toLocaleString('en-IN')} approx), Professional Tax (₹200/mo), and estimated monthly income tax (TDS) of ₹${monthlyTax.toLocaleString('en-IN')}.`
    },
    {
      question: `Is ${lpaLabel} salary tax-free under the New Tax Regime?`,
      answer: Number(lpaLabel.replace(/[^0-9.]/g, '')) <= 7.75
        ? `Yes! For a CTC of ${lpaLabel}, with the standard deduction of ₹75,000 and Section 87A rebate, the effective income tax payable is ₹0 under the New Tax Regime.`
        : `No. For a CTC of ${lpaLabel}, after the standard deduction of ₹75,000, the taxable income exceeds the ₹7,00,000 threshold for Section 87A rebate, resulting in approximately ₹${(monthlyTax * 12).toLocaleString('en-IN')} annual tax.`
    },
    {
      question: `Why is in-hand salary less than CTC for ${lpaLabel}?`,
      answer: `Cost to Company (CTC) includes components that you do not receive in your monthly bank account: Employer Provident Fund (12% of basic), Gratuity contribution (approx 4.81% of basic), Employee Provident Fund, Professional Tax, and Income Tax (TDS). The cash take-home is what remains after these statutory deductions.`
    },
    {
      question: `Which tax regime is better for ${lpaLabel} CTC?`,
      answer: `For most salaried individuals earning ${lpaLabel}, the New Tax Regime offers lower tax liability due to expanded tax slabs, standard deduction of ₹75,000, and lower tax rates, unless you have substantial itemized deductions (over ₹3.75 Lakhs in 80C, 80D, and HRA) under the Old Regime.`
    }
  ];
}

/**
 * FAQs for the /income-tax/<slug>/ cluster. Rendered visibly via <FaqSection>
 * and mirrored into FAQPage schema — the two must always match.
 */
export function getTaxFaqs({ label, income, newTax, oldTax, formatINR }) {
  const diff = oldTax.totalTax - newTax.totalTax;
  const isRebateFree = newTax.totalTax === 0;

  return [
    {
      question: `How much income tax do I pay on a ${label} salary under the New Tax Regime?`,
      answer: isRebateFree
        ? `Nothing. On a ${label} annual salary the ₹75,000 standard deduction brings taxable income to ${formatINR(newTax.taxableIncome)}, which falls within the Section 87A rebate limit — so the tax payable is ₹0.`
        : `The total tax on a ${label} annual salary under the New Tax Regime is ${formatINR(newTax.totalTax)}, including the 4% Health and Education Cess. That is deducted by your employer as monthly TDS of roughly ${formatINR(newTax.monthlyTax)}.`
    },
    {
      question: `Is a ${label} salary tax-free in India?`,
      answer: isRebateFree
        ? `Yes. With the ₹75,000 standard deduction and the Section 87A rebate, a ${label} salary attracts zero income tax under the New Tax Regime for a resident individual.`
        : `No. A ${label} salary exceeds the Section 87A rebate threshold, so ${formatINR(newTax.totalTax)} is payable under the New Regime and ${formatINR(oldTax.totalTax)} under the Old Regime before itemised deductions.`
    },
    {
      question: `New Regime or Old Regime — which is cheaper for ${label}?`,
      answer: diff > 0
        ? `The New Tax Regime is cheaper by ${formatINR(diff)} a year at ${label}, comparing ${formatINR(newTax.totalTax)} against ${formatINR(oldTax.totalTax)}. The Old Regime only overtakes it if your 80C, 80D, HRA and home loan interest deductions together exceed roughly ${formatINR(Math.round(diff / 0.3))}.`
        : `At ${label} the two regimes are close, and the Old Regime costs ${formatINR(Math.abs(diff))} less before deductions. If you claim HRA, 80C and 80D in full, the Old Regime is likely the better choice.`
    },
    {
      question: `How much monthly TDS will my employer deduct on ${label}?`,
      answer: `Your employer spreads the annual liability across twelve months, so expect roughly ${formatINR(newTax.monthlyTax)} per month under the New Regime. The actual deduction varies month to month — it is recalculated whenever you declare investments, and bonus months carry a higher deduction.`
    },
    {
      question: `Does the ${label} figure include EPF and professional tax?`,
      answer: `No. This page computes income tax only. Employee EPF (12% of basic pay) and state Professional Tax (up to ₹2,500 a year) are separate deductions taken from your salary before it reaches your account. Use the in-hand salary calculator to see all three together.`
    }
  ];
}

/** Static FAQ sets for the /tools/ calculators. Rendered visibly via <FaqSection>. */
export const TOOL_FAQS = {
  'sip-calculator': [
    {
      question: 'What is a step-up SIP and how is it different from a regular SIP?',
      answer:
        'A regular SIP invests the same amount every month for the whole tenure. A step-up SIP raises that contribution by a fixed percentage each year — usually in line with your annual appraisal — so your investment grows with your income instead of staying frozen at the amount you could afford on day one.'
    },
    {
      question: 'How much difference does a 10% annual step-up actually make?',
      answer:
        'Substantially more than most people expect, because each increase compounds for the remaining years. Over a 12–15 year horizon a 10% annual step-up typically produces a corpus 60–90% larger than a flat SIP of the same starting amount, without ever requiring a painful jump in contribution.'
    },
    {
      question: 'What return rate should I assume for an equity mutual fund SIP?',
      answer:
        'Indian diversified equity funds have historically delivered roughly 11–13% CAGR over long periods, which is why 12% is the common planning assumption. Returns are not guaranteed and short horizons can produce far lower or negative outcomes — use a more conservative 8–10% for goals under seven years.'
    },
    {
      question: 'Are SIP returns taxable in India?',
      answer:
        'Yes. Each SIP instalment is a separate purchase for capital gains purposes. Equity fund units held over twelve months attract long-term capital gains tax at 12.5% above the ₹1.25 Lakh annual exemption; units sold within twelve months are taxed at 20% as short-term gains.'
    },
    {
      question: 'Should I stop my SIP when the market falls?',
      answer:
        'Falling markets are when a SIP does its best work — the same instalment buys more units at lower prices, which lowers your average cost. Stopping during a decline locks in the downside and forfeits the recovery, which is the main reason SIP investors underperform the funds they hold.'
    }
  ],
  'home-loan-emi': [
    {
      question: 'How is a home loan EMI calculated?',
      answer:
        'EMI = [P × R × (1+R)^N] ÷ [(1+R)^N − 1], where P is the principal, R is the monthly interest rate (annual rate ÷ 12 ÷ 100) and N is the number of monthly instalments. Early EMIs are mostly interest; the principal share rises as the loan matures.'
    },
    {
      question: 'How much interest does prepaying an extra ₹5,000 a month save?',
      answer:
        'On a typical ₹50 Lakh, 20-year loan at 8.5%, an extra ₹5,000 every month saves well over ₹10 Lakh in interest and closes the loan roughly four to five years early. Prepayments applied in the first few years save the most, because that is when the outstanding principal — and therefore the interest accruing on it — is highest.'
    },
    {
      question: 'Should I reduce the EMI or the tenure when I prepay?',
      answer:
        'Reducing the tenure saves far more interest, because you keep paying the same amount against a shrinking principal. Reducing the EMI improves monthly cash flow but leaves the loan running for its original term, so most of the interest saving is lost.'
    },
    {
      question: 'Is there a penalty for prepaying a home loan in India?',
      answer:
        'No. The RBI bars banks and housing finance companies from charging foreclosure or prepayment penalties on floating-rate home loans taken by individual borrowers. Fixed-rate loans can still carry a charge, so check your sanction letter before making a lump-sum payment.'
    },
    {
      question: 'What EMI can I afford on my salary?',
      answer:
        'Lenders generally cap total EMIs at 50–55% of net monthly income (the FOIR limit), but 35–40% is a more comfortable ceiling once EPF, insurance and living costs are accounted for. Calculate your in-hand salary first, then work backwards to a loan amount.'
    }
  ],
  'salary-hike': [
    {
      question: 'Why does a 30% hike not increase my take-home by 30%?',
      answer:
        'The increment applies to CTC, but part of every rupee added flows into Employer EPF and gratuity rather than cash, and the extra cash is then taxed at your marginal rate — 20% or 30% plus cess for most mid-career salaries. A 30% CTC hike commonly translates to a 20–24% rise in monthly in-hand pay.'
    },
    {
      question: 'How do I compare two job offers with different CTC structures?',
      answer:
        'Compare monthly in-hand pay, not CTC. Two offers with identical CTC can differ by thousands a month depending on the basic pay percentage, whether variable pay is guaranteed, and how much sits in employer EPF, gratuity and non-cash perks. Strip out everything that is not cash, then apply tax.'
    },
    {
      question: 'Does a salary hike push me into a higher tax bracket on my whole income?',
      answer:
        'No. India uses marginal slab rates, so only the income above each threshold is taxed at the higher rate. Crossing into the 30% bracket does not re-tax your earlier income — your effective rate across the whole salary always stays well below the top slab rate you touch.'
    },
    {
      question: 'How much hike should I expect when switching jobs?',
      answer:
        'Market practice in India is 20–40% on a job switch against 8–12% for an internal appraisal, with larger jumps for scarce skills. Evaluate the offer on fixed cash, not on CTC inflated by joining bonuses or a large variable component that depends on company performance.'
    }
  ]
};
