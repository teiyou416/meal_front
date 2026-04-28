<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div>
        <p class="eyebrow">Meal Calendar</p>
        <h1>AI 饮食日历</h1>
      </div>

      <nav class="nav-list" aria-label="主导航">
        <RouterLink to="/">总览</RouterLink>
        <RouterLink to="/meals">饮食记录</RouterLink>
        <RouterLink to="/recommendation">今日推荐</RouterLink>
        <RouterLink to="/settings">偏好设置</RouterLink>
      </nav>
    </aside>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>
