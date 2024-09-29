<script setup>
import { useDisplay } from 'vuetify'
import { ref, watch } from 'vue'

const props = defineProps(['drawer'])

const { mobile } = useDisplay()
const isDrawn = ref(mobile ? false : true)

watch(props, () => {
  isDrawn.value = props.drawer
})
</script>

<template>
  <v-navigation-drawer
    v-model="isDrawn"
    :temporary="mobile"
    :permanent="!mobile"
    :class="theme === 'light' ? 'bg-grey-lighten-2' : ''"
  >
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        value="dashboard"
        link
      ></v-list-item>

      <v-divider></v-divider>

      <v-list-item
        prepend-icon="mdi-account-box"
        title="User Management"
        value="user-management"
        link
      ></v-list-item>

      <v-divider></v-divider>

      <v-list-item
        prepend-icon="mdi-wrench"
        title="Account Settings"
        value="account-settings"
        link
      ></v-list-item>
    </v-list>

    <template #append>
      <div class="pa-2">
        <v-btn color="grey-darken-3" class="font-weight-bold" prepend-icon="mdi-logout" block>
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
