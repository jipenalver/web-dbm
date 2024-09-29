<script setup>
import { supabase } from '@/utils/supabase'
import { useDisplay } from 'vuetify'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['drawer'])

const router = useRouter()
const { mobile } = useDisplay()
const isDrawn = ref(props.drawer)
const userData = ref({
  email: '',
  fullname: ''
})

watch(props, () => {
  isDrawn.value = props.drawer
})

const onLogout = async () => {
  const { error } = await supabase.auth.signOut()
  if (!error) router.replace('/')
}

const getUser = async () => {
  const {
    data: {
      user: { user_metadata: metadata }
    }
  } = await supabase.auth.getUser()

  userData.value.email = metadata.email
  userData.value.fullname = metadata.lastname + ', ' + metadata.firstname
}

onMounted(() => {
  getUser()
})
</script>

<template>
  <v-navigation-drawer v-model="isDrawn" :temporary="mobile" :permanent="!mobile">
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
      <v-card prepend-icon="mdi-account-circle" :subtitle="userData.email" variant="tonal">
        <template #title>
          <span class="font-weight-bold text-h6">{{ userData.fullname }}</span>
        </template>
      </v-card>

      <div class="pa-2">
        <v-btn
          color="grey-darken-3"
          class="font-weight-bold"
          prepend-icon="mdi-logout"
          @click="onLogout"
          block
        >
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
