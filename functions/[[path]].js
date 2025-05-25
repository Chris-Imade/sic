export async function onRequest(context) {
  try {
    const url = new URL(context.request.url);
    const path = url.pathname;
    const hostname = url.hostname;

    console.log("Processing request for path:", path, "on hostname:", hostname);

    // If the path ends with .html, redirect to the clean URL
    if (path.endsWith(".html")) {
      const cleanUrl = url.origin + path.slice(0, -5);
      console.log("Redirecting to clean URL:", cleanUrl);
      return Response.redirect(cleanUrl, 301);
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
      console.log("Found path in urlMap:", path);
      console.log("Will serve file:", urlMap[path]);

      // Try to fetch the file directly
      const response = await context.env.ASSETS.fetch(
        url.origin + urlMap[path]
      );

      if (!response.ok) {
        console.error("Failed to fetch mapped file:", urlMap[path]);
        // Try alternative path for custom domain
        const altPath = path + ".html";
        console.log("Trying alternative path:", altPath);
        const altResponse = await context.env.ASSETS.fetch(
          url.origin + altPath
        );

        if (!altResponse.ok) {
          console.error("Failed to fetch alternative path:", altPath);
          return new Response("Not Found", { status: 404 });
        }
        return altResponse;
      }
      return response;
    }

    // If no mapping exists, try to serve the path as is
    console.log("No mapping found, trying to serve path as is:", path);
    const response = await context.env.ASSETS.fetch(context.request.url);
    if (!response.ok) {
      console.error("Failed to serve path:", path);
      return new Response("Not Found", { status: 404 });
    }
    return response;
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
