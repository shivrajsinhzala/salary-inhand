/**
 * Professional Tax calculation across Indian states
 */

export const STATE_PT_RULES = {
  gujarat: {
    name: 'Gujarat',
    annualAmount: 2400,
    monthlyAmount: 200,
    calculate: (monthlyGross) => {
      if (monthlyGross < 6000) return 0;
      if (monthlyGross < 9000) return 80;
      if (monthlyGross < 12000) return 150;
      return 200;
    }
  },
  maharashtra: {
    name: 'Maharashtra',
    annualAmount: 2500,
    monthlyAmount: 200, // 300 in Feb
    calculate: (monthlyGross, month = 1) => {
      if (monthlyGross <= 7500) return 0;
      if (monthlyGross <= 10000) return 175;
      return month === 2 ? 300 : 200;
    }
  },
  karnataka: {
    name: 'Karnataka',
    annualAmount: 2400,
    monthlyAmount: 200,
    calculate: (monthlyGross) => {
      if (monthlyGross < 25000) return 0;
      return 200;
    }
  },
  telangana: {
    name: 'Telangana',
    annualAmount: 2400,
    monthlyAmount: 200,
    calculate: (monthlyGross) => {
      if (monthlyGross <= 15000) return 0;
      if (monthlyGross <= 20000) return 150;
      return 200;
    }
  },
  tamilnadu: {
    name: 'Tamil Nadu',
    annualAmount: 2500,
    monthlyAmount: 208,
    calculate: (monthlyGross) => {
      if (monthlyGross <= 21000) return 0;
      return 208;
    }
  },
  delhi: {
    name: 'Delhi (No PT)',
    annualAmount: 0,
    monthlyAmount: 0,
    calculate: () => 0
  },
  haryana: {
    name: 'Haryana (No PT)',
    annualAmount: 0,
    monthlyAmount: 0,
    calculate: () => 0
  },
  uttarpradesh: {
    name: 'Uttar Pradesh (No PT)',
    annualAmount: 0,
    monthlyAmount: 0,
    calculate: () => 0
  },
  rajasthan: {
    name: 'Rajasthan (No PT)',
    annualAmount: 0,
    monthlyAmount: 0,
    calculate: () => 0
  },
  other: {
    name: 'Other States (Standard)',
    annualAmount: 2400,
    monthlyAmount: 200,
    calculate: (monthlyGross) => (monthlyGross > 15000 ? 200 : 0)
  }
};

export function calculateProfessionalTax(annualGross, stateKey = 'gujarat') {
  const rule = STATE_PT_RULES[stateKey] || STATE_PT_RULES.gujarat;
  const monthlyGross = Math.round(annualGross / 12);
  const monthlyPT = rule.calculate(monthlyGross);
  const annualPT = rule.name === 'Maharashtra' && monthlyPT === 200 ? 2500 : monthlyPT * 12;

  return {
    stateKey,
    stateName: rule.name,
    monthlyPT,
    annualPT
  };
}
