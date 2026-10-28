// Prefixes /public paths with the deploy base path (e.g. "/Art-director-website-" on
// GitHub Pages). next/link adds it to links automatically; raw <img>/<video> do not.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset<T extends string | undefined>(path: T): T {
  if (!path || !path.startsWith("/") || path.startsWith("//")) return path;
  return `${BASE}${path}` as T;
}
