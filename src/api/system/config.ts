import { request } from '@/utils/hsj/service/index'

// 刷新参数缓存
export function refreshCache() {
  return request({
    url: '/system/config/refreshCache',
    method: 'delete',
  })
}