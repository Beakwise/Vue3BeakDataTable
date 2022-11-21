<!-- eslint-disable import/no-absolute-path -->
<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import useDropdown from '/@src/composable/useDropdown'
import * as gconst from '/@src/utils/globaldefinitions'

const { dropdownElement, isOpen, toggle } = useDropdown()

const props = defineProps({
  actionData: {
    type: Array as PropType<gconst.ActionType[]>,
    required: true,
  },
  locale: {
    type: String,
    required: true,
    default: 'en',
  },
  isdisabled: {
    type: Array,
    required: false,
    default: null,
  },
})

const emit = defineEmits(['basicfunction'])

const onClickAction = (func: string) => {
  emit('basicfunction', { data: func })
  toggle()
}

const isRowDisabled = computed((func: string) => {
  return (func) => {
    let result = false
    props.isdisabled?.forEach((fn: any) => {
      if (fn.function === func) {
        result = true
      }
    })
    return result
  }
})
</script>

<template>
  <div ref="dropdownElement" :class="[isOpen && 'is-active']" class="dropdown is-spaced is-dots is-right dropdown-trigger is-pushed-mobile">
    <div class="is-trigger" aria-haspopup="true" @click="toggle">
      <i class="iconify" data-icon="feather:more-vertical"></i>
    </div>
    <div class="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <div v-for="(act, actidx) in actionData" :key="actidx">
          <a
            :to="{}"
            class="dropdown-item is-media"
            :class="act.disabled || isRowDisabled(act.emit) ? 'is-disabled' : ''"
            @click="onClickAction(act.emit)"
          >
            <div class="icon">
              <i :class="act.icon"></i>
            </div>
            <div class="meta">
              <span>{{ act.title[locale] }}</span>
              <span>{{ act.subtitle[locale] }}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
