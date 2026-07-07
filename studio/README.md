# 2PAT Studio (Sanity CMS)

Content backend for the 2PAT website — schemas + migration script.
Runs locally with `npm run dev` (localhost:3333), or deployed to
`<slug>.sanity.studio` for anh to edit content from any browser.

## Project details

- **Project ID:** `3icegu87`
- **Dataset:** `production`
- **Manage URL:** https://www.sanity.io/manage/personal/project/3icegu87

## Schema types

- `project` — every case study (12 currently seeded). Layout-aware — fields
  are grouped and conditionally hidden based on the `layout` value (classic /
  chapter / split / case-study / photo-essay / editorial-spread /
  session-timeline).
- `service` — the 4 service categories used across the landing page.
- `siteSettings` — singleton: title, tagline, contact info, socials.

## Local dev

```bash
export SANITY_AUTH_TOKEN=<token from sanity.io/manage/personal/tokens>
npm run dev
```

Then open http://localhost:3333.

## Migration (one-shot import from Next.js hard-coded data)

Populates the dataset from `../src/lib/projects.ts` + `subpages.ts`, uploading
each unique placeholder image once and referencing it across projects.

```bash
export SANITY_AUTH_TOKEN=<token with editor+ role on this project>
npx tsx scripts/migrate.ts
```

The script uses `createOrReplace` per document id, so it's safe to re-run —
it will overwrite Sanity content with the current Next.js source of truth.

## Deploy to hosted Studio

```bash
export SANITY_AUTH_TOKEN=<user administrator token>
npx sanity deploy --url pat-website
```

Result: https://pat-website.sanity.studio

**Note:** hosted deploy requires a Sanity **user** administrator (not a
project robot token). If deploy fails with "Session does not match project
host":

1. Invite your Sanity user account as project admin — see manage URL above
2. Accept the invite via email
3. `sanity login` (browser device flow)
4. Re-run `npx sanity deploy --url pat-website`
