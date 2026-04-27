<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import RecommendationCard from './RecommendationCard.vue'
import RecommendationSkeleton from './RecommendationSkeleton.vue'
import {
  acceptRecommendationAsMeal,
  fetchAIRecommendations,
} from '../../services/aiRecommendationApi'
import type { AIRecommendation, CreateMealPayload } from '../../types/aiRecommendation'

const props = withDefaults(
  defineProps<{
    selectedDate?: string
  }>(),
  {
    selectedDate: new Date().toISOString().slice(0, 10),
  },
)

const recommendations = ref<AIRecommendation[]>([])
const isLoading = ref(false)
const errorMessage = ref('')
const acceptingId = ref<string | null>(null)
const successMessage = ref('')

const hasRecommendations = computed(() => recommendations.value.length > 0)

onMounted(() => {
  loadRecommendations()
})

async function loadRecommendations() {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    recommendations.value = await fetchAIRecommendations(props.selectedDate)
  } catch (error) {
    errorMessage.value = 'AI recommendations are unavailable. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

async function handleAccept(recommendation: AIRecommendation) {
  acceptingId.value = recommendation.id
  errorMessage.value = ''
  successMessage.value = ''

  const payload: CreateMealPayload = {
    name: recommendation.name,
    mealType: 'Dinner',
    date: props.selectedDate,
    calories: recommendation.calories,
    protein: recommendation.protein,
    carbs: recommendation.carbs,
    fat: recommendation.fat,
    source: 'ai-recommendation',
    recommendationId: recommendation.id,
  }

  try {
    await acceptRecommendationAsMeal(payload)
    successMessage.value = `${recommendation.name} was added as Dinner.`
  } catch (error) {
    errorMessage.value = 'Could not save this recommendation. Please try again.'
  } finally {
    acceptingId.value = null
  }
}
</script>

<template>
  <section class="w-full bg-slate-50 p-4">
    <div class="mx-auto max-w-4xl">
      <header class="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="text-xs font-semibold uppercase text-emerald-700">AI Decision Dashboard</p>
          <h2 class="mt-1 text-xl font-semibold text-slate-950">Dinner recommendations</h2>
        </div>

        <button
          class="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-400"
          type="button"
          :disabled="isLoading"
          @click="loadRecommendations"
        >
          Refresh
        </button>
      </header>

      <p v-if="successMessage" class="mb-3 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
        {{ successMessage }}
      </p>

      <p v-if="errorMessage" class="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
        {{ errorMessage }}
      </p>

      <Transition name="fade" mode="out-in">
        <RecommendationSkeleton v-if="isLoading" />

        <div v-else-if="hasRecommendations" class="space-y-3">
          <TransitionGroup name="list">
            <RecommendationCard
              v-for="recommendation in recommendations"
              :key="recommendation.id"
              :recommendation="recommendation"
              :is-accepting="acceptingId === recommendation.id"
              @accept="handleAccept"
            />
          </TransitionGroup>
        </div>

        <div v-else class="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center">
          <h3 class="text-base font-semibold text-slate-950">No recommendations yet</h3>
          <p class="mt-1 text-sm text-slate-600">Refresh after adding meals or activities for this date.</p>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active,
.list-enter-active,
.list-leave-active {
  transition: all 180ms ease;
}

.fade-enter-from,
.fade-leave-to,
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>

