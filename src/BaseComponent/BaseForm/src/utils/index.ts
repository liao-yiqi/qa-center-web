import type { FormItem } from '../types/index.ts'

export const getOptions = (item: FormItem): any[] => {
  if (isRef(item.options)) {
    return item.options.value as any[]
  } else {
    return item.options ?? []
  }
}
