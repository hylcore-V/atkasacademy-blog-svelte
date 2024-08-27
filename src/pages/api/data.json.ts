export const prerender = false;

import { sql } from "@vercel/postgres";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  let url = new URL(request.url);
  const slug = url.searchParams.get("slug");
  // TODO: Use Drizzle ORM to query the database
  const result =
    await sql`SELECT * FROM comments WHERE slug = '${slug}';`;
  return new Response(JSON.stringify({ result }))
}

export const POST: APIRoute = async () => {
  const result =
    await sql`INSERT INTO comments ( text, slug, name ) VALUES ( 'hello blah blah blah', 'episode-1', 'John Doe' );`;
  return new Response(JSON.stringify({ result }))
}
