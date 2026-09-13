export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname.endsWith('.pages.dev')) {
      url.hostname = 'salary.shivrajsinh.in';
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  }
};
