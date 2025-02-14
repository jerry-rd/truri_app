<template>
  <div class="flex flex-col items-center">
    <h1 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 flex flex-col md:flex-row md:items-center gap-2">
      <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-lg">PictureInPictureWindow</span>
      <span class="text-base font-normal text-gray-600">参考地址:</span>
      <a :href="apiUrl" class="text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors truncate" target="_blank" rel="noopener noreferrer">{{ apiUrl }} </a>
    </h1>
    <video ref="video" controls class="w-full max-w-md rounded-lg shadow-lg mb-4">
      <source src="@/assets/video/冬景.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <button @click="togglePictureInPicture" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-200"> 切换画中画 </button>
  </div>
</template>

<script>
  export default {
    name: 'PictureInPictureWindow',
    data() {
      return {
        apiUrl: 'https://developer.mozilla.org/zh-CN/docs/Web/API/Picture-in-Picture_API',
      }
    },
    methods: {
      async togglePictureInPicture() {
        const video = this.$refs.video
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture()
        } else {
          const pictureInPictureWindow = await video.requestPictureInPicture()
          console.log('🚀 ~ togglePictureInPicture ~ pictureInPictureWindow:', pictureInPictureWindow)
        }
      },
    },
  }
</script>

<style scoped>
  /* Add your styles here */
</style>
