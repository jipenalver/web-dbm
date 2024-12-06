import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase, tablePagination } from '@/utils/supabase.js'
export const useScoreboardStore = defineStore('scoreboard', () => {
  const scoreboardTable = ref([])
  const scoreboardTotal = ref(0)

  function $reset() {
    scoreboardTable.value = []
    scoreboardTotal.value = 0
  }

  async function getScoreboardPaginated({ currentPage, perPage, column }) {
    const { data, error } = await supabase
      .from('scoreboard_records')
      .select(
        'scoreboard_id, agency_name, css_submission_date, date_time_received,dms_reference_number, output_released_documents,remarks, pap:pap(code), ts:ts_in_charge(name), transaction_type:type_of_transactions(transaction_type), report_records:report_records(date_time_forwarded, num_working_time, prescribed_period:prescribed_periods(prescribed_period_value), report:reports(report_name)), status:status(status_name)'
      )
    if (error) {
      console.log('Error occured:', error)
      return { error }
    }
    //data transformation to fit into table
    const scoreboardData = data.map((scoreboardData) => {
      let reportsObj = {}
      scoreboardData.report_records.forEach((reportData) => {
        if (reportData.report.report_name === 'Asst. DC/Sr. BMS') {
          reportsObj = {
            ...reportsObj,
            date_time_forwarded_bms: reportData.date_time_forwarded,
            num_working_days_bms: reportData.num_working_time,
            reviewed_by_bms: 'test',
            prescribed_period_bms: reportData.prescribed_period?.prescribed_period_value
          }
          return
        }
        const lowerReportName = reportData.report.report_name.toLowerCase()
        reportsObj = {
          ...reportsObj,
          [`date_time_forwarded_${lowerReportName}`]: reportData.date_time_forwarded,
          [`num_working_days_${lowerReportName}`]: reportData.num_working_time,
          [`prescribed_period_${lowerReportName}`]:
            reportData.prescribed_period?.prescribed_period_value
        }
      })
      const transformedData = {
        ...scoreboardData,
        pap: scoreboardData.pap.code,
        status: scoreboardData.status?.status_name,
        transaction_type: scoreboardData.transaction_type.transaction_type,
        ts: scoreboardData.ts.name,
        ...reportsObj
      }
      return transformedData
    })
    console.log(scoreboardData)
    scoreboardTable.value = scoreboardData
  }
  return {
    scoreboardTotal,
    scoreboardTable,
    getScoreboardPaginated,
    $reset
  }
})
