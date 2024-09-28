<script setup>
import { formActionDefault } from '@/utils/formUtils'
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

const formAction = ref({
  ...formActionDefault
})

const refVForm = ref()

const onSubmit = async () => {
  formAction.value = { ...formActionDefault }
  formAction.value.formProcess = true

  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password,
    options: {
      data: {
        firstname: formData.value.firstname,
        lastname: formData.value.lastname
        // is_admin: true
      }
    }
  })

  if (error) {
    formAction.value.formStatus = error.status
    formAction.value.formErrorMessage = error.message
  }

  if (data) {
    formAction.value.formSuccessMessage = 'Successfully Registered Account.'
  }

  formAction.value.formProcess = false
  refVForm.value?.reset()
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) onSubmit()
  })
}
</script>

<template>
  <v-row>
    <v-col cols="12" v-if="formAction.formSuccessMessage">
      <v-alert
        class="mb-5"
        :text="formAction.formSuccessMessage"
        title="Success"
        type="success"
        variant="tonal"
        closable
      ></v-alert>
    </v-col>
    <v-col cols="12" v-if="formAction.formErrorMessage">
      <v-alert
        class="mb-5"
        :text="formAction.formErrorMessage"
        title="Ooops!"
        type="error"
        variant="tonal"
        closable
      ></v-alert>
    </v-col>
  </v-row>

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
      :loading="formAction.formProcess"
      :disabled="formAction.formProcess"
      block
    >
      Register
    </v-btn>
  </v-form>
</template>
