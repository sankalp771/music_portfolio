import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { getArtist, canonicalUrl } from "@/lib/content";
import { InteriorFooter, InteriorHeader } from "../components/InteriorChrome";

export const metadata: Metadata = { title: "About — Akash Bhai", description: "Official artist information for Akash Bhai.", alternates: canonicalUrl("/about") ? { canonical: canonicalUrl("/about") } : undefined };

export default async function AboutPage() {
  const artist = await getArtist();
  return <main className="interior-page"><InteriorHeader /><section className="interior-content about-page"><p className="eyebrow">Artist profile</p><div className="about-grid"><div><h1>{artist.name.split(" ")[0]}<br /><em>{artist.name.split(" ").slice(1).join(" ") || "ARTIST"}.</em></h1><p className="interior-intro">{artist.designation}.</p>{artist.biography?.length ? <div className="portable-copy"><PortableText value={artist.biography} /></div> : <p className="editorial-placeholder">Artist-approved biography coming soon.</p>}<div className="detail-actions"><a className="button button-light" href={artist.spotifyUrl} target="_blank" rel="noreferrer">Spotify <span>↗</span></a><a className="button button-outline" href={artist.instagramUrl} target="_blank" rel="noreferrer">Instagram <span>↗</span></a></div></div><div className={artist.artistImageUrl ? "artist-portrait has-portrait" : "artist-portrait"} role="img" aria-label={artist.artistImageAlt || "Artist portrait will be added after approval"} style={artist.artistImageUrl ? { backgroundImage: `url("${artist.artistImageUrl}")` } : undefined}>{!artist.artistImageUrl && <span>PORTRAIT<br />COMING SOON</span>}</div></div></section><InteriorFooter /></main>;
}
