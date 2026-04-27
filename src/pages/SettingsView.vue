<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { name, allergies, dietaryPreferences } = storeToRefs(userStore)
</script>

<template>
  <section class="page">
    <div class="page-header">
      <div>
        <p class="eyebrow">Settings</p>
        <h2>偏好设置</h2>
      </div>
    </div>

    <div class="content-grid">
      <section class="panel">
        <p class="label">用户</p>
        <strong>{{ name }}</strong>
      </section>

      <section class="panel">
        <p class="label">过敏信息</p>
        <strong>{{ allergies.length ? allergies.join(', ') : '未设置' }}</strong>
      </section>

      <section class="panel">
        <p class="label">饮食偏好</p>
        <strong>{{ dietaryPreferences.length ? dietaryPreferences.join(', ') : '未设置' }}</strong>
      </section>
    </div>
  </section>
</template>
