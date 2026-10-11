import { PageHeader } from "@/components/ui";
import { experienceKinds, experiences, type ExperienceKind } from "@/data/experience";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Experience",
  description: "Programmes, research participation, leadership, volunteering and sport — kept separate from awards.",
  path: "/about/experience",
});

export default function ExperiencePage() {
  const kinds = (Object.keys(experienceKinds) as ExperienceKind[]).filter((k) => experiences.some((e) => e.kind === k));
  return (
    <>
      <PageHeader
        label="About · Experience"
        title={
          <>
            Experience, <em>plainly</em> labelled.
          </>
        }
        intro={
          <p>
            Programmes, participation, volunteering and awards are listed separately, so taking part is never presented as winning. Entries marked
            &ldquo;details to confirm&rdquo; are still being checked.
          </p>
        }
      />
      <div className="container">
        {kinds.map((k) => (
          <section key={k} className="experience-group" aria-labelledby={`k-${k}`}>
            <h2 id={`k-${k}`}>{experienceKinds[k]}</h2>
            <ul className="experience-list">
              {experiences
                .filter((e) => e.kind === k)
                .map((e) => (
                  <li key={e.title} className="experience-item">
                    <p className="meta">
                      <span>{e.dates || "Dates to be added"}</span>
                      <span aria-hidden>·</span>
                      <span>{e.role}</span>
                      {!e.confirmed && <span className="badge badge--proposed">Details to confirm</span>}
                    </p>
                    <h3 className="experience-item__title">{e.title}</h3>
                    <p className="experience-item__org">{e.organisation}</p>
                    <p className="experience-item__desc">{e.description}</p>
                    {e.evidence && e.evidence.length > 0 && (
                      <p className="tag-list">
                        {e.evidence.map((ev) => (
                          <a key={ev.href} href={ev.href} className="tag">
                            {ev.label} ↗
                          </a>
                        ))}
                      </p>
                    )}
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
