import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLink, ProjectMedia, StatusBadge } from "@/components/ui";
import { Visual } from "@/components/Visuals";
import { categoryLabel, site } from "@/data/site";
import { getAdjacentProjects, getAllPosts, getAllProjects, getProject, renderMarkdown } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata({ title: p.title, description: p.summary, path: `/projects/${p.slug}`, image: p.image || undefined });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { html } = await renderMarkdown(project.body);
  const { prev, next } = getAdjacentProjects(project.slug);
  const posts = getAllPosts();
  const relatedPosts = project.relatedPosts.map((s) => posts.find((p) => p.slug === s)).filter(Boolean) as typeof posts;

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.summary,
          url: `${site.url}/projects/${project.slug}`,
          author: { "@type": "Person", name: site.name },
          ...(project.year ? { dateCreated: project.year } : {}),
        }}
      />
      <header className="container case-header">
        <p className="case-header__back">
          <Link href="/projects" className="text-button">
            ← All projects
          </Link>
        </p>
        <p className="mono-label">
          Project · {categoryLabel(project.category)}
        </p>
        <h1 className="case-header__title">{project.title}</h1>
        <p className="case-header__intro">{project.summary}</p>
        <dl className="case-facts">
          <div>
            <dt>Category</dt>
            <dd>{categoryLabel(project.category)}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.year || <span className="placeholder-text">To be added</span>}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              <StatusBadge status={project.status} />
            </dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>{project.tags.join(", ") || "—"}</dd>
          </div>
        </dl>
        <figure className="case-hero">
          <ProjectMedia project={project} priority sizes="(min-width: 1240px) 1240px, 100vw" />
          <figcaption>{project.image ? project.imageAlt : "Illustration only — real photographs and diagrams of this project are still to be added."}</figcaption>
        </figure>
      </header>

      <div className="container case-body">
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />

        <aside className="case-side" aria-label="Project details">
          {project.specs.length > 0 && (
            <section>
              <h2>Specifications</h2>
              <table className="specs">
                <tbody>
                  {project.specs.map((s) => (
                    <tr key={s.label}>
                      <th scope="row">{s.label}</th>
                      <td>
                        {/^(to be added|tbc|unknown)/i.test(s.value) ? <span className="placeholder-text">{s.value}</span> : s.value}
                        {s.note && <span className="specs__note">{s.note}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
          {project.tools.length > 0 && (
            <section>
              <h2>Tools &amp; technologies</h2>
              <ul className="tools-list">
                {project.tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>
          )}
          <section>
            <h2>Source &amp; links</h2>
            {project.links.length ? (
              <ul className="case-side__links">
                {project.links.map((l) => (
                  <li key={l.href}>
                    <ArrowLink href={l.href}>{l.label}</ArrowLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="placeholder-text">No public source or links yet.</p>
            )}
          </section>
          {relatedPosts.length > 0 && (
            <section>
              <h2>Related writing</h2>
              <ul className="case-side__links">
                {relatedPosts.map((p) => (
                  <li key={p.slug}>
                    <ArrowLink href={`/writing/${p.slug}`}>{p.title}</ArrowLink>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>

      <div className="container">
        <section className="section" aria-labelledby="gallery-title">
          <div className="section-head">
            <p className="mono-label section-head__index">Gallery &amp; evidence</p>
            <h2 id="gallery-title" className="section-head__title">
              Images
            </h2>
          </div>
          {project.gallery.length ? (
            <div className="case-gallery">
              {project.gallery.map((g, i) => (
                <figure key={i}>
                  {g.src ? (
                    <div className="media media--image" style={{ aspectRatio: g.ratio || "4 / 3" }}>
                      <Image src={g.src} alt={g.alt} fill sizes="(min-width: 700px) 50vw, 100vw" />
                    </div>
                  ) : (
                    <div className="media media--visual" style={{ aspectRatio: g.ratio || "4 / 3" }}>
                      <Visual name="grid" />
                    </div>
                  )}
                  <figcaption>{g.caption || g.alt}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <p className="placeholder-text">Photographs, diagrams and measurements to be added.</p>
          )}
        </section>

        <section className="section" aria-labelledby="refs-title">
          <div className="section-head">
            <p className="mono-label section-head__index">Sources</p>
            <h2 id="refs-title" className="section-head__title">
              References
            </h2>
          </div>
          {project.references.length ? (
            <ol className="references">
              {project.references.map((r, i) => (
                <li key={i}>{r.href ? <a href={r.href}>{r.label}</a> : <span className={/to be added/i.test(r.label) ? "placeholder-text" : undefined}>{r.label}</span>}</li>
              ))}
            </ol>
          ) : (
            <p className="placeholder-text">References to be added.</p>
          )}
        </section>

        <nav className="pager" aria-label="More projects">
          <Link href={`/projects/${prev.slug}`}>
            <span className="mono-label">← Previous project</span>
            <span className="pager__title">{prev.title}</span>
          </Link>
          <Link href={`/projects/${next.slug}`}>
            <span className="mono-label">Next project →</span>
            <span className="pager__title">{next.title}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
