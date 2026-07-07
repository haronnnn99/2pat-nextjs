/**
 * Migration — one-shot import of the hard-coded content in
 * `../src/lib/projects.ts` and `../src/lib/subpages.ts` into the Sanity
 * dataset. Idempotent per document id (uses `createOrReplace`), so re-running
 * this overwrites Sanity content with the current Next.js source of truth.
 *
 * Uploads each unique `/portfolio-ref/page-NN.png` once, caches the returned
 * asset id, and references it from every project field that used the same
 * placeholder path.
 *
 * Run with: SANITY_AUTH_TOKEN=sk... npx tsx scripts/migrate.ts
 */

import {createClient} from '@sanity/client'
import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'

import {PROJECTS, SERVICES} from '../../src/lib/projects'
import {SUB_PAGES} from '../../src/lib/subpages'

const client = createClient({
  projectId: '3icegu87',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
})

const NEXT_PUBLIC_DIR = resolve(__dirname, '../../public')

// ─── Image upload with per-path cache ──────────────────────
const uploadedImages = new Map<string, string>() // path → asset id

async function uploadImage(publicPath: string): Promise<{_type: 'image'; asset: {_ref: string; _type: 'reference'}} | undefined> {
  if (!publicPath) return undefined
  const key = publicPath
  const cached = uploadedImages.get(key)
  if (cached) return {_type: 'image', asset: {_ref: cached, _type: 'reference'}}

  const filePath = resolve(NEXT_PUBLIC_DIR, publicPath.replace(/^\//, ''))
  const filename = publicPath.split('/').pop() || 'placeholder.png'
  console.log(`  ⬆️  uploading ${filename}`)
  const asset = await client.assets.upload('image', readFileSync(filePath), {filename})
  uploadedImages.set(key, asset._id)
  return {_type: 'image', asset: {_ref: asset._id, _type: 'reference'}}
}

async function uploadImageArray(paths: string[] | undefined) {
  if (!paths?.length) return []
  const out: unknown[] = []
  for (const p of paths) {
    const img = await uploadImage(p)
    if (img) out.push({...img, _key: cryptoKey()})
  }
  return out
}

function cryptoKey() {
  return Math.random().toString(36).slice(2, 12)
}

// ─── Services ─────────────────────────────────────────────
async function migrateServices() {
  console.log('\n📦 Services')
  for (const s of SERVICES) {
    const docId = `service-${s.slug}`
    console.log(`  ${s.slug} → ${docId}`)
    await client.createOrReplace({
      _id: docId,
      _type: 'service',
      slug: s.slug,
      label: s.label,
      number: s.number,
      blurb: s.blurb,
      meta: s.meta,
    })
  }
}

// ─── Projects ─────────────────────────────────────────────
type ProjectDoc = {
  _id: string
  _type: 'project'
  [k: string]: unknown
}

async function migrateProjects() {
  console.log('\n📦 Projects (upload images + create docs)')
  const created: string[] = []

  for (const p of PROJECTS) {
    const docId = `project-${p.slug}`
    console.log(`\n  ${p.slug} → ${docId}`)

    const sub = SUB_PAGES[p.slug]

    const doc: ProjectDoc = {
      _id: docId,
      _type: 'project',
      title: p.title,
      slug: {_type: 'slug', current: p.slug},
      service: p.service,
      serviceLabel: p.serviceLabel,
      year: p.year,
      location: p.location,
      meta: p.meta,
      brief: p.brief,
      mosaic: p.mosaic ?? 'standard',
      hasSubPage: p.hasSubPage,
      heroImage: await uploadImage(p.heroImage),
    }

    if (sub) {
      Object.assign(doc, {
        layout: sub.layout,
        heroTitle: sub.heroTitle,
        heroDesc: sub.heroDesc,
        heroImage2: await uploadImage(sub.heroImage2 ?? ''),
        introEyebrow: sub.introEyebrow,
        introSlogan: sub.introSlogan,
        introEm: sub.introEm,
        introFoot: sub.introFoot,
        galleryLabel: sub.galleryLabel,
        galleryImages: await uploadImageArray(sub.galleryImages),
        videoLabel: sub.videoLabel,
        videoEmbedUrl: sub.videoEmbedUrl,
        videoPlaceholder: await uploadImage(sub.videoPlaceholder ?? ''),
        watermark: sub.watermark,
      })

      // Cards
      if (sub.cards?.length) {
        const cards = []
        for (const c of sub.cards) {
          cards.push({
            _key: cryptoKey(),
            _type: 'card',
            num: c.num,
            label: c.label,
            heading: c.heading,
            body: c.body,
            tags: c.tags,
            metrics: c.metrics?.map((m) => ({_key: cryptoKey(), ...m})),
            variant: c.variant,
            layout: c.layout,
            image: c.image ? await uploadImage(c.image) : undefined,
          })
        }
        doc.cards = cards
      }

      // Chapters
      if (sub.chapters?.length) {
        const chapters = []
        for (const c of sub.chapters) {
          chapters.push({
            _key: cryptoKey(),
            _type: 'chapter',
            num: c.num,
            eyebrow: c.eyebrow,
            title: c.title,
            body: c.body,
            image: await uploadImage(c.image),
          })
        }
        doc.chapters = chapters
      }

      // Case-study fields
      if (sub.headline) doc.headline = sub.headline
      if (sub.keyMetrics?.length)
        doc.keyMetrics = sub.keyMetrics.map((m) => ({_key: cryptoKey(), ...m}))
      if (sub.brief) {
        doc.brief_block = {
          eyebrow: sub.brief.eyebrow,
          heading: sub.brief.heading,
          body: sub.brief.body,
          image: await uploadImage(sub.brief.image),
        }
      }
      if (sub.answer) {
        doc.answer_block = {
          eyebrow: sub.answer.eyebrow,
          heading: sub.answer.heading,
          body: sub.answer.body,
          image: await uploadImage(sub.answer.image),
        }
      }
      if (sub.responsibilities?.length)
        doc.responsibilities = sub.responsibilities.map((r) => ({_key: cryptoKey(), ...r}))
      if (sub.testimonial) doc.testimonial = sub.testimonial

      // Split summary
      if (sub.splitSummary) doc.splitSummary = sub.splitSummary

      // Sessions
      if (sub.sessions?.length) {
        const sessions = []
        for (const s of sub.sessions) {
          sessions.push({
            _key: cryptoKey(),
            ...s,
            image: s.image ? await uploadImage(s.image) : undefined,
          })
        }
        doc.sessions = sessions
      }

      // Credits
      if (sub.credits?.length)
        doc.credits = sub.credits.map((c) => ({_key: cryptoKey(), ...c}))
    }

    await client.createOrReplace(doc)
    created.push(docId)
  }

  // Second pass: wire prev/next references (needed after all docs exist)
  console.log('\n📎 Wiring prev/next references')
  for (const p of PROJECTS) {
    const sub = SUB_PAGES[p.slug]
    if (!sub) continue
    const patch: Record<string, unknown> = {}
    if (sub.prev)
      patch.prev = {_type: 'reference', _ref: `project-${sub.prev.slug}`}
    if (sub.next)
      patch.next = {_type: 'reference', _ref: `project-${sub.next.slug}`}
    if (Object.keys(patch).length) {
      await client.patch(`project-${p.slug}`).set(patch).commit()
      console.log(`  ${p.slug}: prev=${sub.prev?.slug} next=${sub.next?.slug}`)
    }
  }

  return created
}

// ─── Site settings ────────────────────────────────────────
async function migrateSettings() {
  console.log('\n📦 Site settings')
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    title: '2PAT',
    tagline: 'Choose the right place, seize the right time',
    description:
      '2PAT is an event, media and branding studio in HCMC, Vietnam. We ship the whole thing — from concept to broadcast.',
    contactEmail: 'contact@2pat-vn.com',
    contactPhone: '035-322-0598',
    address: 'HCMC, Vietnam',
    socials: [
      {_key: cryptoKey(), label: 'Instagram', url: 'https://instagram.com/'},
      {_key: cryptoKey(), label: 'Facebook', url: 'https://facebook.com/'},
      {_key: cryptoKey(), label: 'YouTube', url: 'https://youtube.com/'},
      {_key: cryptoKey(), label: 'TikTok', url: 'https://tiktok.com/'},
    ],
  })
}

// ─── Main ─────────────────────────────────────────────────
async function main() {
  if (!process.env.SANITY_AUTH_TOKEN) {
    throw new Error('SANITY_AUTH_TOKEN env var required')
  }
  await migrateSettings()
  await migrateServices()
  const created = await migrateProjects()
  console.log(`\n✅ Migration complete — ${created.length} projects, ${SERVICES.length} services, 1 settings doc`)
}

main().catch((err) => {
  console.error('❌ Migration failed:', err)
  process.exit(1)
})
