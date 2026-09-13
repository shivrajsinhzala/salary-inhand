/**
 * Home Loan EMI, Affordability & Prepayment Calculator
 */

/**
 * Standard EMI formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
 */
export function calculateEMI(principal, annualRate, tenureYears) {
  const p = Math.max(0, principal);
  const monthlyRate = annualRate / (12 * 100);
  const totalMonths = tenureYears * 12;

  if (p === 0 || totalMonths === 0) return { emi: 0, totalPayment: 0, totalInterest: 0 };
  if (monthlyRate === 0) {
    const emi = Math.round(p / totalMonths);
    return { emi, totalPayment: p, totalInterest: 0 };
  }

  const emi = Math.round((p * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1));
  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - p;

  return {
    principal: p,
    annualRate,
    tenureYears,
    totalMonths,
    emi,
    totalPayment,
    totalInterest
  };
}

/**
 * Prepayment analysis:
 * What happens if the borrower pays an extra ₹X every month,
 * or 1 extra EMI every year?
 */
export function calculatePrepaymentSavings(principal, annualRate, tenureYears, extraMonthly = 5000) {
  const base = calculateEMI(principal, annualRate, tenureYears);
  const monthlyRate = annualRate / (12 * 100);
  
  let balance = principal;
  let monthsWithPrepayment = 0;
  let totalInterestWithPrepayment = 0;
  const targetMonthlyPayment = base.emi + extraMonthly;

  while (balance > 0 && monthsWithPrepayment < tenureYears * 12) {
    monthsWithPrepayment++;
    const interest = balance * monthlyRate;
    totalInterestWithPrepayment += interest;
    const principalPaid = targetMonthlyPayment - interest;
    balance -= principalPaid;
    if (balance <= 0) break;
  }

  const interestSaved = Math.max(0, Math.round(base.totalInterest - totalInterestWithPrepayment));
  const monthsSaved = Math.max(0, (tenureYears * 12) - monthsWithPrepayment);
  const yearsSaved = (monthsSaved / 12).toFixed(1);

  return {
    base,
    extraMonthly,
    newTenureMonths: monthsWithPrepayment,
    newTenureYears: (monthsWithPrepayment / 12).toFixed(1),
    interestSaved,
    monthsSaved,
    yearsSaved
  };
}

/**
 * Loan Affordability based on Monthly In-Hand Salary
 * Indian banks standard: Total EMIs should not exceed 50% of monthly net income (FOIR).
 */
export function calculateLoanAffordability(monthlyInHand, annualRate = 8.5, tenureYears = 20) {
  const maxEmi = Math.round(monthlyInHand * 0.50); // 50% FOIR
  const monthlyRate = annualRate / (12 * 100);
  const totalMonths = tenureYears * 12;

  // Reverse EMI formula: P = EMI * ((1+r)^n - 1) / (r * (1+r)^n)
  const maxLoan = Math.round((maxEmi * (Math.pow(1 + monthlyRate, totalMonths) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)));

  return {
    monthlyInHand,
    maxAllowedEmi: maxEmi,
    estimatedMaxLoan: maxLoan,
    annualRate,
    tenureYears
  };
}
