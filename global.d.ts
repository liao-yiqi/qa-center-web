/// <reference types="types" />
declare type StrNum = string | number
type AnyCss = Partial<CSSStyleDeclaration>
interface Window {
  existLoading: boolean
  isSmallScreen: boolean
  unique: number
}

// layoutStore
type LayoutMode = 'Default' | 'Classic' | 'Streamline' | 'Double'
interface LayoutState {
  showDrawer: boolean
  shrink: boolean
  layoutMode: LayoutMode
  mainAnimation: string
  isDark: boolean
  menuWidth: number
  menuDefaultIcon: string
  menuCollapse: boolean
  menuUniqueOpened: boolean
  menuShowTopBar: boolean
  menuBackground: string[]
  menuColor: string[]
  menuHoverBackground: string[]
  menuActiveBackground: string[]
  menuActiveColor: string[]
  menuTopBarBackground: string[]
  headerBarTabColor: string[]
  headerBarBackground: string[]
  headerBarHoverBackground: string[]
  headerBarTabActiveBackground: string[]
  headerBarTabActiveColor: string[]
}
