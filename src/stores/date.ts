import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10)
}

export const useDateStore = defineStore('date', () => {
  const selectedDate = ref(toDateInputValue(new Date()))

  const selectedMonth = computed(() => selectedDate.value.slice(0, 7))

  function setSelectedDate(date: string) {
    selectedDate.value = date
  }

  function goToday() {
    selectedDate.value = toDateInputValue(new Date())
  }

  return {
    selectedDate,
    selectedMonth,
    setSelectedDate,
    goToday,
  }
})
