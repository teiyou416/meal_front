<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div>
        <p class="eyebrow">Meal Calendar</p>
        <h1>AI 饮食工作台</h1>
      </div>

      <nav class="nav-list" aria-label="主导航">
        <RouterLink to="/">统一页面</RouterLink>
      </nav>
    </aside>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>
