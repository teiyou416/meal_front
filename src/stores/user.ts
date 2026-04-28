import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { User } from '@/types'

export const useUserStore = defineStore('user', () => {
  const id = ref('')
  const name = ref('Demo User')
  const token = ref('')
  const allergies = ref<string[]>([])
  const dietaryPreferences = ref<string[]>([])

  const isLoggedIn = computed(() => Boolean(token.value))

  function setUser(user: User) {
    id.value = user.id
    name.value = user.name
    token.value = user.token ?? ''
    allergies.value = user.allergies
    dietaryPreferences.value = user.dietaryPreferences
  }

  function clearUser() {
    id.value = ''
    name.value = ''
    token.value = ''
    allergies.value = []
    dietaryPreferences.value = []
  }

  return {
    id,
    name,
    token,
    allergies,
    dietaryPreferences,
    isLoggedIn,
    setUser,
    clearUser,
  }
})
