<script setup>
import { useAuthUserStore } from '@/stores/authUser'
import { useDisplay } from 'vuetify'

// Use Pinia Store
const authStore = useAuthUserStore()

// Utilize pre-defined vue functions
const { mobile } = useDisplay()
</script>

<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="4">
          <v-img class="mx-auto" src="/images/logo-dbm.png" :width="mobile ? '80%' : '40%'"></v-img>
        </v-col>

        <v-col cols="12" md="8">
          <h2 class="mb-5">
            Welcome Aboard,
            <span class="font-weight-black">
              {{ authStore.userData.firstname + ' ' + authStore.userData.lastname }}!
            </span>
          </h2>

          <p class="text-justify">
            Welcome to the DBM HRPMS System! Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Rem minima quam nobis. Rem quibusdam, laudantium veniam aliquid repudiandae
            temporibus, cupiditate eos officiis dolorem suscipit repellendus doloribus ipsum iste
            placeat odit!
          </p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
