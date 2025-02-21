<template>
  <div>
    <h1>Process</h1>
    <el-button @click="close">关闭</el-button>
    <el-button @click="restart">重启</el-button>
  </div>
</template>

<script setup>
  import { exit, relaunch } from '@tauri-apps/plugin-process'
  import { ElMessageBox } from 'element-plus'

  const close = () => {
    ElMessageBox.confirm('确定要关闭吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      await exit(0)
    })
  }

  const restart = async () => {
    ElMessageBox.confirm('确定要重启吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      await relaunch()
    })
  }
</script>
