<template>
  <div class="flex justify-center items-center h-screen overflow-hidden">
    <div class="flex w-full">
      <div v-for="(item, index) in list" :key="index" class="panel" :class="{ active: activeIndex === index }" :style="{ backgroundImage: url(item.pgurl) }" @click="activeIndex = index">
        <h3>{{ item.name }}</h3>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: 0,
        list: [
          {
            name: 'Explore The World',
            pgurl: 'https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          },
          {
            name: 'Wild Forest',
            pgurl: 'https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          },
          {
            name: 'Sunny Beach',
            pgurl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80',
          },
          {
            name: 'City on Winter',
            pgurl: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
          },
          {
            name: 'Mountains - Clouds',
            pgurl: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          },
        ],
      }
    },
    created() {},
    methods: {
      url(str) {
        return 'url(' + str + ')'
      },
    },
  }
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

  * {
    box-sizing: border-box;
  }
  .panel {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 60vh;
    border-radius: 50px;
    color: #fff;
    cursor: pointer;
    flex: 0.5;
    margin: 10px;
    position: relative;
    transition: flex 0.7s ease-in;
  }

  .panel h3 {
    font-size: 24px;
    position: absolute;
    bottom: 20px;
    left: 20px;
    margin: 0;
    opacity: 0;
  }

  .panel.active {
    flex: 5;
  }

  .panel.active h3 {
    opacity: 1;
    transition: opacity 0.3s ease-in 0.4s;
  }
  @media (max-width: 480px) {
    .container {
      width: 100vw;
    }
    .panel:nth-of-type(4),
    .panel:nth-of-type(5) {
      display: none;
    }
  }
</style>
