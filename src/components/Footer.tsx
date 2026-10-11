import Link from "next/link";
import { secondaryNav, site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__name">
          <p className="site-footer__wordmark">{site.name}</p>
          <p className="mono-label">
            © {year} · {site.footerPhrase}
          </p>
        </div>
        <nav aria-label="Footer" className="site-footer__nav">
          <ul>
            {secondaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="site-footer__profiles" aria-label="Profiles">
          <li>
            <a href={site.links.github} rel="me">
              GitHub ↗
            </a>
          </li>
          <li>
            {site.links.linkedin ? (
              <a href={site.links.linkedin} rel="me">
                LinkedIn ↗
              </a>
            ) : (
              <span className="placeholder-text" title="LinkedIn URL to be supplied">
                LinkedIn — to be added
              </span>
            )}
          </li>
          <li>
            <a href="/feed.xml">RSS</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
