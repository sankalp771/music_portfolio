import type { Metadata } from "next";
import { InteriorFooter, InteriorHeader } from "../components/InteriorChrome";
import { canonicalUrl } from "@/lib/content";

export const metadata: Metadata = { title: "Privacy — Akash Bhai", description: "Privacy information for the official Akash Bhai website.", alternates: canonicalUrl("/privacy") ? { canonical: canonicalUrl("/privacy") } : undefined };

export default function PrivacyPage() {
  return <main className="interior-page"><InteriorHeader /><section className="interior-content privacy-page"><p className="eyebrow">Legal · Updated November 2026</p><h1>PRIVACY.</h1><p>This website uses Vercel Web Analytics to measure aggregate page traffic and performance. Analytics are configured without advertising cookies or user accounts.</p><p>Links to Spotify, Apple Music, and Instagram open third-party services that have their own privacy policies. This website does not control how those services collect or use information.</p><p>This website does not currently offer accounts, contact forms, or newsletter signup. Professional inquiries go directly to the approved business email shown on the Contact page when configured.</p><a className="text-link" href="/">Back to home <span>↗</span></a></section><InteriorFooter /></main>;
}
