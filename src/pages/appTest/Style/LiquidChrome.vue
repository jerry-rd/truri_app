<template>
  <div :style="{ width: '100%', height: '600px', position: 'relative' }">
    <LiquidChrome :baseColor="baseColor" :speed="speed" :amplitude="amplitude" :interactive="interactive" />
  </div>
</template>

<script setup>
  import LiquidChrome from '@/components/LiquidChrome.vue'
  import { ref } from 'vue'
  const baseColor = ref([0.1, 0.1, 0.1])
  const speed = ref(1)
  const amplitude = ref(0.6)
  const interactive = ref(true)
</script>
