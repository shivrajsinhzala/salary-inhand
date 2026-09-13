/**
 * Tax computation engine for Indian Income Tax
 * Supports New Tax Regime (Budget 2024/2025/2026) and Old Tax Regime
 */

export const STANDARD_DEDUCTION_NEW = 75000;
export const STANDARD_DEDUCTION_OLD = 50000;

export const NEW_REGIME_SLABS = [
  { min: 0, max: 300000, rate: 0 },
  { min: 300000, max: 700000, rate: 0.05 },
  { min: 700000, max: 1000000, rate: 0.10 },
  { min: 1000000, max: 1200000, rate: 0.15 },
  { min: 1200000, max: 1500000, rate: 0.20 },
  { min: 1500000, max: Infinity, rate: 0.30 }
];

export const OLD_REGIME_SLABS = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 0.05 },
  { min: 500000, max: 1000000, rate: 0.20 },
  { min: 1000000, max: Infinity, rate: 0.30 }
];

/**
 * Calculate tax under the New Tax Regime
 * @param {number} grossSalary - Total cash gross salary
 * @returns {object} Tax breakdown
 */
export function calculateNewRegimeTax(grossSalary) {
  const standardDeduction = Math.min(grossSalary, STANDARD_DEDUCTION_NEW);
  const taxableIncome = Math.max(0, grossSalary - standardDeduction);

  let rawTax = 0;
  const slabBreakdown = [];

  for (const slab of NEW_REGIME_SLABS) {
    if (taxableIncome > slab.min) {
      const taxableInSlab = Math.min(taxableIncome, slab.max) - slab.min;
      const taxForSlab = Math.round(taxableInSlab * slab.rate);
      rawTax += taxForSlab;
      slabBreakdown.push({
        label: slab.max === Infinity ? `Above ₹${slab.min.toLocaleString('en-IN')}` : `₹${(slab.min + 1).toLocaleString('en-IN')} – ₹${slab.max.toLocaleString('en-IN')}`,
        rate: `${slab.rate * 100}%`,
        taxableAmount: taxableInSlab,
        tax: taxForSlab
      });
    }
  }

  // Section 87A Rebate in New Regime:
  // Full rebate if Taxable Income <= ₹7,00,000 (up to ₹25,000)
  let rebate87A = 0;
  if (taxableIncome <= 700000) {
    rebate87A = rawTax;
  } else if (taxableIncome > 700000 && taxableIncome <= 727777) {
    // Marginal relief under Section 87A
    const excessIncome = taxableIncome - 700000;
    if (rawTax > excessIncome) {
      rebate87A = rawTax - excessIncome;
    }
  }

  const taxAfterRebate = Math.max(0, rawTax - rebate87A);

  // Surcharge (New regime)
  let surchargeRate = 0;
  if (taxableIncome > 20000000) surchargeRate = 0.25;
  else if (taxableIncome > 10000000) surchargeRate = 0.15;
  else if (taxableIncome > 5000000) surchargeRate = 0.10;

  const surcharge = Math.round(taxAfterRebate * surchargeRate);
  const healthEducationCess = Math.round((taxAfterRebate + surcharge) * 0.04);
  const totalTax = Math.round(taxAfterRebate + surcharge + healthEducationCess);

  return {
    grossSalary,
    standardDeduction,
    taxableIncome,
    rawTax,
    rebate87A,
    taxAfterRebate,
    surcharge,
    healthEducationCess,
    totalTax,
    monthlyTax: Math.round(totalTax / 12),
    slabBreakdown
  };
}

/**
 * Calculate tax under the Old Tax Regime
 * @param {number} grossSalary - Total cash gross salary
 * @param {object} deductions - Deductions under 80C, 80D, HRA, etc.
 * @returns {object} Tax breakdown
 */
export function calculateOldRegimeTax(grossSalary, deductions = {}) {
  const d80C = Math.min(deductions.sec80C || 0, 150000);
  const d80D = Math.min(deductions.sec80D || 0, 50000);
  const dNPS = Math.min(deductions.sec80CCD1B || 0, 50000);
  const dHRA = deductions.hraExemption || 0;
  const otherDeductions = deductions.other || 0;

  const totalDeductions = d80C + d80D + dNPS + dHRA + otherDeductions;
  const standardDeduction = Math.min(grossSalary, STANDARD_DEDUCTION_OLD);
  const taxableIncome = Math.max(0, grossSalary - standardDeduction - totalDeductions);

  let rawTax = 0;
  const slabBreakdown = [];

  for (const slab of OLD_REGIME_SLABS) {
    if (taxableIncome > slab.min) {
      const taxableInSlab = Math.min(taxableIncome, slab.max) - slab.min;
      const taxForSlab = Math.round(taxableInSlab * slab.rate);
      rawTax += taxForSlab;
      slabBreakdown.push({
        label: slab.max === Infinity ? `Above ₹${slab.min.toLocaleString('en-IN')}` : `₹${(slab.min + 1).toLocaleString('en-IN')} – ₹${slab.max.toLocaleString('en-IN')}`,
        rate: `${slab.rate * 100}%`,
        taxableAmount: taxableInSlab,
        tax: taxForSlab
      });
    }
  }

  // Section 87A in Old Regime: rebate up to ₹12,500 if taxable income <= 5,00,000
  let rebate87A = 0;
  if (taxableIncome <= 500000) {
    rebate87A = Math.min(rawTax, 12500);
  }

  const taxAfterRebate = Math.max(0, rawTax - rebate87A);

  let surchargeRate = 0;
  if (taxableIncome > 50000000) surchargeRate = 0.37;
  else if (taxableIncome > 20000000) surchargeRate = 0.25;
  else if (taxableIncome > 10000000) surchargeRate = 0.15;
  else if (taxableIncome > 5000000) surchargeRate = 0.10;

  const surcharge = Math.round(taxAfterRebate * surchargeRate);
  const healthEducationCess = Math.round((taxAfterRebate + surcharge) * 0.04);
  const totalTax = Math.round(taxAfterRebate + surcharge + healthEducationCess);

  return {
    grossSalary,
    standardDeduction,
    totalDeductions,
    taxableIncome,
    rawTax,
    rebate87A,
    taxAfterRebate,
    surcharge,
    healthEducationCess,
    totalTax,
    monthlyTax: Math.round(totalTax / 12),
    slabBreakdown
  };
}
