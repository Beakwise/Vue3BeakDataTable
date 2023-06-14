import { App } from 'vue'
import BWBeakDataTable from './components/V-BeakDataTable.vue'
import BWFlexPagination from './components/V-FlexPagination.vue'
import JsonExcel from 'vue-json-excel3'
import i18n from './i18n'

export default {
  install: (app: App, options) => {
    app.use(i18n)
    app.component('BWBeakDataTable', BWBeakDataTable)
    app.component('BWFlexPagination', BWFlexPagination)
    app.component('JsonExcel', JsonExcel)
  },
}
