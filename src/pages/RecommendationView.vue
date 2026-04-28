<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useDateStore } from '@/stores/date'

const { selectedDate } = storeToRefs(useDateStore())
</script>

<template>
  <section class="page">
    <div class="page-header">
      <div>
        <p class="eyebrow">AI Recommendation</p>
        <h2>今日推荐</h2>
      </div>
    </div>

    <section class="panel">
      <p class="label">推荐日期</p>
      <strong>{{ selectedDate }}</strong>
    </section>
  </section>
</template>
