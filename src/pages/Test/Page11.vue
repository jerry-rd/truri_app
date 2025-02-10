<template>
  <div class="container mx-auto flex flex-col items-center justify-center min-h-screen p-6">
    <h1 class="text-2xl font-bold mb-4">Welcome to the Tour</h1>
    <button @click="startTour" class="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-500 transition duration-200 mb-4"> Start Tour </button>
    <div class="flex space-x-4">
      <div id="feature1" class="p-4 border border-gray-300 rounded-md shadow-sm">
        <h2 class="text-lg font-semibold">第一步</h2>
        <p class="text-gray-600">Description of feature 1.</p>
      </div>
      <div id="feature2" class="p-4 border border-gray-300 rounded-md shadow-sm">
        <h2 class="text-lg font-semibold">第二步</h2>
        <p class="text-gray-600">Description of feature 2.</p>
      </div>
      <div id="feature3" class="p-4 border border-gray-300 rounded-md shadow-sm">
        <h2 class="text-lg font-semibold">第三步</h2>
        <p class="text-gray-600">Description of feature 2.</p>
      </div>
      <div id="feature4" class="p-4 border border-gray-300 rounded-md shadow-sm">
        <h2 class="text-lg font-semibold">第四步</h2>
        <p class="text-gray-600">Description of feature 2.</p>
      </div>
      <div id="feature5" class="p-4 border border-gray-300 rounded-md shadow-sm">
        <h2 class="text-lg font-semibold">第五步</h2>
        <p class="text-gray-600">Description of feature 2.</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { driver } from 'driver.js'
  import 'driver.js/dist/driver.css'
  export default {
    methods: {
      startTour() {
        const driverObj = driver({
          animate: true,
          opacity: 0.75,
          doneBtnText: '完成',
          closeBtnText: 'Close',
          nextBtnText: '下一步',
          prevBtnText: '上一步',
          steps: [
            {
              element: '#feature1',
              popover: {
                title: 'Feature 1',
                description: '第一步你知道需要做啥不？',
                position: 'bottom',
              },
            },
            {
              element: '#feature2',
              popover: {
                title: 'Feature 2',
                description: '第二步需要需要做啥？',
                position: 'bottom',
              },
            },
            {
              element: '#feature3',
              popover: {
                title: 'Feature 3',
                description: '这个是第三步的说明',
                position: 'bottom',
              },
            },
            {
              element: '#feature4',
              popover: {
                title: 'Feature 4',
                description: '第四步看好了',
                position: 'bottom',
              },
            },
            {
              element: '#feature5',
              popover: {
                title: 'Feature 5',
                description: '最后一步，我只说一遍',
                position: 'bottom',
              },
            },
          ],
        })
        driverObj.drive()
      },
    },
  }
</script>

<style>
  /* Tailwind CSS is used for styling */
</style>
