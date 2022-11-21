<!-- eslint-disable import/no-absolute-path -->
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { PropType } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

const props = defineProps({
  beakcolumns: {
    type: Array as PropType<any[]>,
    required: true,
  },
  beaksubcolumns: {
    type: Array as PropType<any[]>,
    required: false,
    default: null,
  },
  beakrows: {
    type: Array as PropType<any[]>,
    required: true,
  },
  locale: {
    type: String,
    required: true,
    default: 'en',
  },
  beakstats: {
    type: Number,
    required: false,
    default: null,
  },
  isShowLineNumber: {
    type: Boolean,
    required: false,
    default: false,
  },
  isColumnFilter: {
    type: Boolean,
    required: false,
    default: false,
  },
  isGlobalFilter: {
    type: Boolean,
    required: false,
    default: true,
  },
  isStriped: {
    type: Boolean,
    required: false,
    default: false,
  },
  isHeadColored: {
    type: Boolean,
    required: false,
    default: false,
  },
  isDownloadExcel: {
    type: Boolean,
    required: false,
    default: false,
  },
  beakAction: {
    type: Array,
    required: false,
    default: null,
  },
  givenPageSize: {
    type: Number,
    required: false,
    default: 20,
  },
  isShowDetail: {
    type: Boolean,
    required: false,
    default: false,
  },
  sortByField: {
    type: String,
    required: false,
    default: '',
  },
  sortDirection: {
    type: String,
    required: false,
    default: 'asc',
  },
})

const filters = ref()
const currentSort = ref('')
const currentSortDir = ref('')
const pageSize = ref()
const currentPage = ref()
const rowId = ref()
const colmfilter = ref([])
const isColmFilter = ref()

const emit = defineEmits(['triggerEvent'])

const filteredData = computed(() => {
  if (!props.beakrows) return props.beakrows
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  return props.beakrows
    .sort((a: any, b: any) => {
      //   Locale characters taken into account ....
      let modifier = 1
      if (currentSortDir.value === 'desc') modifier = -1
      if (a[currentSort.value] === null || b[currentSort.value] === null) {
        return Number(a[currentSort.value] === null) - Number(b[currentSort.value] === null)
      }
      if (a[currentSort.value] || a[currentSort.value] === 0) {
        if (typeof a[currentSort.value] === 'string' || a[currentSort.value] instanceof String) {
          const _a = a[currentSort.value].toLocaleLowerCase(props.locale)
          const _b = b[currentSort.value].toLocaleLowerCase(props.locale)
          const _r = _a.localeCompare(_b, props.locale, { sensitivity: 'base' })
          return _r * modifier
        } else {
          let _r = 0
          const _a = a[currentSort.value]
          const _b = b[currentSort.value]
          if (_a > _b) _r = 1
          if (_a < _b) _r = -1
          return _r * modifier
        }
      }
      return 0
    })
    .filter((item: any) => {
      let result = false
      if (!filters.value) {
        result = true
      } else {
        props.beakcolumns?.forEach((colm: any, index) => {
          const val = item[colm?.field]
          if (val) {
            if (filters.value) {
              if (val?.toString().toLocaleLowerCase().indexOf(filters.value?.toLocaleLowerCase()) > -1) {
                result = true
              }
            }
          }
        })
      }
      return result
    })
    .filter((item: any) => {
      let result = false
      let notnullel = false
      colmfilter.value?.forEach((filtr, index) => {
        if (filtr && filtr !== '') {
          notnullel = true
          const val = item[props.beakcolumns[index]?.field]
          if (val && props.beakcolumns[index]?.filterable) {
            if (val?.toString().indexOf(filtr) > -1) {
              result = true
            }
          }
        }
      })

      if (!notnullel) result = true
      return result
    })
})

const sortIcon = computed((colm: any, sortable: boolean, type: string) => {
  console.log('sortIcon:', colm, sortable, type)
  return (colm, sortable, type) => {
    let result = false
    let textcompare = colm
    if (type === 'date' || type === 'currency') textcompare = textcompare + 'orj'
    if (currentSort.value === textcompare && sortable) {
      result = true
    }
    return result
  }
})

const sortDefault = computed((colm: any, sortable: boolean, type: string) => {
  console.log('sortDefault:', colm, sortable, type)
  return (colm, sortable, type) => {
    let result = false
    if (sortable) {
      let textcompare = colm
      if (type === 'date' || type === 'currency') textcompare = textcompare + 'orj'
      if (currentSort.value !== textcompare || !currentSort.value) {
        result = true
      }
    }
    return result
  }
})

const sortDesc = computed(() => {
  if (currentSortDir.value === 'desc') {
    return true
  }
  return false
})

const sortAsc = computed(() => {
  if (currentSortDir.value === 'asc') {
    return true
  }
  return false
})

