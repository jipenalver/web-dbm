<script setup>
import { requiredValidator } from "@/utils/validators.js"
import { formActionDefault } from '@/utils/supabase.js'
import AlertNotification from '@/components/common/AlertNotification.vue'
import { onMounted, reactive, computed } from "vue"
const props = defineProps(["prescribedPeriod", "dateTimeForwarded", "reportType"]);
const emit = defineEmits(['formSubmitted']);
import { ref } from "vue"

const formDataDefault = {
    prescribedPeriod: props.prescribedPeriod,
    numWorkingDays: '',
    reviewedBy: '',
    dateTimeForwarded: new Date(Date.now())
}

const dateMenu = ref(false)
const isOpen = ref(false)
const refVForm = ref()
const formAction = ref({
    ...formActionDefault,

})
const formData = ref({ ...formDataDefault })
//cleans state onClose
const onClose = () => {
    isOpen.value = false
    formAction.value = { ...formActionDefault }
    formData.value = { ...formDataDefault }
}
//havent formatted it yet
const formattedDate = computed(() => {
    return formData.value.dateTimeForwarded
})
//let the parent component handle this event
const onFormSubmit = () => {
    refVForm.value?.validate().then(({ valid }) => {
        if (valid) {
            //close modal
            isOpen.value = false
            emit('formSubmitted', { ...formData.value, reportType: props.reportType })
        }
        else formAction.value = {
            ...formActionDefault,
            formErrorMessage: "Something went wrong in the form"
        }
    })

}
onMounted(() => {
    console.log("Dialogs have been mounted")

})</script>

<template>
    <v-btn :text="`Click to Fill ${props.reportType.toUpperCase()} Specifics`" variant="elevated"
        @click="isOpen = true"></v-btn>
    <v-dialog v-model="isOpen" max-width="900">
        <v-card :title="props.reportType + ' Specifics'">
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
                            <v-menu v-model="dateMenu">
                                <template v-slot:activator="{ props: menuProps }">
                                    <v-text-field v-bind="menuProps" :label="props.dateTimeForwarded"
                                        v-model="formattedDate" :rule="requiredValidator"></v-text-field>
                                </template>
                                <v-date-picker v-model="formData.dateTimeForwarded"
                                    @update:model-value="dateMenu = false"></v-date-picker>
                            </v-menu>
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
