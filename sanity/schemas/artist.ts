import { defineField, defineType } from "sanity";

export const artistSchema = defineType({
  name: "artist",
  title: "Artist profile",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Display name", type: "string", validation: (rule) => rule.required().max(80) }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "designation", title: "Designation", type: "string", initialValue: "Independent recording artist" }),
    defineField({ name: "shortBiography", title: "Short biography", type: "text", rows: 3, validation: (rule) => rule.max(280) }),
    defineField({ name: "biography", title: "Biography", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "artistImage", title: "Artist portrait", type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt text", type: "string", validation: (rule) => rule.required() }] }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt text", type: "string" }] }),
    defineField({ name: "website", title: "Website", type: "url" }),
    defineField({ name: "spotifyUrl", title: "Spotify profile", type: "url", initialValue: "https://open.spotify.com/artist/496OOPbsR4MOp957Duq1i6" }),
    defineField({ name: "appleMusicUrl", title: "Apple Music profile", type: "url", initialValue: "https://music.apple.com/us/artist/akash-bhai/1533694459" }),
    defineField({ name: "instagramUrl", title: "Instagram profile", type: "url", initialValue: "https://www.instagram.com/hells_pendulum" }),
    defineField({ name: "youtubeUrl", title: "YouTube profile", type: "url" }),
    defineField({ name: "xUrl", title: "X profile", type: "url" }),
    defineField({ name: "contactEmail", title: "Approved business email", type: "string", validation: (rule) => rule.email() }),
  ],
  preview: { select: { title: "name", subtitle: "designation", media: "artistImage" } },
});
