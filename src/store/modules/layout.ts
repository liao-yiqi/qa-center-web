import { defineStore } from 'pinia'
import { reactive } from 'vue'

const useConfigStore = defineStore(
  'config',
  () => {
    const layout: LayoutState = reactive({
      /* 全局 */
      showDrawer: false,
      // 是否收缩布局(小屏设备)
      shrink: false,
      // 后台布局方式，可选值<Default|Classic|Streamline|Double>
      layoutMode: 'Default',
      // 后台主页面切换动画，可选值<slide-right|slide-left|el-fade-in-linear|el-fade-in|el-zoom-in-center|el-zoom-in-top|el-zoom-in-bottom>
      mainAnimation: 'el-fade-in-linear',
      // 是否暗黑模式
      isDark: false,
      /* 侧边菜单 */
      // 侧边菜单背景色
      menuBackground: ['#ffffff', '#1d1e1f'],
      // 侧边菜单文字颜色
      menuColor: ['#303133', '#CFD3DC'],
      // 侧边菜单悬停颜色
      menuHoverBackground: ['#ecf5ff', '#18222c'],
      // 侧边菜单激活项背景色
      menuActiveBackground: ['#ffffff', '#1d1e1f'],
      // 侧边菜单激活项文字色
      menuActiveColor: ['#409eff', '#3375b9'],
      // 侧边菜单顶栏背景色
      menuTopBarBackground: ['#fcfcfc', '#1d1e1f'],
      // 侧边菜单宽度(展开时)，单位px
      menuWidth: 245,
      // 侧边菜单项默认图标
      menuDefaultIcon: 'fa fa-circle-o',
      // 是否水平折叠收起菜单
      menuCollapse: false,
      // 是否只保持一个子菜单的展开(手风琴)
      menuUniqueOpened: true,
      // 显示菜单栏顶栏(LOGO)
      menuShowTopBar: true,
      /* 顶栏 */
      // 顶栏文字色
      headerBarTabColor: ['#000000', '#CFD3DC'],
      // 顶栏激活项背景色
      headerBarTabActiveBackground: ['#ffffff', '#1d1e1f'],
      // 顶栏激活项文字色
      headerBarTabActiveColor: ['#000000', '#409EFF'],
      // 顶栏背景色
      headerBarBackground: ['#ffffff', '#1d1e1f'],
      // 顶栏悬停时背景色
      headerBarHoverBackground: ['#f5f5f5', '#18222c'],
    })
    function menuWidth() {
      if (layout.shrink) {
        return layout.menuCollapse ? '0px' : layout.menuWidth + 'px'
      }
      // 菜单是否折叠
      return layout.menuCollapse ? '64px' : layout.menuWidth + 'px'
    }
    const getColorVal = function (name: keyof LayoutState) {
      const colors = layout[name] as string[]
      if (layout.isDark) {
        return colors[1]
      } else {
        return colors[0]
      }
    }
    const setLayout = (name: keyof LayoutState, value: any) => {
      layout[name] = value as never
    }
    return {
      layout,
      menuWidth,
      getColorVal,
      setLayout,
    }
  },
  { persist: { key: 'storeConfig' } }
)
export default useConfigStore
