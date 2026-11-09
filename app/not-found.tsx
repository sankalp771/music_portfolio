import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page not found — Akash Bhai", robots: { index: false, follow: true } };

export default function NotFound() {
  return <main className="interior-page"><section className="interior-content"><p className="eyebrow">404 · Not found</p><h1>LOST IN<br /><em>THE DARK.</em></h1><a className="button button-light" href="/">Back to home <span>↗</span></a></section></main>;
}
