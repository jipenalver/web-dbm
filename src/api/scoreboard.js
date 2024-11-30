import { supabase } from '@/utils/supabase.js'
//fetching functionality for scoreboard related data
const fetchPaps = async () => {
  const { data: papResults, error } = await supabase.from('pap').select('code')
  if (error) {
    return { error: 'Error fetching P/A/P data' }
  }
  return papResults.map((pap) => pap.code)
}
const fetchTypeOfTransactionList = async (prescribedPeriod = false) => {
  //fetch transactions with its associated prescribed period value and the report it belongs

  if (prescribedPeriod) {
    const { data: typeOfTransactionResult, error } = await supabase
      .from('type_of_transactions')
      .select(
        'transaction_type, prescribed_periods(prescribed_period_value, report:reports(report_name))'
      )
    if (error) {
      return { error: 'Error fetching list of transactions type with prescribed periods data' }
    }

    //transform since i cant flat the nesting result given by supabase
    return typeOfTransactionResult.map((transactionInstance) => ({
      ...transactionInstance,
      prescribed_periods: transactionInstance.prescribed_periods.map((prescribedPeriod) => ({
        ...prescribedPeriod,
        report: prescribedPeriod.report.report_name
      }))
    }))
  }

  const { data: typeOfTransactionResult, error } = await supabase
    .from('type_of_transactions')
    .select('transaction_type')
  if (error) {
    return { error: 'Error fetching list of transactions type data' }
  }
  return typeOfTransactionResult.map((transaction) => transaction.transaction_type)
}
const fetchTs = async () => {
  const { data: tsResults, error } = await supabase.from('ts_in_charge').select('name')
  if (error) {
    return { error: 'Error fetching list of TS in Charge' }
  }

  return tsResults.map((ts) => ts.name)
}

const fetchNatureOfRequest = async () => {
  const { data: norList, error } = await supabase.from('nature_of_transaction').select('noq_name')
  if (error) {
    return { error: 'Error fetching list of Nature of Request' }
  }
  return norList.map((ts) => ts.noq_name)
}
export async function fetchScoreboardOptions() {
  try {
    return await Promise.all([
      fetchNatureOfRequest(),
      fetchTs(),
      fetchPaps(),
      fetchTypeOfTransactionList(true)
    ])
  } catch (error) {
    return { error }
  }
}
