<script setup lang="ts">
import { ElCascader } from 'element-plus'
import { useTemplateRef } from 'vue'
import { getOptions } from '../../../utils/index.ts'
import type { FormItemTool } from '../../../types/index.ts'

type IProps = {
  item: FormItemTool<'cascader'>
  allDisabled: boolean
}
const { item, allDisabled } = defineProps<IProps>()
const emits = defineEmits(['keyUpEnter'])
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
  <el-cascader
    clearable
    ref="elRef"
    v-model="value"
    :disabled="allDisabled"
    :placeholder="'请选择' + item.label"
    :options="getOptions(item)"
    v-bind="item.config"
    v-on="item.eventFunction || {}"
  >
    <template v-for="slotName in item.slotNames" #[slotName]="slotData">
      <slot :name="slotName" :slotData="slotData"> </slot>
    </template>
  </el-cascader>
</template>

<style scoped lang="scss"></style>
