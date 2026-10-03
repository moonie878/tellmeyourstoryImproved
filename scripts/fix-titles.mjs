#!/usr/bin/env node
/**
 * fix-titles.mjs — trim SEO titles that Google truncates.
 *
 *   node scripts/fix-titles.mjs            dry run: print every change, write nothing
 *   node scripts/fix-titles.mjs --write    apply the changes
 *   node scripts/fix-titles.mjs --write --force    apply even with uncommitted changes
 *
 * What it does, and only this: where a page's SEO title is longer than 60
 * characters AND ends with "| Tell Me Your Story", it removes that suffix.
 * Google cuts the title at roughly 60 characters, so on those pages the brand
 * name is never shown anyway — it is spent characters.
 *
 * What it deliberately does NOT do:
 *   - touch a title already 60 or under, suffix or not
 *   - touch a title that is long for any other reason (it reports them instead)
 *   - touch anything other than the one title string
 *   - guess at a title where the brand is mid-sentence rather than a suffix
 *
 * Run it from the project root.
 */

import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const WRITE = process.argv.includes('--write')
const FORCE = process.argv.includes('--force')
const LIMIT = 60
const SUFFIX = /\s*\|\s*Tell Me Your Story\s*$/

const VIEWS = 'src/views'
const SEO_FILE = 'src/composables/useSeo.ts'

// ── sanity checks ────────────────────────────────────────────────────────────
if (!fs.existsSync(VIEWS)) {
  console.error(`Can't find ${VIEWS} — run this from the project root.`)
  process.exit(1)
}

if (WRITE && !FORCE) {
  try {
    const dirty = execSync('git status --porcelain', { encoding: 'utf8' }).trim()
    if (dirty) {
      console.error('You have uncommitted changes. Commit or stash first so this is easy to undo:\n')
      console.error(dirty.split('\n').slice(0, 10).map((l) => '  ' + l).join('\n'))
      console.error('\n(or re-run with --force if you know what you are doing)')
      process.exit(1)
    }
  } catch {
    console.error('Not a git repo, or git is unavailable. Re-run with --force if that is expected.')
    process.exit(1)
  }
}

