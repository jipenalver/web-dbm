<script setup>
import { useDisplay } from 'vuetify'
import AppLayout from '@/components/layout/AppLayout.vue'
import LoginForm from '@/components/auth/LoginForm.vue'

const { mobile } = useDisplay()
</script>

<template>
  <AppLayout :is-with-app-bar-nav-icon="false">
    <template #content>
      <v-container fluid>
        <v-row>
          <v-col cols="12" lg="8" class="d-flex align-center">
            <v-img v-if="!mobile" aspect-ratio="16/9" height="600" src="/images/banner-dbm-caraga.jpg"></v-img>
          </v-col>

          <v-col cols="12" lg="4">
            <v-card class="mx-auto" variant="tonal">
              <template #title>
                <div class="text-center">
                  <h1 class="font-weight-black">DBM | HR-PMS</h1>

                  <v-divider />

                  <h2>Login</h2>
                </div>
              </template>

              <v-card-text class="pt-4">
                <v-img class="mx-auto mb-5" :width="mobile ? '80%' : '300'" aspect-ratio="16/9" cover
                  src="/images/logo-dbm.png" />

                <v-divider class="mb-5" />

                <LoginForm />

                <v-divider class="my-5" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>
