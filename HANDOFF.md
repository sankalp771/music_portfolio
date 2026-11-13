# Akash Bhai site handoff

Updated: 2026-11-09

## Project

Next.js 15.5.29 App Router site for the artist Akash Bhai. Product direction and requirements are in `PLAN.md`: cinematic dark visual identity, SEO-first, lean MVP. The site includes the homepage, `/music`, release detail routes, `/about`, `/contact`, `/privacy`, `/studio`, and a custom 404 page. Sanity is the content system; Vercel Analytics and streaming/social click events are wired in.

The catalog contains 11 releases in the user's requested order: JYOT, phool, what a time to be alive, at the penthouse, blur (with Young Scott), blur, Kaayde, WISHING 4U, rooh aur dil, SAINT, S1DEB!TCH. Album art and available platform links are included. Missing track-level URLs fall back to artist profile links. Artist-approved bio/portrait and business email remain intentionally blank for later.

## Sanity setup completed

- Sanity organization: `Akash Bhai`.
- Project: `Akash Bhai Official`.
- Project ID: `ahw97cmk`.
- Dataset: `production`, public.
- CORS origin `http://localhost:3000` added with credentials so the embedded Studio can sign in.
- Local `.env.local` has `NEXT_PUBLIC_SANITY_PROJECT_ID=ahw97cmk` and `NEXT_PUBLIC_SANITY_DATASET=production`. It is ignored by Git; never copy it into a public file.
- Authenticated import created one Artist record and 11 Release records. All 11 have Sanity-hosted cover art assets. Biography and portrait are blank by design.
- `.seed-sanity.mjs` is the restored idempotent seed importer. The user explicitly asked not to remove seed data before CMS setup is complete. Keep the importer and CMS documents until the user says setup is complete. It reads the Sanity CLI auth token from `%TEMP%\\sanity-codex-config\\sanity\\config.json`; it does not contain the token.
- CLI login was run with a temp config directory because the default `%USERPROFILE%\\.config\\sanity` path was not writable in this environment:

  ```powershell
  $env:XDG_CONFIG_HOME = Join-Path $env:TEMP 'sanity-codex-config'
  npx sanity login
  ```

- Project creation command used:

  ```powershell
  npx sanity projects create "Akash Bhai Official" --dataset=production --dataset-visibility=public
  ```

  Sanity asked for an organization; `Akash Bhai` was created.

## Local site and Studio

- `.env.local` was picked up by Next dev server.
- `npm run dev` currently serves `http://localhost:3000` (terminal session 34900 at last check).
- Embedded Sanity Studio is at `http://localhost:3000/studio`; `app/studio/[[...tool]]/page.tsx` renders `NextStudio`.
- `http://localhost:3000/studio` is the local editor URL, not the live website. Content itself is stored in Sanity cloud. The site must keep `npm run dev` running while editing locally.
- Production deployment still needs a real domain, `NEXT_PUBLIC_SITE_URL`, production environment variables, production CORS origin, HTTPS, webmaster verification, and sitemap submission.

## Current Studio login blocker

Chrome has a Next.js development overlay on `/studio` and the user reported the view blinking. Latest console output gives the root cause:

- Hydration mismatch attributes include `bis_skin_checked`, `bis_register`, and `__processed_...`, injected before React hydration.
- Runtime error: `Cannot read properties of undefined (reading 'M_ID')` from `chrome-extension://eppiocemhmnlbhjplcgkofciiegomcon/executors/200.js`.
- That extension ID maps to Urban VPN Proxy. Microsoft Security Intelligence lists the ID in its Trojan:JS/Rossetaph advisory; installed version/status was not verified. Reference: https://www.microsoft.com/en-us/wdsi/threats/malware-encyclopedia-description?Name=Trojan%3AJS%2FRossetaph
- This is a browser extension issue, not an app-auth logic error. A clean in-app browser showed the Studio login screen settle normally. The user needs the Studio in their normal browser for Google sign-in, and currently Chrome is at `http://localhost:3000/studio` but the dev overlay blocks it.
- Recommend disabling/removing the identified extension and running Microsoft Defender, then reload `/studio` in Chrome. Do not change Chrome extensions without the user's explicit go-ahead.
- During the last UI attempt, the user pressed physical Escape; Computer Use instructed us to stop all further CUA actions for that turn. In a fresh chat, obtain current UI state before using CUA again.

## Current workspace state

- Git `HEAD`: `7841f63 Initial music portfolio`.
- `git status` at last check: `next-env.d.ts` modified only because Next dev changed generated route-types reference from `.next/types` to `.next-dev/types`; `.seed-sanity.mjs` is untracked and intentionally retained.
- `HANDOFF.md` is new and should be committed if the user wants a persistent repo log.
- The project build had passed before the latest CMS auth/browser troubleshooting. No new tests were run.

## Next actions

1. Help the user disable/remove Urban VPN Proxy in Chrome (or use a clean Chrome profile) and reopen `http://localhost:3000/studio`; user wants Google login in a regular browser, not the in-app preview.
2. Confirm Studio displays the Artist Profile and 11 Release records; don't delete the records or importer until the user says CMS setup is complete.
3. Guide the user to edit/publish content. Biography can wait; add artist-approved portrait, business email, release notes/lyrics/video only when supplied.

## CMS editor changes (2026-11-13)

- Removed the release slug uniqueness validation. Slugs remain required, but duplicate values are now accepted by Studio.
- Removed the Credits field from the Release Studio schema and removed credits from public release queries and release detail rendering.
- Existing stored `credits` data, if any, is left in Sanity; it is no longer edited or displayed by the site.
- Added EP as a release type and added ordered nested track entries for 2-Packs, EPs, and Albums. Release pages display their tracklists; individual tracks have nested pages, metadata, and sitemap entries. Track entries support platform links, lyrics, and duration.
- Fixed nested track page imports after user reported pages missing. The nested route now serves `/music/rooh-aur-dil/tracks/mashaal` and `/music/rooh-aur-dil/tracks/khuda`; both and the EP release page returned HTTP 200 locally on 2026-11-13.
- Track pages now reuse the parent release artwork. Release tracklists use a vertical, numbered layout. Confirmed locally on the rooh aur dil EP and mashaal track page on 2026-11-14.
- Added signed Sanity webhook handler at `/api/revalidate`. A local `SANITY_REVALIDATE_SECRET` was generated in ignored `.env.local`; the same value still needs to be configured in the production host and Sanity webhook dashboard. Sanity webhook URL requires the final deployed HTTPS origin and should filter published `artist`/`release` create, update, and delete events.
4. When a production domain is chosen, set `NEXT_PUBLIC_SITE_URL`, production environment, production CORS origin, deploy, verify domain and submit sitemap.
