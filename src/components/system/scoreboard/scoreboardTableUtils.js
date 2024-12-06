export const scoreboardTableHeaders = [
  {
    title: 'Particulars',
    align: 'center',
    children: [
      {
        title: 'P/A/P No.',
        key: 'pap',
        sortable: false,
        align: 'start'
      },
      {
        title: 'TS-in-Charge',
        key: 'ts',
        sortable: false,
        align: 'start'
      },
      {
        title: 'Agency Name',
        key: 'agency_name',
        sortable: false,
        align: 'start'
      }
    ]
  },
  {
    title: 'DMS Reference Number',
    key: 'dms_reference_number',
    sortable: false,
    align: 'center'
  },
  {
    title: 'Date and Time Received by the Records Section',
    key: 'date_time_received',
    sortable: false,
    align: 'center',
    width: '150'
  },
  {
    title: 'Type of Transaction',
    key: 'transaction_type',
    sortable: false,
    align: 'center'
  },
  {
    title: 'IPAR',
    align: 'center',

    children: [
      {
        title: 'Prescribed Period',
        key: 'prescribed_period_ipar',
        sortable: false,
        align: 'center'
      },
      {
        title: 'Date and Time Forwarded to Asst. DC/Sr. BMS',
        key: 'date_time_forwarded_ipar',
        sortable: false,
        align: 'center'
      },
      {
        title: 'No. of Working Days/ Working Hours/ Calendar Days Acted Upon',
        key: 'num_working_days_ipar',
        sortable: false,
        align: 'center'
      }
    ]
  },
  {
    title: 'Asst. DC/Sr. BMS',
    align: 'center',
    key: 'asst_dc_sr_bms',
    children: [
      {
        title: 'Prescribed Period',
        key: 'prescribed_period_bms',
        sortable: false,
        align: 'center'
      },
      {
        title: 'Reviewed By',
        key: 'reviewed_by_bms',
        sortable: false,
        align: 'center'
      },
      {
        title: 'Date and Time Forwarded to DC',
        key: 'date_time_forwarded_bms',
        sortable: false,
        align: 'center'
      },
      {
        title: 'No. of Working Days/ Working Hours/ Calendar Days Acted Upon',
        key: 'num_working_days_bms',
        sortable: false,
        align: 'center'
      }
    ]
  },
  {
    title: 'DPAR',
    align: 'center',
    key: 'dpar',
    children: [
      {
        title: 'Prescribed Period',
        key: 'prescribed_period_dpar',
        sortable: false,
        align: 'center'
      },
      {
        title: 'Date and Time Forwarded to ARD/RD',
        key: 'date_time_forwarded_dpar',
        sortable: false,
        align: 'center'
      },
      {
        title: 'No. of Working Days/ Working Hours/ Calendar Days Acted Upon',
        key: 'num_working_days_dpar',
        sortable: false,
        align: 'center'
      }
    ]
  },
  {
    title: 'OPAR',
    key: 'opar',
    align: 'center',
    children: [
      {
        title: 'Prescribed Period',
        key: 'prescribed_period_opar',
        sortable: false,
        align: 'center'
      },
      {
        title: 'Date and Time Released',
        key: 'date_time_forwarded_opar',
        sortable: false,
        align: 'center'
      },
      {
        title: 'No. of Working Days/ Working Hours/ Calendar Days Acted Upon',
        key: 'num_working_days_opar',
        sortable: false,
        align: 'center'
      }
    ]
  },
  {
    title: 'Remarks',
    key: 'remarks',
    align: 'center',
    sortable: false
  },
  {
    title: 'Status',
    key: 'status',
    align: 'center',
    sortable: false
  },
  {
    title: 'Output/Released Documents',
    key: 'output_released_documents',
    align: 'center',
    sortable: false
  },
  {
    title: 'CSS Submission Date',
    key: 'css_submission_date',
    align: 'center',
    sortable: false
  }
]
