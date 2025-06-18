<script setup lang="ts">
import { getOptions } from '../../../utils/index.ts'

import type { FormItemTool } from '../../../types/index.ts'

type IProps = {
  item: FormItemTool<'tree'>
  allDisabled: boolean
}
const { item } = defineProps<IProps>()
const emits = defineEmits(['keyUpEnter'])
const elRef = useTemplateRef('elRef')
const getRef = () => {
  return elRef.value
}
defineExpose({
  getRef,
})
</script>
<template>
  <el-tree
    ref="elRef"
    :data="getOptions(item)"
    :style="{
      width: '100%',
    }"
    v-bind="item.config"
    v-on="item.eventFunction || {}"
  >
    <template v-for="slotName in item.slotNames" #[slotName]="slotData">
      <slot :name="slotName" :slotData="slotData"> </slot>
    </template>
  </el-tree>
</template>

<style scoped lang="scss"></style>
