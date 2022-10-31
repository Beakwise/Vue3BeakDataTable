<script setup lang="ts">
import { computed, onMounted } from 'vue'
// import { useRoute } from 'vue-router'

const props = defineProps({
  itemPerPage: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  maxLinksDisplayed: {
    type: Number,
    default: 5,
  },
})

const emit = defineEmits(['goto'])

// const route = useRoute()
const lastPage = computed(() => {
  console.log('Mathhh :', Math.ceil(props.totalItems / props.itemPerPage))
  let mt = 1
  if (props.totalItems > props.itemPerPage) {
    mt = Math.ceil(props.totalItems / props.itemPerPage)
    console.log('mt............:', mt)
  }
  return mt
})
const totalPageDisplayed = computed(() => (lastPage.value > props.maxLinksDisplayed - 2 ? props.maxLinksDisplayed - 2 : lastPage.value))
const pages = computed(() => {
  const pages: any = []
  let firstButton = props.currentPage - Math.floor(totalPageDisplayed.value / 2)
  let lastButton = firstButton + (totalPageDisplayed.value - Math.ceil(totalPageDisplayed.value % 2))

  if (firstButton < 1) {
    firstButton = 1
    lastButton = firstButton + (totalPageDisplayed.value - 1)
  }

  if (lastButton > lastPage.value) {
    lastButton = lastPage.value
    firstButton = lastButton - (totalPageDisplayed.value - 1)
  }

  for (let page = firstButton; page <= lastButton; page += 1) {
    pages.push(page)
  }

  return pages
})

const showFirstLink = computed(() => pages.value[0] > 1)
const showLastLink = computed(() => pages.value[pages.value?.length - 1] < lastPage.value)

// const paginatedLink = (page = 1) => {
//   const _page = Math.min(page, lastPage.value)
//   const query = {
//     ...route.query,
//     page: _page <= 1 ? undefined : _page,
//   }

//   return {
//     name: route.name,
//     params: route.params,
//     query,
//   }
// }

const previousPage = () => {
  let pp = props.currentPage
  if (props.currentPage > 1) {
    pp = props.currentPage - 1
  }
  console.log('previousPage:', pp)
  emit('goto', { page: pp })
}

const nextPage = () => {
  let np = props.currentPage
  if (props.currentPage * props.itemPerPage < props.totalItems) {
    np = props.currentPage + 1
  }
  console.log('nextPage:', np)
  emit('goto', { page: np })
}

const goto = (page = 1) => {
  const gp = page
  emit('goto', { page: gp })
}

onMounted(() => {
  console.log('|===>V-FlexPagination:', props)
})
</script>

<template>
  <nav role="navigation" class="flex-pagination pagination is-rounded" aria-label="pagination" data-filter-hide>
    <a v-if="lastPage > 1" class="pagination-previous has-chevron" @click="previousPage">
      <i class="iconify" data-icon="feather:chevron-left" />
    </a>
    <a v-if="lastPage > 1" class="pagination-next has-chevron" @click="nextPage">
      <i class="iconify" data-icon="feather:chevron-right" />
    </a>

    <ul class="pagination-list">
      <li v-if="showFirstLink">
        <a class="pagination-link" aria-label="Goto page 1" @click="goto(1)"> 1 </a>
      </li>

      <li v-if="pages[0] > 2"><span class="pagination-ellipsis">…</span></li>

      <li v-for="page in pages" :key="page">
        <a
          class="pagination-link"
          :class="{
            'is-current': currentPage === page,
          }"
          @click="goto(page)"
        >
          {{ page }}
        </a>
      </li>

      <li v-if="pages[pages?.length - 1] < lastPage - 1">
        <span class="pagination-ellipsis">…</span>
      </li>

      <li v-if="showLastLink">
        <a class="pagination-link" :aria-label="`Goto page ${lastPage}`" @click="goto(lastPage)">
          {{ lastPage }}
        </a>
      </li>
    </ul>
  </nav>
</template>
