export const prerender = false;

import { contentfulClient, type GalleryPhoto } from "$lib/contentful";
import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();

  const entries = await contentfulClient.getEntries<GalleryPhoto>({
    content_type: "galleryPhoto",
    order: ["fields.date"],
    limit: data.perPage,
    skip: data.page * data.perPage,
  });

  return new Response(JSON.stringify(entries.items))
}
