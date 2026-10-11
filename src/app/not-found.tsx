import { ArrowLink } from "@/components/ui";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="container not-found">
      <p className="not-found__code" aria-hidden>
        404
      </p>
      <h1 className="page-header__title" style={{ fontSize: "var(--step-4)" }}>
        This page doesn&rsquo;t exist — <em>yet</em>.
      </h1>
      <p className="page-header__intro">It may have moved, or it may be an idea that never got written. Try one of these instead.</p>
      <p className="hero__links">
        <ArrowLink href="/">Home</ArrowLink>
        <ArrowLink href="/projects">Projects</ArrowLink>
        <ArrowLink href="/writing">Writing</ArrowLink>
        <ArrowLink href="/notes">Notes</ArrowLink>
      </p>
    </section>
  );
}
