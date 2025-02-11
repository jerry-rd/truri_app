<template>
  <div class="relative pb-10">
    <video class="max-h-screen" src="@/assets/video/冬景.mp4" id="player" controls data-plyr-config='{ "title": "12321" }'></video>
  </div>
</template>

<script setup>
  import Plyr from 'plyr'
  import { onMounted } from 'vue'
  onMounted(() => {
    const player = new Plyr('#player')
  })
</script>
<style scoped>
  @import url('https://cdn.plyr.io/3.7.8/plyr.css');
</style>
