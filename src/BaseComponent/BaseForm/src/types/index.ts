import {
  FormProps,
  FormRules,
  RowProps,
  ColProps,
  FormItemProps,
  ElTooltipProps,
  InputProps,
  InputNumberProps,
  ElCascader,
  ElSelect,
  ElTree,
  ElTreeSelect,
  DatePickerProps,
  CheckboxProps,
  RadioProps,
} from 'element-plus'
import { Ref } from 'vue'

interface BaseFormItem extends Partial<FormItemProps> {
  field: string
  isHidden?: boolean
  hideLabel?: boolean
  formItemConfig?: Partial<FormItemProps>
  tip?: string
  tipConfig?: Partial<ElTooltipProps>
  slotNames?: string[]
  eventFunction?: any
  options?: any[] | Ref<any[]>
  layout?: Partial<ColProps>
  isGroup?: boolean
  optionConfig?: any
  setValue?: string
  setLabel?: string
  optionFunction?: any
  permission?: string | string[]
  default?: any
}

// 定义配置映射类型
type ConfigMap = {
  input: Partial<InputProps>
  inputNumber: Partial<InputNumberProps>
  textarea: Partial<InputProps>
  custom: any
  cascader: Partial<InstanceType<typeof ElCascader>['$props']>
  select: Partial<InstanceType<typeof ElSelect>['$props']>
  tree: Partial<InstanceType<typeof ElTree>['$props']>
  treeSelect: Partial<InstanceType<typeof ElTreeSelect>['$props']>
  datepicker: Partial<DatePickerProps>
  checkBox: Partial<CheckboxProps>
  radio: Partial<RadioProps>
}

// 定义通用的表单项接口
export interface FormItemTool<T extends keyof ConfigMap> extends BaseFormItem {
  type: T
  config?: ConfigMap[T]
}

// 定义联合类型
export type FormItem =
  | FormItemTool<'cascader'>
  | FormItemTool<'checkBox'>
  | FormItemTool<'custom'>
  | FormItemTool<'datepicker'>
  | FormItemTool<'input'>
  | FormItemTool<'inputNumber'>
  | FormItemTool<'radio'>
  | FormItemTool<'select'>
  | FormItemTool<'textarea'>
  | FormItemTool<'tree'>
  | FormItemTool<'treeSelect'>

export type FormItems = FormItem[]
export interface Props {
  data?: Record<string, any>
  formItems: FormItems
  elFormConfig?: FormProps | object
  allDisabled?: boolean
  rowConfig?: Partial<RowProps>
  footerLayout?: Partial<ColProps>
  colLayout?: Partial<ColProps>
  itemStyle?: AnyCss
  rules?: FormRules
  hideItems?: Ref<string[]> | string[]
}
