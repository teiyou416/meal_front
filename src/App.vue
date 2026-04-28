<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { RouterLink, RouterView } from 'vue-router'

import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { initials, isLoggedIn, name } = storeToRefs(userStore)
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div>
        <p class="eyebrow">Meal Calendar</p>
        <h1>AI Meal Workspace</h1>
      </div>

      <nav class="nav-list" aria-label="Main navigation">
        <RouterLink to="/">Dashboard</RouterLink>
      </nav>
    </aside>

    <main class="main-content">
      <header class="topbar">
        <div>
          <p class="topbar-kicker">Frontend Prototype</p>
          <strong>Meal App</strong>
        </div>

        <RouterLink
          v-if="isLoggedIn"
          class="avatar-link"
          to="/profile"
          aria-label="Open profile page"
          :title="name"
        >
          {{ initials || 'U' }}
        </RouterLink>

        <RouterLink v-else class="login-link" to="/login">Log in</RouterLink>
      </header>

      <RouterView />
    </main>
  </div>
</template>
