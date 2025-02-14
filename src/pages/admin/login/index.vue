<template>
  <div class="login-view">
    <div class="img-bg img-bg-1">
      <el-image class="img" :src="img_2" fit="cover" />
    </div>
    <div class="img-bg">
      <el-image class="img" :src="img_4" fit="contain" />
    </div>
    <h1>{{ dataContainer?.title }}</h1>
    <div class="container">
      <div class="left">
        <el-carousel :interval="7000" arrow="never">
          <el-carousel-item>
            <div class="item">
              <el-image class="img" :src="img_7" fit="contain" />
              <div class="title">直接上手</div>
              <div class="content">只用写好自己的业务页面</div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="item">
              <el-image class="img img-1" :src="img_5" fit="contain" />
              <div class="title">代码简单</div>
              <div class="content">代码简洁易懂，遇到问题好解决</div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="item">
              <el-image class="img img-2" :src="img_6" fit="contain" />
              <div class="title">界面</div>
              <div class="content">清新小巧，布局合理</div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="right">
        <div class="container">
          <div class="title">登 录</div>
          <div class="other-login-bt">
            <div class="item">
              <SvgIcon :style="'width:22px;height:22px;color:#fff;'" name="svg:g.svg"></SvgIcon>
            </div>
            <div class="item">
              <SvgIcon :style="'width:22px;height:22px;color:#00b9f3;'" name="svg:f.svg"></SvgIcon>
            </div>
            <div class="item">
              <SvgIcon :style="'width:22px;height:22px;color:#00c96e;'" name="svg:weixin.svg"></SvgIcon>
            </div>
          </div>
          <div class="content-1">或使用您的账号</div>
          <div class="input-container">
            <SvgIcon :style="'width:20px;height:20px;margin-right:10px;'" name="svg:zhanghao.svg"></SvgIcon>
            <el-input clearable placeholder="账号" @keyup.enter="onLogin" v-model="dataContainer.form.name" />
          </div>
          <div class="input-container">
            <SvgIcon :style="'width:20px;height:20px;margin-right:10px;'" name="svg:mima.svg"></SvgIcon>
            <el-input type="password" clearable @keyup.enter="onLogin" show-password placeholder="密码" v-model="dataContainer.form.password" />
          </div>
          <!-- <div class="input-container code">
            <SvgIcon :style="'width:20px;height:20px;margin-right:10px;'" name="svg:cat-code.svg"></SvgIcon>
            <el-input v-model="dataContainer.form.captchaText" placeholder="验证码" clearable @keyup.enter="onLogin"> </el-input>
            <el-image class="img" :src="img_3" fit="cover" />
          </div> -->
          <div class="bt-list">
            <el-button class="login-bt" v-if="!dataContainer.form.idU" :loading="dataContainer.loading" @click="onLogin"> 登 录 </el-button>
          </div>
          <div class="other">
            <router-link to="/admin/register">没有账号？去注册</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom"> 版权所有 @admin.dumogu.top {{ dataContainer.name }} </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { getAdminInit } from '@/api/admin/index'
  import { ElMessage } from 'element-plus'
  import { ask, confirm, message, open, save } from '@tauri-apps/plugin-dialog'

  import img_2 from '@/assets/login-imgs/login-bg.svg'
  import img_3 from '@/assets/login-imgs/code.svg'
  import img_4 from '@/assets/login-imgs/login-bg-1.svg'
  import img_5 from '@/assets/login-imgs/login-bg-2.svg'
  import img_6 from '@/assets/login-imgs/login-bg-3.svg'
  import img_7 from '@/assets/login-imgs/login-bg-4.png'

  const dataContainer = ref({
    title: '',
    name: '',
    form: { name: '', password: '', captchaText: '' },
  })
  const init = async () => {
    const res = await getAdminInit()
    if (res.code === 0) {
    } else {
      message('接口异常', { title: '提示', kind: 'error' })
    }
  }

  const onLogin = () => {}

  onMounted(() => {
    init()
  })
</script>

