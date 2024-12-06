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
        key: 'agency',
        sortable: false,
        align: 'start'
      },
      {
        title: 'Nature of Transaction',
        key: 'transaction',
        sortable: false,
        align: 'start'
      }
    ]
  },
  {
    title: 'DMS Reference Number',
    key: 'dms',
    sortable: false,
    align: 'center'
  },
  {
    title: 'Date and Time Received by the Records Section',
    key: 'datReceivedRecordSection',
    sortable: false,
    align: 'center'
  },
  {
    title: 'Type of Transaction',
    key: 'typeOfTransaction',
    sortable: false,
    align: 'center'
  },

  {
    title: 'IPAR',
    align: 'center',
    children: [
      {
        title: 'Prescribed Period',
        key: 'prescribedPeriod',
        sortable: false,
        align: 'center'
      },
      {
        title: 'Date and Time Forwarded to Asst. DC/Sr. BMS',
        key: 'dateTimeForwarded',
        sortable: false,
        align: 'center'
      },
      {
        title: 'No. of Working Days/ Working Hours/ Calendar Days Acted Upon',
        key: 'numWorkingDays',
        sortable: false,
        align: 'center'
      }
    ]
  },
  {
    title: 'Asst. DC/Sr. BMS',
    align: 'center',
    children: [
      {
        title: 'Prescribed Period',
        key: 'prescribedPeriod',
        sortable: false,
        align: 'center'
      },
      {
        title: 'Reviewed By',
        key: 'reviewedBy',
        sortable: false,
        align: 'center'
      },
      {
        title: 'Date and Time Forwarded to DC',
        key: 'dateTimeForwarded',
        sortable: false,
        align: 'center'
      },
      {
        title: 'No. of Working Days/ Working Hours/ Calendar Days Acted Upon',
        key: 'numWorkingDays',
        sortable: false,
        align: 'center'
      }
    ]
  },
  {
    title: 'DPAR',
    align: 'center',
    children: [
      {
        title: 'Prescribed Period',
        key: 'prescribedPeriod',
        sortable: false,
        align: 'center'
      },
      {
        title: 'Date and Time Forwarded to ARD/RD',
        key: 'dateTimeForwarded',
        sortable: false,
        align: 'center'
      },
      {
        title: 'No. of Working Days/ Working Hours/ Calendar Days Acted Upon',
        key: 'numWorkingDays',
        sortable: false,
        align: 'center'
      }
    ]
  },
  {
    title: 'OPAR',
    align: 'center',
    children: [
      {
        title: 'Prescribed Period',
        key: 'prescribedPeriod',
        sortable: false,
        align: 'center'
      },
      {
        title: 'Date and Time Released',
        key: 'dateTimeForwarded',
        sortable: false,
        align: 'center'
      },
      {
        title: 'No. of Working Days/ Working Hours/ Calendar Days Acted Upon',
        key: 'numWorkingDays',
        sortable: false,
        align: 'center'
      }
    ]
  }
]
