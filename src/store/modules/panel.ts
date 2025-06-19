import { defineStore } from 'pinia'

interface PanelState {
  componentName: string
  platformDict: { [key: string]: string }
}

const usePanel = defineStore(
  'panel',
  () => {
    const panelConfig: PanelState = reactive({
      componentName: 'UIElement',
      platformDict: { '1': 'Web', '2': 'iOS', '3': 'Android' },
    })

    const setPanelConfig = (name: keyof PanelState, value: any) => {
      panelConfig[name] = value as never
    }

    return {
      panelConfig,
      setPanelConfig,
    }
  },
  {
    persist: { key: 'panelComponent' },
  }
)

export default usePanel
