<script setup lang="ts">
import { DatePickerInstance } from 'element-plus'
import type { FormItemTool } from '../../../types/index.ts'

type IProps = {
  item: FormItemTool<'datepicker'>
  allDisabled: boolean
}
const { item, allDisabled } = defineProps<IProps>()
const value = defineModel<any>('value')
// 不使用泛型有的方法会拿不到，目前不知道为什么
const elRef = useTemplateRef<DatePickerInstance>('elRef')
const getRef = () => {
  return elRef.value
}
defineExpose({
  getRef,
})
</script>
<template>
  <el-date-picker
    ref="elRef"
    :disabled="allDisabled"
    :placeholder="'请选择' + item.label"
    v-model="value"
    valueFormat="YYYY-MM-DD"
    v-bind="item.config"
    v-on="item.eventFunction || {}"
  >
    <template v-for="slotName in item.slotNames" #[slotName]="slotData">
      <slot :name="slotName" :slotData="slotData"> </slot>
    </template>
  </el-date-picker>
</template>

<style scoped lang="scss"></style>
