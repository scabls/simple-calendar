<template>
  <div class="calendar">
    <CalendarHeader />
    <CalendarMain />
    <CalendarFooter />
  </div>
</template>

<script setup>
import CalendarHeader from './components/CalendarHeader.vue'
import CalendarMain from './components/CalendarMain.vue'
import CalendarFooter from './components/CalendarFooter.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.calendar {
  width: 560px;
  padding-bottom: 20px;
  margin: 16px auto;
  border-width: 1px;
  color: #333;
  font-size: 13px;
  line-height: 21px;
  word-wrap: break-word;
  word-break: break-all;
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
}
</style>
