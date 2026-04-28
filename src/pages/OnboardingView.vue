<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { updateUserProfile } from '@/api/user'
import type { FitnessGoal, TrainingExperience } from '@/types'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const trainingOptions: Array<{ value: TrainingExperience; label: string }> = [
  { value: 'fitness', label: '健身' },
  { value: 'yoga', label: '瑜伽' },
  { value: 'pilates', label: '普拉提' },
  { value: 'climbing', label: '攀岩' },
]

const goalOptions: Array<{ value: FitnessGoal; label: string }> = [
  { value: 'lose_weight', label: '减重' },
  { value: 'build_muscle', label: '增肌' },
  { value: 'maintain_shape', label: '维持身材' },
]

const form = reactive({
  heightCm: userStore.heightCm ? String(userStore.heightCm) : '',
  weightKg: userStore.weightKg ? String(userStore.weightKg) : '',
  trainingExperience: [...userStore.trainingExperience] as TrainingExperience[],
  fitnessGoal: (userStore.fitnessGoal ?? '') as FitnessGoal | '',
  monthlyFoodBudget: userStore.monthlyFoodBudget ? String(userStore.monthlyFoodBudget) : '',
})

const loading = ref(false)
const errorMessage = ref('')
const infoMessage = ref('')

async function submitQuestionnaire() {
  errorMessage.value = ''
  infoMessage.value = ''

  const heightCm = Number(form.heightCm)
  const weightKg = Number(form.weightKg)
  const monthlyFoodBudget = Number(form.monthlyFoodBudget)

  if (!Number.isFinite(heightCm) || heightCm < 80 || heightCm > 260) {
    errorMessage.value = '请输入有效的身高（80-260 cm）。'
    return
  }

  if (!Number.isFinite(weightKg) || weightKg < 20 || weightKg > 300) {
    errorMessage.value = '请输入有效的体重（20-300 kg）。'
    return
  }

  if (form.trainingExperience.length === 0) {
    errorMessage.value = '请至少选择一项运动经验。'
    return
  }

  if (!form.fitnessGoal) {
    errorMessage.value = '请选择目标。'
    return
  }

  if (!Number.isFinite(monthlyFoodBudget) || monthlyFoodBudget < 100) {
    errorMessage.value = '请输入有效的每月饮食费上限（至少 100）。'
    return
  }

  loading.value = true

  try {
    await updateUserProfile({
      height_cm: heightCm,
      weight_kg: weightKg,
      training_experience: form.trainingExperience,
      fitness_goal: form.fitnessGoal,
      monthly_food_budget: monthlyFoodBudget,
    })

    userStore.updateQuestionnaire({
      heightCm,
      weightKg,
      trainingExperience: form.trainingExperience,
      fitnessGoal: form.fitnessGoal,
      monthlyFoodBudget,
    })

    await router.push('/profile')
  } catch (error) {
    if (shouldFallbackToLocal(error)) {
      userStore.updateQuestionnaire({
        heightCm,
        weightKg,
        trainingExperience: form.trainingExperience,
        fitnessGoal: form.fitnessGoal,
        monthlyFoodBudget,
      })

      infoMessage.value = '后端资料接口暂不可用，已先保存到本地。后端恢复后可在 Profile 页再次保存到数据库。'
      await router.push('/profile')
      return
    }

    if (error instanceof Error && error.message) {
      errorMessage.value = error.message
      return
    }

    errorMessage.value = '提交失败，请稍后重试。'
  } finally {
    loading.value = false
  }
}

function shouldFallbackToLocal(error: unknown) {
  if (!(error instanceof Error)) {
    return false
  }

  return (
    error.message.includes('status code 404') ||
    error.message.includes('status code 500') ||
    error.message.includes('Network Error')
  )
}
</script>

<template>
  <section class="page">
    <div class="page-header">
      <div>
        <p class="eyebrow">Onboarding</p>
        <h2>完善基础资料</h2>
      </div>
    </div>

    <section class="panel onboarding-panel">
      <p class="subtle-text">注册后请先完成问卷，后续你可以在 Profile 页面继续修改。</p>

      <form class="questionnaire-form" @submit.prevent="submitQuestionnaire">
        <label class="field-label" for="height-cm">身高 (cm)</label>
        <input id="height-cm" v-model="form.heightCm" inputmode="decimal" placeholder="例如 170" required />

        <label class="field-label" for="weight-kg">体重 (kg)</label>
        <input id="weight-kg" v-model="form.weightKg" inputmode="decimal" placeholder="例如 62" required />

        <fieldset class="checkbox-group">
          <legend class="field-label">运动经验（可多选）</legend>
          <label v-for="option in trainingOptions" :key="option.value" class="checkbox-row">
            <input v-model="form.trainingExperience" type="checkbox" :value="option.value" />
            <span>{{ option.label }}</span>
          </label>
        </fieldset>

        <fieldset class="radio-group">
          <legend class="field-label">目标（单选）</legend>
          <label v-for="option in goalOptions" :key="option.value" class="checkbox-row">
            <input v-model="form.fitnessGoal" type="radio" name="fitness-goal" :value="option.value" />
            <span>{{ option.label }}</span>
          </label>
        </fieldset>

        <label class="field-label" for="monthly-budget">每月饮食费上限</label>
        <input
          id="monthly-budget"
          v-model="form.monthlyFoodBudget"
          inputmode="numeric"
          placeholder="例如 2500"
          required
        />

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="infoMessage" class="success-message">{{ infoMessage }}</p>

        <button type="submit" :disabled="loading">
          {{ loading ? '提交中...' : '提交并保存资料' }}
        </button>
      </form>
    </section>
  </section>
</template>

<style scoped>
.onboarding-panel {
  max-width: 720px;
}

.questionnaire-form {
  display: grid;
  gap: 0.85rem;
}

.field-label {
  color: #344254;
  font-weight: 600;
}

.checkbox-group,
.radio-group {
  display: grid;
  gap: 0.45rem;
  margin: 0;
  border: 1px solid #d8dee6;
  border-radius: 8px;
  padding: 0.8rem;
}

.checkbox-row {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.checkbox-row input {
  width: 1rem;
  height: 1rem;
}

.subtle-text {
  margin-top: 0;
  color: #5c6a78;
}

.error-message {
  margin: 0;
  color: #b42318;
  font-size: 0.9rem;
  font-weight: 600;
}

.success-message {
  margin: 0;
  color: #0b6e4f;
  font-size: 0.9rem;
  font-weight: 600;
}
</style>
