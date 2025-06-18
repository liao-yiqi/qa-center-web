<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    required: true,
  },
  allDisabled: {
    type: Boolean,
  },
})
defineModel('value')
</script>
<template>
  <div :class="`${item.field}Custom customItem`">
    <slot name="custom"> </slot>
  </div>
</template>

<style scoped lang="scss">
.customItem {
  width: 100%;
}
</style>
