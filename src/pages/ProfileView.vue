<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { logout as logoutAPI } from '@/api/auth'
import { updateUserProfile } from '@/api/user'
import type { FitnessGoal, TrainingExperience } from '@/types'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const { id, initials, name } = storeToRefs(userStore)

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

const saveLoading = ref(false)
const saveError = ref('')
const saveSuccess = ref('')

async function saveProfile() {
  saveError.value = ''
  saveSuccess.value = ''

  const heightCm = Number(form.heightCm)
  const weightKg = Number(form.weightKg)
  const monthlyFoodBudget = Number(form.monthlyFoodBudget)

  if (!Number.isFinite(heightCm) || heightCm < 80 || heightCm > 260) {
    saveError.value = '请输入有效的身高（80-260 cm）。'
    return
  }

  if (!Number.isFinite(weightKg) || weightKg < 20 || weightKg > 300) {
    saveError.value = '请输入有效的体重（20-300 kg）。'
    return
  }

  if (form.trainingExperience.length === 0) {
    saveError.value = '请至少选择一项运动经验。'
    return
  }

  if (!form.fitnessGoal) {
    saveError.value = '请选择目标。'
    return
  }

  if (!Number.isFinite(monthlyFoodBudget) || monthlyFoodBudget < 100) {
    saveError.value = '请输入有效的每月饮食费上限（至少 100）。'
    return
  }

  saveLoading.value = true

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

    saveSuccess.value = '资料已更新。'
  } catch (error) {
    if (error instanceof Error && error.message) {
      saveError.value = error.message
      return
    }

    saveError.value = '保存失败，请稍后重试。'
  } finally {
    saveLoading.value = false
  }
}

async function logout() {
  try {
    if (userStore.token) {
      await logoutAPI()
    }
  } catch (error) {
    console.warn('Logout request failed, clearing local session anyway.', error)
  } finally {
    userStore.clearUser()
  }

  await router.push('/login')
}
</script>

<template>
  <section class="page">
    <div class="page-header">
      <div>
        <p class="eyebrow">Profile</p>
        <h2>用户资料</h2>
      </div>
    </div>

    <section class="panel profile-panel">
      <div class="profile-avatar" aria-hidden="true">
        {{ initials || 'U' }}
      </div>

      <div class="profile-details">
        <p class="label">Current user</p>
        <h3>{{ name || 'Guest' }}</h3>
        <p class="subtle-text">User ID: {{ id || 'not signed in' }}</p>
      </div>
    </section>

    <section class="panel form-panel">
      <h3 class="section-title">基础资料（可随时修改）</h3>
      <form class="profile-form" @submit.prevent="saveProfile">
        <label class="field-label" for="profile-height">身高 (cm)</label>
        <input id="profile-height" v-model="form.heightCm" inputmode="decimal" required />

        <label class="field-label" for="profile-weight">体重 (kg)</label>
        <input id="profile-weight" v-model="form.weightKg" inputmode="decimal" required />

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
            <input v-model="form.fitnessGoal" type="radio" name="profile-goal" :value="option.value" />
            <span>{{ option.label }}</span>
          </label>
        </fieldset>

        <label class="field-label" for="profile-budget">每月饮食费上限</label>
        <input id="profile-budget" v-model="form.monthlyFoodBudget" inputmode="numeric" required />

        <p v-if="saveError" class="error-message">{{ saveError }}</p>
        <p v-if="saveSuccess" class="success-message">{{ saveSuccess }}</p>

        <button type="submit" :disabled="saveLoading">
          {{ saveLoading ? '保存中...' : '保存资料' }}
        </button>
      </form>
    </section>

    <section class="panel">
      <button type="button" class="danger-button" @click="logout">Log out</button>
    </section>
  </section>
</template>

<style scoped>
.profile-panel {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.profile-avatar {
  display: grid;
  flex: 0 0 auto;
  width: 4rem;
  height: 4rem;
  place-items: center;
  border-radius: 999px;
  color: #ffffff;
  background: #1f6f63;
  font-size: 1.35rem;
  font-weight: 800;
}

.profile-details h3 {
  margin: 0;
  font-size: 1.35rem;
}

.form-panel {
  max-width: 720px;
}

.section-title {
  margin-top: 0;
}

.profile-form {
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

.danger-button {
  border-color: #b42318;
  background: #b42318;
}
</style>
