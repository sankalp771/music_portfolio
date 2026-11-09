"use client";

import { track } from "@vercel/analytics";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

export type ArtistEvent = "streaming_click" | "youtube_click" | "social_click" | "contact_click" | "discography_click";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: ArtistEvent;
  platform?: string;
  children: ReactNode;
};

export function TrackedLink({ event, platform, onClick, children, ...props }: Props) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    track(event, platform ? { platform } : undefined);
    onClick?.(e);
  }

  return <a {...props} onClick={handleClick}>{children}</a>;
}
