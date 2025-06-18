<script setup lang="ts">
import type { FormItemTool } from '../../../types/index.ts'

type IProps = {
  item: FormItemTool<'inputNumber'>
  allDisabled: boolean
}
const { item, allDisabled } = defineProps<IProps>()
const emits = defineEmits(['keyUpEnter'])
const value = defineModel<any>('value')
const keyUpEnter = ($event: any, item: any) => {
  emits('keyUpEnter', $event, item)
}
const elRef = useTemplateRef('elRef')
const getRef = () => {
  return elRef.value
}
defineExpose({
  getRef,
})
</script>
<template>
  <el-input-number
    ref="elRef"
    clearable
    :disabled="allDisabled"
    v-model="value"
    @keyup.enter="keyUpEnter($event, item)"
    v-bind="item.config"
    v-on="item.eventFunction || {}"
  >
    <template v-for="slotName in item.slotNames" #[slotName]="slotData">
      <slot :name="slotName" :slotData="slotData"> </slot>
    </template>
  </el-input-number>
</template>

<style scoped lang="scss"></style>
