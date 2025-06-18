<script setup lang="ts">
import type { FormItemTool } from '../../../types/index.ts'

type IProps = {
  item: FormItemTool<'textarea'>
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
  <el-input
    ref="elRef"
    clearable
    :disabled="allDisabled"
    :placeholder="'请输入' + item.label"
    v-model="value"
    maxlength="150"
    type="textarea"
    show-word-limit
    @keyup.enter="keyUpEnter($event, item)"
    v-bind="item.config"
    v-on="item.eventFunction || {}"
  >
    <template v-for="slotName in item.slotNames" #[slotName]>
      <slot :name="slotName"> </slot>
    </template>
  </el-input>
</template>

<style scoped lang="scss"></style>
