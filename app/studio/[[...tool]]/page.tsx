import { NextStudio, metadata, viewport } from "next-sanity/studio";
import config from "@/sanity.config";

export { metadata, viewport };
export const dynamic = "force-static";

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
    return <main className="studio-setup"><p className="eyebrow">Content studio setup</p><h1>Connect Sanity<br />to edit the site.</h1><p>Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and <code>NEXT_PUBLIC_SANITY_DATASET</code> to <code>.env.local</code>, then restart the development server.</p><a href="/">Return to the website ↗</a></main>;
  }
  return <NextStudio config={config} />;
}
