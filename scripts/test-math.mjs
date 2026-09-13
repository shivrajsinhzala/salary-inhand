import assert from 'node:assert';
import { calculateNewRegimeTax, calculateOldRegimeTax } from '../src/lib/math/tax.js';
import { calculateSalaryBreakdown } from '../src/lib/math/salary.js';
import { calculateEMI, calculatePrepaymentSavings } from '../src/lib/math/emi.js';
import { calculateSIP, calculateStepUpSIP } from '../src/lib/math/sip.js';

console.log('🧪 Starting mathematical verification tests...\n');

// Test 1: New Regime Standard Deduction & Section 87A Rebate
{
  // Under ₹7.75 Lakhs gross: taxable is ₹7,00,000 => tax is 0!
  const res = calculateNewRegimeTax(775000);
  assert.strictEqual(res.standardDeduction, 75000, 'Standard deduction should be ₹75,000');
  assert.strictEqual(res.taxableIncome, 700000, 'Taxable income should be ₹7,00,000');
  assert.strictEqual(res.totalTax, 0, 'Tax on ₹7.75L should be ₹0 after 87A rebate');
  console.log('✅ Test 1 Passed: 7.75 Lakhs has ₹0 tax in New Tax Regime');
}

// Test 2: New Regime 12 Lakhs Gross
{
  const res = calculateNewRegimeTax(1200000);
  assert.strictEqual(res.taxableIncome, 1125000);
  // Slabs:
  // 3L - 7L = 4L * 5% = 20,000
  // 7L - 10L = 3L * 10% = 30,000
  // 10L - 11.25L = 1.25L * 15% = 18,750
  // Total raw tax = 68,750. Cess = 4% = 2,750. Total = 71,500
  assert.strictEqual(res.rawTax, 68750);
  assert.strictEqual(res.healthEducationCess, 2750);
  assert.strictEqual(res.totalTax, 71500);
  console.log('✅ Test 2 Passed: 12 Lakhs gross has exactly ₹71,500 tax in New Tax Regime');
}

// Test 3: CTC 12 LPA Salary Decomposition
{
  const res = calculateSalaryBreakdown({ ctc: 1200000, basicPercent: 50, state: 'gujarat', regime: 'new' });
  assert.strictEqual(res.basicSalary, 600000, 'Basic is 50% = 6,00,000');
  assert.strictEqual(res.employerPF, 72000, 'Employer PF is 12% of 6L = 72,000');
  assert.strictEqual(res.gratuity, 28846, 'Gratuity is 15/26 * (6L/12) = 28,846');
  assert.strictEqual(res.cashGross, 1200000 - 72000 - 28846);
  assert.strictEqual(res.employeePF, 72000);
  assert.strictEqual(res.annualPT, 2400, 'Gujarat PT is ₹200/mo = 2,400');
  assert(res.monthlyTakeHome > 70000, 'Monthly take-home should be realistic');
  console.log(`✅ Test 3 Passed: 12 LPA CTC breakdown verified (Monthly in-hand: ₹${res.monthlyTakeHome.toLocaleString('en-IN')})`);
}

// Test 4: Home Loan EMI
{
  // 50 Lakhs loan at 8.5% for 20 years
  const emiRes = calculateEMI(5000000, 8.5, 20);
  assert(emiRes.emi > 43000 && emiRes.emi < 44000, 'EMI for 50L @ 8.5% 20y is ~43,391');
  
  // Prepaying ₹5,000/mo saves over 4 years of loan tenure!
  const prepayRes = calculatePrepaymentSavings(5000000, 8.5, 20, 5000);
  assert(prepayRes.interestSaved > 800000, 'Prepaying ₹5k/mo saves > ₹8 Lakhs in interest');
  console.log(`✅ Test 4 Passed: 50L Home Loan EMI verified (EMI: ₹${emiRes.emi.toLocaleString('en-IN')}, Prepaying ₹5k saves ₹${prepayRes.interestSaved.toLocaleString('en-IN')} interest and ${prepayRes.yearsSaved} years!)`);
}

// Test 5: SIP Wealth Accumulation
{
  // ₹10,000/mo for 10 years at 12%
  const sipRes = calculateSIP(10000, 12, 10);
  assert.strictEqual(sipRes.totalInvested, 1200000);
  assert(sipRes.maturityValue > 2300000, 'Maturity value should be > 23 Lakhs');
  console.log(`✅ Test 5 Passed: SIP calculation verified (10k/mo invested: ₹12L, Maturity: ₹${sipRes.maturityValue.toLocaleString('en-IN')})`);
}

console.log('\n🎉 ALL MATHEMATICAL ENGINE TESTS PASSED!\n');
