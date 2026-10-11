import { PageHeader } from "@/components/ui";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Contact", description: "How to get in touch with Hasan Busalih.", path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        title={
          <>
            Say <em>hello</em>.
          </>
        }
        intro={<p>Questions about a project, an idea to share, or a correction to something I wrote — all welcome.</p>}
      />
      <div className="container">
        <ul className="contact-list">
          <li>
            <span className="mono-label">Email</span>
            {site.links.email ? (
              <a href={`mailto:${site.links.email}`}>{site.links.email}</a>
            ) : (
              <span className="placeholder-text">Email address to be added</span>
            )}
          </li>
          <li>
            <span className="mono-label">GitHub</span>
            <a href={site.links.github} rel="me">
              {site.links.github.replace("https://", "")} ↗
            </a>
          </li>
          <li>
            <span className="mono-label">LinkedIn</span>
            {site.links.linkedin ? (
              <a href={site.links.linkedin} rel="me">
                {site.links.linkedin.replace(/^https?:\/\/(www\.)?/, "")} ↗
              </a>
            ) : (
              <span className="placeholder-text">Profile link to be added</span>
            )}
          </li>
          {site.otherProfiles.map((p) => (
            <li key={p.href}>
              <span className="mono-label">{p.label}</span>
              <a href={p.href} rel="me">
                {p.href.replace(/^https?:\/\/(www\.)?/, "")} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
