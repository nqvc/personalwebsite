"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { collections, type GalleryItem } from "@/data/gallery";
import { formatDate } from "@/lib/format";
import { useQueryState } from "@/lib/useQueryState";
import { FilterBar } from "./FilterBar";

function collectionLabel(slug: string) {
  return collections.find((c) => c.slug === slug)?.label ?? slug;
}

function Media({ item, large = false }: { item: GalleryItem; large?: boolean }) {
  if (item.src) {
    return (
      <Image
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        sizes={large ? "90vw" : "(min-width: 1000px) 33vw, (min-width: 600px) 50vw, 100vw"}
        className="gallery-media"
      />
    );
  }
  return (
    <span className="gallery-placeholder" style={{ aspectRatio: `${item.width} / ${item.height}` }} role="img" aria-label={item.alt}>
      <span className="mono-label">Placeholder</span>
      <span className="gallery-placeholder__label">{collectionLabel(item.collection)}</span>
      <span className="mono-label">
        {item.width}:{item.height}
      </span>
    </span>
  );
}

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [collection, setCollection] = useQueryState("collection");
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const visible = items.filter((i) => !collection || i.collection === collection);
  const counts = Object.fromEntries(collections.map((c) => [c.slug, items.filter((i) => i.collection === c.slug).length]));

  const open = (i: number, el: HTMLButtonElement) => {
    lastTrigger.current = el;
    setIndex(i);
    dialog.current?.showModal();
  };
  const close = useCallback(() => dialog.current?.close(), []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (!el.open) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  // Basic swipe support on touch screens.
  const touchX = useRef<number | null>(null);

  const current = index !== null ? visible[index] : null;

  return (
    <>
      <FilterBar label="Filter by collection" options={[...collections]} value={collection} onChange={setCollection} counts={counts} />
      {visible.length === 0 ? (
        <p className="empty-state">Nothing in this collection yet.</p>
      ) : (
        <ul className="gallery">
          {visible.map((item, i) => (
            <li key={item.id} className="gallery__item">
              <button type="button" className="gallery__button" onClick={(e) => open(i, e.currentTarget)} aria-label={`Open image: ${item.caption}`}>
                <Media item={item} />
              </button>
              <p className="gallery__caption">
                <span>{item.caption}</span>
                <span className="mono-label">
                  {collectionLabel(item.collection)}
                  {item.date ? ` · ${formatDate(item.date, "month")}` : ""}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Image viewer"
        onClose={() => {
          setIndex(null);
          lastTrigger.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {current && (
          <div className="lightbox__inner">
            <div className="lightbox__bar">
              <span className="mono-label" aria-live="polite">
                {index! + 1} / {visible.length}
              </span>
              <button type="button" className="lightbox__close" onClick={close} autoFocus>
                <X size={18} aria-hidden /> Close
              </button>
            </div>
            <figure className="lightbox__figure">
              <div className="lightbox__media" key={current.id}>
                <Media item={current} large />
              </div>
              <figcaption>
                {current.caption}
                <span className="mono-label">
                  {collectionLabel(current.collection)}
                  {current.date ? ` · ${formatDate(current.date)}` : ""}
                </span>
              </figcaption>
            </figure>
            {visible.length > 1 && (
              <div className="lightbox__nav">
                <button type="button" onClick={() => step(-1)} aria-label="Previous image">
                  <ChevronLeft size={20} aria-hidden />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next image">
                  <ChevronRight size={20} aria-hidden />
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
