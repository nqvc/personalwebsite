import type { Metadata } from "next";
import { site } from "@/data/site";

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  image,
}: {
  title?: string;
  description?: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
}): Metadata {
  const desc = description || site.description;
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title: title ? `${title} — ${site.name}` : site.name,
      description: desc,
      url: path,
      siteName: site.name,
      locale: site.locale,
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: "summary_large_image", title: title ?? site.name, description: desc },
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
