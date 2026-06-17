<script setup lang="ts">
import { ref, watch } from 'vue'
import { supabase } from '../../lib/supabase'
import type { StoryProfile, StoryProfileInput } from '../../types/story'

const props = defineProps<{
  open: boolean
  projectId: string
}>()

const emit = defineEmits<{
  close: []
  saved: [profile: StoryProfile]
}>()

const isSaving = ref(false)
const error = ref('')

const form = ref<StoryProfileInput>({
  project_id: props.projectId,
  full_name: '',
  date_of_birth: '',
  birth_place: '',
  occupation: '',
  father_name: '',
  mother_name: '',
  spouse_name: '',
  children_names: '',
  siblings_names: '',
})

async function loadExisting() {
  error.value = ''
  const { data, error: fetchError } = await supabase
    .from('story_profiles')
    .select('*')
    .eq('project_id', props.projectId)
    .maybeSingle()

  if (fetchError) {
    console.error('Failed to load story profile:', fetchError)
    return
  }

  if (data) {
    form.value = {
      project_id: data.project_id,
      full_name: data.full_name ?? '',
      date_of_birth: data.date_of_birth ?? '',
      birth_place: data.birth_place ?? '',
      occupation: data.occupation ?? '',
      father_name: data.father_name ?? '',
      mother_name: data.mother_name ?? '',
      spouse_name: data.spouse_name ?? '',
      children_names: data.children_names ?? '',
      siblings_names: data.siblings_names ?? '',
    }
  }
}

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      loadExisting()
    }
  }
)

async function save() {
  isSaving.value = true
  error.value = ''

  try {
    const payload = {
      project_id: props.projectId,
      full_name: form.value.full_name?.trim() || null,
      date_of_birth: form.value.date_of_birth || null,
      birth_place: form.value.birth_place?.trim() || null,
      occupation: form.value.occupation?.trim() || null,
      father_name: form.value.father_name?.trim() || null,
      mother_name: form.value.mother_name?.trim() || null,
      spouse_name: form.value.spouse_name?.trim() || null,
      children_names: form.value.children_names?.trim() || null,
      siblings_names: form.value.siblings_names?.trim() || null,
    }

    const { data, error: upsertError } = await supabase
      .from('story_profiles')
      .upsert(payload, { onConflict: 'project_id' })
      .select()
      .single()

    if (upsertError) throw upsertError

    emit('saved', data as StoryProfile)
    emit('close')
  } catch (err) {
    console.error('Failed to save story profile:', err)
    error.value = 'Something went wrong saving these details. Please try again.'
  } finally {
    isSaving.value = false
  }
}

function close() {
  emit('close')
}
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    @click.self="close"
  >
    <div class="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-stone-800">About this person</h2>
        <button
          class="text-stone-400 hover:text-stone-600"
          @click="close"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <p class="mb-5 text-sm text-stone-500">
        This appears as the opening page of the book, before the first chapter. All fields are optional.
      </p>

      <div class="space-y-4">
        <div>
          <label class="mb-1 block text-sm font-medium text-stone-700">Full name</label>
          <input
            v-model="form.full_name"
            type="text"
            class="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
            placeholder="e.g. Dorothy Eleanor Whitfield"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="mb-1 block text-sm font-medium text-stone-700">Date of birth</label>
            <input
              v-model="form.date_of_birth"
              type="date"
              class="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
            />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-stone-700">Birth place</label>
            <input
              v-model="form.birth_place"
              type="text"
              class="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
              placeholder="e.g. Harrogate, Yorkshire"
            />
          </div>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-stone-700">Occupation</label>
          <input
            v-model="form.occupation"
            type="text"
            class="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
            placeholder="e.g. Schoolteacher"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="mb-1 block text-sm font-medium text-stone-700">Father's name</label>
            <input
              v-model="form.father_name"
              type="text"
              class="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
            />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-stone-700">Mother's name</label>
            <input
              v-model="form.mother_name"
              type="text"
              class="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-stone-700">Spouse's name</label>
          <input
            v-model="form.spouse_name"
            type="text"
            class="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-stone-700">Children's names</label>
          <input
            v-model="form.children_names"
            type="text"
            class="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
            placeholder="e.g. James, Sarah, Michael"
          />
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-stone-700">Siblings' names</label>
          <input
            v-model="form.siblings_names"
            type="text"
            class="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none"
            placeholder="e.g. Peter, Geoffrey"
          />
        </div>
      </div>

      <p v-if="error" class="mt-4 text-sm text-red-600">{{ error }}</p>

      <div class="mt-6 flex justify-end gap-3">
        <button
          class="rounded-md px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-100"
          @click="close"
        >
          Cancel
        </button>
        <button
          class="rounded-md bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 disabled:opacity-50"
          :disabled="isSaving"
          @click="save"
        >
          {{ isSaving ? 'Saving...' : 'Save details' }}
        </button>
      </div>
    </div>
  </div>
</template>