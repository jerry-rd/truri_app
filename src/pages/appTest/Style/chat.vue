<template>
  <div class="flex flex-col h-screen bg-gray-100 relative">
    <div class="shadow-md p-4 text-center fixed w-full bg-white top-0 left-0 right-0">
      <h2 class="text-xl font-semibold text-gray-400">聊天</h2>
    </div>
    <div class="p-4 no-scroll" ref="messages" style="max-height: calc(100vh - 74px); overflow-y: scroll; padding-top: 74px">
      <div v-for="message in messages" :key="message.id" class="flex items-start mb-2" :class="{ 'justify-end': message.sender === '我', 'justify-start': message.sender !== '我' }">
        <img v-if="message.sender !== '我'" src="https://picsum.photos/40/40?random=1" alt="用户头像" class="rounded-full mr-2 h-10 w-10 object-cover" />
        <div class="max-w-96">
          <div class="bg-blue-500 text-white rounded-lg p-2 ml-1"> {{ message.text }} </div>
          <div class="text-gray-300 text-sm ml-2">{{ message.time }}</div>
        </div>
        <img v-if="message.sender === '我'" src="https://picsum.photos/40/40?random=1" alt="用户头像" class="rounded-full ml-2 h-10 w-10 object-cover" />
      </div>
    </div>
    <div class="flex p-4 bg-white border-t fixed bottom-0 left-0 right-0 w-full">
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="输入消息..." class="flex-1 border rounded-lg p-2 mr-2 text-gray-800" />
      <button @click="sendMessage" class="bg-blue-500 text-white rounded-lg px-4 py-2 ml-2">发送</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        messages: [],
        newMessage: '',
      }
    },
    methods: {
      sendMessage() {
        if (this.newMessage.trim()) {
          this.messages.push({
            id: Date.now(),
            sender: '我',
            text: this.newMessage,
            time: new Date().toLocaleTimeString(),
          })
          this.newMessage = ''
          this.$nextTick(() => {
            this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
          })
        }
      },
    },
  }
</script>

<style scoped>
  .no-scroll {
    scrollbar-width: none;
  }
  .no-scroll::-webkit-scrollbar {
    display: none;
  }
  /* 这里可以添加额外的样式，如果需要的话 */
</style>
