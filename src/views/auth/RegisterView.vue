<script setup>
import { useDisplay } from 'vuetify'
import AppLayout from '@/components/layout/AppLayout.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'

const { mobile } = useDisplay()
</script>

<template>
  <AppLayout :is-with-icon="false">
    <template #content>
      <v-row>
        <v-col cols="12" lg="7" class="d-flex align-center">
          <v-img
            v-if="!mobile"
            aspect-ratio="16/9"
            height="600"
            src="/images/banner-dbm-caraga.jpg"
          ></v-img>
        </v-col>
        <v-col cols="12" lg="5">
          <v-card class="mx-auto" variant="tonal">
            <template #title>
              <div class="text-center">
                <h1 class="font-weight-black">DBM | HR-PMS</h1>

                <v-divider />

                <h2>Sign-up</h2>
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

              <RegisterForm />

              <v-divider class="my-5" />

              <h3 class="text-center">
                Already have Account?
                <RouterLink class="font-weight-bold text-primary" to="/">
                  Click here to Login
                </RouterLink>
              </h3>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>
