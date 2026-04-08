<template>
    <aside class="h-fit rounded-2xl border border-stone-200 bg-white p-4">
        <h2 class="text-lg font-semibold">Story Map</h2>
        <p class="mt-1 text-sm text-stone-500">
            Jump to any chapter or question
        </p>

        <div class="mt-4 space-y-3">
            <div v-for="chapterGroup in chapterTree"
                 :key="chapterGroup.chapter"
                 class="rounded-xl border border-stone-200">
                <button @click="$emit('toggle-chapter', chapterGroup.chapter)"
                        class="flex w-full items-center justify-between px-4 py-3 text-left">
                    <div>
                        <p class="font-medium text-stone-900">
                            {{ chapterGroup.chapter }}
                        </p>
                        <p class="text-xs text-stone-500">
                            {{ chapterGroup.completedCount }} / {{ chapterGroup.count }} complete
                        </p>
                    </div>

                    <span class="text-sm text-stone-500">
                        {{ isChapterOpen(chapterGroup.chapter) ? '−' : '+' }}
                    </span>
                </button>

                <div v-if="isChapterOpen(chapterGroup.chapter)"
                     class="border-t border-stone-200 px-2 py-2">
                    <button v-for="question in chapterGroup.questions"
                            :key="question.id"
                            @click="$emit('go-to-section', question.index)"
                            class="mb-1 flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-stone-100"
                            :class="question.index === currentSectionIndex ? 'bg-stone-100 font-medium' : ''">
                        <span class="pr-3">
                            {{ question.index + 1 }}. {{ question.question }}
                        </span>

                        <span class="shrink-0 text-xs"
                              :class="question.isCompleted ? 'text-green-600' : 'text-stone-400'">
                            {{ question.isCompleted ? '✓' : '○' }}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
    import type { StoryChapterGroup } from '../../types/story'

    defineProps<{
    chapterTree: StoryChapterGroup[]
    currentSectionIndex: number
    isChapterOpen: (chapter: string) => boolean
    }>()

    defineEmits<{
    (e: 'toggle-chapter', chapter: string): void
    (e: 'go-to-section', index: number): void
    }>()
</script>