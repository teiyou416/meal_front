<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const { allergies, dietaryPreferences, id, initials, name } = storeToRefs(userStore)

async function logout() {
  userStore.clearUser()
  await router.push('/login')
}
</script>

<template>
  <section class="page">
    <div class="page-header">
      <div>
        <p class="eyebrow">Profile</p>
        <h2>Personal Home</h2>
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

    <div class="content-grid">
      <section class="panel">
        <p class="label">Allergies</p>
        <strong>{{ allergies.length ? allergies.join(', ') : 'Not set' }}</strong>
      </section>

      <section class="panel">
        <p class="label">Diet preferences</p>
        <strong>{{ dietaryPreferences.length ? dietaryPreferences.join(', ') : 'Not set' }}</strong>
      </section>
    </div>

    <section class="panel">
      <p class="subtle-text">This page is frontend-only for now. It can connect to the real user API later.</p>
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

.danger-button {
  margin-top: 1rem;
  border-color: #b42318;
  background: #b42318;
}
</style>
