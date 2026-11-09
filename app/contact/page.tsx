import type { Metadata } from "next";
import { getArtist, canonicalUrl } from "@/lib/content";
import { InteriorFooter, InteriorHeader } from "../components/InteriorChrome";
import { TrackedLink } from "../components/TrackedLink";

export const metadata: Metadata = { title: "Contact — Akash Bhai", description: "Official links and contact information for Akash Bhai.", alternates: canonicalUrl("/contact") ? { canonical: canonicalUrl("/contact") } : undefined };

export default async function ContactPage() {
  const artist = await getArtist();
  return <main className="interior-page"><InteriorHeader /><section className="interior-content contact-page"><p className="eyebrow">Booking · Collaboration · Press</p><h1>STAY<br /><em>CLOSE.</em></h1><p className="interior-intro">Follow Akash Bhai and find the music on official platforms.</p><div className="profile-list"><TrackedLink event="streaming_click" platform="Spotify" href={artist.spotifyUrl} target="_blank" rel="noreferrer"><span>Spotify</span><span>Listen to the music ↗</span></TrackedLink><TrackedLink event="streaming_click" platform="Apple Music" href={artist.appleMusicUrl} target="_blank" rel="noreferrer"><span>Apple Music</span><span>Explore the artist page ↗</span></TrackedLink><TrackedLink event="social_click" platform="Instagram" href={artist.instagramUrl} target="_blank" rel="noreferrer"><span>Instagram</span><span>@hells_pendulum ↗</span></TrackedLink></div>{artist.contactEmail ? <TrackedLink event="contact_click" className="business-contact" href={`mailto:${artist.contactEmail}`}>For professional inquiries <span>{artist.contactEmail} ↗</span></TrackedLink> : <p className="editorial-placeholder">Booking and business email will be added once approved.</p>}</section><InteriorFooter /></main>;
}
