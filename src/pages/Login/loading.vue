<template>
  <div v-if="isLoading" class="flex flex-col justify-center items-center h-screen">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
    <p class="mt-4 text-lg">Loading, please wait...</p>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  const isLoading = ref(true) // Set to true to show loading initially
  const startLoading = () => {
    isLoading.value = true
  }
  const stopLoading = () => {
    isLoading.value = false
  }
</script>
