<template>
  <div class="flex flex-col h-screen bg-gray-100 relative">
    <div class="shadow-md p-4 text-center fixed w-full bg-white top-0 left-0 right-0">
      <h2 class="text-xl font-semibold text-gray-400">聊天</h2>
    </div>
    <div class="p-4 no-scroll" ref="messagesRef" style="max-height: calc(100vh - 74px); overflow-y: scroll; padding-top: 74px">
      <div v-for="message in messages" :key="message.id" class="flex items-start mb-2" :class="{ 'justify-end': message.sender === 'me', 'justify-start': message.sender !== 'me' }">
        <img v-if="message.sender !== 'me'" src="https://picsum.photos/40/40?random=1" alt="用户头像" class="rounded-full mr-2 h-10 w-10 object-cover" />
        <div class="max-w-96">
          <div class="bg-blue-500 text-white rounded-lg p-2 ml-1"> {{ message.text }} </div>
          <div class="text-gray-300 text-sm ml-2">{{ message.time }}</div>
        </div>
        <img v-if="message.sender === 'me'" src="https://picsum.photos/40/40?random=1" alt="用户头像" class="rounded-full ml-2 h-10 w-10 object-cover" />
      </div>
    </div>
    <div class="flex p-4 bg-white border-t fixed bottom-0 left-0 right-0 w-full">
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="输入消息..." class="flex-1 border rounded-lg p-2 mr-2 text-gray-800" />
      <button @click="sendMessage" class="bg-blue-500 text-white rounded-lg px-4 py-2 ml-2">发送</button>
    </div>
  </div>
</template>

<script setup>
  import { ref, nextTick, onMounted } from 'vue'
  import { chatCompletion } from '@/api/openai'

  const messagesRef = ref(null)
  const newMessage = ref('你是谁')
  const messages = ref([])

  const sendMessage = async () => {
    if (newMessage.value.trim()) {
      const content = newMessage.value
      messages.value.push({ id: Date.now(), sender: 'me', text: content, time: new Date().toLocaleTimeString() })
      newMessage.value = ''
      const res = await chatCompletion(content)
      console.log('🚀 ~ sendMessage ~ res:', res)
      if (res?.choices?.[0]?.message?.content) {
        messages.value.push({
          id: Date.now(),
          sender: 'ai',
          text: res?.choices?.[0]?.message?.content,
          time: new Date().toLocaleTimeString(),
        })
      }
      nextTick(() => {
        messagesRef.value.scrollTop = messagesRef.value.clientHeight
      })
    }
  }

  onMounted(() => {
    sendMessage()
  })
</script>

<style scoped lang="less">
  .no-scroll {
    scrollbar-width: none;
  }
  .no-scroll::-webkit-scrollbar {
    display: none;
  }
</style>
