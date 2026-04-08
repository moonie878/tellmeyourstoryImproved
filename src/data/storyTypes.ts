export const STORY_TYPES = [
  {
    id: 'mum',
    title: "Mum's Story",
    projectTitle: 'Mum Story',
    description: 'Capture meaningful memories, life moments, and wisdom from Mum.',
    shortLabel: 'Mum Keepsake',
  },
  {
    id: 'dad',
    title: "Dad's Story",
    projectTitle: 'Dad Story',
    description: 'Preserve Dad’s memories, milestones, humour, and life lessons.',
    shortLabel: 'Dad Keepsake',
  },
  {
    id: 'grandma',
    title: "Grandma's Story",
    projectTitle: 'Grandma Story',
    description: 'Save Grandma’s memories, traditions, family stories, and wisdom.',
    shortLabel: 'Grandma Keepsake',
  },
  {
    id: 'grandad',
    title: "Grandad's Story",
    projectTitle: 'Grandad Story',
    description: 'Keep Grandad’s memories, experiences, stories, and legacy alive.',
    shortLabel: 'Grandad Keepsake',
  },
  {
    id: 'life',
    title: 'Life Story',
    projectTitle: 'Life Story',
    description: 'Tell the wider story of a life, from early memories to reflections and legacy.',
    shortLabel: 'Life Story',
  },
  {
    id: 'couple',
    title: 'Couple Story',
    projectTitle: 'Couple Story',
    description: 'Capture how two people met, built a life together, and grew through the years.',
    shortLabel: 'Couple Story',
  },
]

export function getStoryMeta(storyType: string) {
  return STORY_TYPES.find((story) => story.id === storyType)
}