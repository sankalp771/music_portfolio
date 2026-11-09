// Idempotent initial import for the artist profile and seed release catalog.
// Uses the Sanity CLI's local auth cache; never print or commit its token.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
if (!projectId || !dataset) throw new Error("Sanity project configuration is missing.");

const configPath = path.join(process.env.TEMP, "sanity-codex-config", "sanity", "config.json");
const cliConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
if (!cliConfig.authToken) throw new Error("The Sanity CLI login token was not found.");

const require = createRequire(import.meta.url);
const Module = require("node:module");
const contentPath = path.join(process.cwd(), "lib", "content.ts");
const source = fs.readFileSync(contentPath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
    esModuleInterop: true,
  },
}).outputText;
const contentModule = new Module(contentPath);
contentModule.filename = contentPath;
contentModule.paths = Module._nodeModulePaths(process.cwd());
contentModule._compile(compiled, contentPath);
const { FALLBACK_ARTIST, FALLBACK_RELEASES } = contentModule.exports;

const client = createClient({ projectId, dataset, apiVersion: "2025-01-01", useCdn: false, token: cliConfig.authToken });
const artistDoc = {
  _id: "artist-akash-bhai",
  _type: "artist",
  name: FALLBACK_ARTIST.name,
  slug: { _type: "slug", current: "akash-bhai" },
  designation: FALLBACK_ARTIST.designation,
  spotifyUrl: FALLBACK_ARTIST.spotifyUrl,
  appleMusicUrl: FALLBACK_ARTIST.appleMusicUrl,
  instagramUrl: FALLBACK_ARTIST.instagramUrl,
};

await client.createIfNotExists(artistDoc);
const existing = await client.fetch(`*[_type == "release"]{_id, "slug": slug.current}`);
const existingBySlug = new Map(existing.map((doc) => [doc.slug, doc]));
let created = 0;
let skipped = 0;

for (const release of FALLBACK_RELEASES) {
  if (existingBySlug.has(release.slug)) {
    skipped += 1;
    continue;
  }
  const response = await fetch(release.coverArtUrl);
  if (!response.ok) throw new Error(`Cover art fetch failed for ${release.slug}: ${response.status}`);
  const mime = response.headers.get("content-type")?.split(";")[0] || "image/jpeg";
  const extension = mime.includes("webp") ? "webp" : mime.includes("png") ? "png" : "jpg";
  const buffer = Buffer.from(await response.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, {
    filename: `${release.slug}.${extension}`,
    contentType: mime,
  });
  const releaseDoc = {
    _id: `release-${release.slug}`,
    _type: "release",
    title: release.title,
    slug: { _type: "slug", current: release.slug },
    releaseType: release.releaseType,
    releaseDate: release.releaseDate,
    displayOrder: release.displayOrder,
    coverArt: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: release.coverArtAlt,
    },
    featured: Boolean(release.featured),
    artist: { _type: "reference", _ref: artistDoc._id },
    ...(release.spotifyUrl ? { spotifyUrl: release.spotifyUrl } : {}),
    ...(release.appleMusicUrl ? { appleMusicUrl: release.appleMusicUrl } : {}),
    ...(release.youtubeUrl ? { youtubeUrl: release.youtubeUrl } : {}),
  };
  await client.create(releaseDoc);
  created += 1;
  process.stdout.write(`Imported ${release.title}\n`);
}

const totals = await client.fetch(`{
  "artists": count(*[_type == "artist" && slug.current == "akash-bhai"]),
  "releases": count(*[_type == "release"]),
  "withArtwork": count(*[_type == "release" && defined(coverArt.asset)])
}`);
process.stdout.write(JSON.stringify({ created, skipped, totals }) + "\n");
