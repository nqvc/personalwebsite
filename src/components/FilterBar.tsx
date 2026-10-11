"use client";

export function FilterBar({
  label,
  options,
  value,
  onChange,
  counts,
}: {
  label: string;
  options: { slug: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  counts?: Record<string, number>;
}) {
  return (
    <div className="filter-bar" role="group" aria-label={label}>
      {[{ slug: "", label: "All" }, ...options].map((o) => (
        <button key={o.slug || "all"} type="button" aria-pressed={value === o.slug} onClick={() => onChange(o.slug)} className="filter-bar__button">
          {o.label}
          {counts && <span className="filter-bar__count">{o.slug ? counts[o.slug] ?? 0 : Object.values(counts).reduce((a, b) => a + b, 0)}</span>}
        </button>
      ))}
    </div>
  );
}
