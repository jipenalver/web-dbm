<script setup>
import AlertNotification from '@/components/common/AlertNotification.vue'
import { formActionDefault } from '@/utils/formUtils'
import { supabase, storeUserData } from '@/utils/supabase'
import { requiredValidator, emailValidator } from '@/utils/validators'
import { ref } from 'vue'

const formDataDefault = {
  email: '',
  password: ''
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

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.value.email,
    password: formData.value.password
  })

  if (error) {
    formAction.value.formStatus = error.status
    formAction.value.formErrorMessage = error.message
  } else if (data) {
    formAction.value.formSuccessMessage = 'Login Successful.'
    storeUserData(data)
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
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  />

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
