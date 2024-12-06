<script setup>
import SideNavigation from '@/components/layout/navigation/SideNavigation.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useScoreboardStore } from '@/stores/scoreboard'
import { scoreboardTableHeaders } from "@/components/system/scoreboard/scoreboardTableUtils"
import { ref } from "vue"
const isDrawerVisible = ref(true)

// Load Variables
const tableOptions = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  isLoading: false
})
const scoreboardStore = useScoreboardStore()
const onLoadItems = async ({ page, itemsPerPage, sortBy }) => {

  scoreboardStore.getScoreboardPaginated({ currentPage: 1, perPage: 10, column: "" })
  //load the items here by calling the api

} 
</script>


<template>
  <AppLayout>
    <template #navigation>
      <SideNavigation :is-drawer-visible="isDrawerVisible"></SideNavigation>
    </template>
    <template #content>
      <v-data-table-server v-model:items-per-page="tableOptions.itemsPerPage" v-model:page="tableOptions.page"
        v-model:sort-by="tableOptions.sortBy" :loading="tableOptions.isLoading" :headers="scoreboardtableHeaders"
        :items-length="scoreboardStore.scoreboardTotal" @update:options="onLoadItems">

      </v-data-table-server>
    </template>
  </AppLayout>
</template>
