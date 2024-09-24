<template>
  <main class="calendar-list">
    <div class="list-header">
      <span>一</span>
      <span>二</span>
      <span>三</span>
      <span>四</span>
      <span>五</span>
      <span>六</span>
      <span>日</span>
    </div>
    <div class="list-body">
      <span
        v-for="(day, index) in days"
        :key="index"
        :class="{
          off: day.type != 'current',
          active: day.date == selectedDay && day.type == 'current',
        }"
        @click="handleClick(day)"
      >
        {{ day.date }}
      </span>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { getListItems } from '@/utils/index'
import { useCalendarStore } from '@/stores/calendar'

const { selectedYear, selectedMonth, selectedDay } = storeToRefs(useCalendarStore())
const { changeDay, switchPage } = useCalendarStore()

const days = ref([])
const updateDays = () => {
  days.value = getListItems(selectedYear.value, selectedMonth.value)
}
const handleClick = day => {
  switch (day.type) {
    case 'prev':
      switchPage(selectedMonth.value - 1)
      break
    case 'next':
      switchPage(selectedMonth.value + 1)
      break
    default:
      changeDay(day.date)
      break
  }
}
watchEffect(() => updateDays())
onMounted(() => {
  updateDays()
})
</script>

<style lang="scss" scoped>
.calendar-list {
  margin-top: -20px;
  padding: 20px;
  height: 440px;
  background-color: #fff;
  border-radius: 16px;
  .list-header {
    display: flex;
    gap: 20px;
    span {
      flex: 1;
      padding: 10px 0;
      text-align: center;
      &:nth-child(7n),
      &:nth-child(7n + 6) {
        color: #f11;
      }
    }
  }
  .list-body {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    gap: 20px;
    height: 400px;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      font-weight: bold;
      border-radius: 12px;
      &:hover {
        background-color: #eef0fd;
        cursor: pointer;
      }
      &.off {
        color: #898787;
        opacity: 0.5;
      }
      &:nth-child(7n),
      &:nth-child(7n + 6) {
        color: #f11;
      }
      &.active {
        background-color: #556dea;
        color: #fff;
      }
    }
  }
}
</style>
