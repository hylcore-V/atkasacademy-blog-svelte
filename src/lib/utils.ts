import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...values: ClassValue[]) {
  return twMerge(clsx(values));
}

export function image(url: string | undefined) {
  if (!url) return;
  return `https:${url}?fm=jpg&w=600&h=1000`;
}

export type Continent = "Asia" | "Americas" | "Africa" | "Europe" | "Middle East";
export type PostType = "Podcast" | "Reflection";
