import { ProjectIndex } from "@/components/ProjectIndex";
import { PageHeader, ProjectMedia } from "@/components/ui";
import { categoryLabel, projectStatuses } from "@/data/site";
import { getAllProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description: "Engineering, software, research and creative projects by Hasan Busalih — documented with their process, limits and open questions.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getAllProjects();
  const media = Object.fromEntries(projects.map((p) => [p.slug, <ProjectMedia key={p.slug} project={p} sizes="(min-width: 1000px) 50vw, 100vw" />]));
  return (
    <>
      <PageHeader
        label={`Projects · ${projects.length} entries`}
        title={
          <>
            Work, <em>in progress</em> and otherwise.
          </>
        }
        intro={
          <p>
            Engineering builds, research, software and creative work. Each entry says plainly what stage it is at — an idea, a proposal, a prototype
            or something finished — and what is still unknown.
          </p>
        }
      />
      <div className="container">
        <ProjectIndex
          media={media}
          projects={projects.map((p) => ({
            slug: p.slug,
            title: p.title,
            summary: p.summary,
            category: p.category,
            categoryLabel: categoryLabel(p.category),
            year: p.year,
            status: p.status,
            statusLabel: projectStatuses[p.status] ?? p.status,
            tags: p.tags,
          }))}
        />
      </div>
    </>
  );
}