const sortedData = computed(() => {
  return filteredData.value?.filter((item: any, index: number) => {
    let result = false
    const start = (currentPage.value - 1) * pageSize.value
    const end = currentPage.value * pageSize.value
    // console.log('Current Page, start, end:', currentPage.value, start, end, index)
    if (index >= start && index < end) result = true
    return result
  })
})

const isSearchable = computed(() => {
  console.log('isSearchable', colmfilter)
  let result = false
  colmfilter.value?.forEach((filtr, index) => {
    if (filtr && filtr !== '') {
      result = true
    }
  })
  return result
})

const sort = (s: any, sortable: boolean, type: string) => {
  // if s == current sort, reverse
  console.log('s:', s, type)
  console.log('currentSort:', currentSort.value)
  console.log('currentSortDir:', currentSortDir.value)
  if (sortable) {
    if (type === 'date' || type === 'currency') {
      s = s + 'orj'
    }
    if (s === currentSort.value) {
      currentSortDir.value = currentSortDir.value === 'asc' ? 'desc' : 'asc'
    }
    currentSort.value = s

    console.log('currentSort:', currentSort.value)
    console.log('currentSortDir:', currentSortDir.value)
  }
}

// const toogleRowDetail = (data: any) => {
//   if (data === 0 || data > 0) {
//     isShowRowDetail.value[data] = !isShowRowDetail.value[data]
//   }
// }

// const closeRowDetail = (ev: any, data: any) => {
//   if (data === 0 || data > 0) {
//     isShowRowDetail.value[data] = false
//     ev.isOpen.value = false
//   }
// }

const goto = (data: any) => {
  currentPage.value = data.page
}

const displayInCurrency = (amount: any, currency: string, locale: any, trxtype: any) => {
  let newamount = 0
  if (trxtype !== 'Collection') {
    newamount = -1 * amount
  } else {
    newamount = amount
  }
  return newamount?.toLocaleString(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    currencyDisplay: 'symbol',
  })
}

const basicFunction = (event: any) => (rowindex: number) => {
  emit('triggerEvent', { func: event.data, rowdata: sortedData.value[rowindex] })
}

onMounted(() => {
  console.log('V-BeakTable.. Girdi', props.beakcolumns, props.beakrows)
  currentSortDir.value = props.sortDirection
  currentSort.value = props.sortByField
  currentPage.value = 1
  pageSize.value = props.givenPageSize
  rowId.value = 1
  isColmFilter.value = props.isColumnFilter
  locale.value = props.locale
  if (isColmFilter.value) {
    let checkFilterValidity = false
    props.beakcolumns.forEach((colm: any, index) => {
      if (colm.filterable) {
        checkFilterValidity = true
      }
    })
    if (!checkFilterValidity && props.isColumnFilter) {
      isColmFilter.value = false
    }
  }
})

watch(
  () => pageSize.value,
  (newValue, oldValue) => {
    console.log('pageSize.value has changed:', newValue, oldValue)
    currentPage.value = 1
  }
)

watch(
  () => props.locale,
  (newValue, oldValue) => {
    console.log('props.locale has changed:', newValue, oldValue)
    locale.value = newValue
  }
)

watch(
  () => filteredData.value,
  (newValue, oldValue) => {
    console.log('filteredData.value has changed:', newValue, oldValue)
  }
)

watch(
  () => isSearchable.value,
  (newValue, oldValue) => {
    console.log('isSearchable.value has changed:', newValue, oldValue)
    if (newValue) currentPage.value = 1
  }
)

watch(
  () => sortedData.value,
  (newValue, oldValue) => {
    console.log('sortedData.value has changed:', newValue, oldValue)
  }
)

watch(
  () => props.beakrows?.length,
  (newValue, oldValue) => {
    console.log('props.beakrows?.length has changed:', newValue, oldValue)
    currentPage.value = 1
  }
)

watch(
  () => props.isColumnFilter,
  (newValue, oldValue) => {
    console.log('props.isColumnFilter has changed:', newValue, oldValue)
    isColmFilter.value = newValue
    if (isColmFilter.value) {
      let checkFilterValidity = false
      props.beakcolumns.forEach((colm: any, index) => {
        if (colm.filterable) {
          checkFilterValidity = true
        }
      })
      if (!checkFilterValidity && props.isColumnFilter) {
        isColmFilter.value = false
      }
    }
  }
)
</script>

