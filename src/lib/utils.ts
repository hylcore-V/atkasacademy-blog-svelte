import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...values: ClassValue[]) {
  return twMerge(clsx(values));
}

export type Continent = "Asia" | "Americas" | "Africa" | "Europe" | "Middle East";
export type PostType = "Podcast" | "Reflection";