// ── find the SEO title in a file ─────────────────────────────────────────────
/** Matches title: '…' / "…" / `…`, capturing quote char and body separately. */
const TITLE_RE = /title:\s*(['"`])((?:\\.|(?!\1)[^\\])*)\1/

/**
 * In a .vue file, a `title:` can also belong to a data array (chapters,
 * features, steps). Only the one inside useSeo({…}) is the SEO title, so we
 * search from the useSeo( call onwards.
 */
function findTitles(file, src) {
  if (file.endsWith('.vue')) {
    const at = src.indexOf('useSeo(')
    if (at < 0) return []
    const tail = src.slice(at)
    const m = tail.match(TITLE_RE)
    if (!m) return []
    return [{ index: at + m.index, match: m[0], quote: m[1], body: m[2] }]
  }
  // useSeo.ts — every title: in here is a page title (DEFAULTS + PAGE_SEO)
  const out = []
  const re = new RegExp(TITLE_RE.source, 'g')
  let m
  while ((m = re.exec(src)) !== null) {
    out.push({ index: m.index, match: m[0], quote: m[1], body: m[2] })
  }
  return out
}

const lineOf = (src, i) => src.slice(0, i).split('\n').length

/** For printing only — show the title as a reader would see it. */
const readable = (body) => body.replace(/\\(['"`\\])/g, '$1')

/** Visible length: a template literal's ${…} is unknown at build time. */
function visibleLength(body, quote) {
  if (quote !== '`') return body.replace(/\\(['"\\])/g, '$1').length
  // assume an interpolation renders as roughly 3 characters (e.g. "150")
  return body.replace(/\$\{[^}]*\}/g, 'XXX').length
}

// ── collect ──────────────────────────────────────────────────────────────────
const files = [
  ...fs.readdirSync(VIEWS).filter((f) => f.endsWith('.vue')).map((f) => path.join(VIEWS, f)),
  ...(fs.existsSync(SEO_FILE) ? [SEO_FILE] : []),
]

const fixable = []
const manual = []
const fine = []

for (const file of files) {
  const src = fs.readFileSync(file, 'utf8')
  for (const t of findTitles(file, src)) {
    const len = visibleLength(t.body, t.quote)
    const row = { file, line: lineOf(src, t.index), before: t.body, quote: t.quote, len, match: t.match }

    if (len <= LIMIT) { fine.push(row); continue }

    if (SUFFIX.test(t.body)) {
      const after = t.body.replace(SUFFIX, '')
      row.after = after
      row.afterLen = visibleLength(after, t.quote)
      row.stillLong = row.afterLen > LIMIT
      fixable.push(row)
    } else {
      row.why = /Tell Me Your Story/.test(t.body)
        ? 'brand name is mid-title, not a trailing suffix'
        : 'no brand suffix to remove'
      manual.push(row)
    }
  }
}

// ── report ───────────────────────────────────────────────────────────────────
const bar = '─'.repeat(74)
console.log(`\n${bar}\nSEO titles — ${files.length} files scanned\n${bar}`)
console.log(`  ${fine.length + fixable.length + manual.length} titles found`)
console.log(`  ${fine.length} already fit within ${LIMIT} characters`)
console.log(`  ${fixable.length} too long and end with the brand suffix  → this script fixes these`)
console.log(`  ${manual.length} too long for another reason              → listed for you to decide\n`)

if (fixable.length) {
  console.log(`${bar}\nWILL CHANGE (${fixable.length})\n${bar}`)
  for (const r of fixable) {
    console.log(`\n${r.file}:${r.line}`)
    console.log(`  before  ${String(r.len).padStart(3)}  ${readable(r.before)}`)
    console.log(`  after   ${String(r.afterLen).padStart(3)}  ${readable(r.after)}${r.stillLong ? '   ← still over 60, worth a manual trim too' : ''}`)
  }
  console.log()
}

if (manual.length) {
  console.log(`${bar}\nYOUR CALL — not touched (${manual.length})\n${bar}`)
  for (const r of manual) {
    console.log(`\n${r.file}:${r.line}`)
    console.log(`  ${String(r.len).padStart(3)}  ${readable(r.before)}`)
    console.log(`       (${r.why})`)
  }
  console.log()
}

// ── write ────────────────────────────────────────────────────────────────────
if (!fixable.length) {
  console.log('Nothing to change.\n')
  process.exit(0)
}

if (!WRITE) {
  console.log(`${bar}`)
  console.log('Dry run — nothing written. Re-run with --write to apply the changes above.\n')
  process.exit(0)
}

let written = 0
for (const r of fixable) {
  const src = fs.readFileSync(r.file, 'utf8')
  // Function replacements, so a $ in the title is never read as $&, $1 etc.
  const replacement = r.match.replace(r.before, () => r.after)

  // Guard: the exact title literal must still appear exactly once.
  const hits = src.split(r.match).length - 1
  if (hits !== 1) {
    console.error(`SKIPPED ${r.file} — found the title ${hits} times, expected 1. Fix this one by hand.`)
    continue
  }

  const out = src.replace(r.match, () => replacement)

  // Guard: the only thing that changed is the suffix we removed.
  const expectedDrop = r.before.length - r.after.length
  if (src.length - out.length !== expectedDrop) {
    console.error(`SKIPPED ${r.file} — edit changed ${src.length - out.length} characters, expected ${expectedDrop}.`)
    continue
  }

  fs.writeFileSync(r.file, out, 'utf8')
  written++
}

console.log(`${bar}`)
console.log(`Wrote ${written} of ${fixable.length} files.`)
console.log('Check it with:  git diff --stat   then   git diff\n')
