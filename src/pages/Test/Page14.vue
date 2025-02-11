<template>
  <div ref="scrollContainer">
    <div class="layout-content">
      <div v-for="(image, index) in images" :key="index" class="masonry-item">
        <img :src="image.src" :alt="image.alt" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        images: [],
      }
    },
    created() {
      // 初始加载30张随机图片
      const initialImages = Array.from({ length: 30 }, () => ({ src: this.getPic(), alt: 'Random Image' }))
      this.images = initialImages
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll() {
        const scrollContainer = this.$refs.scrollContainer
        if (window.innerHeight + window.scrollY >= scrollContainer.offsetHeight) {
          this.loadMoreImages()
        }
      },
      getPic() {
        const picWidth = [400]
        const picHeight = [200, 300, 400, 500]
        const randomWidth = picWidth[Math.floor(Math.random() * picWidth.length)]
        const randomHeight = picHeight[Math.floor(Math.random() * picHeight.length)]
        return `https://picsum.photos/${randomWidth}/${randomHeight}?random=${Math.random()}`
      },
      loadMoreImages() {
        // 加载更多随机图片
        const newImages = Array.from({ length: 20 }, () => ({ src: this.getPic(), alt: 'Random Image' }))
        this.images = [...this.images, ...newImages]
      },
    },
  }
</script>

<style>
  .layout-content {
    columns: 300px 4;
  }
  .masonry-item {
    margin-bottom: 1em;
  }
  .masonry-item img {
    width: 100%;
  }
</style>
