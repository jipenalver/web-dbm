<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { ref, onMounted, computed, toRaw } from "vue"
import { requiredValidator } from '@/utils/validators'
import { useDate } from 'vuetify'
import { fetchScoreboardOptions, insertScoreboardData } from '@/api/scoreboard'
import { formActionDefault } from '@/utils/supabase.js'
import ScoreboardFormDialog from "@/components/system/scoreboard/ScoreboardFormDialog.vue"
import SideNavigation from '@/components/layout/navigation/SideNavigation.vue'

const reports = ['OPAR', 'DPAR', 'IPAR', 'Asst. DC/Sr. BMS']
const options = ref({})
const timeMenu = ref(false)
const formVRef = ref()
const typesOfTransaction = ref([])
const formAction = ref({ ...formActionDefault })
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
  formData.value.dateRecievedRecordSection
))

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

const handleFormSubmit = async () => {
  formAction.value.formProcess = true

  //i have to manually unwraped the proxied nested objects in these ref (will ask for suggestions)
  const { data, error } = await insertScoreboardData({ ...formData.value, particulars: { ...formData.value.particulars }, reportsData: [...formData.value.reportsData] })
  if (error) {
    console.log("Error inserting data into scoreboard")
  }
  formAction.value.formProcess = false

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
    <template #navigation>
      <SideNavigation :is-drawer-visible="isDrawerVisible"></SideNavigation>
    </template>
    <template #content>
      <v-container>
        <v-form ref="formVRef" @submit.prevent="handleFormSubmit">
          <v-row>
            <v-col>
              <v-select label="Choose P/A/P" :items="options.pap" item-title="code" item-value="id"
                :rules="[requiredValidator]" outlined v-model="formData.particulars.pap">
              </v-select>
            </v-col>
            <v-col>
              <v-select label="Choose TS in Charge" :items="options.tsInCharge" item-title="name" item-value="tic_id"
                :rules="[requiredValidator]" outlined v-model="formData.particulars.ts">
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col> <v-text-field :rules="[requiredValidator]" label="Agency Name" v-model="formData.particulars.agency"
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
              <v-text-field :rule="requiredValidator" label="DMS Reference Number" v-model="formData.dmsReferenceNumber"
                outlined clearable>
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
                prepend-inner-icon="mdi-clock-time-four-outline" readonly>

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
              <v-select :items="typesOfTransaction" item-title="transaction_type" item-value="transaction_type"
                v-model="formData.typeOfTransaction" outlined label="Choose Type of Transaction"></v-select>
            </v-col>
          </v-row>
          <v-row v-if="prescribedPeriodValues.length !== 0">
            <v-col v-for="(value, key) in prescribedPeriodValues">
              <ScoreboardFormDialog @form-submitted="handleDialogFormSubmit"
                :reportType="{ report_name: value.report.report_name, report_id: value.report.report_id }"
                :prescribedPeriod="{ prescribedPeriodValue: value.prescribed_period_value, prescribedPeriodId: value.prescribed_periods_id }"
                :dateTimeForwarded="value.report.date_time_forwarded_to" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Remarks" v-model="formData.remarks">

              </v-text-field>
            </v-col>
            <v-col>
              <v-select v-model="formData.status" :items="options.statuses" item-title="status_name" item-value="id"
                label="Status" outlined></v-select>
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
          <v-row dense>
            <v-spacer></v-spacer>
            <v-btn text="Submit Form" type="submit" color="red-darken-4" :loading="formAction.formProcess"
              :disabled="formAction.formProcess"></v-btn>
          </v-row>
        </v-form>
      </v-container>
    </template>
  </AppLayout>
</template>
