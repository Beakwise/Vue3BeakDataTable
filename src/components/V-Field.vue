<script setup lang="ts">
defineProps({
  addons: {
    type: Boolean,
    default: false,
  },
  textaddon: {
    type: Boolean,
    default: false,
  },
  grouped: {
    type: Boolean,
    default: false,
  },
  centered: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="field" :class="[addons && 'has-addons', textaddon && 'has-textarea-addon', grouped && 'is-grouped', centered && 'is-centered']">
    <slot></slot>
  </div>
</template>
