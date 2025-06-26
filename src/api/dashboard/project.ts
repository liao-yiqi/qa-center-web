import { request } from '@/utils/hsj/service/index'
import { Project, Elements, Locators } from '@/types/dashboard'

export const getProjectAllAPI = () => {
  return request<Project>({
    url: '/project/all',
    method: 'GET',
  })
}

export const getElementPageAPI = (id: number) => {
  return request<Elements>({
    url: `/ui/elementrepo/element/page/${id}`,
    method: 'GET',
  })
}

export const getLocatorsDataAPI = (params: { elementId: number }) => {
  return request<Locators>({
    url: '/ui/elementrepo/locator/',
    method: 'GET',
    params,
  })
}
