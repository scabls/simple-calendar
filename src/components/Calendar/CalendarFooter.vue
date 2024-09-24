<template>
  <footer class="calendar-bottom">
    <aside class="left">
      <h2>{{ result.lunar }}</h2>
      <h3>{{ result.lunarYear }} {{ result.animalsYear }}</h3>
    </aside>
    <aside class="right">
      <div>宜: {{ result.suit }}</div>
      <div>忌: {{ result.avoid }}</div>
    </aside>
  </footer>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCalendarStore } from '@/stores/calendar'
const { formatDate } = storeToRefs(useCalendarStore())
import axios from 'axios'
const result = ref({
  lunar: '',
  lunarYear: '',
  animalsYear: '',
  suit: '',
  avoid: '',
})
const getResult = async formatDate => {
  result.value = await axios
    .get(`/calendar/day?key=55f5a67a3&date=${formatDate}`)
    .then(res => res.data.result.data)
}
watch(formatDate, () => getResult(formatDate.value))
onMounted(() => getResult(formatDate.value))
</script>

<style lang="scss" scoped>
.calendar-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 20px 20px;
  padding: 20px;
  background-color: #f4f5f8;
  border-radius: 16px;
  .left {
    flex: 1;
  }
  .right {
    flex: 3;
  }
}
</style>
