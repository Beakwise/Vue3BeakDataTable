import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import Vue3BeakDataTable from './components/V-BeakDataTable.vue'
// import Vue3BeakDataTable from 'vue3-beakdatatable'
// import 'vue3-beakdatatable/dist/style.css'

import '@iconify/iconify'
import '@purge-icons/generated'
// import './assets/scss/vendors/font-awesome-v5.css'
// import './assets/scss/vendors/line-icons-pro.css'
// import './assets/scss/main.scss'

const app = createApp(App)

app.use(i18n)
app.component('BWDataTable', Vue3BeakDataTable)
app.mount('#app')
