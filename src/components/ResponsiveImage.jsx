/*
  ResponsiveImage: Lightweight responsive <img> that builds a srcset from a base URL.
  - Designed to work well with Unsplash (uses the `w` width param) but works for any URL.
  - Falls back gracefully if URL parsing fails.
*/
import React from "react";

function buildUrlWithWidth(src, width) {
  try {
    const u = new URL(src);
    // Prefer `w` for Unsplash; otherwise keep existing and add w
    u.searchParams.set("w", String(width));
    // Optimize: reduce quality from 80 to 75, force WebP format
    u.searchParams.set("q", "75");
    u.searchParams.set("fm", "webp");
    return u.toString();
  } catch {
    // Non-URL or invalid string; just return original
    return src;
  }
}

// Written as the bare `import.meta.env.BASE_URL` on purpose. Vite substitutes
// that exact text at transform time; the optional-chaining form is left alone
// and evaluates to undefined in dev, which silently drops the base prefix and
// 404s every image we host ourselves.
const BASE = import.meta.env.BASE_URL || "/";

function resolveSrc(src) {
  // A root-relative path is relative to the deployed base, not the domain:
  // this site lives at /Portfolio/, not /.
  if (typeof src !== "string" || !src.startsWith("/")) return src;
  return `${BASE.replace(/\/$/, "")}/${src.replace(/^\//, "")}`;
}

export default function ResponsiveImage({
  src,
  alt = "",
  className,
  widths = [320, 480, 640, 768, 960, 1200],
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  onError,
}) {
  const resolved = resolveSrc(src);

  // Only a CDN that resizes from a query param can honour a srcset. A file we
  // ship ourselves has exactly one size, so advertising six widths for it
  // would just be the same bytes listed six times.
  const isResizable = /^https?:\/\//.test(resolved);
  const srcSet = isResizable
    ? widths.map((w) => `${buildUrlWithWidth(resolved, w)} ${w}w`).join(", ")
    : undefined;

  // Choose a reasonable default src (largest width)
  const fallbackSrc = isResizable
    ? buildUrlWithWidth(resolved, widths[widths.length - 1])
    : resolved;

  return (
    <img
      src={fallbackSrc}
      {...(srcSet ? { srcSet, sizes } : {})}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      onError={onError}
      {...(fetchPriority ? { fetchPriority } : {})}
    />
  );
}
