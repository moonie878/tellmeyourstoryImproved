/**
 * scripts/fix-faq-schema.mjs
 *
 * Points every hand-written FAQPage schema at the `faqs` array the page
 * actually renders, instead of a separate copy of the questions.
 *
 * WHY
 *
 * 13 views hand-copy their Q&A into the JSON-LD. Every one of those copies has
 * fewer questions than the page shows — 18 questions in total that visitors can
 * read and Google is never told about. A couple have also drifted in wording
 * ("What if I am not a confident writer?" in the schema, "What if I'm not a
 * confident writer?" on the page).
 *
 * This is the same class of bug as the cover and the audio: two copies of one
 * truth, and nothing checking they still agree. The fix is to delete the copy.
 *
 * 19 other views already do this — see HomeView, whose comment reads
 * "Shown on the page AND used for the FAQPage schema, so they always match."
 *
 * SAFETY
 *
 * - Only rewrites a file that has BOTH a `const faqs` array and a FAQPage whose
 *   mainEntity is a literal array. Anything else is left alone and reported.
 * - Refuses to touch a file where the schema contains a question that is NOT on
 *   the page, unless --force. That case could mean the page lost an FAQ the
 *   schema still claims, which is worth your eyes rather than a regex's.
 * - Writes nothing without a backup (.bak) unless --no-backup.
 *
 * Usage, from the repo root:
 *   node scripts/fix-faq-schema.mjs --dry     # show what would change
 *   node scripts/fix-faq-schema.mjs           # do it
 *
 * Afterwards: npm run build, then check one page in the Rich Results Test.
 * `git diff` is the real review — read it before committing.
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const VIEWS = join('src', 'views')
const DRY = process.argv.includes('--dry')
const FORCE = process.argv.includes('--force')
const NO_BACKUP = process.argv.includes('--no-backup')

if (!existsSync(VIEWS)) {
  console.error(`\n  Cannot find ${VIEWS}. Run this from the repo root.\n`)
  process.exit(1)
}

/** Slice from the bracket at/after `from` to its match, respecting strings. */
function balanced(text, from, open = '[', close = ']') {
  const start = text.indexOf(open, from)
  if (start === -1) return null
  let depth = 0
  let quote = null
  for (let i = start; i < text.length; i++) {
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
      if (depth === 0) return { start, end: i + 1, body: text.slice(start, i + 1) }
    }
  }
  return null
}

/** Values of `key:` as a flat list, in source order. */
function values(segment, key) {
  const out = []
  const re = new RegExp(`${key}\\s*:\\s*(['"\`])((?:\\\\.|(?!\\1).)*)\\1`, 'gs')
  let m
  while ((m = re.exec(segment)) !== null) out.push(m[2])
  return out
}

const squash = (s) => s.replace(/\\(['"`])/g, '$1').replace(/[^a-z0-9]/gi, '').toLowerCase()

const changed = []
const skipped = []
const flagged = []

for (const file of readdirSync(VIEWS).filter((f) => f.endsWith('.vue')).sort()) {
  const path = join(VIEWS, file)
  const text = readFileSync(path, 'utf-8')

  const faqPageAt = text.indexOf("'@type': 'FAQPage'")
  if (faqPageAt === -1) continue

  const meAt = text.indexOf('mainEntity', faqPageAt)
  if (meAt === -1) continue

  // Already derived from the array — nothing to do.
  if (/mainEntity\s*:\s*faqs?\b|faqs\.map/.test(text.slice(meAt, meAt + 40))) continue

  const faqsConst = /const\s+faqs\s*[:=]/.exec(text)
  if (!faqsConst) {
    skipped.push([file, 'FAQs are inline in the template, no faqs array to point at'])
    continue
  }

  const arr = balanced(text, meAt)
  if (!arr) {
    skipped.push([file, 'could not read the mainEntity array'])
    continue
  }

  const faqsArr = balanced(text, faqsConst.index + faqsConst[0].length)
  if (!faqsArr) {
    skipped.push([file, 'could not read the faqs array'])
    continue
  }

  const pageQs = values(faqsArr.body, '\\bq')
  const schemaQs = values(arr.body, 'name')
  const onPage = new Set(pageQs.map(squash))
  const notOnPage = schemaQs.filter((q) => !onPage.has(squash(q)))

  if (notOnPage.length && !FORCE) {
    flagged.push([file, notOnPage, pageQs.length, schemaQs.length])
    continue
  }

  // Keep the indentation of the line mainEntity sits on.
  const lineStart = text.lastIndexOf('\n', meAt) + 1
  const indent = text.slice(lineStart, meAt).match(/^\s*/)[0]
  const replacement = [
    'faqs.map((f) => ({',
    `${indent}  '@type': 'Question',`,
    `${indent}  name: f.q,`,
    `${indent}  acceptedAnswer: { '@type': 'Answer', text: f.a },`,
    `${indent}}))`,
  ].join('\n')

  const next = text.slice(0, arr.start) + replacement + text.slice(arr.end)

  changed.push([file, pageQs.length, schemaQs.length, pageQs.length - schemaQs.length])

  if (!DRY) {
    if (!NO_BACKUP) writeFileSync(`${path}.bak`, text, 'utf-8')
    writeFileSync(path, next, 'utf-8')
  }
}

const pad = (s, n) => String(s).padEnd(n)

console.log(`\n  ${DRY ? 'Would rewrite' : 'Rewrote'} ${changed.length} file${changed.length === 1 ? '' : 's'}\n`)
let gained = 0
for (const [file, page, schema, delta] of changed) {
  gained += delta
  console.log(`   ${pad(file, 44)} schema ${schema} -> ${page}  (+${delta})`)
}
console.log(`\n  ${gained} questions on your pages that Google was never told about.\n`)

if (flagged.length) {
  console.log('  NOT touched — the schema claims a question the page does not show:')
  for (const [file, qs, page, schema] of flagged) {
    console.log(`\n   ${file}  (page ${page} / schema ${schema})`)
    for (const q of qs) console.log(`      ${q}`)
  }
  console.log('\n  Usually this is just reworded wording and rewriting is correct —')
  console.log('  compare against the page, then re-run with --force.\n')
}

if (skipped.length) {
  console.log('  Left alone:')
  for (const [file, why] of skipped) console.log(`   ${pad(file, 44)} ${why}`)
  console.log()
}

if (!DRY && changed.length) {
  console.log('  Backups written as <file>.vue.bak — delete them once git diff looks right.')
  console.log('  Then: npm run build\n')
}
