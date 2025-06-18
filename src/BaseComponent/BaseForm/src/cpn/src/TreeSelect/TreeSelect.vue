<script setup lang="ts">
import { getOptions } from '../../../utils/index.ts'
import type { FormItemTool } from '../../../types/index.ts'

type IProps = {
  item: FormItemTool<'treeSelect'>
  allDisabled: boolean
}
const { item, allDisabled } = defineProps<IProps>()
const value = defineModel<any>('value')
const elRef = useTemplateRef('elRef')
const getRef = () => {
  return elRef.value
}
defineExpose({
  getRef,
})
</script>
<template>
  <el-tree-select
    clearable
    ref="elRef"
    :disabled="allDisabled"
    :placeholder="'请选择' + item.label"
    :data="getOptions(item)"
    v-model="value"
    v-bind="item.config"
    v-on="item.eventFunction || {}"
  >
    <template v-for="slotName in item.slotNames" #[slotName]="slotData">
      <slot :name="slotName" :slotData="slotData"> </slot>
    </template>
  </el-tree-select>
</template>

<style scoped lang="scss"></style>
