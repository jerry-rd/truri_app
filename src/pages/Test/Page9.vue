<template>
  <div class="mx-auto flex flex-col items-center justify-center min-h-screen p-6">
    <input type="file" @change="onFileChange" class="mb-4 p-2 border border-gray-300 rounded-md shadow-sm" />
    <div v-if="imageUrl" class="w-full max-w-md">
      <img ref="image" :src="imageUrl" alt="Source Image" class="w-full h-auto mt-4 border border-gray-300 rounded-md shadow-sm" />
    </div>
    <button @click="cropImage" class="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-500 transition duration-200"> Crop Image </button>
    <div v-if="croppedImageUrl" class="w-full max-w-md mt-8">
      <h3 class="text-lg font-semibold text-gray-700 mb-2">Cropped Image:</h3>
      <img :src="croppedImageUrl" alt="Cropped Image" class="w-full h-auto border border-gray-300 rounded-md shadow-sm" />
    </div>
  </div>
</template>

<script>
  import Cropper from 'cropperjs'
  import 'cropperjs/dist/cropper.css'
  export default {
    data() {
      return {
        imageUrl: null,
        croppedImageUrl: null,
        cropper: null,
      }
    },
    methods: {
      onFileChange(e) {
        const files = e.target.files
        if (files.length > 0) {
          const reader = new FileReader()
          reader.onload = (event) => {
            this.imageUrl = event.target.result
            this.$nextTick(() => {
              this.initCropper()
            })
          }
          reader.readAsDataURL(files[0])
        }
      },
      initCropper() {
        if (this.cropper) {
          this.cropper.destroy()
        }
        const imageElement = this.$refs.image
        this.cropper = new Cropper(imageElement, {
          aspectRatio: 1,
          viewMode: 1,
        })
      },
      cropImage() {
        if (this.cropper) {
          this.croppedImageUrl = this.cropper.getCroppedCanvas().toDataURL()
        }
      },
    },
  }
</script>

<style>
  /* Tailwind CSS is used for styling */
</style>
