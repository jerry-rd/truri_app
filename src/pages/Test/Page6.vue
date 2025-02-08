<template>
  <div class="body">
    <canvas id="canvas" :width="width" :height="height" @mousedown="mouseDown" @mouseup="mouseUp" @mousemove="mouseMove"></canvas>
    <div class="toolbox">
      <button id="decrease" @click="decrease">-</button>
      <span id="size">{{ size }}</span>
      <button id="increase" @click="increase">+</button>
      <input type="color" id="color" v-model="color" />
      <button id="clear" @click="clearEl">X</button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        size: 10,
        ctx: null,
        color: 'black',
        isPressed: false,
        x: undefined,
        y: undefined,
        width: '800',
        height: '700',
      }
    },
    methods: {
      mouseMove(e) {
        if (this.isPressed) {
          const x2 = e.offsetX
          const y2 = e.offsetY

          this.drawCircle(x2, y2)
          this.drawLine(this.x, this.y, x2, y2)

          this.x = x2
          this.y = y2
        }
      },
      clearEl() {
        this.ctx.clearRect(0, 0, this.width, this.height)
      },
      mouseUp() {
        this.isPressed = false
        this.x = undefined
        this.y = undefined
      },
      mouseDown(e) {
        this.isPressed = true

        this.x = e.offsetX
        this.y = e.offsetY
      },
      increase() {
        this.size += 1
        if (this.size > 50) {
          this.size = 50
        }
      },
      decrease() {
        this.size -= 1
        if (this.size < 1) {
          this.size = 1
        }
      },
      drawCircle(x, y) {
        this.ctx.beginPath()
        this.ctx.arc(x, y, this.size, 0, Math.PI * 2)
        this.ctx.fillStyle = this.color
        this.ctx.fill()
      },
      drawLine(x1, y1, x2, y2) {
        this.ctx.beginPath()
        this.ctx.moveTo(x1, y1)
        this.ctx.lineTo(x2, y2)
        this.ctx.strokeStyle = this.color
        this.ctx.lineWidth = this.size * 2
        this.ctx.stroke()
      },
    },
    mounted() {
      this.ctx = document.getElementById('canvas').getContext('2d')
    },
    computed: {},
    watch: {},
    components: {},
  }
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  * {
    box-sizing: border-box;
  }

  .body {
    background-color: #f5f5f5;
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
  }

  canvas {
    border: 2px solid steelblue;
  }

  .toolbox {
    background-color: steelblue;
    border: 1px solid slateblue;
    display: flex;
    width: 804px;
    padding: 1rem;
  }

  .toolbox > * {
    background-color: #fff;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    height: 50px;
    width: 50px;
    margin: 0.25rem;
    padding: 0.25rem;
    cursor: pointer;
  }

  .toolbox > *:last-child {
    margin-left: auto;
  }
</style>
