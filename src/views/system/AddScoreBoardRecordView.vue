<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { ref, onMounted, computed } from "vue"
import { requiredValidator } from '@/utils/validators'
import { useDate } from 'vuetify'
import { fetchScoreboardOptions } from '@/api/scoreboard'
import ScoreboardFormDialog from "@/components/system/scoreboard/ScoreboardFormDialog.vue"

const reports = ['OPAR', 'DPAR', 'IPAR', 'Asst. DC/Sr. BMS']
const options = ref({})
const typesOfTransaction = ref([])
const dialogOpen = ref(false)
const formDataDefault = {
  particulars: {
    pap: '',
    ts: '',
    agencyName: '',
    natureOfRequest: '',
  },
  dmsReferenceNumber: '',
  datReceivedRecordSection: new Date(Date.now()),
  typeOfTransaction: '',
  ipar: {

  },
  dpar: {},
  opar: {},
  dcsr: {},
}
const formData = ref({
  ...formDataDefault
})

//transforms the transactions list from supabase into list of strings
const transactionOptions = computed(() => {
  return typesOfTransaction.value.map((transaction) => (transaction.transaction_type))
})

//returns the prescribed period values for each report type
const prescribedPeriodValues = computed(() => {
  //iterate each reports and create prescribed value for each reports based on the selected type of transaction
  if (Array.isArray(typesOfTransaction.value) && formData.value.typeOfTransaction.length !== 0) {
    const prescribedPeriodsResult = typesOfTransaction.value.find((transaction) => (
      transaction.transaction_type === formData.value.typeOfTransaction
    )).prescribed_periods
    return prescribedPeriodsResult
  }
  return []

})
const handleDialogFormSubmit = (formData) => {
  console.log(formData)
}
const handleFormSubmit = () => {
  console.log("Form submitted")
}
onMounted(async () => {
  //refactor to fetch at once
  const [natureOfRequestData, tsInChargeData, papData, typeOfTransactionData] = await fetchScoreboardOptions()
  options.value = {
    natureOfRequest: natureOfRequestData,
    tsInCharge: tsInChargeData,
    pap: papData,
  }
  typesOfTransaction.value = typeOfTransactionData
})
</script>


<template>
  <AppLayout>
    <template #content>
      <v-container>
        <v-form @submit.prevent>
          <v-row>
            <v-col>
              <v-select label="Choose P/A/P" :items="options.pap" :rules="[requiredValidator]" outlined
                v-model="formData.particulars.pap">
              </v-select>
            </v-col>
            <v-col>
              <v-select label="Choose TS in Charge" :items="options.tsInCharge" :rules="[requiredValidator]" outlined
                v-model="formData.particulars.ts">
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field :rule="requiredValidator" label="Agency Name" v-model="formData.particulars.agency" outlined
                clearable>
              </v-text-field>
            </v-col>
            <v-col>
              <v-select label="Choose Nature of Transaction" :items="options.natureOfRequest"
                :rules="[requiredValidator]" outlined v-model="formData.particulars.natureOfRequest">
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field :rule="requiredValidator" label="DMS Reference Number"
                v-model="formData.particulars.dmsReferenceNumber" outlined clearable>
              </v-text-field>
            </v-col>
            <v-col>
              <v-date-picker v-model="formData.datReceivedRecordSection"></v-date-picker>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select :items="transactionOptions" v-model="formData.typeOfTransaction" outlined
                label="Choose Type of Transaction"></v-select>
            </v-col>
          </v-row>
          <v-row v-if="prescribedPeriodValues.length !== 0">
            <v-col v-for="(value, key) in prescribedPeriodValues">
              <ScoreboardFormDialog @form-submitted="handleDialogFormSubmit" :reportType="value.report.report_name"
                :prescribedPeriod="value.prescribed_period_value"
                :dateTimeForwarded="value.report.date_time_forwarded_to" />
            </v-col>
          </v-row>
          <v-btn text="Submit Form" @action="handleFormSubmit"></v-btn>
        </v-form>
      </v-container>
    </template>
  </AppLayout>
</template>
