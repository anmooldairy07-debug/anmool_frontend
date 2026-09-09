/**
 * Site-wide feature flags
 *
 * COMING_SOON:
 *  - true  => all pages show ComingSoon screen (frontend only)
 *  - false => whole website is visible
 *
 * Controlled by env variable:
 *   NEXT_PUBLIC_COMING_SOON=true  -> coming soon ON
 *   NEXT_PUBLIC_COMING_SOON=false -> coming soon OFF (default)
 *
 * You can also hardcode it for quick testing:
 *   export const COMING_SOON = true;
 */
export const COMING_SOON =
  process.env.NEXT_PUBLIC_COMING_SOON === "true";
