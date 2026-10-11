"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav, secondaryNav, site } from "@/data/site";
import { Search } from "./Search";
import { ThemeToggle } from "./ThemeToggle";

export function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${menuOpen ? " menu-open" : ""}`}>
      <div className="container site-header__inner">
        <Link href="/" className="wordmark" aria-label={`${site.name} — home`}>
          <span className="wordmark__full">{site.name}</span>
          <span className="wordmark__short" aria-hidden>
            {site.shortName}
          </span>
        </Link>

        <nav className="site-nav" aria-label="Main">
          <ul>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__tools">
          <Search />
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            className="menu-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile" hidden={!menuOpen}>
        <div className="container">
          <ul className="mobile-menu__main">
            {mainNav.map((item, i) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                  <span className="mono-label">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mobile-menu__secondary">
            {secondaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
