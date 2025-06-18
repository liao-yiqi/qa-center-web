<script setup lang="ts">
import type { FormItemTool } from '../../../types/index.ts'
type IProps = {
  item: FormItemTool<'input'>
  allDisabled: boolean
}
const { item, allDisabled } = defineProps<IProps>()
const emits = defineEmits(['keyUpEnter'])
const value = defineModel<any>('value')
const elRef = useTemplateRef('elRef')
const keyUpEnter = ($event: any, item: any) => {
  emits('keyUpEnter', $event, item)
}
const getRef = () => {
  return elRef.value
}
defineExpose({
  getRef,
})
</script>
<template>
  <el-input
    ref="elRef"
    clearable
    :disabled="allDisabled"
    :placeholder="'请输入' + item.label"
    v-model="value"
    v-bind="item.config"
    v-on="item.eventFunction || {}"
    @keyup.enter="keyUpEnter($event, item)"
  >
    <template v-for="slotName in item.slotNames" #[slotName]="slotData">
      <slot :name="slotName" :slotData="slotData"> </slot>
    </template>
  </el-input>
</template>

<style scoped lang="scss"></style>
