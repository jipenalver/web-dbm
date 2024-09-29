<script setup>
import { useDisplay } from 'vuetify'
import { ref } from 'vue'

const emit = defineEmits(['isDrawn'])

const props = defineProps({
  isWithIcon: {
    type: Boolean,
    default: true
  }
})

const { mobile } = useDisplay()
const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-layout>
        <v-app-bar
          image="/images/header-dbm-bg.jpg"
          class="px-3"
          :class="theme === 'light' ? 'bg-grey-lighten-2' : ''"
        >
          <v-app-bar-nav-icon
            v-if="props.isWithIcon"
            icon="mdi-menu"
            variant="tonal"
            :theme="theme"
            @click.stop="emit('isDrawn')"
          >
          </v-app-bar-nav-icon>

          <v-img src="/images/header-dbm.png"></v-img>

          <v-spacer v-if="!mobile"></v-spacer>
          <v-spacer v-if="!mobile"></v-spacer>
          <v-spacer v-if="!mobile"></v-spacer>

          <v-btn
            variant="elevated"
            :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
            slim
            @click="onClick"
          ></v-btn>
        </v-app-bar>

        <slot name="navigation"></slot>

        <v-main>
          <v-container>
            <slot name="content"></slot>
          </v-container>
        </v-main>

        <v-footer :class="theme === 'light' ? 'bg-grey-lighten-2' : ''" border app>
          2024 — Department of Budget and Management
        </v-footer>
      </v-layout>
    </v-app>
  </v-responsive>
</template>
