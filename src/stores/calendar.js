import { getCurrentDate, initList } from '@/utils'
import { ref, computed } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useCalendarStore = defineStore('calendar', () => {
  const currentDate = getCurrentDate()
  const selectedDate = ref(currentDate)

  const year = computed({
    get: () => selectedDate.value.year,
    set: value => (selectedDate.value.year = value),
  })
  const month = computed({
    get: () => selectedDate.value.month,
    set: value => (selectedDate.value.month = value),
  })
  const date = computed({
    get: () => selectedDate.value.date,
    set: value => (selectedDate.value.date = value),
  })
  const list = computed(() => initList(year.value, month.value))
  const formatDate = computed(() => {
    return `${year.value}-${month.value}-${date.value}`
  })

  const lastMonth = () => {
    if (year.value === 1900 && month.value === 1) return
    month.value--
    if (month.value === 0) {
      year.value--
      month.value = 12
    }
  }
  const nextMonth = () => {
    if (year.value === 2050 && month.value === 12) return
    month.value++
    if (month.value === 13) {
      year.value++
      month.value = 1
    }
  }
  const backToToday = () => (selectedDate.value = getCurrentDate())
  return { year, month, date, list, formatDate, lastMonth, nextMonth, backToToday }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCalendarStore, import.meta.hot))
}
