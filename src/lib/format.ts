const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2026-03-14" → "14 March 2026" (parsed manually to avoid timezone drift). */
export function formatDate(iso: string, style: "long" | "short" | "month" = "long") {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m) return iso;
  const month = MONTHS[m - 1];
  if (style === "month") return `${month} ${y}`;
  if (style === "short") return `${String(d).padStart(2, "0")}.${String(m).padStart(2, "0")}.${y}`;
  return `${d} ${month} ${y}`;
}

export function monthName(m: number) {
  return MONTHS[m - 1];
}

export function pad(n: number, size = 2) {
  return String(n).padStart(size, "0");
}
