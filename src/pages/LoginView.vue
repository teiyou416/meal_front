<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

async function login() {
  userStore.loginAsDemoUser()
  await router.push('/')
}
</script>

<template>
  <section class="login-page">
    <div class="login-panel">
      <p class="eyebrow">Login Placeholder</p>
      <h2>Sign in to Meal App</h2>
      <p class="subtle-text">
        No backend server is connected yet. Use the demo account to continue testing the frontend flow.
      </p>

      <button type="button" @click="login">Use demo account</button>
    </div>
  </section>
</template>

<style scoped>
.login-page {
  display: grid;
  min-height: calc(100vh - 8rem);
  place-items: center;
}

.login-panel {
  width: min(100%, 420px);
  border: 1px solid #d8dee6;
  border-radius: 8px;
  background: #ffffff;
  padding: 1.4rem;
}

.login-panel h2 {
  margin: 0 0 0.7rem;
}

.login-panel button {
  width: 100%;
  margin-top: 1.2rem;
}
</style>
