import { PageHeader } from "@/components/ui";
import { now } from "@/data/now";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Now", description: "What Hasan is focused on at the moment.", path: "/now" });

export default function NowPage() {
  return (
    <>
      <PageHeader
        label={`Now · Updated ${formatDate(now.lastUpdated)}`}
        title={
          <>
            What I&rsquo;m doing <em>now</em>.
          </>
        }
        intro={
          <p>
            A snapshot rather than a résumé — inspired by the{" "}
            <a href="https://nownownow.com/about">“now page” idea</a>. If it looks out of date, it probably is.
          </p>
        }
      />
      <div className="container now-sections">
        {now.sections.map((s) => (
          <section className="now-section" key={s.title} data-reveal>
            <h2>{s.title}</h2>
            <ul>
              {s.items.map((item, i) => (
                <li key={i}>{"placeholder" in item && item.placeholder ? <span className="placeholder-text">{item.text}</span> : item.text}</li>
              ))}
            </ul>
          </section>
        ))}
        <p className="mono-label" style={{ paddingTop: "var(--space-5)", borderTop: "1px solid var(--line)" }}>
          Last updated <time dateTime={now.lastUpdated}>{formatDate(now.lastUpdated)}</time> · {now.sections.length} sections
        </p>
      </div>
    </>
  );
}
