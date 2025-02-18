<template>
  <div class="w-screen h-[500px]">
    <Balatro :isRotate="isRotate" :mouseInteraction="mouseInteraction" :pixelFilter="pixelFilter" />
  </div>
</template>
<script setup>
  import Balatro from '@/components/Balatro.vue'
  import { ref } from 'vue'
  const isRotate = ref(false)
  const mouseInteraction = ref(true)
  const pixelFilter = ref(700)
</script>
