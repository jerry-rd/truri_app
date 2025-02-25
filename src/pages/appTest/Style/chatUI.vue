<template>
  <div class="layout-container">
    <!-- 左侧菜单栏 -->
    <div class="sidebar border-r border-gray-200 dark:border-gray-600" :class="{ 'sidebar-collapsed': isCollapsed }">
      <div class="sidebar-header border-b border-gray-200 dark:border-gray-600">
        <el-button v-if="!isCollapsed" type="primary" plain class="new-chat-btn w-full"> 新增对话 </el-button>
        <el-button v-else type="primary" circle class="new-chat-btn-collapsed">
          <el-icon><Plus /></el-icon>
        </el-button>
      </div>
      <!-- 菜单列表 -->
      <div class="menu-list">
        <el-menu class="menu" :default-active="activeMenu" :collapse="isCollapsed">
          <el-menu-item index="prompt-store">
            <el-icon><Document /></el-icon>
            <template #title>Prompt Store</template>
          </el-menu-item>
        </el-menu>
      </div>
      <!-- 底部用户信息 -->
      <div class="user-info border-t border-gray-200 dark:border-gray-600" :class="{ 'user-info-collapsed': isCollapsed }">
        <el-avatar :size="32" src="https://github.com/ChenZhaoYu.png" />
        <template v-if="!isCollapsed">
          <span class="username">管理员</span>
          <span class="github-info"><a href="https://github.com">Github</a></span>
          <el-dropdown>
            <el-icon class="settings-icon"><Setting /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
                <el-dropdown-item>帮助</el-dropdown-item>
                <el-dropdown-item>退出应用</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </div>
      <!-- 折叠按钮 -->
      <div class="collapse-btn border-gray-200 dark:border-gray-600" @click="toggleCollapse">
        <el-icon>
          <component :is="isCollapsed ? 'Expand' : 'Fold'" />
        </el-icon>
      </div>
    </div>
    <!-- 右侧聊天区域 -->
    <div class="chat-container">
      <!-- 顶部标题栏 -->
      <div class="header border-b border-gray-200 dark:border-gray-600">
        <h2>New chat</h2>
      </div>
      <!-- 聊天内容区域 -->
      <div class="chat-content">
        <div class="message-list">
          <!-- 消息气泡将在这里渲染 -->
        </div>
      </div>
      <!-- 底部输入框区域 -->
      <div class="input-area border-t border-gray-200 dark:border-gray-600">
        <el-input v-model="messageInput" placeholder="来说点什么吧... (Shift + Enter = 换行)" resize="none">
          <template #prefix>
            <el-button circle>
              <el-icon :size="20"> <Edit /> </el-icon>
            </el-button>
          </template>
          <template #suffix>
            <el-button type="primary" circle>
              <el-icon :size="20">
                <Message />
              </el-icon>
            </el-button>
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { Edit, Document, Setting, Fold, Expand, Plus } from '@element-plus/icons-vue'

  const messageInput = ref('')
  const activeMenu = ref('prompt-store')
  const isCollapsed = ref(false)

  const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
  }
</script>

<style scoped>
  .layout-container {
    display: flex;
    height: calc(100vh - 30px);
  }
  .sidebar {
    width: 280px;
    display: flex;
    flex-direction: column;
    position: relative;
    transition: width 0.3s;
  }
  .sidebar-collapsed {
    width: 64px;
  }
  .new-chat-btn-collapsed {
    padding: 8px;
  }
  .collapse-btn {
    position: absolute;
    right: -12px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    border: 1px solid #e0e0e0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1;
    transition: transform 0.3s;
  }
  .collapse-btn:hover {
    opacity: 0.8;
  }
  .sidebar-collapsed .collapse-btn {
    transform: translateY(-50%) rotate(180deg);
  }
  .user-info {
    transition: all 0.3s;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .user-info-collapsed {
    justify-content: center;
    padding: 20px 8px;
  }
  .sidebar-header {
    padding: 12px;
  }
  .menu-list {
    flex: 1;
    overflow-y: auto;
  }
  .menu {
    border-right: none;
  }
  .username {
    flex: 1;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .github-info {
    font-size: 12px;
    color: #666;
  }
  .github-info a {
    color: #409eff;
    text-decoration: none;
  }
  .settings-icon {
    cursor: pointer;
    font-size: 20px;
    color: #666;
  }
  .chat-container {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .header {
    padding: 16px;
  }
  .chat-content {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
  }
  .input-area {
    padding: 12px;
  }
  :deep(.el-input__wrapper) {
    padding: 8px 16px;
    border-radius: 8px;
  }
  :deep(.el-textarea__inner) {
    min-height: 40px !important;
    max-height: 120px;
  }
  :deep(.el-menu) {
    border-right: none;
  }
  :deep(.el-menu--collapse) {
    width: 64px;
  }
  :deep(.el-menu--collapse .el-menu-item) {
    padding: 0 !important;
    text-align: center;
  }
  :deep(.el-menu--collapse .el-menu-item .el-icon) {
    margin: 0;
  }
</style>
