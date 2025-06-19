import session from './hsj/useSession'
import usePermissionStore from '@/store/modules/permission'
const permissionStore = usePermissionStore()
interface RawRoute {
  path: string
  component: string
  name?: string
  redirect?: string
  hidden?: boolean
  meta?: {
    title: string
    icon?: string
    [key: string]: any
  }
  children?: RawRoute[]
}
const addRoutes = (routes: RawRoute[]) => {
  return new Promise(async (resolve) => {
    session.set('SESSION_ROUTES', JSON.stringify(routes))
    await permissionStore.generateRoutes()
    return resolve(true)
  })
}

export default addRoutes
