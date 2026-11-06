/**
 * STORY_TYPES is what the pickers show. Anything in HIDDEN_STORY_TYPES exists
 * and works, but is never offered — used for one-off collaborations where the
 * questions are bespoke and it would only confuse everyone else to see it.
 *
 * getStoryMeta looks across both, so a hidden story still gets its proper title
 * and labels everywhere it's displayed.
 */

export const STORY_TYPES = [
  {
    id: 'mum',
    title: "Mum's Story",
    projectTitle: "Mum's Story",
    description: 'A keepsake filled with love, memories, and the moments that shaped her life.',
    shortLabel: 'Mum Keepsake',
    label: 'Most meaningful',
  },
  {
    id: 'dad',
    title: "Dad's Story",
    projectTitle: "Dad's Story",
    description: 'Capture his stories, lessons, humour, and the memories you’ll always want to keep.',
    shortLabel: 'Dad Keepsake',
  },
  {
    id: 'grandma',
    title: "Grandma's Story",
    projectTitle: "Grandma's Story",
    description: 'Preserve family traditions, stories, and the memories passed down through generations.',
    shortLabel: 'Grandma Keepsake',
  },
  {
    id: 'grandad',
    title: "Grandad's Story",
    projectTitle: "Grandad's Story",
    description: 'Keep his experiences, stories, and life lessons alive for future generations.',
    shortLabel: 'Grandad Keepsake',
  },
  {
    id: 'life',
    title: 'Life Story',
    projectTitle: 'Life Story',
    description: 'Tell the full story of a life — from early memories to defining moments and reflections.',
    shortLabel: 'Life Story',
    label: 'Full life story',
  },
  {
    id: 'couple',
    title: 'Couple Story',
    projectTitle: 'Couple Story',
    description: 'Capture how your story began and the life you built together over the years.',
    shortLabel: 'Couple Story',
    label: 'Perfect gift',
  },
  {
    id: 'child_story',
    title: "Your Child's Story",
    projectTitle: "Your Child's Story",
    description: 'Capture the moments, milestones, and memories of your child as they grow.',
    shortLabel: 'Child Keepsake',
    label: 'New',
  },
]

/** Real story types that are never offered in the pickers. */
export const HIDDEN_STORY_TYPES = [
  {
    id: 'race_season',
    title: 'A Racing Season',
    projectTitle: 'My Racing Season',
    description: 'A season told properly — the rounds, the van, the bike, and the people in it.',
    shortLabel: 'Racing Season',
  },
]

/** Everything that exists, offered or not. Use this for lookups, not display. */
export const ALL_STORY_TYPES = [...STORY_TYPES, ...HIDDEN_STORY_TYPES]

export function getStoryMeta(storyType: string) {
  return ALL_STORY_TYPES.find((story) => story.id === storyType)
}