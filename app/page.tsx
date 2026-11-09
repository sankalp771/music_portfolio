const navItems = [
  { label: "Music", href: "/music" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

import { getArtist, getFeaturedRelease } from "@/lib/content";
import { MobileMenu } from "./components/MobileMenu";
import { TrackedLink } from "./components/TrackedLink";
import { PlatformIcon } from "./components/PlatformIcon";

export default async function Home() {
  const [artist, release] = await Promise.all([getArtist(), getFeaturedRelease()]);
  const artistStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: artist.name,
    jobTitle: artist.designation,
    sameAs: [artist.spotifyUrl, artist.appleMusicUrl, artist.instagramUrl],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(artistStructuredData).replace(/</g, "\\u003c") }} />
        <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Akash Bhai home">AKASH<span> BHAI</span></a>
        <nav aria-label="Main navigation">
          {navItems.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="header-platforms" aria-label="Official platforms">
          <TrackedLink event="streaming_click" platform="Spotify" className="platform-link" href={artist.spotifyUrl} aria-label="Spotify" title="Spotify" target="_blank" rel="noreferrer"><PlatformIcon platform="spotify" /></TrackedLink>
          <TrackedLink event="streaming_click" platform="Apple Music" className="platform-link" href={artist.appleMusicUrl} aria-label="Apple Music" title="Apple Music" target="_blank" rel="noreferrer"><PlatformIcon platform="apple-music" /></TrackedLink>
        </div>
        <MobileMenu spotifyUrl={artist.spotifyUrl} appleMusicUrl={artist.appleMusicUrl} />
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title" style={artist.heroImageUrl ? { backgroundImage: `linear-gradient(90deg,rgba(7,7,8,.72),rgba(7,7,8,.12)),linear-gradient(0deg,#090909 0%,transparent 18%),url("${artist.heroImageUrl}")` } : undefined}>
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-orb orb-one" aria-hidden="true" />
        <div className="hero-orb orb-two" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot" /> Independent recording artist</p>
          <h1 id="hero-title">AKASH<br /><em>BHAI</em></h1>
          <div className="hero-bottom">
            <p>Music. Identity.<br /><span>Emotion.</span></p>
            <div className="hero-actions">
              <TrackedLink event="streaming_click" platform="Spotify" className="button button-light" href={release.spotifyUrl || artist.spotifyUrl} target="_blank" rel="noreferrer">Listen to JYOT <span>↗</span></TrackedLink>
              <a className="text-link" href="/music">Explore the music <span>↗</span></a>
            </div>
          </div>
        </div>
        <p className="hero-index">ARTIST · MUSIC · 2026</p>
        <p className="hero-vertical">AKASH BHAI — OFFICIAL</p>
      </section>

      <section className="release-section section-wrap" id="music" aria-labelledby="release-title">
        <div className="section-heading">
          <p className="eyebrow">01 — Featured release</p>
          <p className="section-note">The latest release</p>
        </div>
        <div className="release-card">
          <div className={release.coverArtUrl ? "cover-art has-art" : "cover-art"} role="img" aria-label={release.coverArtAlt || `${release.title} release artwork placeholder`} style={release.coverArtUrl ? { backgroundImage: `linear-gradient(0deg,rgba(0,0,0,.16),rgba(0,0,0,.16)),url("${release.coverArtUrl}")` } : undefined}>
            {!release.coverArtUrl && <><div className="cover-halo" /><span className="cover-topline">AKASH BHAI · {new Date(`${release.releaseDate}T00:00:00Z`).getUTCFullYear()}</span><span className="cover-title">{release.title}</span><span className="cover-caption">Official release artwork</span></>}
          </div>
          <div className="release-info">
            <p className="eyebrow">Released {new Date(`${release.releaseDate}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}</p>
            <h2 id="release-title">{release.title}<span className="title-period">.</span></h2>
            <p className="release-desc">{release.description?.length ? "Release notes from Akash Bhai." : "Official release information and listening links."}</p>
            <div className="release-links">
              {release.spotifyUrl && <TrackedLink event="streaming_click" platform="Spotify" className="button button-outline" href={release.spotifyUrl} target="_blank" rel="noreferrer">Listen on Spotify <span>↗</span></TrackedLink>}
              {!release.spotifyUrl && <TrackedLink event="streaming_click" platform="Spotify artist profile" className="button button-outline" href={artist.spotifyUrl} target="_blank" rel="noreferrer">Spotify artist profile <span>↗</span></TrackedLink>}
              <a className="text-link" href={`/music/${release.slug}`}>Release page <span>↗</span></a>
            </div>
            <div className="release-meta"><span>{release.releaseType}</span><span>{new Date(`${release.releaseDate}T00:00:00Z`).getUTCFullYear()}</span><span>Akash Bhai</span></div>
          </div>
        </div>
        <div className="catalog-link"><a className="text-link" href="/music">View all music <span>↗</span></a></div>
      </section>

      <section className="manifesto section-wrap" id="about" aria-labelledby="about-title">
        <div className="manifesto-label"><p className="eyebrow">02 — The artist</p><span className="manifesto-mark">AB—</span></div>
        <div className="manifesto-copy">
          <h2 id="about-title">A world shaped<br />by <em>sound</em> and <em>feeling.</em></h2>
          <div className="manifesto-foot"><p>{artist.shortBiography || "Artist-approved biography and background will be added here."}</p><a className="text-link" href="/about">Discover Akash Bhai <span>↗</span></a></div>
        </div>
      </section>

      <section className="connect-section" id="contact">
        <div className="section-wrap connect-inner">
          <p className="eyebrow">03 — Stay close</p>
          <h2>Follow the<br /><em>feeling.</em></h2>
          <div className="connect-bottom"><p>Official artist profiles and music.</p><div className="connect-links"><TrackedLink event="streaming_click" platform="Spotify" className="button button-light" href={artist.spotifyUrl} target="_blank" rel="noreferrer">Spotify <span>↗</span></TrackedLink><TrackedLink event="streaming_click" platform="Apple Music" className="button button-outline" href={artist.appleMusicUrl} target="_blank" rel="noreferrer">Apple Music <span>↗</span></TrackedLink><TrackedLink event="social_click" platform="Instagram" className="button button-outline" href={artist.instagramUrl} target="_blank" rel="noreferrer">Instagram <span>↗</span></TrackedLink></div></div>
        </div>
      </section>

      <footer className="site-footer">
        <a className="wordmark" href="#top">AKASH<span> BHAI</span></a>
        <p>Independent recording artist</p>
        <div className="footer-links" aria-label="Official platforms"><TrackedLink event="streaming_click" platform="Spotify" href={artist.spotifyUrl} aria-label="Spotify" title="Spotify" target="_blank" rel="noreferrer"><PlatformIcon platform="spotify" /></TrackedLink><TrackedLink event="streaming_click" platform="Apple Music" href={artist.appleMusicUrl} aria-label="Apple Music" title="Apple Music" target="_blank" rel="noreferrer"><PlatformIcon platform="apple-music" /></TrackedLink><TrackedLink event="social_click" platform="Instagram" href={artist.instagramUrl} aria-label="Instagram" title="Instagram" target="_blank" rel="noreferrer"><PlatformIcon platform="instagram" /></TrackedLink></div>
        <span className="copyright">© 2026 AKASH BHAI</span>
      </footer>
    </main>
  );
}
