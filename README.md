# InHand. (`salary.shivrajsinh.in`)

High-precision in-hand salary, income tax regime comparison, loan EMI prepayment, and Step-Up SIP calculator suite optimized for Google programmatic SEO and Google AdSense revenue.

---

## Quick Start

```bash
npm install
npm run dev        # Starts local dev server at http://localhost:4321
npm test           # Runs mathematical verification tests
npm run build      # Builds all 68+ static pages into dist/
npm run verify     # Runs post-build integrity checks
```

---

## Cloudflare Pages Deployment Guide

### Option 1: Git-Connected (Recommended)
1. Push this repository to GitHub/GitLab (e.g. `github.com/shivrajsinh/salary-calculator`).
2. Go to **Cloudflare Dashboard** → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Select the repository and configure build settings:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Once deployed, click **Custom Domains** → **Set up a domain**.
5. Enter **`salary.shivrajsinh.in`**. Cloudflare will automatically provision SSL and route traffic globally!

### Option 2: Direct Wrangler CLI Deployment
```bash
npx wrangler pages deploy dist --project-name=salary-inhand
```

---

## AdSense Setup Checklist
- **Publisher ID**: `ca-pub-7164999486301748` (already active in all pages).
- **`ads.txt`**: Ensure your root apex domain `shivrajsinh.in/ads.txt` includes:
  ```
  google.com, pub-7164999486301748, DIRECT, f08c47fec0942fa0
  ```
  Subdomains inherit this apex `ads.txt` automatically.
