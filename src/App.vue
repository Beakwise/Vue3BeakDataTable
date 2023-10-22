<!-- eslint-disable import/no-absolute-path -->
<script setup lang="ts">
import { ref } from 'vue'
import { transactionList } from '/@src/data/transactions'
import { emptyList } from '/@src/data/emptylist'

const columns = ref([
  {
    label: { en: 'Sale Id', tr: 'Satış No' },
    field: 'saleid',
    type: 'string',
    sortable: true,
    filterable: false,
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
    sortable: false,
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
    filterable: false,
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

const subcolumns = ref([
  {
    label: { en: 'RunId', tr: 'Alt İşlemNo' },
    field: 'run_id',
  },
  {
    label: { en: 'Customer Name', tr: 'Müşteri Adı-Soyadı' },
    field: 'insured01',
    type: 'inherit',
    // masked: 'F2',
  },
  {
    label: { en: 'C-Way', tr: 'Tahsilat Aracı' },
    field: 'collection_way',
  },
  {
    label: { en: 'C-Way-No', tr: 'Tahsilat Aracı No' },
    field: 'collection_way_no',
    // masked: 'F6L4',
  },
  {
    label: { en: 'Created DateTime', tr: 'İşlem Zamanı' },
    field: 'created_date_time',
    type: 'datetime',
  },
  {
    label: { en: 'Updated DateTime', tr: 'Son İşlem Zamanı' },
    field: 'updated_date_time',
    type: 'datetime',
  },
  {
    label: { en: 'Transaction Message', tr: 'İşlem Sonucu' },
    field: 'trx_message',
    type: 'colspan2',
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

const onTriggerEvent = (event: any) => {
  console.log('APP Level Func & Data:', event.func, event.rowdata)
}
const onTriggerAction = (event: any) => {
  console.log('Action Triggered')
}
</script>

<template>
  <div>
    <V-BeakDataTable
      :beakcolumns="columns"
      :beaksubcolumns="subcolumns"
      :beakrows="transactionList"
      :beakstats="transactionList?.length"
      :beak-action="actions"
      :is-show-line-number="false"
      :is-show-detail="true"
      :is-column-filter="true"
      :is-global-filter="true"
      :is-striped="false"
      :is-head-colored="true"
      :is-download-excel="true"
      :is-show-action-button="true"
      :given-page-size="20"
      file-name="TestDeneme.csv"
      file-type="csv"
      locale="en"
      sort-by-field="startdateorj"
      sort-direction="asc"
      @trigger-event="onTriggerEvent"
      @trigger-action="onTriggerAction"
    >
      <template #item:basicAction>
        <div class="action_button"></div>
      </template>
      <template #item:insured01="{ item, colm }">
        <div class="field_style">
          <span>{{ item[colm.field] }}</span>
        </div>
      </template>
    </V-BeakDataTable>
  </div>
</template>
<style lang="scss">
.field_style {
  word-wrap: break-word;
  max-width: 20rem;
  white-space: normal !important;
}
</style>
