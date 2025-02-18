<template>
  <GradientText :colors="colors" :animationSpeed="animationSpeed" :showBorder="showBorder" :className="className"> 这里是需要动态渐变显示的文字 </GradientText>
</template>

<script setup>
  import GradientText from '@/components/GradientText.vue'
  const colors = ['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa']
  const animationSpeed = 3
  const showBorder = false
  const className = 'custom-class'
</script>
<style scoped>
  .custom-class {
    font-size: 80px;
    font-weight: bold;
    line-height: 80px;
  }
</style>
