<template>
  <div class="w-screen h-[500px]">
    <Aurora :colorStops="colorStops" :speed="speed" />
  </div>
</template>
<script setup>
  import Aurora from '@/components/Aurora.vue'
  import { ref } from 'vue'
  const colorStops = ref(['#3A29FF', '#FF94B4', '#FF3232'])
  const speed = ref(1)
</script>
