<script setup>
const props = defineProps(['formSuccessMessage', 'formErrorMessage'])
</script>

<template>
  <v-row>
    <v-col cols="12" v-if="props.formSuccessMessage">
      <v-alert
        :text="props.formSuccessMessage"
        title="Success"
        type="success"
        variant="tonal"
        closable
      ></v-alert>
    </v-col>
    <v-col cols="12" v-if="props.formErrorMessage">
      <v-alert
        :text="props.formErrorMessage"
        title="Ooops!"
        type="error"
        variant="tonal"
        closable
      ></v-alert>
    </v-col>
  </v-row>
</template>
