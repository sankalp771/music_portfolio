import { getArtist } from "@/lib/content";
import { MobileMenu } from "./MobileMenu";
import { TrackedLink } from "./TrackedLink";
import { PlatformIcon } from "./PlatformIcon";

export async function InteriorHeader() {
  const artist = await getArtist();
  return (
    <header className="interior-header">
      <a className="wordmark" href="/" aria-label="Akash Bhai home">AKASH<span> BHAI</span></a>
      <nav className="desktop-nav" aria-label="Main navigation"><a href="/music">Music</a><a href="/about">About</a><a href="/contact">Contact</a></nav>
      <div className="header-platforms" aria-label="Official platforms">
        <TrackedLink event="streaming_click" platform="Spotify" className="platform-link" href={artist.spotifyUrl} aria-label="Spotify" title="Spotify" target="_blank" rel="noreferrer"><PlatformIcon platform="spotify" /></TrackedLink>
        <TrackedLink event="streaming_click" platform="Apple Music" className="platform-link" href={artist.appleMusicUrl} aria-label="Apple Music" title="Apple Music" target="_blank" rel="noreferrer"><PlatformIcon platform="apple-music" /></TrackedLink>
      </div>
      <MobileMenu spotifyUrl={artist.spotifyUrl} appleMusicUrl={artist.appleMusicUrl} />
    </header>
  );
}

export async function InteriorFooter() {
  const artist = await getArtist();
  return (
    <footer className="interior-footer">
      <a className="wordmark" href="/">AKASH BHAI</a>
      <a href="/music">Music</a><a href="/about">About</a><a href="/contact">Contact</a>
      <div className="footer-platforms" aria-label="Official platforms">
        <TrackedLink event="streaming_click" platform="Spotify" href={artist.spotifyUrl} aria-label="Spotify" title="Spotify" target="_blank" rel="noreferrer"><PlatformIcon platform="spotify" /></TrackedLink>
        <TrackedLink event="streaming_click" platform="Apple Music" href={artist.appleMusicUrl} aria-label="Apple Music" title="Apple Music" target="_blank" rel="noreferrer"><PlatformIcon platform="apple-music" /></TrackedLink>
        <TrackedLink event="social_click" platform="Instagram" href={artist.instagramUrl} aria-label="Instagram" title="Instagram" target="_blank" rel="noreferrer"><PlatformIcon platform="instagram" /></TrackedLink>
      </div>
      <a href="/privacy">Privacy</a><span>© {new Date().getUTCFullYear()} AKASH BHAI</span>
    </footer>
  );
}
