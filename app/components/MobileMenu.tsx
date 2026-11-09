"use client";

import { useState } from "react";
const items = [
  { label: "Home", href: "/" },
  { label: "Music", href: "/music" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-menu">
      <button className="menu-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
        <span /><span />
      </button>
      {open && <nav id="mobile-navigation" className="mobile-nav is-open" aria-label="Mobile navigation">
        {items.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<span>↗</span></a>)}
      </nav>}
    </div>
  );
}
