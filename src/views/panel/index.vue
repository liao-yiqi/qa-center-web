<script setup lang="ts">
import UIElement from './dashboard/element/index.vue'
import usePanel from '@/store/modules/panel'

defineOptions({
  components: {
    UIElement,
  },
})

const panelStore = usePanel()
</script>

<template>
  <div>
    <component :is="panelStore.panelConfig.componentName" />
  </div>
</template>

<style lang="scss" scoped></style>
