export const prerender = false;

import { sql } from "@vercel/postgres";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  console.log({
    POSTGRES_URL: process.env.POSTGRES_URL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING
  });

  const result =
    await sql`INSERT INTO comments ( text, slug, name ) VALUES ( 'hello blah blah blah', 'episode-1', 'John Doe' );`;
  return new Response(JSON.stringify({ result }));
}
