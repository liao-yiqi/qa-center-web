<script setup lang="ts">
import { getProjectAllAPI } from '@/api/dashboard/project.ts'
import usePanel from '@/store/modules/panel'
import type { ProjectData } from '@/types/dashboard'
import { ElMessage } from 'element-plus'
import addRoutes from '@/utils/dynamicRoutes'
const project = ref('')
const projectOptions = ref<ProjectData[]>([])
const getProjectData = async () => {
  const { data } = await getProjectAllAPI()
  projectOptions.value = data
}

onMounted(() => {
  getProjectData()
})

const projectInfo = ref<ProjectData>()
const handleProjectChange = (val: number) => {
  const selectedProject = projectOptions.value.find((item) => item.id === val)
  projectInfo.value = selectedProject
}
const panelStore = usePanel()

const cardItems: { top: string; bottom: string }[] = [
  { top: 'Project', bottom: 'Management' },
  { top: 'UI Element', bottom: 'Management' },
]

const router = useRouter()
const routerInfo = [
  {
    path: '/elementManagement',
    component: 'Layout',
    redirect: 'noredirect',
    hidden: true,
    children: [
      {
        path: 'elementDetails',
        component: 'moduleView/elementManagement/index',
        name: 'UIElementManagement',
        meta: { title: 'UIElementManagement' },
      },
    ],
  },
]

const onCheck = () => {
  const validProjectInfo =
    projectInfo.value && Object.keys(projectInfo.value).length > 0
  if (!validProjectInfo) return ElMessage.warning('Please select a project')
  addRoutes(routerInfo)
  router.push('/elementManagement/elementDetails')
}
</script>

<template>
  <div class="page">
    <el-card header="UI Element Management" shadow="never">
      <div class="page-info">
        <div class="info-list">
          <div class="info-item">
            <span class="label">Project:</span>
            <el-select
              v-model="project"
              placeholder="Select Project"
              style="width: 240px"
              clearable
              @change="handleProjectChange"
            >
              <el-option
                v-for="item in projectOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </div>
          <div class="info-item">
            <span class="label">ID:</span>
            <span class="value">{{ projectInfo?.id }}</span>
          </div>
          <div class="info-item">
            <span class="label">Name:</span>
            <span class="value">{{ projectInfo?.name }}</span>
          </div>
          <div class="info-item">
            <span class="label">Platform:</span>
            <span class="value">
              {{
                projectInfo?.platformIds
                  ? panelStore.panelConfig.platformDict[projectInfo.platformIds]
                  : ''
              }}
            </span>
          </div>
        </div>
      </div>
      <el-divider />
      <div class="page-model">
        <el-row :gutter="16">
          <el-col
            :span="3"
            v-for="item in cardItems"
            :key="item.top"
            @click="onCheck"
          >
            <div class="mini-card">
              <div class="mini-card-item">{{ item.top }}</div>
              <div class="mini-card-item">{{ item.bottom }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.page {
  .page-info {
    .info-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 10px;
    }

    .info-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .label {
        width: 80px;
        font-weight: 500;
        color: #666;
      }

      .value {
        color: #333;
      }
    }
  }
  .page-model {
    .card-col {
      display: flex;
      justify-content: center;
    }

    .mini-card {
      background: linear-gradient(135deg, #e6f7ff, #ffffff);
      border: 1px solid #91d5ff;
      border-radius: 10px;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 6px rgba(24, 144, 255, 0.1);

      &:hover {
        background: linear-gradient(135deg, #bae7ff, #ffffff);
        box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
        transform: translateY(-2px);
      }

      .mini-card-item {
        font-size: 16px;
        font-weight: 600;
        color: #0050b3;
        margin-bottom: 4px;
      }
    }
  }
}
</style>
