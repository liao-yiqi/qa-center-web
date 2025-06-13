import { defineCustomElement } from 'vue'
declare module 'vue' {
  export interface GlobalComponents {
    SvgIcon: (typeof import('@/components/SvgIcon/index.vue'))['default']
  }
 /*  interface ComponentCustomProperties {
    getWidth: (typeof import('@/utils/hsj/utils'))['getDialogWidth']
    hasPermi: (typeof import('@/utils/hasPermi'))['default']
  } */
}
