import { PageHeader, ArrowLink } from "@/components/ui";
import { WritingIndex } from "@/components/WritingIndex";
import { categoryLabel } from "@/data/site";
import { getAllPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Writing",
  description: "Essays and notes on engineering, art, places, ideas and the things learned outside the classroom.",
  path: "/writing",
});

export default function WritingPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageHeader
        label={`Writing · ${posts.length} posts`}
        title={
          <>
            Writing, <em>mostly</em> to think clearly.
          </>
        }
        intro={
          <>
            <p>Longer pieces on engineering, art, places and ideas. Shorter, rougher thoughts live in the notes.</p>
            <p className="writing-aside-links">
              <ArrowLink href="/writing/archive">Archive by date</ArrowLink>
              <ArrowLink href="/notes">Notes &amp; unfinished ideas</ArrowLink>
              <ArrowLink href="/feed.xml" arrow="↗">RSS feed</ArrowLink>
            </p>
          </>
        }
      />
      <div className="container">
        <WritingIndex
          posts={posts.map((p) => ({
            slug: p.slug,
            title: p.title,
            summary: p.summary,
            category: p.category,
            categoryLabel: categoryLabel(p.category),
            date: p.date,
            readingTime: p.readingTime,
            featured: p.featured,
            draft: p.draft,
            image: p.image,
            imageAlt: p.imageAlt,
            text: p.plainText.slice(0, 3000),
          }))}
        />
      </div>
    </>
  );
}
