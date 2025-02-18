<template>
  <div :style="{ width: '100%', height: '600px', position: 'relative' }">
    <Waves :lineColor="lineColor" :backgroundColor="backgroundColor" :waveSpeedX="waveSpeedX" :waveSpeedY="waveSpeedY" :waveAmpX="waveAmpX" :waveAmpY="waveAmpY" :friction="friction" :tension="tension" :maxCursorMove="maxCursorMove" :xGap="xGap" :yGap="yGap" />
  </div>
</template>

<script setup>
  import Waves from '@/components/Waves.vue'
  import { ref } from 'vue'
  const lineColor = ref('#fff')
  const backgroundColor = ref('rgba(255, 255, 255, 0.2)')
  const waveSpeedX = ref(0.02)
  const waveSpeedY = ref(0.01)
  const waveAmpX = ref(40)
  const waveAmpY = ref(20)
  const friction = ref(0.9)
  const tension = ref(0.01)
  const maxCursorMove = ref(120)
  const xGap = ref(12)
  const yGap = ref(36)
</script>
