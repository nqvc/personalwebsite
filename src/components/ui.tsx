import Image from "next/image";
import Link from "next/link";
import { categoryLabel, noteStatuses, projectStatuses, type NoteStatus, type ProjectStatus } from "@/data/site";
import { formatDate } from "@/lib/format";
import type { Post, Project } from "@/lib/content";
import { Visual } from "./Visuals";

export function ArrowLink({
  href,
  children,
  external = false,
  arrow: arrowOverride,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  arrow?: string;
  className?: string;
}) {
  const arrow = arrowOverride ?? (external ? "↗" : "→");
  const cls = `arrow-link ${className}`.trim();
  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls}>
        {children} <span aria-hidden className="arrow-link__arrow">{arrow}</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children} <span aria-hidden className="arrow-link__arrow">{arrow}</span>
    </Link>
  );
}

export function PageHeader({ label, title, intro, children }: { label: string; title: React.ReactNode; intro?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="page-header container">
      <p className="mono-label">{label}</p>
      <h1 className="page-header__title">{title}</h1>
      {intro && <div className="page-header__intro">{intro}</div>}
      {children}
    </header>
  );
}

export function SectionHead({ index, title, link }: { index: string; title: string; link?: { href: string; label: string } }) {
  return (
    <div className="section-head">
      <p className="mono-label section-head__index">{index}</p>
      <h2 className="section-head__title">{title}</h2>
      {link && <ArrowLink href={link.href} className="section-head__link">{link.label}</ArrowLink>}
    </div>
  );
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return <span className={`badge badge--${status}`}>{projectStatuses[status] ?? status}</span>;
}

export function NoteBadge({ status }: { status: NoteStatus }) {
  const s = noteStatuses[status] ?? noteStatuses.seed;
  return (
    <span className={`badge badge--note-${status}`} title={s.description}>
      <span className="badge__dot" aria-hidden /> {s.label}
    </span>
  );
}

export function PostMeta({ post, showCategory = true, linkCategory = true }: { post: Post; showCategory?: boolean; linkCategory?: boolean }) {
  return (
    <p className="meta">
      {showCategory && (
        <>
          {linkCategory ? (
            <Link href={`/writing?category=${post.category}`} className="meta__category">
              {categoryLabel(post.category)}
            </Link>
          ) : (
            <span className="meta__category">{categoryLabel(post.category)}</span>
          )}
          <span aria-hidden> · </span>
        </>
      )}
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden> · </span>
      <span>{post.readingTime} min read</span>
      {post.draft && <span className="badge badge--draft">Draft</span>}
    </p>
  );
}

export function ProjectMedia({ project, priority = false, sizes = "(min-width: 900px) 60vw, 100vw" }: { project: Project; priority?: boolean; sizes?: string }) {
  if (project.image) {
    return (
      <div className="media media--image">
        <Image src={project.image} alt={project.imageAlt} fill sizes={sizes} priority={priority} />
      </div>
    );
  }
  return (
    <div className="media media--visual">
      <Visual name={project.visual} />
    </div>
  );
}

export function ProjectMetaLine({ project }: { project: Project }) {
  return (
    <p className="meta">
      <span>{categoryLabel(project.category)}</span>
      <span aria-hidden> · </span>
      <span>{project.year || "Year to be added"}</span>
      <span aria-hidden> · </span>
      <StatusBadge status={project.status} />
    </p>
  );
}

export function Placeholder({ children }: { children: React.ReactNode }) {
  return <span className="placeholder-text">{children}</span>;
}