<template>
  <!--Table header-->
  <div class="beakdatatable">
    <div class="column is-12">
      <!-- Search & Paging Options -->
      <div class="table-filters">
        <div class="column is-2">
          <V-Field class="paging">
            <V-Control class="has-icons-left">
              <div class="select">
                <select v-model="pageSize">
                  <option value="25">
                    {{ t('paging.placeholder') }}
                  </option>
                  <option value="10">10 {{ t('paging.records') }}</option>
                  <option value="20">20 {{ t('paging.records') }}</option>
                  <option value="30">30 {{ t('paging.records') }}</option>
                  <option value="40">40 {{ t('paging.records') }}</option>
                  <option value="50">50 {{ t('paging.records') }}</option>
                  <option value="100">100 {{ t('paging.records') }}</option>
                </select>
              </div>
              <div class="icon is-small is-left">
                <span class="iconify" data-icon="fa6-solid:list-ul"></span>
              </div>
            </V-Control>
          </V-Field>
        </div>
        <div class="column is-4">
          <V-Field v-if="isGlobalFilter" class="search">
            <V-Control icon="mdi:table-filter">
              <input v-model.trim="filters" class="input custom-text-filter" :placeholder="t('modalmenu.filter')" />
            </V-Control>
          </V-Field>
        </div>
      </div>
      <div class="beaktable-body">
        <!-- Datatable -->
        <table class="table is-fullwidth responsive-table" :class="[isStriped && 'is-striped-rows', isHeadColored && 'is-header-colored']">
          <thead>
            <tr>
              <th v-if="isShowLineNumber">Row-ID</th>
              <th v-for="(colm, index) in beakcolumns" :key="index" :style="'--data-width:' + beakcolumns?.length" scope="col">
                <span class="is-media is-grow" @click="sort(colm?.field, colm?.sortable, colm?.type)">
                  <i v-if="sortDefault(colm?.field, colm?.sortable, colm?.type)" class="lnil lnil-sort"></i>
                  <i v-else-if="sortIcon(colm?.field, colm?.sortable, colm?.type) && sortAsc" class="lnil lnil-sort-amount-asc is-active"></i>
                  <i v-else-if="sortIcon(colm?.field, colm?.sortable, colm?.type) && sortDesc" class="lnil lnil-sort-amount-dsc is-active"></i>
                  {{ colm?.label[locale] }}
                </span>
              </th>
              <th v-if="beakAction?.length > 0" data-action="true" scope="col">
                <span class="is-media is-grow">Action</span>
              </th>
            </tr>
          </thead>
          <tr v-if="isColmFilter">
            <td v-if="isShowLineNumber"></td>
            <td v-for="(colm, index) in beakcolumns" :key="index">
              <V-Field v-if="colm?.filterable" class="search">
                <V-Control icon="feather:search">
                  <input v-model="colmfilter[index]" class="input custom-text-filter" :placeholder="t('modalmenu.search')" />
                </V-Control>
              </V-Field>
            </td>
          </tr>
          <tr v-if="sortedData?.length === 0">
            <td :colspan="beakAction?.length > 0 ? beakcolumns?.length + 1 : beakcolumns?.length">
              <div class="section-placeholder">
                <div class="placeholder-content">
                  <img class="light-image" src="" alt="" />
                  <img class="dark-image" src="" alt="" />
                  <h3 class="dark-inverted">{{ t('paging.nodata1') }}</h3>
                  <p>{{ t('paging.nodata2') }}</p>
                </div>
              </div>
            </td>
          </tr>
          <template v-for="(row, rowidx) in sortedData" :key="rowidx">
            <tr>
              <td v-if="isShowLineNumber">
                {{ rowidx + 1 + pageSize * (currentPage - 1) }}
              </td>
              <td
                v-for="(colm, colmidx) in beakcolumns"
                :key="colmidx"
                :data-currency="colm?.type === 'currency' ? true : false"
                :data-status="colm?.type === 'tag' ? true : false"
                :data-fileicon="colm?.type === 'file' ? true : false"
                :data-title="colm?.label[locale]"
              >
                <span v-if="colm?.type === 'currency'" :data-negative="false" class="dark-text capital">{{
                  displayInCurrency(row[colm?.field], row['currency'], locale, 'Collection')
                }}</span>
                <span
                  v-else-if="colm?.type === 'tag'"
                  class="tag is-rounded"
                  :class="
                    (isShowDetail ? 'has-pointer-cursor' : '',
                    row[colm?.field + 'Color']?.length > 0 ? 'is-' + row[colm?.field + 'Color'] : 'is-primary')
                  "
                  >{{ row[colm?.field] }}</span
                >
                <span v-else-if="colm?.type === 'file'">
                  <img class="table-icon" :src="'/images/icons/files/' + row[colm?.field] + '-beak.svg'" alt="" />
                </span>
                <span v-else class="dark-text capital">{{ row[colm?.field] }}</span>
              </td>
              <td v-if="beakAction?.length > 0" data-action="true" data-title="Action">
                <DataActions :action-data="beakAction" locale="en" @basicfunction="basicFunction($event)(rowidx)" :isdisabled="row['isdisabled']" />
              </td>
            </tr>
          </template>
        </table>
        <span class="table-footnote">
          {{
            t('paging.showlabel', {
              start: (sortedData?.length === 0 ? 0 : (currentPage - 1) * pageSize + 1)?.toLocaleString(locale),
              end: (currentPage * pageSize > filteredData?.length ? filteredData?.length : currentPage * pageSize)?.toLocaleString(locale),
              total: filteredData?.length?.toLocaleString(locale),
              gtotal: beakstats?.toLocaleString(locale),
            })
          }}
        </span>
        <V-FlexPagination
          v-if="beakrows?.length > pageSize"
          :item-per-page="parseInt(pageSize)"
          :total-items="filteredData?.length"
          :current-page="currentPage"
          :max-links-displayed="7"
          @goto="goto"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../assets/scss/abstracts/_variables.scss';
