<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { ref, onMounted, computed } from "vue"
import { requiredValidator } from '@/utils/validators'
import { useDate } from 'vuetify'
import { fetchScoreboardOptions } from '@/api/scoreboard'
const reports = ['OPAR', 'DPAR', 'IPAR', 'Asst. DC/Sr. BMS']
//how about not making this as state since this will be static
const options = ref({})
const typesOfTransaction = ref([])

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

  }
}
const formData = ref({
  ...formDataDefault
})

//transforms the transactions list from supabase into list of strings
const transactionOptions = computed(() => {
  return typesOfTransaction.value.map((transaction) => (transaction.transaction_type))
})
const prescribedPeriodValues = computed(() => {
  //iterate each reports and create prescribed value for each reports
  let prescribedValues = {}
  reports.forEach((report) => {
    const result = Array.isArray(typesOfTransaction.value) && formData.value.typeOfTransaction.length !== 0 ? typesOfTransaction.value.find((transaction) => (
      transaction.transaction_type === formData.value.typeOfTransaction
    )).prescribed_periods.find((prescribedPeriod) => (
      prescribedPeriod.report === report
    )).prescribed_period_value : 'Choose Transaction Type'

    if (report === 'Asst. DC/Sr. BMS') {
      prescribedValues['dcsr'] = result
    } else {
      prescribedValues[report.toLowerCase()] = result
    }
  })
  return prescribedValues
})
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
          <div>{{ prescribedPeriodValues }}</div>
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
            <v-col>
              <v-text-field label="Prescribed Period" readonly v-model="prescribedPeriodValues.opar"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Prescribed Period for IPAR" readonly
                v-model="prescribedPeriodValues.ipar"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Prescribed Period for DPAR" readonly
                v-model="prescribedPeriodValues.dpar"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Prescribed Period for DCSR" readonly
                v-model="prescribedPeriodValues.dcsr"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </template>
  </AppLayout>
</template>
