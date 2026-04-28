import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { User } from '@/types'

export const useUserStore = defineStore('user', () => {
  const isLoggedOut = localStorage.getItem('meal_app_logged_out') === 'true'
  const id = ref(isLoggedOut ? '' : (localStorage.getItem('meal_app_user_id') ?? 'demo-user'))
  const name = ref(isLoggedOut ? '' : (localStorage.getItem('meal_app_user_name') ?? 'Demo User'))
  const token = ref(isLoggedOut ? '' : (localStorage.getItem('meal_app_token') ?? 'demo-token'))
  const allergies = ref<string[]>([])
  const dietaryPreferences = ref<string[]>([])

  const isLoggedIn = computed(() => Boolean(token.value))
  const initials = computed(() =>
    name.value
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase(),
  )

  function setUser(user: User) {
    id.value = user.id
    name.value = user.name
    token.value = user.token ?? ''
    allergies.value = user.allergies
    dietaryPreferences.value = user.dietaryPreferences

    localStorage.setItem('meal_app_user_id', id.value)
    localStorage.setItem('meal_app_user_name', name.value)
    localStorage.setItem('meal_app_token', token.value)
    localStorage.removeItem('meal_app_logged_out')
  }

  function loginAsDemoUser() {
    setUser({
      id: 'demo-user',
      name: 'Demo User',
      token: 'demo-token',
      allergies: [],
      dietaryPreferences: ['balanced meals'],
    })
  }

  function clearUser() {
    id.value = ''
    name.value = ''
    token.value = ''
    allergies.value = []
    dietaryPreferences.value = []

    localStorage.removeItem('meal_app_user_id')
    localStorage.removeItem('meal_app_user_name')
    localStorage.removeItem('meal_app_token')
    localStorage.setItem('meal_app_logged_out', 'true')
  }

  return {
    id,
    name,
    token,
    allergies,
    dietaryPreferences,
    isLoggedIn,
    initials,
    setUser,
    loginAsDemoUser,
    clearUser,
  }
})
