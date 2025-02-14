<template>
  <div class="body" :style="{ 'background-image': 'url(' + slides[slideIndex].image + ')' }">
    <div class="slider-container">
      <div
        class="slide"
        v-for="(slide, index) in slides"
        :class="{ active: slideIndex === index }"
        :key="index"
        :style="{
          'background-image': 'url(' + slide.image + ')',
        }"
      ></div>
      <button class="arrow left-arrow" id="left" @click="slideLeft">
        <i class="fas fa-arrow-left"></i>
      </button>
      <button class="arrow right-arrow" id="right" @click="slideRight">
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        slider: null,
        slideIndex: 0,
        slides: [
          {
            image: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
          },
          {
            image: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80',
          },
          {
            image: 'https://images.unsplash.com/photo-1495467033336-2effd8753d51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
          },
          {
            image: 'https://images.unsplash.com/photo-1522735338363-cc7313be0ae0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80',
          },
          {
            image: 'https://images.unsplash.com/photo-1559087867-ce4c91325525?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
          },
        ],
      }
    },
    mounted() {},
    methods: {
      slideLeft() {
        this.slideIndex--
        if (this.slideIndex < 0) {
          this.slideIndex = this.slides.length - 1
        }
      },
      slideRight() {
        this.slideIndex++
        if (this.slideIndex > this.slides.length - 1) {
          this.slideIndex = 0
        }
      },
    },
  }
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css');

  * {
    box-sizing: border-box;
  }

  .body {
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
    margin: 0;
    background-position: center center;
    background-size: cover;
    transition: 0.4s;
    width: 100%;
  }

  .body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: -1;
  }

  .slider-container {
    box-shadow:
      0 3px 6px rgba(0, 0, 0, 0.16),
      0 3px 6px rgba(0, 0, 0, 0.23);
    height: 70vh;
    width: 70vw;
    position: relative;
    overflow: hidden;
  }

  .slide {
    opacity: 0;
    height: 100vh;
    width: 100vw;
    background-position: center center;
    background-size: cover;
    position: absolute;
    top: -15vh;
    left: -15vw;
    transition: 0.4s ease;
    z-index: 1;
  }

  .slide.active {
    opacity: 1;
  }

  .arrow {
    position: absolute;
    background-color: transparent;
    color: #fff;
    padding: 20px;
    font-size: 30px;
    border: 2px solid orange;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 3;
  }

  .arrow:focus {
    outline: 0;
  }

  .left-arrow {
    left: 0px;
  }

  .right-arrow {
    right: 0px;
  }
</style>
