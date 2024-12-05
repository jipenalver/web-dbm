<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { ref, onMounted, computed, toRaw } from "vue"
import { requiredValidator } from '@/utils/validators'
import { useDate } from 'vuetify'
import { fetchScoreboardOptions } from '@/api/scoreboard'
import ScoreboardFormDialog from "@/components/system/scoreboard/ScoreboardFormDialog.vue"

const reports = ['OPAR', 'DPAR', 'IPAR', 'Asst. DC/Sr. BMS']
const options = ref({})
const timeMenu = ref(false)
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
  dateReceivedRecordSection: new Date(Date.now()),
  timeReceivedRecordSection: '',
  typeOfTransaction: '',
  reportsData: [],
  status: '',
  remarks: '',
  outputReleasedDocuments: '',
  cssSubmissionDate: '',
}
const formData = ref({
  ...formDataDefault
})
const formattedDate = computed(() => (
  formData.value.datRecievedRecordSection
))
//transforms the transactions list from supabase into list of strings
const transactionOptions = computed(() => {
  return typesOfTransaction.value.map((transaction) => (transaction.transaction_type))
})

//computes the prescribed period values for each report type
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
const handleDialogFormSubmit = (formDialogData) => {

  const reportsData = formData.value.reportsData.filter((reportData) => (
    reportData.reportType !== formDialogData.reportType
  ))
  formData.value.reportsData = [...reportsData, formDialogData]
}

const handleFormSubmit = () => {
  console.log("Form submitted")
  console.log(formData.value.reportsData)
}
onMounted(async () => {
  //refactor to fetch at once
  const [natureOfRequestData, tsInChargeData, papData, typeOfTransactionData, statuses] = await fetchScoreboardOptions()
  options.value = {
    natureOfRequest: natureOfRequestData,
    tsInCharge: tsInChargeData,
    pap: papData,
    statuses: statuses,
  }
  typesOfTransaction.value = typeOfTransactionData
})
</script>


<template>
  <AppLayout>
    <template #content>
      <v-container>
        <v-form @submit.prevent="handleFormSubmit">
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
            <v-col> <v-text-field :rule="requiredValidator" label="Agency Name" v-model="formData.particulars.agency"
                outlined clearable>
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
          </v-row>
          <v-row>
            <v-col>
              <v-date-input label="Date and Time received by The Records Section" prepend-inner-icon="$calendar"
                prepend-icon="" v-model="formData.dateReceivedRecordSection"
                :rules="[requiredValidator]"></v-date-input>
            </v-col>
            <v-col>
              <v-text-field v-model="formData.timeReceivedRecordSection" label="Pick Time" :active="timeMenu"
                :focus="timeMenu" prepend-inner-icon="mdi-clock-time-four-outline" readonly>

                <v-menu v-model="timeMenu" :close-on-content-click="false" activator="parent"
                  transition="scale-transition">
                  <v-time-picker v-if="timeMenu" v-model="formData.timeReceivedRecordSection" format="24hr">
                  </v-time-picker>
                </v-menu>
              </v-text-field>
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
          <v-row>
            <v-col>
              <v-text-field label="Remarks" v-model="formData.remarks">

              </v-text-field>
            </v-col>
            <v-col>
              <v-select v-model="formData.status" :items="options.statuses" label="Status" outlined></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Output/Released Documents" v-model="formData.outputReleasedDocuments">

              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="CSS Submission Date" v-model="formData.cssSubmissionDate">

              </v-text-field>
            </v-col>
          </v-row>
          <v-btn text="Submit Form" type="submit"></v-btn>
        </v-form>
      </v-container>
    </template>
  </AppLayout>
</template>
