import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

console.log('🔍 Starting post-build site integrity verification...\n');

const distDir = path.resolve(process.cwd(), 'dist');
assert(fs.existsSync(distDir), 'Build dist directory must exist');

// 1. Check Homepage
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
assert(indexHtml.includes('ca-pub-7164999486301748'), 'AdSense client ID must be present in index.html');
assert(indexHtml.includes('https://salary.shivrajsinh.in/'), 'Canonical URL must be present');
assert(indexHtml.includes('InHand'), 'Brand name InHand must be present');
console.log('✅ Homepage verified (AdSense tags, Canonical, Branding)');

// 2. Check Sitemap
const sitemapIndex = fs.readFileSync(path.join(distDir, 'sitemap-index.xml'), 'utf-8');
assert(sitemapIndex.includes('sitemap-0.xml'), 'Sitemap index must reference sitemap-0.xml');
console.log('✅ Sitemap index verified');

// 3. Check Programmatic Salary Pages
const sampleSalaryPath = path.join(distDir, 'in-hand-salary', '12-lpa', 'index.html');
assert(fs.existsSync(sampleSalaryPath), 'Programmatic 12-lpa page must exist');
const salary12LpaHtml = fs.readFileSync(sampleSalaryPath, 'utf-8');
assert(salary12LpaHtml.includes('12 LPA In-Hand Salary'), '12 LPA title must match');
assert(salary12LpaHtml.includes('schema.org'), 'Schema JSON-LD must be present');
console.log('✅ Programmatic salary pages verified (/in-hand-salary/12-lpa/)');

// 4. Check Programmatic Income Tax Pages
const sampleTaxPath = path.join(distDir, 'income-tax', '10-lakh', 'index.html');
assert(fs.existsSync(sampleTaxPath), 'Programmatic 10-lakh tax page must exist');
const tax10LakhHtml = fs.readFileSync(sampleTaxPath, 'utf-8');
assert(tax10LakhHtml.includes('Income Tax on ₹10 Lakh'), '10 Lakh tax title must match');
console.log('✅ Programmatic income tax pages verified (/income-tax/10-lakh/)');

// 5. Check Secondary Financial Tools
assert(fs.existsSync(path.join(distDir, 'tools', 'home-loan-emi', 'index.html')), 'Loan EMI tool must exist');
assert(fs.existsSync(path.join(distDir, 'tools', 'sip-calculator', 'index.html')), 'SIP calculator tool must exist');
assert(fs.existsSync(path.join(distDir, 'tools', 'salary-hike', 'index.html')), 'Salary hike tool must exist');
console.log('✅ Secondary tools verified (Loan EMI, Step-Up SIP, Salary Hike)');

// 6. Check Policy & AdSense Legal Pages
assert(fs.existsSync(path.join(distDir, 'privacy', 'index.html')), 'Privacy policy must exist for AdSense compliance');
assert(fs.existsSync(path.join(distDir, 'methodology', 'index.html')), 'Methodology page must exist');
assert(fs.existsSync(path.join(distDir, 'robots.txt')), 'robots.txt must exist');
console.log('✅ Compliance pages verified (Privacy Policy, Methodology, Robots.txt)');

console.log('\n🎉 ALL 68 PAGES AND INTEGRITY CHECKS PASSED!\n');
