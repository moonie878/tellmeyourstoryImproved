export const STORY_TYPES = [
  {
    id: 'mum',
    title: "Mum's Story",
    projectTitle: 'Mum Story',
    description: 'A keepsake filled with love, memories, and the moments that shaped her life.',
    shortLabel: 'Mum Keepsake',
    label: 'Most meaningful',
  },
  {
    id: 'dad',
    title: "Dad's Story",
    projectTitle: 'Dad Story',
    description: 'Capture his stories, lessons, humour, and the memories you’ll always want to keep.',
    shortLabel: 'Dad Keepsake',
  },
  {
    id: 'grandma',
    title: "Grandma's Story",
    projectTitle: 'Grandma Story',
    description: 'Preserve family traditions, stories, and the memories passed down through generations.',
    shortLabel: 'Grandma Keepsake',
  },
  {
    id: 'grandad',
    title: "Grandad's Story",
    projectTitle: 'Grandad Story',
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
]

export function getStoryMeta(storyType: string) {
  return STORY_TYPES.find((story) => story.id === storyType)
}