<script setup>
import { requiredValidator } from "@/utils/validators.js"
import { formActionDefault } from '@/utils/supabase.js'
import AlertNotification from '@/components/common/AlertNotification.vue'
import { toRaw } from "vue"
const props = defineProps(["prescribedPeriod", "dateTimeForwarded", "reportType"]);
const emit = defineEmits(['formSubmitted']);
import { ref } from "vue"
const isOpen = ref(false)
const refVForm = ref()
const formAction = ref({
    ...formActionDefault,

})
const formData = ref({
    prescribedPeriod: props.prescribedPeriod,
    numWorkingDays: '',
    reviewedBy: '',
    dateTimeForwarded: ''
})
//cleans state onClose
const onClose = () => {
    isOpen.value = false
    formAction.value = { ...formActionDefault }
}


const onFormSubmit = () => {
    refVForm.value?.validate().then(({ valid }) => {
        if (valid) {
            //let the parent component handle this event
            const rawFormData = toRaw(formData)
            emit('formSubmitted', { ...rawFormData, reportType: props.reportType })
        }
        else formAction.value = {
            ...formActionDefault,
            formErrorMessage: "Something went wrong in the form"
        }
    })
}
</script>

<template>
    <v-btn :text="`Click to Fill ${props.reportType.toUpperCase()} Specifics`" variant="elevated"
        @click="isOpen = true"></v-btn>
    <v-dialog v-model="isOpen" max-width="900">
        <v-card title="IPAR Specifics">
            <AlertNotification :form-success-message="formAction.formSuccessMessage"
                :form-error-message="formAction.formErrorMessage"></AlertNotification>
            <v-card-text>
                <v-form ref="refVForm" @onSubmit.prevent="onFormSubmit">
                    <v-row dense>
                        <v-col>
                            <v-text-field readonly v-model="props.prescribedPeriod" label="Prescribed Period"
                                :rule="requiredValidator"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field :label="props.dateTimeForwarded" v-model="formData.dateTimeForwaded"
                                :rule="requiredValidator"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field label="No. of Working Days/ Working Hours/ Calendar Days Acted Upon"
                                v-model="formData.numWorkingDays" :rules="[requiredValidator]">
                            </v-text-field>
                        </v-col>
                        <v-col v-if="props.reportType === 'Asst. DC/Sr. BMS'">
                            <v-text-field label="Reviewed By" v-model="formData.reviewedBy"
                                :rules="[requiredValidator]">
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Close" variant="tonal" @click="onClose"></v-btn>
                <v-btn text="Confirm" variant="elevated" @click="onFormSubmit"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
