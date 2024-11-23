// 👉 Main Navigation; Title, Icon
export const mainNav = [
  ['User Management', 'mdi-account-box-multiple'],
  ['Individual Performance Accomplishment', 'mdi-account'],
  ['Division Performance Accomplishment', 'mdi-domain'],
  ['Office Performance Accomplishment', 'mdi-office-building'],
  ['Reporting', 'mdi-file-chart']
]

// 👉 Sub Navigations; Title, Icon, Subtitle, Redirect Path
export const menuItemsNav1 = [
  ['User Roles', 'mdi-tag-multiple', '', '/manage/user/roles'],
  ['Users Management', 'mdi-account-multiple', '', '/manage/users']
]
export const menuItemsNav2 = [
  ['Individual Performance Accomplishment', 'mdi-list-box', 'Accomplishment Report Form', '/ipcr']
]
export const menuItemsNav3 = [
  ['Division Performance Accomplishment', 'mdi-list-box', 'Accomplishment Report Form', '/dpcr']
]
export const menuItemsNav4 = [
  ['Office Performance Accomplishment', 'mdi-list-box', 'Accomplishment Report Form', '/opcr']
]
export const menuItemsNav5 = [
  ['Individual Performance', 'mdi-account', 'Contract & Rating', '/report/ipcr'],
  ['Division Performance', 'mdi-domain', 'Contract & Rating', '/report/dpcr'],
  ['Office Performance', 'mdi-office-building', 'Contract & Rating', '/report/opcr']
]
