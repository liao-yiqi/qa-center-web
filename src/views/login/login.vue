<!-- src/views/login/index.vue -->
<template>
  <div class="login-wrapper">
    <div class="login-card">
      <h1 class="title">QA-Center</h1>
      <el-button type="primary" size="large" @click="handleLogin">
        Login
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import session from '@/utils/hsj/useSession'
import { ElMessage } from 'element-plus'
import type { LocationQueryValue } from 'vue-router'
const redirect = ref<LocationQueryValue | LocationQueryValue[]>('')
const route = useRoute()
const router = useRouter()

watch(
  route,
  (newRoute) => {
    redirect.value = newRoute.query && newRoute.query.redirect
  },
  { immediate: true }
)

const handleLogin = () => {
  ElMessage.success('Login Success')
  const query = route.query
  const otherQueryParams = Object.keys(query).reduce((acc: anyObj, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {})
  router.push({
    path: (redirect.value as string) || '/',
    query: otherQueryParams,
  })
  session.set('SESSION_ROUTES', JSON.stringify([]))
}
</script>

<style scoped lang="scss">
.login-wrapper {
  height: 100vh;
  background: #f4f6fa url('@/assets/grid-bg.svg') center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  background: #ffffff;
  padding: 60px 40px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  text-align: center;
  width: 360px;

  .title {
    font-size: 28px;
    font-weight: 600;
    color: #333;
  }

  .el-button {
    width: 100%;
  }
}
</style>
