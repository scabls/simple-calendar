import { ref, computed } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useCalendarStore = defineStore('calendar', () => {
  const selectedYear = ref(0)
  const selectedMonth = ref(0)
  const selectedDay = ref(0)

  const changeYear = year => (selectedYear.value = year)
  const changeMonth = month => (selectedMonth.value = month)
  const changeDay = day => (selectedDay.value = day)

  const formatDate = computed(
    () => `${selectedYear.value}-${selectedMonth.value}-${selectedDay.value}`
  )

  const changeYMD = (year, month, day) => {
    selectedYear.value = year
    selectedMonth.value = month
    selectedDay.value = day
  }
  const switchPage = newMonth => {
    switch (newMonth) {
      case 13:
        if (selectedYear.value == 2050 && selectedMonth.value == 12) return
        changeYMD(selectedYear.value + 1, 1, selectedDay.value)
        break
      case 0:
        if (selectedYear.value == 1900 && selectedMonth.value == 1) return
        changeYMD(selectedYear.value - 1, 12, selectedDay.value)
        break
      default:
        changeMonth(newMonth)
        break
    }
  }
  return {
    selectedYear,
    selectedMonth,
    selectedDay,
    formatDate,
    changeYear,
    changeMonth,
    changeDay,
    changeYMD,
    switchPage,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCalendarStore, import.meta.hot))
}
