import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { InteriorFooter, InteriorHeader } from "../components/InteriorChrome";
import { getArtist, getReleases, type Release } from "@/lib/content";
import { PageEvent } from "../components/PageEvent";
import { TrackedLink } from "../components/TrackedLink";

export function releaseMetadata(release: Release | null): Metadata {
  if (!release) return { title: "Release not found — Akash Bhai", robots: { index: false, follow: true } };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const canonical = siteUrl ? `${siteUrl.replace(/\/$/, "")}/music/${release.slug}` : undefined;
  return {
    title: release.seoTitle || `${release.title} — Akash Bhai | Official Song`,
    description: release.seoDescription || `Listen to ${release.title} by Akash Bhai. Explore the official release information and streaming links.`,
    alternates: canonical ? { canonical } : undefined,
    openGraph: { title: release.seoTitle || `${release.title} — Akash Bhai`, description: release.seoDescription || `Official release page for ${release.title} by Akash Bhai.`, type: "music.song", images: release.coverArtUrl ? [release.coverArtUrl] : undefined },
    twitter: { card: "summary_large_image", title: release.seoTitle || `${release.title} — Akash Bhai`, description: release.seoDescription || `Official release page for ${release.title} by Akash Bhai.`, images: release.coverArtUrl ? [release.coverArtUrl] : undefined },
  };
}

export async function ReleaseDetail({ release }: { release: Release }) {
  const [artist, releases] = await Promise.all([getArtist(), getReleases()]);
  const canonical = process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/music/${release.slug}` : undefined;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    name: release.title,
    byArtist: { "@type": "Person", name: artist.name },
    datePublished: release.releaseDate,
    ...(canonical ? { url: canonical } : {}),
    ...(release.coverArtUrl ? { image: release.coverArtUrl } : {}),
    ...(release.duration ? { duration: release.duration } : {}),
  };
  const related = releases.filter((item) => item.slug !== release.slug).slice(0, 3);
  const dateText = new Date(`${release.releaseDate}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

  return (
    <main className="interior-page release-page">
      <PageEvent name="release_view" title={release.title} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <InteriorHeader />
      <section className="release-detail">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/music">Music</a><span>/</span><span aria-current="page">{release.title}</span></nav>
        <div className="release-detail-grid"><div className={release.coverArtUrl ? "discography-art release-art has-art" : "discography-art release-art"} style={release.coverArtUrl ? { backgroundImage: `linear-gradient(0deg,rgba(0,0,0,.12),rgba(0,0,0,.12)),url("${release.coverArtUrl}")` } : undefined} role="img" aria-label={release.coverArtAlt || `${release.title} release artwork placeholder`}><span>{release.title}</span></div>
          <div className="release-detail-copy"><p className="eyebrow">{release.releaseType} · {dateText}</p><h1>{release.title}<span>.</span></h1><p className="release-byline">{artist.name}</p>
            {release.description?.length ? <div className="portable-copy"><PortableText value={release.description} /></div> : <p className="detail-note">Official release information. Artist-approved notes and artwork will be added when available.</p>}
            <div className="detail-actions">
              {release.spotifyUrl && <TrackedLink event="streaming_click" platform="Spotify" className="button button-light" href={release.spotifyUrl} target="_blank" rel="noreferrer">Spotify <span>↗</span></TrackedLink>}
              {release.appleMusicUrl && <TrackedLink event="streaming_click" platform="Apple Music" className="button button-outline" href={release.appleMusicUrl} target="_blank" rel="noreferrer">Apple Music <span>↗</span></TrackedLink>}
              {release.youtubeUrl && <TrackedLink event="youtube_click" platform="YouTube" className="button button-outline" href={release.youtubeUrl} target="_blank" rel="noreferrer">Official video <span>↗</span></TrackedLink>}
              {release.otherStreamingUrls?.map((link) => <TrackedLink key={link.url} event="streaming_click" platform={link.label} className="button button-outline" href={link.url} target="_blank" rel="noreferrer">{link.label} <span>↗</span></TrackedLink>)}
              {!release.spotifyUrl && <TrackedLink event="streaming_click" platform="Spotify artist profile" className="button button-light" href={artist.spotifyUrl} target="_blank" rel="noreferrer">Spotify artist profile <span>↗</span></TrackedLink>}
              {!release.appleMusicUrl && <TrackedLink event="streaming_click" platform="Apple Music artist profile" className="button button-outline" href={artist.appleMusicUrl} target="_blank" rel="noreferrer">Apple Music profile <span>↗</span></TrackedLink>}
            </div>
            {release.lyrics?.length ? <details className="lyrics"><summary>Lyrics</summary><div className="portable-copy"><PortableText value={release.lyrics} /></div></details> : null}
          </div>
        </div>
        {release.tracks?.length ? <section className="related-releases"><p className="eyebrow">Tracklist · {release.tracks.length} tracks</p><div>{release.tracks.map((track, index) => <TrackedLink event="discography_click" platform={track.title} href={`/music/${release.slug}/tracks/${track.slug}`} key={`${track.slug}-${index}`}>{String(index + 1).padStart(2, "0")} · {track.title}<span>↗</span></TrackedLink>)}</div></section> : null}
        {related.length ? <section className="related-releases"><p className="eyebrow">Keep listening</p><div>{related.map((item) => <TrackedLink event="discography_click" platform={item.title} href={`/music/${item.slug}`} key={item.id}>{item.title}<span>↗</span></TrackedLink>)}</div></section> : null}
      </section>
      <InteriorFooter />
    </main>
  );
}