@import '../assets/scss/vendors/font-awesome-v5.css';
@import '../assets/scss/vendors/line-icons-pro.css';
@import '../assets/scss/main.scss';

.beakdatatable {
  background-color: transparent;

  .table-icon {
    height: 32px;
    width: 32px;
  }

  .table-filters {
    display: flex;
  }

  .select select {
    height: 38px;
  }

  .beaktable-body {
    padding: 0.75rem;
  }

  .beaktable-body .table {
    border: 1px solid $fade-grey;
    border-radius: 5px;
    border-collapse: separate !important;
  }

  .beaktable-body .table th {
    padding: 24px 10px;
    font-size: 0.8rem;
    color: $dark-text;
    text-transform: uppercase;
    border: 1px solid $fade-grey;
    font-weight: 600;
  }

  .beaktable-body .table th span {
    font-weight: 600;
  }

  .beaktable-body .table td span {
    font-weight: 400;
    font-size: 12.95px;
  }

  .beaktable-body .table th span i,
  .beaktable-body .table th span svg {
    float: right;
    margin-right: 5px;
    margin-top: 1px;
    cursor: pointer;
    font-size: 13px;
  }
  .beaktable-body .table th span i.is-active,
  .beaktable-body .table th span svg.is-active {
    color: #10daf7;
    font-weight: 600;
    font-size: 1rem;
  }
  .beaktable-body .table th {
    // width: calc(100vw / var(--data-width));
    white-space: nowrap;
  }

  .beaktable-body .table th[data-action] {
    width: 6%;
    white-space: nowrap;
    text-align: center;
  }

  .beaktable-body .table td[data-action] {
    white-space: nowrap;
    text-align: center;
  }

  .beaktable-body .table td[data-currency='true'] {
    text-align: right;
  }
  .beaktable-body .table td[data-status='true'] {
    width: 6rem;
    text-align: center;
  }

  .beaktable-body .table td[data-fileicon='true'] {
    text-align: center;
  }

  .beaktable-body .table td {
    vertical-align: middle;
  }

  .beaktable-body .table td[data-status='true'] .tag {
    width: 7rem;
    text-align: center;
  }

  .beaktable-body .table td[data-currency='true'] span[data-negative='true'] {
    color: red;
  }

  .beaktable-body .table.is-striped-rows tr:nth-child(even) {
    background-color: #f4fdfd;
  }

  .beaktable-body .table.is-header-colored tr:first-child {
    background-color: #aae8f1c7;
  }

  .table-filters .table-buttons {
    position: relative;
    float: right;
  }

  .excelicon {
    width: 28px;
    height: 28px;
    position: relative;
    float: right;
    top: -8px;
  }

  .has-pointer-cursor {
    cursor: pointer;
  }
}

@media only screen and (max-width: 767px) {
  .beakdatatable .beaktable-body .table td[data-currency='true'] {
    text-align: left;
  }

  .beakdatatable .beaktable-body .table td[data-status='true'] {
    width: auto;
    text-align: left;
    line-height: 2.1;
  }

  .beakdatatable .beaktable-body .table td:first-child {
    background-color: #ccfcfc;
  }

  .responsive-table,
  .responsive-table tbody,
  .responsive-table thead,
  .responsive-table tfoot,
  .responsive-table th,
  .responsive-table tr,
  .responsive-table td {
    display: block;
  }

  .responsive-table tr th {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  .responsive-table td:before {
    content: attr(data-title);
    color: #283252;
    position: relative;
    top: 50%;
    left: 15px;
    width: 100%;
    padding-right: 10px;
    font-weight: 600;
    -webkit-transform: translateY(-50%) translateZ(0);
    -moz-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    text-transform: uppercase;
  }

  .responsive-table td:not([colspan]):not(.close-product):after {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    top: 0;
    height: 100%;
  }

  .b-table-container table tbody tr td {
    padding: 26.5px 15px;
    text-align: left !important;
  }

  .responsive-table td span {
    float: right;
  }

  .responsive-table td .b-funds-item span {
    float: left;
  }

  .responsive-table td .b-funds-item .b-funds-item__text b {
    display: none;
  }
}
</style>
