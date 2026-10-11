"use client";

import { Check, Link2 } from "lucide-react";
import { useState } from "react";

export function CopyLink({ title }: { title: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    const url = window.location.href.split("#")[0];
    try {
      if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setState("copied");
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return;
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2200);
  }

  return (
    <button type="button" className="text-button" onClick={copy}>
      {state === "copied" ? <Check size={14} aria-hidden /> : <Link2 size={14} aria-hidden />}
      <span aria-live="polite">{state === "copied" ? "Link copied" : state === "failed" ? "Couldn’t copy — use the address bar" : "Copy link"}</span>
    </button>
  );
}
