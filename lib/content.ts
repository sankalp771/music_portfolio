import { createClient } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";

export type StreamLink = { label: string; url: string };
export type Credit = { role: string; name: string };

export type Artist = {
  name: string;
  designation: string;
  shortBiography?: string;
  biography?: PortableTextBlock[];
  artistImageUrl?: string;
  artistImageAlt?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  website?: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  instagramUrl: string;
  youtubeUrl?: string;
  xUrl?: string;
  contactEmail?: string;
};

export type Release = {
  id: string;
  title: string;
  slug: string;
  releaseType: "single" | "album" | "2-pack";
  releaseDate: string;
  displayOrder?: number;
  coverArtUrl?: string;
  coverArtAlt?: string;
  description?: PortableTextBlock[];
  featured?: boolean;
  spotifyUrl?: string;
  youtubeUrl?: string;
  appleMusicUrl?: string;
  otherStreamingUrls?: StreamLink[];
  credits?: Credit[];
  lyrics?: PortableTextBlock[];
  duration?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export const FALLBACK_ARTIST: Artist = {
  name: "Akash Bhai",
  designation: "Independent recording artist",
  shortBiography: "",
  spotifyUrl: "https://open.spotify.com/artist/496OOPbsR4MOp957Duq1i6",
  appleMusicUrl: "https://music.apple.com/us/artist/akash-bhai/1533694459",
  instagramUrl: "https://www.instagram.com/hells_pendulum",
};

// Seed details were checked against the artist's Spotify and Apple Music catalogs.
export const FALLBACK_RELEASES: Release[] = [
  { id: "seed-jyot", title: "JYOT", slug: "jyot", releaseType: "single", releaseDate: "2026-10-23", displayOrder: 1, coverArtUrl: "https://i.scdn.co/image/ab67616d00001e0297ff5cfece4d200114670b29", coverArtAlt: "JYOT single cover art", featured: true, spotifyUrl: "https://open.spotify.com/track/3oKJm1rIsdnu7lurT81fP9", appleMusicUrl: "https://music.apple.com/in/album/jyot-single/1867424450", seoTitle: "JYOT — Akash Bhai | Official Song", seoDescription: "Listen to JYOT by Akash Bhai, released October 23, 2026. Explore the official song and streaming profiles." },
  { id: "seed-phool", title: "phool", slug: "phool", releaseType: "single", releaseDate: "2026-04-10", displayOrder: 2, coverArtUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/8b/2b/d8/8b2bd85d-ad66-d796-ecc3-e9b9770bca7f/8447536993314.jpg/1000x1000bb.webp", coverArtAlt: "phool single cover art", spotifyUrl: "https://open.spotify.com/track/3s0FzGny5BFUSNGhrR27rh", appleMusicUrl: "https://music.apple.com/us/album/phool-single/1883678275" },
  { id: "seed-what-a-time", title: "what a time to be alive", slug: "what-a-time-to-be-alive", releaseType: "single", releaseDate: "2026-02-20", displayOrder: 3, coverArtUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/c0/87/7c/c0877cd9-8dab-6a6c-df26-7969300cd5f6/8447536988662.jpg/1000x1000bb.webp", coverArtAlt: "what a time to be alive single cover art", spotifyUrl: "https://open.spotify.com/track/2chAWcG2G7uZAt8hCILrl0", appleMusicUrl: "https://music.apple.com/us/album/what-a-time-to-be-alive-single/1875796719" },
  { id: "seed-penthouse", title: "at the penthouse", slug: "at-the-penthouse", releaseType: "single", releaseDate: "2026-01-16", displayOrder: 4, coverArtUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/c9/41/85/c9418569-6b19-5551-ac39-5c6b74ed497d/8447536983315.jpg/1000x1000bb.webp", coverArtAlt: "at the penthouse single cover art", spotifyUrl: "https://open.spotify.com/track/6HF4DQ9IVpIecFDtEUaGGN", appleMusicUrl: "https://music.apple.com/us/album/at-the-penthouse-single/1865924799" },
  { id: "seed-blur-young-scott", title: "blur (with Young Scott)", slug: "blur-young-scott", releaseType: "single", releaseDate: "2025-09-07", displayOrder: 5, coverArtUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/e2/7d/19/e27d1950-0184-a77c-c2d3-7898ffa1f248/8721416186912.jpg/1000x1000bb.webp", coverArtAlt: "blur single cover art with Young Scott", spotifyUrl: "https://open.spotify.com/track/1JrlgLx2B5Y8x03e2Vbo94", appleMusicUrl: "https://music.apple.com/us/album/blur-single/1862100941" },
  { id: "seed-blur", title: "blur", slug: "blur", releaseType: "single", releaseDate: "2025-08-06", displayOrder: 6, coverArtUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/28/ca/27/28ca2727-4d51-ab2c-7c12-8331edd22d08/8721215911739.jpg/1000x1000bb.webp", coverArtAlt: "blur single cover art", appleMusicUrl: "https://music.apple.com/us/album/blur-single/1861897658" },
  { id: "seed-kaayde", title: "Kaayde", slug: "kaayde", releaseType: "single", releaseDate: "2023-12-23", displayOrder: 7, coverArtUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/22/7b/e6/227be691-fb1d-c40a-4272-c038b186c8be/8721056402953.jpg/1000x1000bb.webp", coverArtAlt: "Kaayde single cover art", appleMusicUrl: "https://music.apple.com/us/album/kaayde-single/1862177426" },
  { id: "seed-wishing-4u", title: "WISHING 4U", slug: "wishing-4u", releaseType: "single", releaseDate: "2023-09-08", displayOrder: 8, coverArtUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/4e/36/47/4e364720-9ec4-6059-dda6-08949d899839/8720923712744.jpg/1000x1000bb.webp", coverArtAlt: "WISHING 4U single cover art", appleMusicUrl: "https://music.apple.com/us/album/wishing-4u-single/1862026204" },
  { id: "seed-rooh-aur-dil", title: "rooh aur dil", slug: "rooh-aur-dil", releaseType: "single", releaseDate: "2023-10-27", displayOrder: 9, coverArtUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/4d/40/d8/4d40d818-024d-f9b0-c1a2-e24485972318/8720996496091.jpg/1000x1000bb.webp", coverArtAlt: "rooh aur dil single cover art", appleMusicUrl: "https://music.apple.com/us/album/rooh-aur-dil-single/1861714942" },
  { id: "seed-saint", title: "SAINT", slug: "saint", releaseType: "single", releaseDate: "2022-09-02", displayOrder: 10, coverArtUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/bf/4e/d4/bf4ed49c-9c24-0aaf-0cb4-e1b1d60b0622/8720766631547.jpg/1000x1000bb.webp", coverArtAlt: "SAINT single cover art", appleMusicUrl: "https://music.apple.com/us/album/saint-single/1861630306" },
  { id: "seed-s1deb-tch", title: "S1DEB!TCH", slug: "s1deb-tch", releaseType: "single", releaseDate: "2023-04-14", displayOrder: 11, coverArtUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/cd/e7/f7/cde7f766-3fc3-6525-08d3-c5c1d7d5c9d4/8720923761155.jpg/1000x1000bb.webp", coverArtAlt: "S1DEB!TCH single cover art", appleMusicUrl: "https://music.apple.com/us/album/s1deb-tch-single/1861992636" },
];

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const sanityReady = Boolean(projectId && dataset && projectId !== "replace-with-project-id");

export const sanityClient = sanityReady
  ? createClient({ projectId: projectId!, dataset: dataset!, apiVersion: "2025-01-01", useCdn: false })
  : null;

export function canonicalUrl(path: string): string | undefined {
  if (!process.env.NEXT_PUBLIC_SITE_URL) return undefined;
  return `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

const artistQuery = `*[_type == "artist" && slug.current == "akash-bhai"][0]{
  name, designation, shortBiography, biography,
  "artistImageUrl": artistImage.asset->url, "artistImageAlt": artistImage.alt,
  "heroImageUrl": heroImage.asset->url, "heroImageAlt": heroImage.alt,
  website, spotifyUrl, appleMusicUrl, instagramUrl, youtubeUrl, xUrl, contactEmail
}`;

const releaseProjection = `{
  "id": _id, title, "slug": slug.current, "releaseType": select(releaseType in ["single", "album", "2-pack"] => releaseType, "single"), releaseDate, displayOrder,
  "coverArtUrl": coverArt.asset->url, "coverArtAlt": coverArt.alt,
  description, featured, spotifyUrl, youtubeUrl, appleMusicUrl,
  otherStreamingUrls[]{label, url}, credits[]{role, name}, lyrics, duration, seoTitle, seoDescription
}`;

export const releasesQuery = `*[_type == "release" && defined(slug.current) && releaseDate <= now()] | order(coalesce(displayOrder, 999) asc, releaseDate desc) ${releaseProjection}`;
export const featuredReleaseQuery = `*[_type == "release" && featured == true && releaseDate <= now()] | order(releaseDate desc)[0] ${releaseProjection}`;
export const releaseBySlugQuery = `*[_type == "release" && slug.current == $slug && releaseDate <= now()][0] ${releaseProjection}`;

export async function getArtist(): Promise<Artist> {
  if (!sanityClient) return FALLBACK_ARTIST;
  try { return (await sanityClient.fetch<Artist | null>(artistQuery, {}, { next: { revalidate: 60 } })) ?? FALLBACK_ARTIST; }
  catch (error) { console.error("Sanity artist fetch failed; serving approved seed profile.", error); return FALLBACK_ARTIST; }
}

export async function getReleases(): Promise<Release[]> {
  if (!sanityClient) return FALLBACK_RELEASES;
  try {
    const releases = await sanityClient.fetch<Release[]>(releasesQuery, {}, { next: { revalidate: 60 } });
    return releases?.length ? releases : FALLBACK_RELEASES;
  }
  catch (error) { console.error("Sanity release fetch failed; serving approved seed release.", error); return FALLBACK_RELEASES; }
}

export async function getFeaturedRelease(): Promise<Release> {
  if (!sanityClient) return FALLBACK_RELEASES[0];
  try { return (await sanityClient.fetch<Release | null>(featuredReleaseQuery, {}, { next: { revalidate: 60 } })) ?? (await getReleases())[0] ?? FALLBACK_RELEASES[0]; }
  catch (error) { console.error("Sanity featured release fetch failed; serving approved seed release.", error); return FALLBACK_RELEASES[0]; }
}

export async function getReleaseBySlug(slug: string): Promise<Release | null> {
  if (!sanityClient) return FALLBACK_RELEASES.find((release) => release.slug === slug) ?? null;
  try { return (await sanityClient.fetch<Release | null>(releaseBySlugQuery, { slug }, { next: { revalidate: 60 } })) ?? (FALLBACK_RELEASES.find((release) => release.slug === slug) ?? null); }
  catch (error) { console.error("Sanity release fetch failed.", error); return FALLBACK_RELEASES.find((release) => release.slug === slug) ?? null; }
}
