import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getReleaseBySlug, getReleases } from "@/lib/content";
import { ReleaseDetail, releaseMetadata } from "../ReleaseDetail";

export const revalidate = 60;

export async function generateStaticParams() {
  const releases = await getReleases();
  return releases.filter((release) => release.slug !== "jyot").map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return releaseMetadata(await getReleaseBySlug(slug));
}

export default async function ReleasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const release = await getReleaseBySlug(slug);
  if (!release) notFound();
  return <ReleaseDetail release={release} />;
}
