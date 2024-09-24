<template>
  <main class="calendar-list">
    <section class="list-header">
      <span>一</span>
      <span>二</span>
      <span>三</span>
      <span>四</span>
      <span>五</span>
      <span>六</span>
      <span>日</span>
    </section>
    <section class="list-body">
      <span
        v-for="(item, index) in list"
        :key="index"
        :class="styleObj(item)"
        @click="handleClick(item)"
      >
        {{ item.date }}
      </span>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCalendarStore } from '@/stores/calendar'

const { date, list } = storeToRefs(useCalendarStore())
const { lastMonth, nextMonth } = useCalendarStore()

const styleObj = computed(() => item => ({
  off: item.type !== 'this',
  active: item.date === date.value && item.type === 'this',
}))

const handleClick = item => {
  switch (item.type) {
    case 'last':
      lastMonth()
      break
    case 'next':
      nextMonth()
      break
    default:
      date.value = item.date
  }
}
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
      padding: 10px;
      text-align: center;
      &:nth-child(6),
      &:nth-child(7) {
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
      font-size: 24px;
      font-weight: bold;
      align-content: center;
      text-align: center;
      border-radius: 12px;
      &:nth-child(7n + 6),
      &:nth-child(7n) {
        color: #f11;
      }
      &:hover {
        background-color: rgba(78, 110, 242, 0.1);
        cursor: pointer;
      }
      &.off {
        color: #898787;
        opacity: 0.5;
      }
      &.active {
        background-color: #556dea;
        color: #fff;
      }
    }
  }
}
</style>
