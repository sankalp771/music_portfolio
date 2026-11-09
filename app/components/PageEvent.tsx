"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

export function PageEvent({ name, title }: { name: "release_view"; title: string }) {
  useEffect(() => { track(name, { release: title }); }, [name, title]);
  return null;
}
