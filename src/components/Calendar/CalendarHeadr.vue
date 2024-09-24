<template>
  <header class="calendar-header">
    <aside class="date-select">
      <select v-model="year">
        <option v-for="year in years" :value="year" :key="year">{{ year }}年</option>
      </select>
      <span @click="lastMonth">&lt;</span>
      <select v-model="month">
        <option v-for="month in months" :value="month" :key="month">{{ month }}月</option>
      </select>
      <span @click="nextMonth">&gt;</span>
    </aside>
    <aside class="today">
      <button @click="backToToday">今天</button>
    </aside>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { createYear, createMonths } from '@/utils'
import { useCalendarStore } from '@/stores/calendar'

const { year, month } = storeToRefs(useCalendarStore())
const { lastMonth, nextMonth, backToToday } = useCalendarStore()

const years = ref([])
const months = ref([])

onMounted(() => {
  years.value = createYear()
  months.value = createMonths()
})
</script>

<style lang="scss" scoped>
.calendar-header {
  display: flex;
  justify-content: space-around;
  height: 70px;
  padding: 10px;
  background-color: #eaecf3;
  .date-select {
    color: #333;
    select {
      padding: 4px 10px;
      border: 1px solid #eee;
      border-radius: 6px;
      cursor: pointer;
      user-select: none;
    }
    span {
      padding: 4px 10px;
      cursor: pointer;
      user-select: none;
    }
  }
  .today {
    button {
      padding: 4px 20px;
      background-color: #fff;
      border: none;
      border-radius: 6px;
      &:hover {
        background: rgba(78, 110, 242, 0.1);
        color: #4e6ef2;
        cursor: pointer;
      }
    }
  }
}
</style>
