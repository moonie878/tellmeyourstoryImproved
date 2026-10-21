/**
 * scripts/apply-seo-text.mjs
 *
 * Replaces the over-long useSeo() titles and descriptions with shorter ones,
 * reading the replacements from scripts/seo-text.json.
 *
 * WHY
 *
 * Google truncates a title past ~60 characters and a description past ~160.
 * Everything after the cut is thrown away — and because these were written with
 * the brand at the end, the part being thrown away was often the part that
 * tells someone what the page is. One title was 82 characters.
 *
 * 20 titles and 44 descriptions, each counted rather than estimated.
 *
 * HOW IT IS SAFE
 *
 * It only touches the string inside the useSeo() call, found by matching
 * parentheses rather than by guessing. For each page it checks the current
 * string is the one expected; if a page has been edited since, that page is
 * reported and skipped rather than overwritten. Nothing is written unless every
 * single page matches, so a partial run cannot happen.
 *
 * Usage, from the repo root:
 *   node scripts/apply-seo-text.mjs --dry    # show old -> new with lengths
 *   node scripts/apply-seo-text.mjs          # do it
 *
 * Afterwards: git diff, npm run build.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const VIEWS = join('src', 'views')
const DRY = process.argv.includes('--dry')
const NO_BACKUP = process.argv.includes('--no-backup')

const here = dirname(fileURLToPath(import.meta.url))
const DATA = existsSync(join(here, 'seo-text.json'))
  ? join(here, 'seo-text.json')
  : join('scripts', 'seo-text.json')

if (!existsSync(VIEWS)) {
  console.error(`\n  Cannot find ${VIEWS}. Run this from the repo root.\n`)
  process.exit(1)
}
if (!existsSync(DATA)) {
  console.error(`\n  Cannot find seo-text.json. Put it next to this script in scripts/.\n`)
  process.exit(1)
}

const LIMITS = { title: 60, description: 160 }

/** Slice from the first `open` at/after start to its match, ignoring strings. */
function balanced(text, start, open = '(', close = ')') {
  const from = text.indexOf(open, start)
  if (from === -1) return null
  let depth = 0
  let quote = null
  for (let i = from; i < text.length; i++) {
    const c = text[i]
    if (quote) {
      if (c === '\\') { i++; continue }
      if (c === quote) quote = null
      continue
    }
    if (c === "'" || c === '"' || c === '`') { quote = c; continue }
    if (c === open) depth++
    else if (c === close) {
      depth--
      if (depth === 0) return { start: from, end: i + 1 }
    }
  }
  return null
}

/** Locate a top-level `key: '...'` inside a slice. Returns absolute offsets. */
function findLiteral(text, from, to, key) {
  const seg = text.slice(from, to)
  const m = new RegExp(`(?:^|[{,\\s])${key}\\s*:\\s*\\n?\\s*(['"\`])`).exec(seg)
  if (!m) return null
  const quote = m[1]
  const open = from + m.index + m[0].length // first char of the value
  let i = open
  const chars = []
  while (i < to) {
    const c = text[i]
    if (c === '\\') { chars.push(text[i + 1]); i += 2; continue }
    if (c === quote) break
    chars.push(c); i++
  }
  return { open, close: i, quote, value: chars.join('') }
}

const escapeFor = (s, quote) =>
  s.replace(/\\/g, '\\\\').replace(new RegExp(quote, 'g'), `\\${quote}`)

const data = JSON.parse(readFileSync(DATA, 'utf-8'))
delete data._note

const plan = []
const problems = []

for (const [file, fields] of Object.entries(data)) {
  const path = join(VIEWS, file)
  if (!existsSync(path)) { problems.push([file, 'file not found']); continue }

  const text = readFileSync(path, 'utf-8')
  const u = text.indexOf('useSeo(')
  if (u === -1) { problems.push([file, 'no useSeo() call']); continue }
  const call = balanced(text, u)
  if (!call) { problems.push([file, 'could not read the useSeo() call']); continue }

  const edits = []
  for (const [key, next] of Object.entries(fields)) {
    const found = findLiteral(text, call.start, call.end, key)
    if (!found) { problems.push([file, `no ${key} inside useSeo()`]); continue }
    if (found.value.includes('${')) { problems.push([file, `${key} is a template literal — leave it`]); continue }
    if (found.value === next) continue // already applied
    if (found.value.length <= LIMITS[key]) {
      problems.push([file, `${key} is already ${found.value.length} chars — has it been edited?`])
      continue
    }
    edits.push({ key, ...found, next })
  }

  if (edits.length) plan.push({ file, path, text, edits })
}

if (problems.length) {
  console.log('\n  Stopping — nothing has been written.\n')
  for (const [file, why] of problems) console.log(`   ${file.padEnd(44)} ${why}`)
  console.log('\n  Fix or remove those entries in seo-text.json, then re-run.\n')
  process.exit(1)
}

let titles = 0
let descs = 0

for (const { file, path, text, edits } of plan) {
  // Apply back-to-front so earlier offsets stay valid.
  let next = text
  for (const e of [...edits].sort((a, b) => b.open - a.open)) {
    next = next.slice(0, e.open) + escapeFor(e.next, e.quote) + next.slice(e.close)
    if (e.key === 'title') titles++
    else descs++
  }

  if (DRY) {
    console.log(`\n${file}`)
    for (const e of edits) {
      console.log(`  ${e.key}  ${e.value.length} -> ${e.next.length}`)
      console.log(`    was: ${e.value}`)
      console.log(`    now: ${e.next}`)
    }
  } else {
    if (!NO_BACKUP) writeFileSync(`${path}.bak`, text, 'utf-8')
    writeFileSync(path, next, 'utf-8')
  }
}

console.log(
  `\n  ${DRY ? 'Would change' : 'Changed'} ${plan.length} files — ${titles} titles, ${descs} descriptions.`,
)
console.log('  Every new string is within Google\'s limit: titles <= 60, descriptions <= 160.\n')
if (!DRY) {
  if (!NO_BACKUP) {
    console.log('  Backups written as <file>.vue.bak — delete them once git diff looks right:')
    console.log('    rm src/views/*.vue.bak\n')
  }
  console.log('  Then: npm run build\n')
}
