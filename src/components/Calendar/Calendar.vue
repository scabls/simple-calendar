<template>
  <div class="calendar">
    <CalendarHeadr />
    <CalendarMain />
    <CalendarFooter />
  </div>
</template>

<script setup>
import CalendarHeadr from './CalendarHeadr.vue'
import CalendarMain from './CalendarMain.vue'
import CalendarFooter from './CalendarFooter.vue'
</script>
<style lang="scss" scoped>
.calendar {
  width: 560px;
  margin: 50px auto;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba($color: #000000, $alpha: 0.08);
  overflow: hidden;
}
</style>
