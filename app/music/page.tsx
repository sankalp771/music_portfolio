import type { Metadata } from "next";
import { InteriorFooter, InteriorHeader } from "../components/InteriorChrome";
import { getReleases } from "@/lib/content";
import { TrackedLink } from "../components/TrackedLink";

const canonical = process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/music` : undefined;
export const metadata: Metadata = {
  title: "Music — Akash Bhai",
  description: "Explore official releases by Akash Bhai.",
  alternates: canonical ? { canonical } : undefined,
};

export default async function MusicPage() {
  const releases = await getReleases();
  return (
    <main className="interior-page">
      <InteriorHeader />
      <section className="interior-content"><p className="eyebrow">Discography · {String(releases.length).padStart(2, "0")} releases</p><h1>THE<br /><em>MUSIC.</em></h1><p className="interior-intro">Official releases by Akash Bhai.</p>
        <div className="discography-grid">
          {releases.map((release) => <TrackedLink event="discography_click" platform={release.title} className="discography-card" href={`/music/${release.slug}`} key={release.id}>
            <span className={release.coverArtUrl ? "discography-art has-art" : "discography-art"} style={release.coverArtUrl ? { backgroundImage: `linear-gradient(0deg,rgba(0,0,0,.12),rgba(0,0,0,.12)),url("${release.coverArtUrl}")` } : undefined} role="img" aria-label={release.coverArtAlt || `${release.title} release artwork placeholder`}><span>{release.title}</span></span>
            <span className="discography-meta"><span className="eyebrow">{release.releaseType}{release.featured ? " · Featured" : ""}</span><strong>{release.title}</strong><span>{new Date(`${release.releaseDate}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}<b>↗</b></span></span>
          </TrackedLink>)}
        </div>
      </section>
      <InteriorFooter />
    </main>
  );
}
