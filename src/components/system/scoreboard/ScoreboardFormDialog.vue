<script setup>
import { requiredValidator } from "@/utils/validators.js"
import { formActionDefault } from '@/utils/supabase.js'
import AlertNotification from '@/components/common/AlertNotification.vue'
import { onMounted, reactive, computed } from "vue"
const props = defineProps(["prescribedPeriod", "dateTimeForwarded", "reportType"]);
const emit = defineEmits(['formSubmitted']);
import { ref } from "vue"
import { useDate } from "vuetify"


const date = useDate()
const formDataDefault = {
    prescribedPeriod: props.prescribedPeriod,
    numWorkingDays: '',
    reviewedBy: '',
    dateForwarded: new Date(Date.now()),
    timeForwarded: ''
}

const timeMenu = ref(false)
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

    return date.format('2010-04-13', "keyboardDate")
})

//let the parent component handle this event
const onFormSubmit = () => {
    refVForm.value?.validate().then(({ valid }) => {
        if (valid) {
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
    <v-btn :text="`Click to Fill ${props.reportType.report_name.toUpperCase()} Specifics`" variant="elevated"
        @click="isOpen = true"></v-btn>
    <v-dialog v-model="isOpen" max-width="900">
        <v-card :title="props.reportType.report_name + ' Specifics'">
            <AlertNotification :form-success-message="formAction.formSuccessMessage"
                :form-error-message="formAction.formErrorMessage"></AlertNotification>
            <v-card-text>
                <v-form ref="refVForm" @submit.prevent="onFormSubmit">
                    <v-row dense>
                        <v-col>
                            <v-text-field readonly v-model="props.prescribedPeriod" label="Prescribed Period"
                                :rule="requiredValidator"></v-text-field>
                        </v-col>

                    </v-row>
                    <v-row>
                        <v-col>
                            <v-date-input :label="props.dateTimeForwarded" :rules="[requiredValidator]"
                                v-model="formData.dateForwarded" prepend-icon=""
                                prepend-inner-icon="$calendar"></v-date-input>

                        </v-col>
                        <v-col>
                            <v-text-field v-model="formData.timeForwarded" label="Pick Time" :active="timeMenu"
                                prepend-inner-icon="mdi-clock-time-four-outline" readonly>

                                <v-menu v-model="timeMenu" :close-on-content-click="false" activator="parent"
                                    transition="scale-transition">
                                    <v-time-picker v-if="timeMenu" v-model="formData.timeForwarded" format="24hr">
                                    </v-time-picker>
                                </v-menu>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field label="No. of Working Days/ Working Hours/ Calendar Days Acted Upon"
                                v-model="formData.numWorkingDays" :rules="[requiredValidator]">
                            </v-text-field>
                        </v-col>
                        <v-col v-if="props.reportType.report_name === 'Asst. DC/Sr. BMS'">
                            <v-text-field label="Reviewed By" v-model="formData.reviewedBy"
                                :rules="[requiredValidator]">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text="Close" variant="tonal" type="button" @click="onClose"></v-btn>
                        <v-btn text="Confirm" variant="elevated" type="submit"></v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>

        </v-card>
    </v-dialog>
</template>
