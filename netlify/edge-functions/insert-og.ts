export const config = { path: "/" };

export default async (request: Request, context: Context) => {
  // Get the page content that will be served next
  const response = await context.next();
  const page = await response.text();

  // Search for the placeholder
  const imageRegex = /OPENGRAPH_IMAGE_PLACEHOLDER/i;
  const urlRegex = /OPENGRAPH_URL_PLACEHOLDER/i;

  const imageUrl = new URL(request.url);
  imageUrl.pathname = `/__preview/`;

  // Replace the content
  const updatedPage = page.replace(
    urlRegex,
    request.url,
  ).replace(
    imageRegex,
    imageUrl,
  )

  // Return the response
  return new Response(updatedPage, response);
};
