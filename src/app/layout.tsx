import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — engineer in progress`, template: `%s — ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  openGraph: { siteName: site.name, locale: site.locale, type: "website", url: "/" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F5F0" },
    { media: "(prefers-color-scheme: dark)", color: "#181816" },
  ],
};

// Runs before first paint so the stored or system theme is applied without a flash.
const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
