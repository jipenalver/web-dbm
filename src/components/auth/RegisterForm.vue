<script setup>
import { supabase } from '@/utils/supabase'
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator
} from '@/utils/validators'
import { ref } from 'vue'

const formDataDefault = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password_confirmation: ''
}

const formData = ref({
  ...formDataDefault
})

const refVForm = ref()

const onSubmit = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password,
    options: {
      data: {
        firstname: formData.value.firstname,
        lastname: formData.value.lastname
      }
    }
  })

  console.log(data)
  console.error(error)
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
      <v-col cols="12" md="6">
        <v-text-field
          v-model="formData.firstname"
          :rules="[requiredValidator]"
          label="Firstname"
          variant="outlined"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="formData.lastname"
          :rules="[requiredValidator]"
          label="Lastname"
          variant="outlined"
        />
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="formData.email"
          :rules="[requiredValidator, emailValidator]"
          label="Email Address"
          variant="outlined"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="formData.password"
          :rules="[requiredValidator, passwordValidator]"
          label="Password"
          type="password"
          variant="outlined"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="formData.password_confirmation"
          :rules="[
            requiredValidator,
            confirmedValidator(formData.password_confirmation, formData.password)
          ]"
          label="Password Confirmation"
          type="password"
          variant="outlined"
        />
      </v-col>
    </v-row>

    <v-btn
      class="mt-2 font-weight-bold"
      type="submit"
      color="grey-darken-3"
      prepend-icon="mdi-account-plus"
      size="large"
      block
    >
      Register
    </v-btn>
  </v-form>
</template>
