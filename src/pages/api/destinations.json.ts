export const prerender = false;

import { contentfulClient, type Destination } from "$lib/contentful";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const entries = await contentfulClient.getEntries<Destination>({
    content_type: "destination",
  });

  return new Response(JSON.stringify(entries.items));
}
