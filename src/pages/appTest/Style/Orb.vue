<template>
  <div style="width: 100%; height: 600px; position: relative">
    <Orb :hoverIntensity="hoverIntensity" :rotateOnHover="rotateOnHover" :hue="hue" :forceHoverState="forceHoverState" />
  </div>
</template>

<script setup>
  import Orb from '@/components/Orb.vue'
  import { ref } from 'vue'
  const hoverIntensity = ref(0.5)
  const rotateOnHover = ref(true)
  const hue = ref(0)
  const forceHoverState = ref(false)
</script>
