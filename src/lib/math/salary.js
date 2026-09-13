import { calculateNewRegimeTax, calculateOldRegimeTax } from './tax.js';
import { calculateProfessionalTax } from './pt.js';

/**
 * Calculate complete in-hand salary breakdown from CTC
 * @param {object} options
 * @param {number} options.ctc - Annual Cost to Company (e.g. 1200000)
 * @param {number} [options.basicPercent=50] - Basic salary percentage of CTC (typically 40% or 50%)
 * @param {boolean} [options.epfCap=false] - Whether PF is capped at statutory limit (₹1,800/mo)
 * @param {string} [options.state='gujarat'] - State for professional tax
 * @param {string} [options.regime='new'] - 'new' or 'old'
 * @param {object} [options.deductions={}] - Old regime deductions (80C, 80D, HRA)
 */
export function calculateSalaryBreakdown({
  ctc = 1200000,
  basicPercent = 50,
  epfCap = false,
  state = 'gujarat',
  regime = 'new',
  deductions = {}
} = {}) {
  const annualCtc = Math.max(0, Math.round(ctc));
  const basicSalary = Math.round((annualCtc * basicPercent) / 100);

  // Provident Fund (EPF):
  // If capped, ₹1,800 per month = ₹21,600 per year.
  // Otherwise 12% of basic salary.
  let employerPF = Math.round(basicSalary * 0.12);
  let employeePF = Math.round(basicSalary * 0.12);

  if (epfCap) {
    employerPF = Math.min(employerPF, 21600);
    employeePF = Math.min(employeePF, 21600);
  }

  // Gratuity: (15 / 26) * (Basic / 12) per year = ~4.8077% of Basic
  const gratuity = Math.round(basicSalary * (15 / 26) * (1 / 12));

  // Cash Gross Salary
  const cashGross = Math.max(0, annualCtc - employerPF - gratuity);

  // Professional Tax
  const ptData = calculateProfessionalTax(cashGross, state);
  const annualPT = ptData.annualPT;
  const monthlyPT = ptData.monthlyPT;

  // Taxes
  const newRegimeTaxData = calculateNewRegimeTax(cashGross);
  const oldRegimeTaxData = calculateOldRegimeTax(cashGross, {
    ...deductions,
    sec80C: (deductions.sec80C || 0) + employeePF // Employee PF automatically counts towards 80C
  });

  const activeTaxData = regime === 'old' ? oldRegimeTaxData : newRegimeTaxData;
  const annualTax = activeTaxData.totalTax;
  const monthlyTax = activeTaxData.monthlyTax;

  // Net Take-Home
  const annualTakeHome = Math.max(0, cashGross - employeePF - annualPT - annualTax);
  const monthlyTakeHome = Math.round(annualTakeHome / 12);

  // Compare regimes
  const taxSavingsWithNew = oldRegimeTaxData.totalTax - newRegimeTaxData.totalTax;
  const recommendedRegime = taxSavingsWithNew >= 0 ? 'new' : 'old';

  // Component Percentages of CTC
  const takeHomePct = annualCtc > 0 ? ((annualTakeHome / annualCtc) * 100).toFixed(1) : '0';
  const taxPct = annualCtc > 0 ? ((annualTax / annualCtc) * 100).toFixed(1) : '0';
  const retirementPct = annualCtc > 0 ? (((employerPF + employeePF + gratuity) / annualCtc) * 100).toFixed(1) : '0';
  const ptPct = annualCtc > 0 ? ((annualPT / annualCtc) * 100).toFixed(1) : '0';

  return {
    annualCtc,
    monthlyCtc: Math.round(annualCtc / 12),
    basicSalary,
    monthlyBasic: Math.round(basicSalary / 12),
    employerPF,
    monthlyEmployerPF: Math.round(employerPF / 12),
    gratuity,
    monthlyGratuity: Math.round(gratuity / 12),
    cashGross,
    monthlyGross: Math.round(cashGross / 12),
    employeePF,
    monthlyEmployeePF: Math.round(employeePF / 12),
    annualPT,
    monthlyPT,
    regime,
    annualTax,
    monthlyTax,
    annualTakeHome,
    monthlyTakeHome,
    newRegimeTax: newRegimeTaxData.totalTax,
    oldRegimeTax: oldRegimeTaxData.totalTax,
    taxSavingsWithNew,
    recommendedRegime,
    activeTaxData,
    newRegimeTaxData,
    oldRegimeTaxData,
    percentages: {
      takeHome: takeHomePct,
      tax: taxPct,
      retirement: retirementPct,
      pt: ptPct
    }
  };
}
