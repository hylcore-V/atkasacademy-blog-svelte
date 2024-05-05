export const prerender = false;

import { contentfulClient, type BlogPost } from "$lib/contentful";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();

  const entries = await contentfulClient.getEntries<BlogPost>({
    content_type: "blogPost",
    order: ["fields.date"],
    "fields.title[match]": data.query
  });

  return new Response(JSON.stringify(entries.items))
}
