<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { ref, onMounted, computed } from "vue"
import { supabase } from "@/utils/supabase.js"
import { requiredValidator } from '@/utils/validators'
import { useDate } from 'vuetify'

//how about not making this as state since this will be static
const paps = ref([])
const tsInCharge = ref([])
const natureOfRequest = ref([])
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
}
const formData = ref({
  ...formDataDefault
})

//computes prescribed period value based on selected type of transaction
const prescribedPeriod = computed(() => {
  return Array.isArray(typesOfTransaction.value) && formData.value.typeOfTransaction.length !== 0 ? typesOfTransaction.value.find((transaction) => {
    return transaction.transaction_type == formData.value.typeOfTransaction
  }).prescribed_periods[0].prescribed_period_value : 'Hello world'
})
const transactionOptions = computed(() => {
  return typesOfTransaction.value.map((transaction) => (transaction.transaction_type))
})

//this will be called to be called at once to avoid duplication
//fetches list of pap's
const fetchPaps = async () => {
  const { data: papResults, error } = await supabase.from("pap").select("code")
  if (error) {
    return { error: "Error fetching P/A/P data" }
  }
  paps.value = papResults.map((pap) => (pap.code))
}
const fetchTypeOfTransactionList = async (prescribedPeriod = false) => {
  //fetch with its associated prescribed period
  if (prescribedPeriod) {
    const { data: typeOfTransactionResult, error } = await supabase.from("type_of_transactions")
      .select("transaction_type, prescribed_periods(prescribed_period_value)")
    if (error) {
      return { error: "Error fetching list of transactions type with prescribed periods data" }
    }
    typesOfTransaction.value = typeOfTransactionResult
    return
  }
  const { data: typeOfTransactionResult, error } = await supabase.from("type_of_transactions").select("transaction_type")
  if (error) {
    return { error: "Error fetching list of transactions type data" }
  }
  typesOfTransaction.value = typeOfTransactionResult.map((transaction) => (transaction.transaction_type))
}

const fetchTs = async () => {
  const { data: tsResults, error } = await supabase.from("ts_in_charge").select("name")
  if (error) {
    return { error: "Error fetching list of TS in Charge" }
  }

  tsInCharge.value = tsResults.map((ts) => ts.name)
}
const fetchNatureOfRequest = async () => {
  const { data: norList, error } = await supabase.from("nature_of_transaction").select("noq_name")
  if (error) {
    return { error: "Error fetching list of Nature of Request" }
  }
  natureOfRequest.value = norList.map((ts) => ts.noq_name)

}

onMounted(async () => {
  await fetchPaps()
  await fetchTs()
  await fetchNatureOfRequest()
  await fetchTypeOfTransactionList(true)
})
</script>


<template>
  <AppLayout>
    <template #content>
      <v-container>
        <v-form @submit.prevent>
          <v-row>
            <v-col>
              <v-select label="Choose P/A/P" :items="paps" :rules="[requiredValidator]" outlined
                v-model="formData.particulars.pap">
              </v-select>
            </v-col>
            <v-col>
              <v-select label="Choose TS in Charge" :items="tsInCharge" :rules="[requiredValidator]" outlined
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
              <v-select label="Choose Nature of Transaction" :items="natureOfRequest" :rules="[requiredValidator]"
                outlined v-model="formData.particulars.natureOfRequest">
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
              <v-text-field label="Prescribed Period" readonly v-model="prescribedPeriod"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </template>
  </AppLayout>
</template>