<style lang="less" scoped>
  .login-view {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    box-sizing: border-box;
    position: relative;
    > .img-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      pointer-events: none;
      display: flex;
      justify-content: center;
      align-items: center;
      > .img {
        width: 95%;
        height: 95%;
      }
      &.img-bg-1 {
        > .img {
          width: 100%;
          height: 100%;
        }
      }
    }
    > .container {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: row;
      width: 100%;
      max-width: 900px;
      background-color: rgb(56, 56, 56);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 4px 4px 5px 0 rgba(0, 0, 0, 0.449);
      > .left {
        flex: 1 1 0;
        width: 0;
        background-color: #c6c6c6;
        :deep(.el-carousel) {
          width: 100%;
          height: 100%;
          .el-carousel__container {
            width: 100%;
            height: 100%;
            .item {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              position: relative;
              > .img {
                width: 100%;
                max-width: 200px;
                height: 100%;
                max-height: 200px;
                transform: scale(1.5) translateY(-40px);
                &.img-1 {
                  transform: scale(1.7) translateY(-15px) translateX(-10px);
                }
                &.img-2 {
                  transform: scale(1.5) translateY(-30px);
                }
              }
              > .title {
                font-size: 20px;
                color: #000000;
                margin: 10px 0 0 0;
                font-weight: bold;
                position: absolute;
                bottom: 80px;
              }
              > .content {
                font-size: 15px;
                color: #000000;
                opacity: 0.7;
                margin-top: 15px;
                position: absolute;
                bottom: 50px;
              }
            }
          }
          .el-carousel__indicators {
            bottom: 10px;
            --el-carousel-indicator-width: 40px;
            --el-carousel-indicator-height: 7px;
            .is-active {
              .el-carousel__button {
                width: 60px;
                opacity: 1;
              }
            }
            .el-carousel__button {
              border-radius: 3px;
              box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.204);
              background-color: #0059b2;
              background: linear-gradient(to right, #007fff, #0059b2);
              opacity: 0.3;
            }
          }
        }
      }
      > .right {
        flex: 1 1 0;
        width: 0;
        > .container {
          width: 100%;
          height: 100%;
          padding: 20px 30px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          > .title {
            display: flex;
            flex-direction: row;
            justify-content: center;
            font-size: 25px;
            font-weight: bold;
            background: -webkit-linear-gradient(120deg, #007fff 30%, #ededed);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          > .other-login-bt {
            display: flex;
            flex-direction: row;
            justify-content: center;
            justify-content: center;
            margin: 15px 0;
            > .item {
              border: 1px solid #ddd;
              border-radius: 50%;
              display: inline-flex;
              justify-content: center;
              align-items: center;
              margin: 0 10px;
              height: 40px;
              width: 40px;
              cursor: pointer;
              box-shadow: inset 0 1px 4px #0000001f;
            }
          }
          > .content-1 {
            font-size: 13px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            opacity: 0.8;
          }
          > .input-container {
            width: 100%;
            max-width: 300px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            background: #eee;
            color: #000;
            border: none;
            padding: 0 15px;
            margin: 20px 0 0 0;
            border-radius: 5px;
            height: 45px;
            box-sizing: border-box;
            transition: all 0.2s;
            box-shadow: inset 0 1px 4px #0000001f;
            &:focus-within {
              box-shadow:
                inset 0 1px 4px #0000001f,
                0 0 0 2px #007fff !important;
            }
            :deep(.el-input) {
              flex: 1 1 0;
              width: 0;
              border: none;
              box-shadow: none;
              outline: none;
              background-color: transparent;
              .el-input__wrapper {
                border: none;
                box-shadow: none;
                outline: none;
                background-color: transparent;
                padding: 0;
                input {
                  font-size: 16px;
                  color: #000;
                }
              }
              .el-input__suffix {
                .el-icon {
                  font-size: 20px !important;
                  color: #3c3c3c !important;
                }
              }
            }
            &.code {
              padding: 0 5px 0 15px;
            }
            > .img {
              width: 100px;
              height: calc(100% - 10px);
              margin-left: 15px;
              cursor: pointer;
              border-radius: 5px;
              border: 1px solid rgba(0, 0, 0, 0.156);
            }
          }
          > .bt-list {
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin: 20px 0;
            :deep(.login-bt) {
              border-radius: 999px;
              border: none;
              background: #007fff;
              color: #fff;
              font-size: 14px;
              font-weight: bold;
              padding: 12px 60px;
              letter-spacing: 1px;
              height: 45px;
              background: linear-gradient(to right, #007fff, #0059b2);
              box-shadow:
                0 3px 3px -2px #0003,
                0 3px 4px #00000024,
                0 1px 8px #0000001f;
            }
          }
          > .other {
            font-size: 14px;
            opacity: 0.5;
            margin-top: 0;
          }
        }
      }
    }
    > .bottom {
      position: fixed;
      bottom: 15px;
      width: 100%;
      height: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 13px;
      color: white;
      z-index: 999;
      > * {
        margin: 0 15px;
      }
    }
  }
</style>
