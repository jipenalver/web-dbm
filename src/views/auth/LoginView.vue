<script setup>
import { useDisplay } from 'vuetify'
import AppLayout from '@/components/auth/layout/AppLayout.vue'
import LoginForm from '@/components/auth/LoginForm.vue'

const { mobile } = useDisplay()
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="12" lg="7"> </v-col>
        <v-col cols="12" lg="5">
          <v-card class="mx-auto" variant="tonal">
            <template #title>
              <div class="text-center">
                <h1 class="font-weight-black">DBM | HRMS</h1>

                <v-divider />

                <h2>Login</h2>
              </div>
            </template>

            <v-card-text class="pt-4">
              <v-img
                class="mx-auto mb-5"
                :width="mobile ? '80%' : '300'"
                aspect-ratio="16/9"
                cover
                src="/images/logo-dbm.png"
              />

              <v-divider class="mb-5" />

              <LoginForm />

              <v-divider class="my-5" />

              <h3 class="text-center mt-5">
                Don't have Account?
                <RouterLink class="font-weight-bold text-primary" to="/register">
                  Register Here
                </RouterLink>
              </h3>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>
