import { supabase } from '@/utils/supabase.js'
import { toRaw } from 'vue'
import { combineDateTime } from '@/utils/helpers'
//fetching functionality for scoreboard related data
const fetchPaps = async () => {
  const { data: papResults, error } = await supabase.from('pap').select('id, code')
  if (error) {
    throw new Error(error)
  }
  return papResults
}
const fetchTypeOfTransactionList = async (prescribedPeriod = false) => {
  //fetch transactions with its associated prescribed period value and the report it belongs

  if (prescribedPeriod) {
    const { data: typeOfTransactionResult, error } = await supabase
      .from('type_of_transactions')
      .select(
        'transaction_type, prescribed_periods(prescribed_period_value, report:reports(report_id, report_name, date_time_forwarded_to))'
      )
    if (error) {
      throw new Error(error)
    }
    console.log(typeOfTransactionResult)
    return typeOfTransactionResult
  }

  const { data: typeOfTransactionResult, error } = await supabase
    .from('type_of_transactions')
    .select('transaction_type')
  if (error) {
    throw new Error(error)
  }
  return typeOfTransactionResult.map((transaction) => transaction.transaction_type)
}
const fetchTs = async () => {
  const { data: tsResults, error } = await supabase.from('ts_in_charge').select('tic_id, name')
  if (error) {
    throw new Error(error)
  }
  console.log(tsResults)
  return tsResults
}

const fetchNatureOfRequest = async () => {
  const { data: norList, error } = await supabase.from('nature_of_transaction').select('noq_name')
  if (error) {
    throw new Error(error)
  }
  return norList.map((ts) => ts.noq_name)
}
const fetchStatuses = async () => {
  const { data, error } = await supabase.from('status').select('id, status_name')
  if (error) {
    throw new Error(error)
  }
  console.log(data)
  return data
}
export const fetchScoreboardOptions = async () => {
  try {
    return await Promise.all([
      fetchNatureOfRequest(),
      fetchTs(),
      fetchPaps(),
      fetchTypeOfTransactionList(true),
      fetchStatuses()
    ])
  } catch (error) {
    return { error }
  }
}

//this calls a lot of supabase trip bc I did not store the ids of these foreign values for scoreboard
export const insertScoreboardData = async (formData) => {
  console.log(formData)
  const { reportsData, ...extractedFormData } = formData

  //setting timestamp, combining selected date and time
  const combinedDateTime = combineDateTime(
    extractedFormData.dateReceivedRecordSection,
    extractedFormData.timeReceivedRecordSection
  )

  const { data, error } = await supabase
    .from('scoreboard_records')
    .insert({
      pap_id: extractedFormData.particulars.pap,
      ts_in_charge_id: extractedFormData.particulars.ts,
      transaction_type: extractedFormData.typeOfTransaction,
      agency_name: extractedFormData.particulars.agency,
      dms_reference_number: extractedFormData.dmsReferenceNumber,
      date_time_received: combinedDateTime,
      remarks: extractedFormData.remarks,
      status_id: extractedFormData.status
    })
    .select('scoreboard_id')
  if (error) {
    console.log(error)
    return { error: error }
  }
  const transformedReportData = reportsData.map((reportItem) => {
    const combinedDateTime = combineDateTime(reportItem.dateForwarded, reportItem.timeForwarded)
    return {
      report_id: reportItem.reportType.report_id,
      scoreboard_id: data[0].scoreboard_id,
      date_time_forwarded: combinedDateTime,
      num_working_time: reportItem.numWorkingDays
    }
  })
  const { reportError } = await supabase.from('report_records').insert(transformedReportData)
  if (reportError) {
    console.log(reportError)
    return { error: reportError }
  }
  return { data: `Succesfully inserted with scoreboard id ${data[0].scoreboard_id}` }
}
