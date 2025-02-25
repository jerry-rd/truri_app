<template>
  <slot></slot>
</template>

<script setup>
  import { useSidebarProvider } from '@/hooks/useSidebar'
  useSidebarProvider()
</script>
