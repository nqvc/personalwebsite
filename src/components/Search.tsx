"use client";

import { Search as SearchIcon, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { SearchItem } from "@/lib/content";

function normalise(s: string) {
  return s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
}

export function searchItems(items: SearchItem[], query: string) {
  const terms = normalise(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return items
    .map((item) => {
      const title = normalise(item.title);
      const summary = normalise(item.summary);
      const text = normalise(item.text);
      let score = 0;
      for (const t of terms) {
        if (title.includes(t)) score += 10;
        else if (summary.includes(t)) score += 4;
        else if (text.includes(t)) score += 1;
        else return null;
      }
      return { item, score };
    })
    .filter((x): x is { item: SearchItem; score: number } => x !== null)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.item);
}

function snippet(item: SearchItem, query: string) {
  const term = normalise(query).split(/\s+/).filter(Boolean)[0];
  if (!term || normalise(item.title + item.summary).includes(term) || !item.text) return item.summary;
  const i = normalise(item.text).indexOf(term);
  if (i < 0) return item.summary;
  const start = Math.max(0, i - 60);
  return (start > 0 ? "…" : "") + item.text.slice(start, i + 100).trim() + "…";
}

export function Search() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<SearchItem[] | null>(null);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();

  const load = useCallback(() => {
    if (items) return;
    fetch("/search.json")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setItems)
      .catch(() => setError(true));
  }, [items]);

  const open = useCallback(() => {
    load();
    dialogRef.current?.showModal();
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [load]);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const typing = target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        open();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const results = useMemo(() => (items ? searchItems(items, query).slice(0, 12) : []), [items, query]);

  useEffect(() => setActive(0), [query]);

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      close();
      router.push(results[active].href);
    }
  }

  return (
    <>
      <button type="button" className="icon-button" onClick={open} aria-label="Search the site" title="Search (Ctrl K or /)">
        <SearchIcon size={17} strokeWidth={1.5} aria-hidden />
      </button>
      <dialog
        ref={dialogRef}
        className="search-dialog"
        aria-label="Search"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        onClose={() => setQuery("")}
      >
        <div className="search-dialog__inner">
          <div className="search-dialog__bar">
            <SearchIcon size={18} strokeWidth={1.5} aria-hidden />
            <input
              ref={inputRef}
              type="search"
              placeholder="Search writing, projects and notes"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKey}
              aria-label="Search query"
              aria-controls="search-results"
              aria-activedescendant={results[active] ? `search-result-${active}` : undefined}
              autoComplete="off"
              spellCheck={false}
            />
            <button type="button" className="icon-button" onClick={close} aria-label="Close search">
              <X size={18} strokeWidth={1.5} aria-hidden />
            </button>
          </div>
          <div className="search-dialog__body">
            {error ? (
              <p className="search-dialog__empty">The search index couldn&rsquo;t be loaded. Try refreshing the page.</p>
            ) : !items && query ? (
              <p className="search-dialog__empty">Loading…</p>
            ) : !query ? (
              <p className="search-dialog__empty">
                Type to search. Use <kbd>↑</kbd> <kbd>↓</kbd> to move and <kbd>Enter</kbd> to open.
              </p>
            ) : results.length === 0 ? (
              <p className="search-dialog__empty" role="status">
                Nothing found for &ldquo;{query}&rdquo;.
              </p>
            ) : (
              <ul id="search-results" role="listbox" className="search-results" aria-label={`${results.length} results`}>
                {results.map((r, i) => (
                  <li key={r.href} id={`search-result-${i}`} role="option" aria-selected={i === active}>
                    <Link href={r.href} onClick={close} className={i === active ? "is-active" : undefined} onMouseEnter={() => setActive(i)}>
                      <span className="search-results__type">{r.type}</span>
                      <span className="search-results__title">{r.title}</span>
                      <span className="search-results__snippet">{snippet(r, query)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
