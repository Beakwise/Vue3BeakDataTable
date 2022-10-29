<script setup lang="ts">
defineProps({
  compact: {
    type: Boolean,
    default: false,
  },
})
</script>
<template>
  <slot></slot>
</template>
