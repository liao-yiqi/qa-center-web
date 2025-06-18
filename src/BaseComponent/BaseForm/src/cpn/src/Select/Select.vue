<script setup lang="ts">
import { ElSelect } from 'element-plus'
import { getOptions } from '../../../utils/index.ts'
import type { FormItemTool } from '../../../types/index.ts'

type IProps = {
  item: FormItemTool<'select'>
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
  <el-select
    clearable
    ref="elRef"
    :disabled="allDisabled"
    :placeholder="'请选择' + item.label"
    v-model="value"
    v-bind="item.config"
    v-on="item.eventFunction || {}"
  >
    <el-option
      v-for="option in getOptions(item)"
      :value="item.setValue ? option[item.setValue] : option.value"
      :label="item.setLabel ? option[item.setLabel] : option.label"
      :key="option.key ?? option.value"
      v-on="item.optionFunction || {}"
    >
    </el-option>
    <template v-for="slotName in item.slotNames" #[slotName]="slotData">
      <slot :name="slotName" :slotData="slotData"> </slot>
    </template>
  </el-select>
</template>

<style scoped lang="scss"></style>
