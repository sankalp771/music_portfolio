"use client";

import { useState } from "react";
import { TrackedLink } from "./TrackedLink";
import { PlatformIcon } from "./PlatformIcon";

const items = [
  { label: "Music", href: "/music" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function MobileMenu({ spotifyUrl, appleMusicUrl }: { spotifyUrl: string; appleMusicUrl: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-menu">
      <button className="menu-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
        <span /><span />
      </button>
      <nav id="mobile-navigation" className={open ? "mobile-nav is-open" : "mobile-nav"} aria-label="Mobile navigation" hidden={!open}>
        {items.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<span>↗</span></a>)}
        <div className="mobile-platforms" aria-label="Official music platforms">
          <TrackedLink event="streaming_click" platform="Spotify" className="platform-link" href={spotifyUrl} aria-label="Spotify" title="Spotify" target="_blank" rel="noreferrer"><PlatformIcon platform="spotify" /><span>Spotify</span></TrackedLink>
          <TrackedLink event="streaming_click" platform="Apple Music" className="platform-link" href={appleMusicUrl} aria-label="Apple Music" title="Apple Music" target="_blank" rel="noreferrer"><PlatformIcon platform="apple-music" /><span>Apple Music</span></TrackedLink>
        </div>
      </nav>
    </div>
  );
}
