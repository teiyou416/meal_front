<script setup lang="ts">
import type { AIRecommendation } from '../../types/aiRecommendation'

defineProps<{
  recommendation: AIRecommendation
  isAccepting?: boolean
}>()

const emit = defineEmits<{
  accept: [recommendation: AIRecommendation]
}>()
</script>

<template>
  <article class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-300">
    <div class="mb-3 flex items-start justify-between gap-3">
      <div>
        <h3 class="text-base font-semibold text-slate-950">
          {{ recommendation.name }}
        </h3>
        <p class="mt-1 text-xs font-medium text-emerald-700">
          {{ recommendation.confidence }}% match
        </p>
      </div>

      <button
        class="shrink-0 rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        type="button"
        :disabled="isAccepting"
        @click="emit('accept', recommendation)"
      >
        {{ isAccepting ? 'Saving' : 'Accept as Dinner' }}
      </button>
    </div>

    <div class="mb-3 flex flex-wrap gap-2">
      <span
        v-for="tag in recommendation.tags"
        :key="tag"
        class="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800"
      >
        {{ tag }}
      </span>
    </div>

    <p class="text-sm leading-6 text-slate-600">
      {{ recommendation.reason }}
    </p>

    <dl class="mt-4 grid grid-cols-4 gap-2 text-center">
      <div class="rounded-md bg-slate-50 px-2 py-2">
        <dt class="text-xs text-slate-500">kcal</dt>
        <dd class="text-sm font-semibold text-slate-950">{{ recommendation.calories }}</dd>
      </div>
      <div class="rounded-md bg-slate-50 px-2 py-2">
        <dt class="text-xs text-slate-500">Protein</dt>
        <dd class="text-sm font-semibold text-slate-950">{{ recommendation.protein }}g</dd>
      </div>
      <div class="rounded-md bg-slate-50 px-2 py-2">
        <dt class="text-xs text-slate-500">Carbs</dt>
        <dd class="text-sm font-semibold text-slate-950">{{ recommendation.carbs }}g</dd>
      </div>
      <div class="rounded-md bg-slate-50 px-2 py-2">
        <dt class="text-xs text-slate-500">Fat</dt>
        <dd class="text-sm font-semibold text-slate-950">{{ recommendation.fat }}g</dd>
      </div>
    </dl>
  </article>
</template>

