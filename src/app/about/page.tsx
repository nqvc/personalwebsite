import Link from "next/link";
import { ArrowLink, ProjectMetaLine } from "@/components/ui";
import { interests, timeline, timelineStatusLabel } from "@/data/about";
import { gallery } from "@/data/gallery";
import { site } from "@/data/site";
import { getAllProjects } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description: "Hasan Busalih is an aspiring engineer from Saudi Arabia, studying in Melbourne, interested in electrical engineering, AI, art and ideas.",
  path: "/about",
});

export default function AboutPage() {
  const projects = getAllProjects().filter((p) => p.featured).slice(0, 3);
  const photos = gallery.slice(0, 3);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: {
            "@type": "Person",
            name: site.name,
            url: site.url,
            homeLocation: { "@type": "Place", name: site.location },
            knowsAbout: [...interests.technical],
            sameAs: [site.links.github, site.links.linkedin].filter(Boolean),
          },
        }}
      />
      <section className="container about-intro">
        <div className="about-intro__main">
          <p className="mono-label">About</p>
          <h1 className="about-intro__title">
            Hi, I&rsquo;m <em>Hasan</em>.
          </h1>
          <div className="about-intro__text" style={{ marginTop: "var(--space-6)" }}>
            <p>
              I&rsquo;m an aspiring engineer from Saudi Arabia, currently studying in Melbourne. I&rsquo;m interested in electrical engineering,
              artificial intelligence, programming, and the ways technology can solve real problems.
            </p>
            <p>
              Outside technical work, I enjoy drawing, photography, philosophy, psychology, history, and football. This website is a record of what
              I&rsquo;m learning, making, questioning, and discovering along the way.
            </p>
          </div>
        </div>
        <figure className="about-portrait">
          <div className="media">
            <span className="gallery-placeholder" role="img" aria-label="Placeholder for a portrait photograph" style={{ height: "100%" }}>
              <span className="mono-label">Placeholder</span>
              <span className="gallery-placeholder__label">Portrait</span>
              <span className="mono-label">Photo to be added</span>
            </span>
          </div>
          <figcaption>A real photograph will go here — no stand-ins.</figcaption>
        </figure>
      </section>

      <div className="container">
        <section className="section about-block" aria-labelledby="story" data-reveal>
          <div>
            <p className="mono-label">01</p>
            <h2 id="story" className="about-block__title">
              My story
            </h2>
          </div>
          <div className="about-block__body">
            <p>
              I&rsquo;m from Saudi Arabia. My first real projects started there: a solar tracker inspired by the way sunflowers follow the sun, and
              research into smart irrigation for wheat. In 2026 I began Foundation Studies in Melbourne.
            </p>
            <aside className="callout callout--placeholder">
              <p className="callout__label">Placeholder — to be completed</p>
              <p>A longer personal account, in Hasan&rsquo;s own words, to be added.</p>
            </aside>
          </div>
        </section>

        <section className="section about-block" aria-labelledby="education" data-reveal>
          <div>
            <p className="mono-label">02</p>
            <h2 id="education" className="about-block__title">
              Education &amp; pathway
            </h2>
          </div>
          <ol className="timeline">
            {timeline.map((t) => (
              <li key={t.title} className={`is-${t.status}`}>
                <p className="meta">
                  {t.period} · <span className={`badge ${t.status === "current" ? "badge--prototype" : t.status === "intended" ? "badge--proposed" : ""}`}>{timelineStatusLabel[t.status]}</span>
                </p>
                <h3 className="timeline__title">{t.title}</h3>
                <p className="timeline__place">{t.place}</p>
                <p className="timeline__desc">{t.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section about-block" aria-labelledby="interests" data-reveal>
          <div>
            <p className="mono-label">03</p>
            <h2 id="interests" className="about-block__title">
              What I&rsquo;m interested in
            </h2>
          </div>
          <div className="interest-grid">
            <div>
              <h3 className="mono-label">Technical</h3>
              <ul>{interests.technical.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
            <div>
              <h3 className="mono-label">Creative</h3>
              <ul>{interests.creative.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
            <div>
              <h3 className="mono-label">Ideas</h3>
              <ul>{interests.ideas.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
            <div>
              <h3 className="mono-label">Elsewhere</h3>
              <ul>{interests.elsewhere.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="section about-block" aria-labelledby="projects" data-reveal>
          <div>
            <p className="mono-label">04</p>
            <h2 id="projects" className="about-block__title">
              Selected projects
            </h2>
          </div>
          <div className="about-block__body">
            <ul className="related__list" style={{ gridTemplateColumns: "1fr" }}>
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects/${p.slug}`}>
                    <span className="related__title">{p.title}</span>
                    <ProjectMetaLine project={p} />
                  </Link>
                </li>
              ))}
            </ul>
            <p>
              <ArrowLink href="/projects">All projects</ArrowLink>
            </p>
          </div>
        </section>

        <section className="section about-block" aria-labelledby="community" data-reveal>
          <div>
            <p className="mono-label">05</p>
            <h2 id="community" className="about-block__title">
              Community &amp; leadership
            </h2>
          </div>
          <div className="about-block__body">
            <p>
              Model United Nations, tutoring, community volunteering and enrichment programmes such as Mawhiba and Aramco Tomooh have shaped how I
              work with other people. The details — what, where and when — are kept in a separate, plainly labelled archive.
            </p>
            <p>
              <ArrowLink href="/about/experience">Experience &amp; achievements</ArrowLink>
            </p>
          </div>
        </section>

        <section className="section about-block" aria-labelledby="photos" data-reveal>
          <div>
            <p className="mono-label">06</p>
            <h2 id="photos" className="about-block__title">
              A few photographs
            </h2>
          </div>
          <div>
            <div className="mini-gallery">
              {photos.map((g) => (
                <span key={g.id} className="gallery-placeholder" role="img" aria-label={g.alt} style={{ aspectRatio: `${g.width} / ${g.height}` }}>
                  <span className="mono-label">Placeholder</span>
                  <span className="gallery-placeholder__label">{g.caption.split(" — ")[0]}</span>
                </span>
              ))}
            </div>
            <p style={{ marginTop: "var(--space-5)" }}>
              <ArrowLink href="/gallery">Visit the gallery</ArrowLink>
            </p>
          </div>
        </section>

        <section className="section about-block" aria-labelledby="elsewhere" data-reveal>
          <div>
            <p className="mono-label">07</p>
            <h2 id="elsewhere" className="about-block__title">
              Elsewhere
            </h2>
          </div>
          <div className="about-block__body">
            <p className="hero__links" style={{ marginTop: 0 }}>
              <ArrowLink href={site.links.github} external>
                GitHub
              </ArrowLink>
              {site.links.linkedin ? (
                <ArrowLink href={site.links.linkedin} external>
                  LinkedIn
                </ArrowLink>
              ) : (
                <span className="placeholder-text">LinkedIn — to be added</span>
              )}
              <ArrowLink href="/contact">Contact</ArrowLink>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
