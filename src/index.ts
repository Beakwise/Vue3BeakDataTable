import { App } from 'vue'
import BWBeakDataTable from './components/V-BeakDataTable.vue'
import BWFlexPagination from './components/V-FlexPagination.vue'

export default {
  install: (app: App, options) => {
    app.component('BWBeakDataTable', BWBeakDataTable)
    app.component('BWFlexPagination', BWFlexPagination)
  },
}
