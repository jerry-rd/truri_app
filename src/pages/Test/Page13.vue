<template>
  <div class="flex justify-center items-center mt-32">
    <Magnifier :imageSrc="imageSrc" style="height: 100px; width: 100px" />
  </div>
</template>

<script>
  import Magnifier from '@/components/Magnifier.vue'
  import imageSrc from '@/assets/image/icon1024.png'
  export default {
    components: {
      Magnifier,
    },
    data() {
      return {
        imageSrc,
      }
    },
  }
</script>
