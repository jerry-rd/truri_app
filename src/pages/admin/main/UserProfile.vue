<template>
  <div>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <el-card shadow="never" class="bg-white dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <h3 slot="header" class="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">个人资料</h3>
      <profile-card />
      <personal-info-card />
      <address-card />
    </el-card>
  </div>
</template>

<script setup>
  import PageBreadcrumb from '@/components/layout/PageBreadcrumb.vue'
  import { ref } from 'vue'
  import ProfileCard from '../component/profile/ProfileCard.vue'
  import PersonalInfoCard from '../component/profile/PersonalInfoCard.vue'
  import AddressCard from '../component/profile/AddressCard.vue'
  const currentPageTitle = ref('用户管理')
</script>
