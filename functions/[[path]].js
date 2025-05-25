export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // If the path ends with .html, redirect to the clean URL
  if (path.endsWith(".html")) {
    return Response.redirect(url.origin + path.slice(0, -5), 301);
  }

  // Map of clean URLs to their HTML files
  const urlMap = {
    "/": "/index.html",
    "/speakers": "/speakers.html",
    "/schedule": "/schedule.html",
    "/conference": "/conference.html",
    "/detail-yanmoe": "/detail-yanmoe.html",
    "/detail-casaba": "/detail-casaba.html",
    "/detail-asemota": "/detail-asemota.html",
    "/detail-izoduwa": "/detail-izoduwa.html",
    "/register": "/register.html",
    "/contact": "/contact.html",
    "/pillars": "/pillars.html",
    "/coming-soon": "/coming-soon.html",
    "/gallery": "/gallery.html",
    "/about-us": "/about-us.html",
    "/speakers-detail": "/speakers-detail.html",
    "/pricing": "/pricing.html",
    "/login": "/login.html",
    "/error-page": "/error-page.html",
    "/event-detail": "/event-detail.html",
    "/faqs": "/faqs.html",
    "/buy-ticket": "/buy-ticket.html",
    "/blog-grid": "/blog-grid.html",
    "/blog-sidebar": "/blog-sidebar.html",
    "/blog-single": "/blog-single.html",
  };

  // If the path exists in our map, serve the corresponding HTML file
  if (urlMap[path]) {
    return context.env.ASSETS.fetch(url.origin + urlMap[path]);
  }

  // If no mapping exists, try to serve the path as is
  return context.env.ASSETS.fetch(context.request.url);
}
