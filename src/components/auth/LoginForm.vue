<script setup>
import { requiredValidator, emailValidator } from '@/utils/validators'
import { ref } from 'vue'

const formDataDefault = {
  email: '',
  password: ''
}

const formData = ref({
  ...formDataDefault
})

const refVForm = ref()

const onSubmit = () => {
  alert('hello')
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) onSubmit()
  })
}
</script>

<template>
  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="formData.email"
          :rules="[requiredValidator, emailValidator]"
          label="Email Address"
          variant="outlined"
        />
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="formData.password"
          :rules="[requiredValidator]"
          label="Password"
          type="password"
          variant="outlined"
        />
      </v-col>
    </v-row>

    <v-btn
      class="mt-2 font-weight-bold"
      type="submit"
      color="grey-darken-3"
      prepend-icon="mdi-login"
      size="large"
      block
    >
      Login
    </v-btn>
  </v-form>
</template>
