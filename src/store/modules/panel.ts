import { ProjectData } from '@/types/dashboard'
import { defineStore } from 'pinia'

interface PanelState {
  componentName: string
  platformDict: { [key: string]: string }
  panelValue: ProjectData | null
}

const usePanel = defineStore(
  'panel',
  () => {
    const panelConfig: PanelState = reactive({
      componentName: 'UIElement',
      platformDict: { '1': 'Web', '2': 'iOS', '3': 'Android' },
      panelValue: null,
    })

    const setPanelConfig = (name: keyof PanelState, value: any) => {
      panelConfig[name] = value as never
    }

    const setPanelValue = (val: ProjectData) => {
      panelConfig.panelValue = val
    }

    return {
      panelConfig,
      setPanelConfig,
      setPanelValue,
    }
  },
  {
    persist: { key: 'panelComponent' },
  }
)

export default usePanel
