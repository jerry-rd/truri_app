<template>
  <div class="mx-auto flex flex-col items-center justify-center min-h-screen p-6">
    <div class="w-full max-w-md">
      <label for="text" class="block font-medium mb-2">Text for QR Code:</label>
      <input id="text" v-model="text" type="text" placeholder="Enter text for QR code" class="mb-4 p-2 border rounded-md w-full bg-transparent" />
      <div class="flex space-x-4 mb-4">
        <div class="w-1/3">
          <label for="size" class="block font-medium mb-2">Size:</label>
          <input id="size" v-model="size" type="number" placeholder="Size" class="p-2 border rounded-md shadow-sm w-full bg-transparent" />
        </div>
        <div class="w-1/3">
          <label for="bgColor" class="block font-medium mb-2">Background Color:</label>
          <input id="bgColor" v-model="bgColor" type="color" class="p-2 border rounded-md shadow-sm w-full" />
        </div>
        <div class="w-1/3">
          <label for="fgColor" class="block font-medium mb-2">Foreground Color:</label>
          <input id="fgColor" v-model="fgColor" type="color" class="p-2 border rounded-md shadow-sm w-full" />
        </div>
      </div>
      <button @click="generateQRCode" class="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-500 transition duration-200"> Generate QR Code </button>
    </div>
    <div v-if="qrCodeUrl" class="w-full max-w-md mt-8">
      <h3 class="text-lg font-semibold mb-2">Generated QR Code:</h3>
      <img :src="qrCodeUrl" :style="{ width: size + 'px', height: size + 'px' }" alt="QR Code" class="border rounded-md shadow-sm" />
      <a :href="qrCodeUrl" download="qrcode.png" class="mt-4 inline-block bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-500 transition duration-200"> Download QR Code </a>
    </div>
  </div>
</template>

<script>
  import QRCode from 'qrcode'
  export default {
    data() {
      return {
        text: '',
        size: 200,
        bgColor: '#ffffff',
        fgColor: '#000000',
        qrCodeUrl: null,
      }
    },
    methods: {
      async generateQRCode() {
        try {
          this.qrCodeUrl = await QRCode.toDataURL(this.text, {
            width: this.size,
            margin: 1,
            color: {
              dark: this.fgColor,
              light: this.bgColor,
            },
          })
        } catch (error) {
          console.error('Error generating QR code:', error)
        }
      },
    },
  }
</script>

<style>
  /* Tailwind CSS is used for styling */
</style>
