/**
 * Systematic Investment Plan (SIP) and Step-Up SIP Wealth Calculator
 */

/**
 * Standard SIP Formula: M * [((1 + i)^n - 1) / i] * (1 + i)
 * where M = monthly investment, i = monthly interest rate, n = total months
 */
export function calculateSIP(monthlyInvestment, expectedReturnRate = 12, tenureYears = 10) {
  const m = Math.max(0, monthlyInvestment);
  const r = expectedReturnRate / 100;
  const i = r / 12;
  const n = tenureYears * 12;

  const totalInvested = m * n;
  const maturityValue = Math.round(m * ((Math.pow(1 + i, n) - 1) / i) * (1 + i));
  const estimatedReturns = Math.max(0, maturityValue - totalInvested);

  return {
    monthlyInvestment: m,
    expectedReturnRate,
    tenureYears,
    totalInvested,
    estimatedReturns,
    maturityValue
  };
}

/**
 * Step-Up SIP (increases investment amount by stepUpPercent every year)
 */
export function calculateStepUpSIP(initialMonthly, annualStepUpPercent = 10, expectedReturnRate = 12, tenureYears = 10) {
  let totalInvested = 0;
  let corpus = 0;
  const monthlyRate = expectedReturnRate / (12 * 100);
  let currentMonthly = initialMonthly;

  for (let year = 1; year <= tenureYears; year++) {
    for (let month = 1; month <= 12; month++) {
      totalInvested += currentMonthly;
      corpus = (corpus + currentMonthly) * (1 + monthlyRate);
    }
    currentMonthly += Math.round(currentMonthly * (annualStepUpPercent / 100));
  }

  const maturityValue = Math.round(corpus);
  const estimatedReturns = Math.max(0, maturityValue - totalInvested);

  return {
    initialMonthly,
    annualStepUpPercent,
    expectedReturnRate,
    tenureYears,
    totalInvested,
    estimatedReturns,
    maturityValue
  };
}
