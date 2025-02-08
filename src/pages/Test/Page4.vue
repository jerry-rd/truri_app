<template>
  <div class="body"></div>
</template>

<script>
  export default {
    data() {},
  }
</script>
<style scoped>
  .body {
    width: 100%;
    height: 100vh;
    --s: 200px; /* control the size */
    background:
      repeating-conic-gradient(from 30deg, #0000 0 120deg, #3c3c3c 0 180deg) calc(0.5 * var(--s)) calc(0.5 * var(--s) * 0.577),
      repeating-conic-gradient(from 30deg, #1d1d1d 0 60deg, #4e4f51 0 120deg, #3c3c3c 0 180deg);
    background-size: var(--s) calc(var(--s) * 0.577);
    /* 0.577= tan(30deg)*/
  }
</style>
