import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...values: ClassValue[]) {
  return twMerge(clsx(values));
}

export function image(url: string | undefined) {
  if (!url) return;
  return `https:${url}?fm=jpg&w=600&h=1000`;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export type Continent = "Asia" | "Americas" | "Africa" | "Europe" | "Middle East";
export type PostType = "Podcast" | "Reflection";
