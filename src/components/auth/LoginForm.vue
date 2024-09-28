<script setup>
import { requiredValidator, emailValidator } from '@/utils/validators'
import { ref } from 'vue'

const formDataDefault = {
  username: '',
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
          v-model="formData.username"
          :rules="[requiredValidator, emailValidator]"
          label="Username"
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

    <v-btn class="mt-2" type="submit" color="grey-darken-3" variant="elevated" block>Submit</v-btn>
  </v-form>
</template>
