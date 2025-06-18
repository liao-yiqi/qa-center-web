<template>
  <div class="baseFrom">
    <el-form
      ref="elFormRef"
      :rules="rules"
      :model="data"
      :scroll-to-error="true"
      :validate-on-rule-change="false"
      @submit.native.prevent
      v-bind="elFormConfig"
    >
      <el-row v-bind="rowConfig">
        <template v-for="item in formItems">
          <el-col
            :span="24"
            v-if="hasSlot(`${item.field}Header`) && !isHiddenItem(item)"
          >
            <slot
              :name="`${item.field}Header`"
              :backData="{ item, data: data[`${item.field}`] }"
            ></slot>
          </el-col>
          <el-col
            :key="item.field"
            v-bind="getLayout(item, colLayout)"
            :class="`${item.field}Col`"
            v-if="!isHiddenItem(item)"
          >
            <el-form-item
              class="form-item"
              :class="`${item.field}Class`"
              v-show="!item.isHidden"
              :label="item.hideLabel ? '' : item.label"
              :style="itemStyle"
              :prop="item.field"
              v-bind="item.formItemConfig"
            >
              <template #label="{ label }" v-if="!item.hideLabel">
                <slot :name="item.field + 'CustomLabel'" :backData="item">
                  <el-tooltip
                    v-if="item.tip"
                    :content="item.tip"
                    v-bind="item.tipConfig"
                  >
                    <el-icon><QuestionFilled /></el-icon>
                  </el-tooltip>
                  <span>{{ label }}</span>
                </slot>
              </template>
              <slot
                :name="`${item.field}Before`"
                :backData="{ item, data: data[`${item.field}`] }"
              ></slot>
              <template v-if="item.type">
                <component
                  :ref="(el: any) => setItemRef(el, item.field)"
                  :is="item.type.toUpperCase()"
                  :item="item"
                  :allDisabled="allDisabled"
                  v-model:value="data[`${item.field}`]"
                  @keyUpEnter="keyUpEnter($event, item)"
                >
                  <template
                    v-for="slotName in item.slotNames"
                    #[slotName]="slotData"
                  >
                    <slot
                      :name="`${item.field}` + capitalizeFirstLetter(slotName)"
                      :backData="{
                        ...slotData,
                        item,
                        dataValue: data[`${item.field}`],
                        formData: data,
                      }"
                    >
                    </slot>
                  </template>

                  <template v-if="item.type.toUpperCase() === 'CUSTOM'" #custom>
                    <slot
                      :name="`${item.field}Custom`"
                      :backData="{
                        item: item,
                        formData: data,
                        data: data[`${item.field}`],
                      }"
                    >
                      {{ data[`${item.field}`] }}
                    </slot>
                  </template>
                </component>
              </template>

              <slot
                :name="`${item.field}After`"
                :backData="{ item, data: data[`${item.field}`] }"
              ></slot>
            </el-form-item>
          </el-col>
        </template>
        <el-col
          v-bind="footerLayout"
          v-if="$slots['footer']"
          :style="itemStyle"
        >
          <div class="footer">
            <slot name="footer"></slot>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, isRef } from 'vue'
import getLayout from './config/layout.ts'
import type { FormInstance } from 'element-plus'
import { Props, FormItem } from './types/index.ts'
import {
  Input as INPUT,
  InputNumber as INPUTNUMBER,
  Textarea as TEXTAREA,
  Cascader as CASCADER,
  Custom as CUSTOM,
  Select as SELECT,
  Tree as TREE,
  TreeSelect as TREESELECT,
  Datepicker as DATEPICKER,
  CheckBox as CHECKBOX,
  Radio as RADIO,
} from './cpn/index.ts'
import { QuestionFilled } from '@element-plus/icons-vue'
defineOptions({
  components: {
    INPUT,
    INPUTNUMBER,
    TEXTAREA,
    CASCADER,
    CUSTOM,
    SELECT,
    TREE,
    TREESELECT,
    DATEPICKER,
    CHECKBOX,
    RADIO,
  },
})

const {
  elFormConfig = {},
  allDisabled = false,
  formItems = [],
  data = {},
  itemStyle = { padding: '20px 20px 0px 0px' },
  colLayout,
  footerLayout = {
    xl: 3,
    lg: 4,
    md: 6,
    sm: 12,
    xs: 24,
  },
  rules = {},
  rowConfig = {},
  hideItems = [],
} = defineProps<Props>()
interface AllRefs {
  [key: string]: any
}

const emits = defineEmits(['keyUpEnter'])
const slots = defineSlots()
let elFormRef = ref<FormInstance>()
const allRefs = ref<AllRefs>({})

const setItemRef = (el: any | null, type: string) => {
  if (el && el.getRef) {
    allRefs.value[type] = el.getRef()
  }
}

let getFormValidate = (): Promise<boolean> => {
  return new Promise((resolve) => {
    elFormRef.value?.validate((valid) => {
      resolve(valid)
    })
  })
}
const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const isHiddenItem = (item: FormItem) => {
  if (item.isHidden) {
    return true
  }
  let flag = false
  if (isRef(hideItems)) {
    if (hideItems.value.includes(item.field)) {
      flag = true
    }
  } else if (Array.isArray(hideItems)) {
    if (hideItems.includes(item.field)) {
      flag = true
    }
  }
  return flag
}
const keyUpEnter = ($event: any, current: any) => {
  emits('keyUpEnter', {
    event: $event,
    current,
  })
}
const hasSlot = (slotName: string) => {
  return !!slots[slotName]
}

defineExpose({
  getFormValidate,
  allRefs,
  elFormRef,
})
</script>

<style scoped lang="scss">
.baseFrom {
  :deep(.el-form-item__label) {
    margin: 0 !important;
    font-weight: 500;
    color: var(--el-text-color-primary);
  }
  :deep(.el-cascader) {
    width: 100%;
  }
  :deep(.el-select) {
    width: 100%;
  }
  :deep(.el-form-item__content) {
    width: 100%;
  }
  :deep(.el-date-editor) {
    width: 100%;
  }
  :deep(.el-input__clear) {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.footer {
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
