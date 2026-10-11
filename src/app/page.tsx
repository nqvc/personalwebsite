import Link from "next/link";
import { ArrowLink, PostMeta, ProjectMedia, ProjectMetaLine, SectionHead } from "@/components/ui";
import { IdeasVisual, Phyllotaxis, SketchVisual, ViewfinderVisual } from "@/components/Visuals";
import { now } from "@/data/now";
import { categoryLabel, site } from "@/data/site";
import { getAllPosts, getAllProjects } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { JsonLd } from "@/lib/seo";

const FEATURED_PROJECTS = ["sunflower-solar-tracker", "smart-irrigation-wheat", "python-tools-and-web"];

export default function HomePage() {
  const projects = getAllProjects();
  const selected = FEATURED_PROJECTS.map((s) => projects.find((p) => p.slug === s)).filter(Boolean) as typeof projects;
  const posts = getAllPosts();
  const [lead, ...others] = [...posts.filter((p) => p.featured), ...posts.filter((p) => !p.featured)].slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site.name,
          url: site.url,
          description: site.description,
          author: { "@type": "Person", name: site.name, url: site.url, sameAs: [site.links.github, site.links.linkedin].filter(Boolean) },
        }}
      />

      {/* A — Hero */}
      <section className="container hero" aria-labelledby="hero-title">
        <div className="hero__text">
          <p className="mono-label hero__label">Independently curious · {site.location}</p>
          <h1 id="hero-title" className="hero__title">
            <span>Building things.</span>
            <span>
              <em>Thinking about</em> everything.
            </span>
          </h1>
          <p className="hero__intro">
            I&rsquo;m Hasan, an aspiring engineer interested in electrical systems, AI, and the ideas connecting technology with the world around us.
            This is where I keep my projects, writing, experiments, and occasional observations.
          </p>
          <p className="hero__links">
            <ArrowLink href="/projects">Explore my work</ArrowLink>
            <ArrowLink href="/notes" arrow="↗">
              Read my notes
            </ArrowLink>
          </p>
        </div>
        <figure className="hero__figure">
          <Phyllotaxis />
          <figcaption>
            Sunflowers pack their seeds at the golden angle. That pattern is where the solar-tracker project began.
          </figcaption>
        </figure>
      </section>

      {/* B — Currently */}
      <section className="container section" aria-labelledby="currently-title" data-reveal>
        <div className="currently">
          <div className="currently__aside">
            <p className="mono-label">B · Notebook</p>
            <h2 id="currently-title" className="serif" style={{ marginTop: "var(--space-3)" }}>
              What I&rsquo;m spending my time on.
            </h2>
            <p>
              A dated entry, updated by hand. The longer version lives on the <Link href="/now">Now page</Link>.
            </p>
          </div>
          <div className="currently__card">
            <div className="currently__head">
              <span className="mono-label">Currently</span>
              <time className="mono-label" dateTime={now.lastUpdated}>
                {formatDate(now.lastUpdated, "short")}
              </time>
            </div>
            <dl className="currently__list">
              {now.currently.map((row) => (
                <div className="currently__row" key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
            <p style={{ marginTop: "var(--space-5)" }}>
              <ArrowLink href="/now">The Now page</ArrowLink>
            </p>
          </div>
        </div>
      </section>

      {/* C — Selected work */}
      <section className="container section" aria-labelledby="work-title">
        <div data-reveal>
          <SectionHead index="C · Selected work" title="Things I've built, tested, or am still figuring out" link={{ href: "/projects", label: "View all projects" }} />
        </div>
        <h2 id="work-title" className="sr-only">
          Selected work
        </h2>
        <div className="selected">
          {selected.map((p, i) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className={`selected__item${i === 0 ? " selected__item--lead" : ""}`} data-reveal>
              <ProjectMedia project={p} priority={i === 0} sizes={i === 0 ? "(min-width: 900px) 66vw, 100vw" : "(min-width: 900px) 33vw, 100vw"} />
              <span className="selected__num">
                <span className="mono-label">No. {String(i + 1).padStart(2, "0")}</span>
                <span className="mono-label">{categoryLabel(p.category)}</span>
              </span>
              <span className="selected__title">{p.title}</span>
              <span className="selected__summary">{p.summary}</span>
              <ProjectMetaLine project={p} />
            </Link>
          ))}
        </div>
      </section>

      {/* D — Recent writing */}
      {lead && (
        <section className="container section" aria-labelledby="writing-title">
          <div data-reveal>
            <SectionHead index="D · Recent writing" title="Notes from the process" link={{ href: "/writing", label: "All writing" }} />
          </div>
          <h2 id="writing-title" className="sr-only">
            Recent writing
          </h2>
          <div className="recent" data-reveal>
            <Link href={`/writing/${lead.slug}`} className="recent__feature">
              <PostMeta post={lead} linkCategory={false} />
              <span className="recent__feature-title">{lead.title}</span>
              {lead.subtitle && <span className="recent__quote">{lead.subtitle}</span>}
              <span className="recent__excerpt">{lead.summary}</span>
            </Link>
            <div className="recent__rows">
              {others.map((p) => (
                <Link key={p.slug} href={`/writing/${p.slug}`} className="recent__row">
                  <span className="meta">
                    <span className="meta__category">{categoryLabel(p.category)}</span> · <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.readingTime} min
                  </span>
                  <span className="recent__row-title">{p.title}</span>
                  <span className="recent__excerpt">{p.summary}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* E — Beyond engineering */}
      <section className="container section" aria-labelledby="beyond-title">
        <div className="beyond__intro" data-reveal>
          <div>
            <p className="mono-label">E · Beyond engineering</p>
            <h2 id="beyond-title" className="beyond__lede" style={{ marginTop: "var(--space-3)" }}>
              Not everything here is about circuits.
            </h2>
          </div>
          <p className="beyond__text">
            I draw, take photographs, and spend a lot of time thinking about why people see and do what they do. Those interests sit next to the
            engineering on purpose — they usually end up informing it.
          </p>
        </div>
        <div className="beyond__grid">
          <Link href="/writing?category=art-interpretation" className="beyond__item" data-reveal>
            <div className="media media--visual">
              <SketchVisual />
            </div>
            <span className="mono-label">01 · Writing</span>
            <span className="beyond__item-title">Art &amp; interpretation</span>
          </Link>
          <Link href="/gallery" className="beyond__item" data-reveal>
            <div className="media media--visual">
              <ViewfinderVisual />
            </div>
            <span className="mono-label">02 · Gallery</span>
            <span className="beyond__item-title">Photography &amp; places</span>
          </Link>
          <Link href="/notes" className="beyond__item" data-reveal>
            <div className="media media--visual">
              <IdeasVisual />
            </div>
            <span className="mono-label">03 · Notes</span>
            <span className="beyond__item-title">Ideas &amp; observations</span>
          </Link>
        </div>
      </section>

      {/* F — Closing note */}
      <section className="container section" aria-label="Closing note" data-reveal>
        <div className="closing">
          <p className="closing__line">
            <span>Still learning.</span>
            <span>Still building.</span>
            <span>Still figuring things out.</span>
          </p>
          <p className="closing__links">
            <ArrowLink href="/contact">Get in touch</ArrowLink>
            <ArrowLink href={site.links.github} external>
              GitHub
            </ArrowLink>
          </p>
        </div>
      </section>
    </>
  );
}
