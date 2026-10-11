"use client";

import { LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { projectCategories } from "@/data/site";
import { useQueryState } from "@/lib/useQueryState";
import { FilterBar } from "./FilterBar";

export type ProjectSummary = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  categoryLabel: string;
  year: string;
  status: string;
  statusLabel: string;
  tags: string[];
};

export function ProjectIndex({ projects, media }: { projects: ProjectSummary[]; media: Record<string, React.ReactNode> }) {
  const [category, setCategory] = useQueryState("category");
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    try {
      const v = localStorage.getItem("projects-view");
      if (v === "list" || v === "grid") setView(v);
    } catch {}
  }, []);

  function changeView(v: "grid" | "list") {
    setView(v);
    try {
      localStorage.setItem("projects-view", v);
    } catch {}
  }

  const counts = Object.fromEntries(projectCategories.map((c) => [c.slug, projects.filter((p) => p.category === c.slug).length]));
  const visible = projects.filter((p) => !category || p.category === category);

  return (
    <>
      <div className="index-controls">
        <FilterBar label="Filter projects by category" options={[...projectCategories]} value={category} onChange={setCategory} counts={counts} />
        <div className="view-toggle" role="group" aria-label="Layout">
          <button type="button" aria-pressed={view === "grid"} onClick={() => changeView("grid")} aria-label="Grid view">
            <LayoutGrid size={16} strokeWidth={1.5} aria-hidden />
          </button>
          <button type="button" aria-pressed={view === "list"} onClick={() => changeView("list")} aria-label="List view">
            <List size={16} strokeWidth={1.5} aria-hidden />
          </button>
        </div>
      </div>
      <p className="sr-only" role="status">
        {visible.length} {visible.length === 1 ? "project" : "projects"} shown
      </p>

      {visible.length === 0 ? (
        <p className="empty-state">No projects in this category yet.</p>
      ) : view === "grid" ? (
        <ol className="project-grid">
          {visible.map((p) => (
            <li key={p.slug} className="project-grid__item">
              <Link href={`/projects/${p.slug}`} className="project-card">
                {media[p.slug]}
                <span className="project-card__num mono-label">{String(projects.indexOf(p) + 1).padStart(2, "0")}</span>
                <span className="project-card__title">{p.title}</span>
                <span className="project-card__summary">{p.summary}</span>
                <span className="meta">
                  {p.categoryLabel} · {p.year || "Year TBC"} · <span className={`badge badge--${p.status}`}>{p.statusLabel}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <ol className="project-list">
          {visible.map((p) => (
            <li key={p.slug}>
              <Link href={`/projects/${p.slug}`} className="project-row">
                <span className="mono-label">{String(projects.indexOf(p) + 1).padStart(2, "0")}</span>
                <span className="project-row__title">{p.title}</span>
                <span className="project-row__summary">{p.summary}</span>
                <span className="project-row__cat mono-label">{p.categoryLabel}</span>
                <span className="project-row__year mono-label">{p.year || "—"}</span>
                <span className={`badge badge--${p.status}`}>{p.statusLabel}</span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
