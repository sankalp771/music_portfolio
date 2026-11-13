import type { MetadataRoute } from "next";
import { getReleases } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return [];
  const releases = await getReleases();
  const base = siteUrl.replace(/\/$/, "");
  const staticRoutes = ["/", "/music", "/about", "/contact", "/privacy"].map((path) => ({ url: `${base}${path}`, changeFrequency: "monthly" as const, priority: path === "/" ? 1 : 0.7 }));
  const releaseRoutes = releases.map((release) => ({ url: `${base}/music/${release.slug}`, lastModified: release.releaseDate, changeFrequency: "monthly" as const, priority: 0.8 }));
  const trackRoutes = releases.flatMap((release) => (release.tracks ?? []).map((track) => ({ url: `${base}/music/${release.slug}/tracks/${track.slug}`, lastModified: release.releaseDate, changeFrequency: "monthly" as const, priority: 0.7 })));
  return [...staticRoutes, ...releaseRoutes, ...trackRoutes];
}
