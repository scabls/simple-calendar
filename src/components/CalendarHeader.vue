<template>
  <header class="header">
    <div class="date-select">
      <select :value="selectedYear" @change="changeYear(Number($event.target.value))">
        <option v-for="year in years" :key="year" :value="year">{{ year }}年</option>
      </select>
      <span @click="switchPage(selectedMonth - 1)">◀️</span>
      <select :value="selectedMonth" @change="changeMonth(Number($event.target.value))">
        <option v-for="month in months" :key="month" :value="month">{{ month }}月</option>
      </select>
      <span @click="switchPage(selectedMonth + 1)">▶️</span>
    </div>
    <div class="today">
      <button @click="handleToday">今天</button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { getNumberArray, getCurrentDate } from '@/utils/index'
import { useCalendarStore } from '@/stores/calendar'
const { selectedYear, selectedMonth } = storeToRefs(useCalendarStore())
const { changeYear, changeMonth, changeYMD, switchPage } = useCalendarStore()

const years = ref(getNumberArray(1900, 2050))
const months = ref(getNumberArray(1, 12))

const handleToday = () => {
  const { year, month, date } = getCurrentDate()
  changeYMD(year, month, date)
}
onMounted(() => handleToday())
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-around;
  height: 70px;
  padding: 10px;
  background-color: #e7e9f1;
  border-radius: 16px 16px 0 0;
  .date-select {
    color: #333;
    select {
      padding: 4px 10px;
      border: 1px solid #eee;
      border-radius: 6px;
    }
    span {
      padding: 4px 10px;
      user-select: none;
      cursor: pointer;
    }
  }
  .today {
    button {
      padding: 4px 20px;
      border: none;
      background-color: #fff;
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
