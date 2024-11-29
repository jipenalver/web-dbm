import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vue
import App from './App.vue'
import router from './router'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi'
  },
  components,
  directives
})

app.use(createPinia())
app.use(vuetify)
app.use(router)

//the mount method returns a root component instance
const appRootComponentInstance = app.mount('#app')
console.log(appRootComponentInstance)
