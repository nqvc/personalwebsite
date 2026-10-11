"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Keeps a single string value in sync with a URL query parameter,
 * so filtered views can be linked to and survive a refresh.
 */
export function useQueryState(key: string, fallback = "") {
  const [value, setValue] = useState(fallback);

  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get(key);
    if (v !== null) setValue(v);
  }, [key]);

  const update = useCallback(
    (next: string) => {
      setValue(next);
      const params = new URLSearchParams(window.location.search);
      if (next && next !== fallback) params.set(key, next);
      else params.delete(key);
      const qs = params.toString();
      window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
    },
    [key, fallback],
  );

  return [value, update] as const;
}
