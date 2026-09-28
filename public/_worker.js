/**
 * Cloudflare Pages advanced-mode worker.
 *
 * NOTE: the presence of this file in the build output puts Pages into
 * "advanced mode", which disables the `functions/` directory entirely.
 * Do not add a functions/_middleware.js alongside it — it would never run.
 * This file ships inside dist/, so it also survives `wrangler pages deploy dist`.
 */
const CANONICAL_HOST = 'salary.shivrajsinh.in';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 301 any preview/alias hostname onto the canonical domain, preserving
    // path and query so link equity and deep links both survive the hop.
    if (url.hostname.endsWith('.pages.dev')) {
      url.hostname = CANONICAL_HOST;
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  }
};
