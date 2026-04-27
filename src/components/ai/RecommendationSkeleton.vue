<template>
  <div class="space-y-3">
    <div
      v-for="index in 3"
      :key="index"
      class="overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div class="mb-4 h-5 w-2/3 animate-pulse rounded bg-slate-200"></div>
      <div class="mb-3 flex gap-2">
        <div class="h-6 w-20 animate-pulse rounded-full bg-slate-200"></div>
        <div class="h-6 w-24 animate-pulse rounded-full bg-slate-200"></div>
      </div>
      <div class="space-y-2">
        <div class="h-3 w-full animate-pulse rounded bg-slate-200"></div>
        <div class="h-3 w-5/6 animate-pulse rounded bg-slate-200"></div>
      </div>
      <div class="mt-4 grid grid-cols-4 gap-2">
        <div v-for="metric in 4" :key="metric" class="h-12 animate-pulse rounded bg-slate-100"></div>
      </div>
    </div>
  </div>
</template>

