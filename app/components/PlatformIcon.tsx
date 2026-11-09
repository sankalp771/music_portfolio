export type PlatformName = "spotify" | "apple-music" | "instagram";

export function PlatformIcon({ platform }: { platform: PlatformName }) {
  if (platform === "spotify") {
    return <svg className="platform-mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="11" fill="currentColor" /><path d="M6.3 9.1c3.8-1.15 8.75-.77 12.1 1.27M7.1 12.35c3.15-.92 7.18-.58 9.95 1.08M7.85 15.48c2.58-.7 5.62-.42 7.85.88" fill="none" stroke="var(--black)" strokeWidth="1.55" strokeLinecap="round" /></svg>;
  }

  if (platform === "apple-music") {
    return <svg className="platform-mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16.37 12.62c.02-2.13 1.74-3.17 1.82-3.22-.99-1.45-2.53-1.65-3.08-1.67-1.31-.13-2.56.77-3.23.77-.69 0-1.68-.75-2.79-.73-1.44.02-2.78.85-3.52 2.14-1.52 2.62-.39 6.47 1.07 8.59.73 1.04 1.57 2.2 2.68 2.16 1.08-.04 1.49-.69 2.8-.69 1.29 0 1.68.69 2.81.67 1.16-.02 1.89-1.04 2.6-2.09.85-1.19 1.2-2.37 1.21-2.43-.03-.01-2.35-.9-2.37-3.5ZM14.23 6.32c.58-.71.98-1.68.87-2.66-.84.04-1.9.58-2.5 1.27-.54.61-1.02 1.62-.89 2.57.94.07 1.92-.48 2.52-1.18Z" /></svg>;
  }

  return <svg className="platform-mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.6" cy="6.6" r="1.2" fill="currentColor" /></svg>;
}
