import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReleaseDetail, releaseMetadata } from "../ReleaseDetail";
import { getReleaseBySlug } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return releaseMetadata(await getReleaseBySlug("jyot"));
}

export default async function JyotPage() {
  const release = await getReleaseBySlug("jyot");
  if (!release) notFound();
  return <ReleaseDetail release={release} />;
}
