# Akash Bhai official artist website

Next.js App Router website and Sanity Studio for the official artist site. Product scope and content rules are in `PLAN.md`.

## Local development

```sh
npm install
npm run dev
```

Open the local URL printed by Next.js. Development writes to `.next-dev`; production builds use `.next` so the two can run without overwriting each other.

Copy `.env.example` to `.env.local` and fill in the values described below. The site works without Sanity credentials using its approved JYOT seed content.

## Sanity CMS

The website reads published artist and release documents from Sanity and statically renders the results. Revalidation is set to five minutes. The embedded Studio is at `/studio`.

1. Create or select a Sanity project and a `production` dataset.
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in `.env.local` and the production host.
3. Add the local and production website origins to the dataset's CORS origins.
4. Restart the site, sign into `/studio`, create one Artist document with slug `akash-bhai`, then create approved Release documents referencing that Artist.
5. Mark the homepage release as featured. Upload approved cover art and alt text before publishing a release.

The schemas require unique release slugs, valid HTTPS URLs, an Artist reference, and cover artwork. Draft content is excluded from public GROQ queries. Set `Discography order` to keep the public list in your preferred order. Release documents can manage descriptions, lyrics, credits, streaming URLs, official video, and SEO overrides.

## Search and analytics setup

- Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS site origin. Canonicals and sitemap URLs are generated from it; without it the sitemap is empty and canonical tags are omitted.
- Add the Google Search Console verification token as `GOOGLE_SITE_VERIFICATION` and Bing's token as `BING_SITE_VERIFICATION`.
- Vercel Analytics page views and the site's release, streaming, social, contact, and discography events are included. Enable Web Analytics for the deployed Vercel project to see the data.

## Content that still needs artist approval

- Artist-approved portrait and biography.
- Release context, credits, lyrics, and official video where available.
- Approved business email and any future releases not already listed.
- Final public domain and Search Console verification.

The background image is original atmosphere art only. It does not depict Akash Bhai or represent official JYOT artwork. Do not fill missing artist facts with guesses.
