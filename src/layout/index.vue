<script setup lang="ts">
import useConfigStore from '@/store/modules/layout'
import Default from './container/Default.vue'
defineOptions({
  components: { Default },
})
const config = useConfigStore()
</script>

<template>
  <component :is="config.layout.layoutMode"></component>
</template>

<style lang="scss" scoped></style>
