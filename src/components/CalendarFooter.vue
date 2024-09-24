<template>
  <footer class="calendar-bottom">
    <div class="left">
      <h2>{{ data.lunar }}</h2>
      <h3>{{ data.lunarYear }} {{ data.animalsYear }}</h3>
    </div>
    <div class="right">{{ data.avoid }}</div>
  </footer>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { getToDayApi } from '@/api/calendar'
import { storeToRefs } from 'pinia'
import { useCalendarStore } from '@/stores/calendar'

const { formatDate } = storeToRefs(useCalendarStore())

const data = ref({})
const updateData = async () => {
  data.value = (await getToDayApi(formatDate.value)).result.data
}

watch(formatDate, () => updateData())

onMounted(() => updateData())
</script>

<style lang="scss" scoped>
.calendar-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 20px 0;
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
