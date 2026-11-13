import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { getReleases } from "@/lib/content";
import { InteriorFooter, InteriorHeader } from "../../../../components/InteriorChrome";
import { TrackedLink } from "../../../../components/TrackedLink";
import { PageEvent } from "../../../../components/PageEvent";

export const revalidate = 60;

export async function generateStaticParams() {
  const releases = await getReleases();
  return releases.flatMap(release => (release.tracks ?? []).map(track => ({ slug: release.slug, trackSlug: track.slug })));
}

async function findTrack(slug: string, trackSlug: string) {
  const releases = await getReleases();
  const release = releases.find(item => item.slug === slug);
  const track = release?.tracks?.find(item => item.slug === trackSlug);
  return release && track ? { release, track } : null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; trackSlug: string }> }): Promise<Metadata> {
  const { slug, trackSlug } = await params;
  const item = await findTrack(slug, trackSlug);
  if (!item) return { title: "Track not found — Akash Bhai", robots: { index: false, follow: true } };
  return { title: `${item.track.title} — ${item.release.title} | Akash Bhai`, description: `Listen to ${item.track.title} from ${item.release.title} by Akash Bhai.` };
}

export default async function TrackPage({ params }: { params: Promise<{ slug: string; trackSlug: string }> }) {
  const { slug, trackSlug } = await params;
  const item = await findTrack(slug, trackSlug);
  if (!item) notFound();
  const { release, track } = item;
  return <main className="interior-page release-page"><PageEvent name="release_view" title={track.title} /><InteriorHeader />
    <section className="release-detail">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/music">Music</a><span>/</span><a href={`/music/${release.slug}`}>{release.title}</a><span>/</span><span aria-current="page">{track.title}</span></nav>
      <div className="release-detail-grid"><div className={release.coverArtUrl ? "discography-art release-art has-art" : "discography-art release-art"} style={release.coverArtUrl ? { backgroundImage: `linear-gradient(0deg,rgba(0,0,0,.12),rgba(0,0,0,.12)),url("${release.coverArtUrl}")` } : undefined} role="img" aria-label={release.coverArtAlt || `${release.title} artwork`}><span>{release.title}</span></div>
        <div className="release-detail-copy"><p className="eyebrow">Track · {release.title}</p><h1>{track.title}<span>.</span></h1><p className="release-byline">Akash Bhai</p>
          <div className="detail-actions">{track.spotifyUrl && <TrackedLink event="streaming_click" platform="Spotify" className="button button-light" href={track.spotifyUrl} target="_blank" rel="noreferrer">Spotify <span>↗</span></TrackedLink>}{track.appleMusicUrl && <TrackedLink event="streaming_click" platform="Apple Music" className="button button-outline" href={track.appleMusicUrl} target="_blank" rel="noreferrer">Apple Music <span>↗</span></TrackedLink>}{track.youtubeUrl && <TrackedLink event="youtube_click" platform="YouTube" className="button button-outline" href={track.youtubeUrl} target="_blank" rel="noreferrer">Official video <span>↗</span></TrackedLink>}</div>
          {track.lyrics?.length ? <details className="lyrics" open><summary>Lyrics</summary><div className="portable-copy"><PortableText value={track.lyrics} /></div></details> : null}
        </div>
      </div>
      <section className="related-releases"><p className="eyebrow">From this release</p><div><TrackedLink event="discography_click" platform={release.title} href={`/music/${release.slug}`}>{release.title}<span>↗</span></TrackedLink></div></section>
    </section><InteriorFooter /></main>;
}
