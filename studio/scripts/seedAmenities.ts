/**
 * One-time / idempotent seed for Amenity documents in production.
 *
 * Usage (from studio/):
 *   npx sanity exec scripts/seedAmenities.ts --with-user-token
 *
 * Safe to re-run: matches existing amenities by slug (or deterministic id),
 * updates displayPriority when needed, never deletes, never duplicates.
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-01-01'})

/** Seed order = displayPriority (1-based). */
const AMENITIES: {name: string; displayPriority: number}[] = [
  {name: 'Private Pool', displayPriority: 1},
  {name: 'Indoor Pool', displayPriority: 2},
  {name: 'Heated Pool', displayPriority: 3},
  {name: 'Hot Tub / Jacuzzi', displayPriority: 4},
  {name: 'Sauna', displayPriority: 5},
  {name: 'Hammam', displayPriority: 6},
  {name: 'Spa', displayPriority: 7},
  {name: 'Gym', displayPriority: 8},
  {name: 'Cinema Room', displayPriority: 9},
  {name: 'Games Room', displayPriority: 10},
  {name: 'Fireplace', displayPriority: 11},
  {name: 'Ski-in / Ski-out', displayPriority: 12},
  {name: 'Ski Room', displayPriority: 13},
  {name: 'Beach Access', displayPriority: 14},
  {name: 'Private Beach', displayPriority: 15},
  {name: 'Sea View', displayPriority: 16},
  {name: 'Mountain View', displayPriority: 17},
  {name: 'Terrace', displayPriority: 18},
  {name: 'Garden', displayPriority: 19},
  {name: 'Outdoor Dining', displayPriority: 20},
  {name: 'BBQ', displayPriority: 21},
  {name: 'Elevator', displayPriority: 22},
  {name: 'Air Conditioning', displayPriority: 23},
  {name: 'Wi-Fi', displayPriority: 24},
  {name: 'Parking', displayPriority: 25},
  {name: 'Helipad', displayPriority: 26},
]

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function deterministicId(slug: string): string {
  return `amenity.${slug}`
}

type ExistingAmenity = {
  _id: string
  name?: string
  slug?: string
  displayPriority?: number
}

async function main() {
  const existing = (await client.fetch(
    `*[_type == "amenity"]{
      _id,
      name,
      "slug": slug.current,
      displayPriority
    }`,
  )) as ExistingAmenity[]

  const bySlug = new Map<string, ExistingAmenity[]>()
  for (const doc of existing) {
    if (!doc.slug) continue
    const list = bySlug.get(doc.slug) || []
    list.push(doc)
    bySlug.set(doc.slug, list)
  }

  const created: string[] = []
  const updated: string[] = []
  const unchanged: string[] = []
  const duplicateWarnings: string[] = []

  for (const item of AMENITIES) {
    const slug = slugify(item.name)
    const id = deterministicId(slug)
    const matches = bySlug.get(slug) || []

    if (matches.length > 1) {
      duplicateWarnings.push(
        `slug "${slug}" has ${matches.length} documents: ${matches.map((m) => m._id).join(', ')}`,
      )
    }

    const preferred =
      matches.find((m) => m._id === id) ||
      matches[0] ||
      null

    if (preferred) {
      const patch: Record<string, unknown> = {}
      if (preferred.name !== item.name) patch.name = item.name
      if (preferred.displayPriority !== item.displayPriority) {
        patch.displayPriority = item.displayPriority
      }
      // Ensure slug object is present even if somehow missing shape
      if (!preferred.slug) {
        patch.slug = {_type: 'slug', current: slug}
      }

      if (Object.keys(patch).length) {
        await client.patch(preferred._id).set(patch).commit()
        updated.push(`${item.name} (${preferred._id})`)
      } else {
        unchanged.push(`${item.name} (${preferred._id})`)
      }
      continue
    }

    await client.createOrReplace({
      _id: id,
      _type: 'amenity',
      name: item.name,
      slug: {_type: 'slug', current: slug},
      displayPriority: item.displayPriority,
    })
    created.push(`${item.name} (${id})`)
  }

  // Final verification for this seed set
  const seededSlugs = AMENITIES.map((a) => slugify(a.name))
  const after = (await client.fetch(
    `*[_type == "amenity" && slug.current in $slugs]{
      _id,
      name,
      "slug": slug.current,
      displayPriority
    } | order(displayPriority asc)`,
    {slugs: seededSlugs},
  )) as ExistingAmenity[]

  const slugCounts = new Map<string, number>()
  for (const doc of after) {
    if (!doc.slug) continue
    slugCounts.set(doc.slug, (slugCounts.get(doc.slug) || 0) + 1)
  }
  const dupesAfter = [...slugCounts.entries()].filter(([, n]) => n > 1)

  console.log('\n=== Amenity seed summary ===')
  console.log(`Created:   ${created.length}`)
  created.forEach((line) => console.log(`  + ${line}`))
  console.log(`Updated:   ${updated.length}`)
  updated.forEach((line) => console.log(`  ~ ${line}`))
  console.log(`Unchanged: ${unchanged.length}`)
  unchanged.forEach((line) => console.log(`  = ${line}`))
  if (duplicateWarnings.length) {
    console.log('Duplicate slugs before seed:')
    duplicateWarnings.forEach((line) => console.log(`  ! ${line}`))
  }
  console.log(`\nSeeded amenities now in dataset: ${after.length} (expected ${AMENITIES.length})`)
  if (dupesAfter.length) {
    console.log('Duplicate slugs after seed:')
    dupesAfter.forEach(([slug, n]) => console.log(`  ! ${slug} × ${n}`))
  } else {
    console.log('No duplicate slugs among seeded amenities.')
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
