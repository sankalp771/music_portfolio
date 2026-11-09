import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/dm-mono/400.css";
import "@fontsource/dm-mono/500.css";
import "@fontsource/playfair-display/500-italic.css";
import "@fontsource/playfair-display/600-italic.css";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteName = "Akash Bhai — Official Artist Website";

export const metadata: Metadata = {
  title: "Akash Bhai — Independent Recording Artist",
  description:
    "The official home of Akash Bhai. Discover JYOT, explore the music, and follow the artist's journey.",
  metadataBase: new URL(siteUrl || "http://localhost:3000"),
  alternates: siteUrl ? { canonical: `${siteUrl.replace(/\/$/, "")}/` } : undefined,
  openGraph: {
    siteName,
    title: "Akash Bhai — Independent Recording Artist",
    description: "Music. Identity. Emotion.",
    type: "website",
    images: ["/hero-night-rooftop.png"],
  },
  twitter: { card: "summary_large_image", title: "Akash Bhai — Independent Recording Artist", description: "Music. Identity. Emotion.", images: ["/hero-night-rooftop.png"] },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}<Analytics /></body>
    </html>
  );
}
