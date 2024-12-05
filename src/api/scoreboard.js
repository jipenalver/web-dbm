import { supabase } from '@/utils/supabase.js'
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
  const { data: tsResults, error } = await supabase.from('ts_in_charge').select('name')
  if (error) {
    throw new Error(error)
  }

  return tsResults.map((ts) => ts.name)
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
  //const { data, error } = await supabase
  //  .from('pap')
  //  .select('id')
  //  .eq('code', formData.particulars.pap)
  //if (error) return error
  //console.log(data)
}
