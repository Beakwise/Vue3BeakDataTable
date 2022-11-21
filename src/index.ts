import Vue3BeakDataTable from './components/V-BeakDataTable.vue'
import Vue3FlexPagination from './components/V-FlexPagination.vue'

export default {
  install: (app, options) => {
    app.component('Vue3BeakDataTable', Vue3BeakDataTable)
    app.component('Vue3FlexPagination', Vue3FlexPagination)
  },
}
