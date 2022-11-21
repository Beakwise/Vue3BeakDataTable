<!-- eslint-disable import/no-absolute-path -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { transactionList } from '/@src/data/transactions'

const columns = ref([
  {
    label: { en: 'Sale Id', tr: 'Satış No' },
    field: 'saleid',
    type: 'string',
    sortable: true,
    filterable: true,
  },
  {
    label: { en: 'Process Date', tr: 'Süreç Başlama Tarihi' },
    field: 'startdate',
    type: 'date',
    inputFormat: 'YYYY-MM-DD',
    outputFormat: 'MMM Do YY',
    sortable: true,
  },
  {
    label: { en: '1st Life', tr: '1.Sigortalı' },
    field: 'insured01',
    type: 'string',
    sortable: true,
  },
  {
    label: { en: '2nd Life', tr: '2.Sigortalı' },
    field: 'insured02',
    type: 'string',
    sortable: true,
  },
  {
    label: { en: 'Stage', tr: 'Aşama' },
    field: 'stage',
    type: 'string',
    sortable: true,
  },
  {
    label: { en: 'Product', tr: 'Ürün' },
    field: 'product',
    type: 'string',
    sortable: true,
    filterable: true,
  },
  {
    label: { en: 'Amount', tr: 'Teminat Tutarı' },
    field: 'amount',
    type: 'currency',
    sortable: true,
  },
  {
    label: { en: 'Premium', tr: 'Prim' },
    field: 'premium',
    type: 'currency',
    sortable: true,
  },
  {
    label: { en: 'Status', tr: 'Durum' },
    field: 'statusText',
    type: 'tag',
    sortable: true,
  },
])

const actions = ref([
  {
    title: { en: 'Check-In Task', tr: 'Görev Geri Çağır' },
    subtitle: { en: 'Continue Task Where Left Off', tr: 'Göreve Devam Edin' },
    icon: 'lnir lnir-redo',
    disabled: false,
    emit: 'recallTask',
  },
  {
    title: { en: 'Cancel Task', tr: 'Görevi İptal Et' },
    subtitle: { en: 'End Journey and move to Cancel', tr: 'Ana Yolculuğu ve Görevi Sonlandır' },
    icon: 'lnir lnir-trash-can',
    disabled: false,
    emit: 'deleteTask',
  },
])

const isOnMounted = ref(false)

const onTriggerEvent = (event: any) => {
  console.log('APP Level Func & Data:', event.func, event.rowdata)
}
onMounted(() => {
  console.log('onMounted')
  isOnMounted.value = true
})
</script>

<template>
  <div>
    <Vue3BeakData
      :beakcolumns="columns"
      :beakrows="transactionList"
      :beakstats="transactionList?.length"
      :beak-action="actions"
      :is-show-line-number="false"
      :is-show-detail="false"
      :is-column-filter="true"
      :is-global-filter="true"
      :is-striped="false"
      :is-head-colored="true"
      :given-page-size="20"
      locale="en"
      sort-by-field="startdateorj"
      sort-direction="asc"
      @trigger-event="onTriggerEvent"
    >
      <template #action> </template>
    </Vue3BeakData>
  </div>
</template>
