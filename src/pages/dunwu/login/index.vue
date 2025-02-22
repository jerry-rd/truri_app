<template>
  <div :style="backgroundStyle[0]?.styleItem" class="h-screen">
    <div class="flex flex-col items-center justify-center h-screen relative pb-20" :style="backgroundStyle[1]?.styleItem">
      <h1 class="text-3xl font-bold mb-4 text-center w-full absolute top-40">{{ pageConfig?.loginPageTitle?.text }}</h1>
      <div class="w-1/2 flex flex-col items-center absolute right-0">
        <h2 class="text-xl mb-6">欢迎回来，请登录您的账户</h2>
        <form @submit.prevent="handleLogin" class="bg-white p-8 rounded-lg shadow-lg w-96 mx-auto">
          <h2 class="text-2xl font-bold mb-6 text-center text-blue-600">登录</h2>
          <div class="mb-6 relative">
            <i class="fas fa-user text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"></i>
            <input type="text" id="username" v-model="username" required placeholder="用户名" class="pl-10 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" />
          </div>
          <div class="mb-6 relative">
            <i class="fas fa-lock text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"></i>
            <input type="password" id="password" v-model="password" required placeholder="密码" class="pl-10 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" />
          </div>
          <div class="mb-6 relative" v-if="captchaUrl">
            <input type="text" v-model="captchaInput" required placeholder="验证码" class="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black pr-16" />
            <img :src="captchaUrl" alt="Captcha" class="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" @click="refreshCaptcha" />
          </div>
          <div class="mb-4 flex justify-between items-center">
            <label class="inline-flex items-center">
              <el-checkbox v-model="rememberPassword">记住密码</el-checkbox>
            </label>
            <label class="inline-flex items-center">
              <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
            </label>
          </div>
          <div class="mb-4 flex justify-end items-center">
            <button type="button" class="text-blue-600 cursor-pointer" @click="handleForgotPassword">忘记密码？</button>
          </div>
          <button type="submit" class="w-full py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-200 cursor-pointer"> 登录 </button>
          <button type="button" class="mt-4 w-full text-blue-600 cursor-pointer" @click="handleScanLogin">扫码登录</button>
        </form>
      </div>
      <footer class="mt-auto mb-4 text-sm text-gray-400 text-center absolute bottom-0">
        <span v-if="pageConfig?.loginPageCopyRight" class="ml-1" :style="`color:${pageConfig?.loginPageCopyRight?.color};font-size:${pageConfig?.loginPageCopyRight?.size}`">{{ pageConfig?.loginPageCopyRight?.text }}</span>
        <div class="links" v-if="pageConfig?.loginPageIcpNumber">
          <a href="https://beian.miit.gov.cn" target="_blank" :style="`color:${pageConfig?.loginPageIcpNumber.color};font-size:${pageConfig?.loginPageIcpNumber.size}`">{{ pageConfig?.loginPageIcpNumber?.text }}</a>
        </div>
        <span>版本号: 1.0.0 </span>
        <a
          v-if="pageConfig?.webICP"
          class="ml-1"
          :href="`https://beian.mps.gov.cn/#/query/webSearch?code=${pageConfig?.webICP?.code}`"
          :style="{ color: (pageConfig?.webICP && pageConfig?.webICP?.color) || '#808695', fontSize: (pageConfig?.webICP && pageConfig?.webICP?.size) || '14px' }"
          rel="noreferrer"
          target="_blank"
        >
          {{ `${pageConfig?.webICP?.text}${pageConfig?.webICP?.code}` }}
        </a>
      </footer>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'
  import { getIndividual, accountLogin } from '@/api/dunwu/common'
  import { useSystemStore } from '@/hooks/useSystemStore'
  import { getJSEncrypt } from '@/utils/common'
  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'

  const router = useRouter()
  const username = ref('')
  const password = ref('')
  const pageConfig = ref({})
  const rememberPassword = ref(false)
  const captchaInput = ref('')
  const captchaUrl = ref('')
  const autoLogin = ref(false)

  const backgroundStyle = computed(() => {
    const { loginPageBgImg } = pageConfig.value
    if (loginPageBgImg && Array.isArray(loginPageBgImg) && loginPageBgImg.length) {
      const styleArr = loginPageBgImg.map((v, index) => {
        const isForeground = index === 1
        const defaultColor = isForeground ? 'transparent' : '#0a1015'
        const retunStyle = v.url === ''
        const styleBack = { background: v.color || defaultColor }
        const styleBackImg = {
          backgroundImage: `url(${v.url || ''}?${Date.now()})`,
          backgroundRepeat: v.repeat || 'no-repeat',
          backgroundSize: v.size || '',
          backgroundPosition: `${v.xpos || '40%'} ${v.ypos || 'center'}`,
        }
        const styleItem = retunStyle ? styleBack : styleBackImg
        return { styleItem }
      })
      return styleArr
    } else {
      return [{ styleItem: {} }, { styleItem: {} }]
    }
  })

  function refreshCaptcha() {
    captchaInput.value = ''
    captchaUrl.value = import.meta.env.VITE_BASE_API + `/portal/getCode.as?randomStr=${new Date().getTime()}`
  }

  const handleLogin = async () => {
    const Encrypt = await getJSEncrypt()
    const params = {
      loginName: username.value,
      password: Encrypt.encrypt(password.value),
      edition: 'ESTATE_V5',
      checkCode: captchaInput.value,
      authLoginFlag: '',
    }
    const { code, data, message } = await accountLogin(params)
    if (code === '0') {
      const { setStore, deleteStore } = await useSystemStore()
      if (rememberPassword.value) {
        setStore('account-info', { loginName: username.value, password: password.value, autoLogin: autoLogin.value, rememberPassword: rememberPassword.value })
      } else {
        deleteStore('account-info')
      }
      router.push('/dunwu/Login/loading')
    } else if (code === '1' && data.codeCheckFlag) {
      refreshCaptcha()
      ElMessage({ message, type: 'error' })
    }
  }
  function handleScanLogin() {
    // 扫码登录逻辑
    console.log('扫码登录')
  }
  onMounted(async () => {
    const { data } = await getIndividual()
    pageConfig.value = data
    const { getStore } = await useSystemStore()
    // Check for stored credentials and auto-login
    const storedInfo = await getStore('account-info')
    if (storedInfo) {
      username.value = storedInfo.loginName
      password.value = storedInfo.password
      autoLogin.value = storedInfo.autoLogin
      rememberPassword.value = storedInfo.rememberPassword
      if (storedInfo.autoLogin) {
        handleLogin()
      }
    }
  })
</script>

<style>
  /* Add Font Awesome CSS */
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
</style>
