<template>
  <div class="magnifier-container" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <img :src="imageSrc" class="main-image" />
    <div v-if="showMagnifier" class="magnifier" :style="magnifierStyle"></div>
  </div>
</template>

<script>
  export default {
    props: {
      imageSrc: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        showMagnifier: false,
        magnifierStyle: {
          backgroundImage: '',
          backgroundPosition: '0% 0%',
          backgroundSize: '200% 200%',
          width: '100px',
          height: '100px',
          position: 'absolute',
          pointerEvents: 'none',
          borderRadius: '50%',
          border: '1px solid #000',
          transform: 'translate(-50%, -50%)',
          top: '0px', // 新增
          left: '0px', // 新增
          cursor: 'none', // 新增
        },
      }
    },
    methods: {
      handleMouseMove(event) {
        const { offsetX, offsetY, target } = event
        const { offsetWidth, offsetHeight } = target
        const x = (offsetX / offsetWidth) * 100
        const y = (offsetY / offsetHeight) * 100
        this.magnifierStyle.backgroundImage = `url(${this.imageSrc})`
        this.magnifierStyle.backgroundPosition = `${x}% ${y}%`
        this.magnifierStyle.top = `${offsetY}px`
        this.magnifierStyle.left = `${offsetX}px`
        this.magnifierStyle.cursor = `none`
        this.showMagnifier = true
      },
      handleMouseLeave() {
        this.showMagnifier = false
      },
    },
  }
</script>

<style scoped>
  .magnifier-container {
    position: relative;
    display: inline-block;
    cursor: none;
  }
  .main-image {
    width: 100%;
    display: block;
  }
  .magnifier {
    background-repeat: no-repeat;
  }
</style>
