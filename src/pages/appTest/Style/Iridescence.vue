<template>
  <div class="w-screen h-[500px]">
    <Iridescence :color="color" :mouseReact="mouseReact" :amplitude="amplitude" :speed="speed" />
  </div>
</template>
<script setup>
  import Iridescence from '@/components/Iridescence.vue'
  import { ref } from 'vue'
  const color = ref([1, 1, 1])
  const mouseReact = ref(false)
  const amplitude = ref(0.1)
  const speed = ref(1.0)
</script>
