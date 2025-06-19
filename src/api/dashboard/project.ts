import { request } from '@/utils/hsj/service/index'
import { Project } from '@/types/dashboard'

export const getProjectAllAPI = () => {
  return request<Project>({
    url: '/project/all',
    method: 'GET',
  })
}
