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
