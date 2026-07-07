/**
 * Sanity client — single instance for the whole app. Uses CDN by default
 * (fast, cached), reads project id + dataset from env with a hard-coded
 * fallback to the live 2PAT project.
 *
 * All fetches use tag-based revalidation so a webhook from Sanity can bust
 * the Next.js cache instantly. See src/lib/sanity/queries.ts for the tags.
 */

import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

/** Loose image source type — mirrors the fields the URL builder needs
 *  without depending on Sanity's internal typing paths. */
type SanityImageSource =
  | string
  | { _ref?: string; _id?: string; asset?: { _ref?: string; url?: string } };

export const SANITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "3icegu87";
export const SANITY_DATASET =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const SANITY_API_VERSION = "2024-01-01";

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: true,
});

const builder = createImageUrlBuilder(sanityClient);

/** Convert a Sanity image ref (from queries) to a URL. Undefined-safe so
 *  optional images in schema don't crash callers. */
export function urlFor(source: SanityImageSource | undefined) {
  if (!source) return undefined;
  return builder.image(source);
}
