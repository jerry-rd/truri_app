<template>
  <div style="position: relative; height: 500px; overflow: hidden">
    <ShapeBlur :variation="variation" :pixel-ratio-prop="devicePixelRatio" :shape-size="shapeSize" :roundness="roundness" :border-size="borderSize" :circle-size="circleSize" :circle-edge="circleEdge" />
  </div>
  <div class="flex flex-col gap-2 mt-4 w-1/2 mx-auto">
    <div>形状大小</div>
    <el-slider v-model="shapeSize" :max="2.0" :min="0" :step="0.01" />
    <div>圆角</div>
    <el-slider v-model="roundness" :max="1" :min="0" :step="0.01" />
    <div>边框大小</div>
    <el-slider v-model="borderSize" :max="0.2" :min="0" :step="0.01" />
    <div>圆大小</div>
    <el-slider v-model="circleSize" :max="0.5" :min="0" :step="0.01" />
    <div>圆边缘</div>
    <el-slider v-model="circleEdge" :max="2" :min="0" :step="0.01" />
    <div>变量</div>
    <el-select v-model="variation" placeholder="请选择变量">
      <el-option label="变量1" :value="0" />
      <el-option label="变量2" :value="1" />
      <el-option label="变量3" :value="2" />
      <el-option label="变量4" :value="3" />
      <el-option label="变量5" :value="4" />
    </el-select>
  </div>
</template>

<script setup>
  import ShapeBlur from '@/components/ShapeBlur.vue'
  import { computed, ref } from 'vue'

  const devicePixelRatio = computed(() => window.devicePixelRatio || 1)

  const shapeSize = ref(1.5)
  const roundness = ref(0.5)
  const borderSize = ref(0.05)
  const circleSize = ref(0.5)
  const circleEdge = ref(1)
  const variation = ref(0)
</script>
