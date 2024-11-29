<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { ref, onMounted } from "vue"
import { supabase } from "@/utils/supabase.js"
import { requiredValidator } from '@/utils/validators'

const paps = ref([])
const tsInCharge = ref([])
const formDataDefault = {
  particulars: {
    pap: '',
    ts: '',
    agencyName: ''
  }
}
const formData = ref({
  ...formDataDefault
})

//this will be called to be called at once to avoid duplication
//fetches list of pap's
const fetchPaps = async () => {
  const { data: papResults, error } = await supabase.from("pap").select("code")
  if (error) {
    return { error: "Error fetching pap data" }
  }
  paps.value = papResults.map((pap) => (pap.code))
}
const fetchTs = async () => {
  const { data: tsResults, error } = await supabase.from("ts_in_charge").select("name")
  if (error) {
    return { error: "Error fetching list of TS in Charge" }
  }

  tsInCharge.value = tsResults.map((ts) => ts.name)
  console.log(tsResults)
}
onMounted(async () => {
  await fetchPaps()
  await fetchTs()
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
              <v-text-field :rule="requiredValidator" label="Agency Name" outlined clearable>
              </v-text-field>
            </v-col>
            <v-col>
              <v-select label="Choose Nature of Request" :items="tsInCharge" :rules="[requiredValidator]" outlined
                v-model="formData.particulars.ts">
              </v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </template>
  </AppLayout>
</template>
