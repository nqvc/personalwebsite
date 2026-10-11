import { Gallery } from "@/components/Gallery";
import { PageHeader } from "@/components/ui";
import { gallery } from "@/data/gallery";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gallery",
  description: "Photographs, drawings and visual experiments — Melbourne, travel, art, projects and everyday moments.",
  path: "/gallery",
});

export default function GalleryPage() {
  const placeholders = gallery.filter((g) => !g.src).length;
  return (
    <>
      <PageHeader
        label="Gallery · Visual archive"
        title={
          <>
            Things I <em>noticed</em>.
          </>
        }
        intro={
          <p>
            Photographs, sketches and visual experiments, kept at their original proportions.
            {placeholders > 0 && " The frames marked “placeholder” are waiting for real images."}
          </p>
        }
      />
      <div className="container container--wide">
        <Gallery items={gallery} />
      </div>
    </>
  );
}
