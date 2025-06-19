export interface Project {
  messageName: string
  message: string
  status: string
  statusCode: number
  data: ProjectData[]
}

export interface ProjectData {
  id: number
  name: string
  description: string
  platformIds: string
}
