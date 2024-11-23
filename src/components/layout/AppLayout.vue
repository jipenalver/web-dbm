<script setup>
import ProfileHeaderNavigation from './ProfileHeaderNavigation.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { useDisplay } from 'vuetify'
import { onMounted, ref } from 'vue'

const props = defineProps(['isWithAppBarNavIcon'])

const emit = defineEmits(['isDrawerVisible'])

// Utilize pre-defined vue functions
const { xs, sm, mobile } = useDisplay()

// Use Pinia Store
const authStore = useAuthUserStore()

// Load Variables
const isLoggedIn = ref(false)
const theme = ref(localStorage.getItem('theme') ?? 'light')

//  Toggle Theme
const onToggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
}
// Get Authentication status from supabase
const getLoggedStatus = async () => {
  isLoggedIn.value = await authStore.isAuthenticated()
}

// Load Functions during component rendering
onMounted(() => {
  getLoggedStatus()
})
</script>

<template>
  <v-responsive class="rounded">
    <v-app :theme="theme">
      <v-layout>
        <v-app-bar
          image="/images/header-dbm-bg.jpg"
          class="px-3"
          :class="theme === 'light' ? 'bg-grey-lighten-2' : ''"
        >
          <v-app-bar-nav-icon
            v-if="props.isWithAppBarNavIcon"
            icon="mdi-menu"
            variant="tonal"
            :theme="theme"
            @click="emit('isDrawerVisible')"
          >
          </v-app-bar-nav-icon>

          <v-app-bar-title>
            <v-img src="/images/header-dbm.png" :width="xs ? '100%' : sm ? '40%' : '40%'"></v-img>
          </v-app-bar-title>

          <v-spacer></v-spacer>

          <v-btn
            class="me-2"
            variant="elevated"
            :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
            slim
            @click="onToggleTheme"
          ></v-btn>

          <ProfileHeaderNavigation v-if="isLoggedIn"></ProfileHeaderNavigation>
        </v-app-bar>

        <slot name="navigation"></slot>

        <v-main>
          <slot name="content"></slot>
        </v-main>

        <v-footer
          class="font-weight-bold"
          :class="mobile ? 'text-caption' : ''"
          :color="theme === 'light' ? 'grey-lighten-2' : undefined"
          border
          app
        >
          <div :class="mobile ? 'w-100 text-center' : ''">
            Copyright © 2024 - Department of Budget and Management | All Rights Reserved
          </div>
        </v-footer>
      </v-layout>
    </v-app>
  </v-responsive>
</template>
