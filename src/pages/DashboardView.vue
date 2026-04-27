<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useDateStore } from '@/stores/date'

const dateStore = useDateStore()
const { selectedDate, selectedMonth } = storeToRefs(dateStore)
</script>

<template>
  <section class="page">
    <div class="page-header">
      <div>
        <p class="eyebrow">Dashboard</p>
        <h2>日历总览</h2>
      </div>

      <div class="toolbar">
        <input
          :value="selectedDate"
          type="date"
          aria-label="选择日期"
          @input="dateStore.setSelectedDate(($event.target as HTMLInputElement).value)"
        />
        <button type="button" @click="dateStore.goToday">今天</button>
      </div>
    </div>

    <div class="content-grid">
      <section class="panel">
        <p class="label">当前月份</p>
        <strong>{{ selectedMonth }}</strong>
      </section>

      <section class="panel">
        <p class="label">当前日期</p>
        <strong>{{ selectedDate }}</strong>
      </section>
    </div>
  </section>
</template>
