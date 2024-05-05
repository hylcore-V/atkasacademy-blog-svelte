export const prerender = false;

import { contentfulClient, type BlogPost } from "$lib/contentful";
import { clamp } from "$lib/utils";
import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const page = clamp(data.page - 1, 0, Infinity);
  const query = encodeURIComponent(data.query);

  const entries = await contentfulClient.getEntries<BlogPost>({
    content_type: "blogPost",
    order: ["fields.date"],
    limit: data.perPage,
    skip: page * data.perPage,
    "fields.title[match]": data.query
  });

  return new Response(JSON.stringify(entries.items))
}
