<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'
import { ref } from 'vue'

const drawer = ref(true)
</script>

<template>
  <AppLayout @is-drawn="drawer = !drawer">
    <template #navigation>
      <SideNavigation :drawer="drawer"></SideNavigation>
    </template>
  </AppLayout>
</template>
