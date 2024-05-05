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

export function clamp(num: number, min: number, max: number = Infinity) {
  return Math.min(Math.max(num, min), max);
}

export function extractSpotifyId(url: string) {
  const regex = /\/episode\/([A-Za-z0-9]+)\?/;
  return url.match(regex)?.[1];
}

export function formatRelativeTime(dateString: string) {
  const now = Date.now();
  const date = new Date(dateString).getTime();
  const diffInSeconds = Math.floor((now - date) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 }
  ];

  for (let i = 0; i < intervals.length; i++) {
    const { label, seconds } = intervals[i];
    const intervalCount = Math.floor(diffInSeconds / seconds);

    if (intervalCount >= 1) {
      return intervalCount === 1 ? `${intervalCount} ${label} ago` : `${intervalCount} ${label}s ago`;
    }
  }

  return "just now";
}

export type Continent = "Asia" | "Americas" | "Africa" | "Europe" | "Middle East";
export type PostType = "Podcast" | "Reflection";
