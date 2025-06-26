interface Base {
  messageName: string
  message: string
  status: string
  statusCode: number
}
export interface Project extends Base {
  data: ProjectData[]
}

export interface ProjectData {
  id: number
  name: string
  description: string
  platformIds: string
}

export interface Elements extends Base {
  data: ElementsData[]
}

export interface ElementsData {
  id: number
  name: string
  shortName: string
  pageId: number
  comment: string | null
}

export interface Locators extends Base {
  data: LocatorsData[]
}

export interface LocatorsData {
  id: number
  value: string
  isFeatured: Boolean
  elementId: number
  comment: string | null
  platformId: number
  strategyId: number
}
