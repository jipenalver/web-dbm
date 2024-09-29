<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar
        class="px-3 d-flex justify-space-between"
        :class="theme === 'light' ? 'bg-grey-lighten-2' : ''"
      >
        <v-spacer></v-spacer>

        <v-btn
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <slot name="content"></slot>
        </v-container>
      </v-main>

      <v-footer :class="theme === 'light' ? 'bg-grey-lighten-2' : ''" border>
        2024 — Department of Budget and Management
      </v-footer>
    </v-app>
  </v-responsive>
</template>
