import { defineField, defineType } from "sanity";

export const releaseSchema = defineType({
  name: "release",
  title: "Release",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Release title", type: "string", validation: (rule) => rule.required().max(100) }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required().custom(async (value, context) => {
      if (!value?.current) return "A unique slug is required";
      const { document, getClient } = context;
      const client = getClient({ apiVersion: "2025-01-01" });
      const params = { draft: document?._id?.replace(/^drafts\./, ""), slug: value.current, type: "release" };
      const count = await client.fetch<number>("count(*[_type == $type && slug.current == $slug && _id != $draft])", params);
      return count === 0 ? true : "This slug is already in use";
    }) }),
    defineField({ name: "releaseType", title: "Release type", type: "string", options: { list: [{ title: "Single", value: "single" }, { title: "EP", value: "ep" }, { title: "Album", value: "album" }, { title: "Collaboration", value: "collaboration" }] }, validation: (rule) => rule.required() }),
    defineField({ name: "releaseDate", title: "Release date", type: "date", validation: (rule) => rule.required() }),
    defineField({ name: "displayOrder", title: "Discography order", type: "number", description: "Optional order for the public discography; lower numbers appear first.", validation: (rule) => rule.integer().min(1) }),
    defineField({ name: "coverArt", title: "Cover artwork", type: "image", options: { hotspot: true }, validation: (rule) => rule.required(), fields: [{ name: "alt", title: "Alt text", type: "string", validation: (rule) => rule.required() }] }),
    defineField({ name: "description", title: "Artist-approved context", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "featured", title: "Featured on homepage", type: "boolean", initialValue: false }),
    defineField({ name: "spotifyUrl", title: "Release Spotify URL", type: "url", validation: (rule) => rule.uri({ scheme: ["https"] }) }),
    defineField({ name: "youtubeUrl", title: "Official video URL", type: "url", validation: (rule) => rule.uri({ scheme: ["https"] }) }),
    defineField({ name: "appleMusicUrl", title: "Release Apple Music URL", type: "url", validation: (rule) => rule.uri({ scheme: ["https"] }) }),
    defineField({ name: "otherStreamingUrls", title: "Other streaming links", type: "array", of: [{ type: "object", fields: [{ name: "label", title: "Platform", type: "string", validation: (rule) => rule.required() }, { name: "url", title: "URL", type: "url", validation: (rule) => rule.required().uri({ scheme: ["https"] }) }] }] }),
    defineField({ name: "credits", title: "Credits", type: "array", of: [{ type: "object", fields: [{ name: "role", title: "Role", type: "string", validation: (rule) => rule.required() }, { name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }] }] }),
    defineField({ name: "lyrics", title: "Approved lyrics", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "duration", title: "Duration (ISO 8601)", type: "string", description: "Optional, for example PT3M45S." }),
    defineField({ name: "artist", title: "Artist", type: "reference", to: [{ type: "artist" }], validation: (rule) => rule.required() }),
    defineField({ name: "seoTitle", title: "SEO title override", type: "string", validation: (rule) => rule.max(60) }),
    defineField({ name: "seoDescription", title: "SEO description override", type: "text", rows: 2, validation: (rule) => rule.max(160) }),
  ],
  preview: { select: { title: "title", subtitle: "releaseDate", media: "coverArt" } },
});
