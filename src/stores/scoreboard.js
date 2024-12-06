import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase.js'
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
        'scoreboard_id, agency_name, css_submission_date, date_time_received,dms_reference_number, output_released_documents,remarks, pap:pap(code), ts:ts_in_charge(name), transaction_type:type_of_transactions(transaction_type), report_records:report_records(*, report:reports(report_name, prescribed_value:prescribed_periods(prescribed_period_value))), status:status(status_name)'
      )
    if (error) {
      console.log(error)
      return { error: error }
    }
    console.log(data)
  }
  return { scoreboardTotal, scoreboardTable, getScoreboardPaginated, $reset }
})
