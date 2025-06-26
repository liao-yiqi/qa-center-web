<script setup lang="ts">
import { getElementPageAPI, getLocatorsDataAPI } from '@/api/dashboard/project'
import usePanel from '@/store/modules/panel'
import { ElementsData, LocatorsData } from '@/types/dashboard'
import LocatorsDetails from './LocatorsDetails.vue'
import { ElMessage } from 'element-plus';

const panelStore = usePanel()

const tableData = ref<ElementsData[]>([])
const tableColumn = [
  { label: 'Name', prop: 'name', minWidth: 150 },
  { label: 'Short Name', prop: 'shortName', minWidth: 150 },
  { label: 'Modual ID', prop: 'pageId', minWidth: 150 },
  { label: 'Comment', prop: 'comment', minWidth: 200 },
]

const getELementsPage = async () => {
  const pageId = panelStore.panelConfig.panelValue!.id
  const { data } = await getElementPageAPI(pageId)
  tableData.value = data
}

onMounted(() => {
  getELementsPage()
})

const locatorsData = ref<LocatorsData[]>([])
const currentRow = ref()
const onSelected = async () => {
  const { data } = await getLocatorsDataAPI({ elementId: currentRow.value })
  locatorsData.value = data
}

const onAdd = () => {
  /* currentRow.value = 2
  onSelected() */
  ElMessage.warning('Function not yet developed!')
}

const visible = ref(false)
const locatorsValue = ref<LocatorsData>({} as LocatorsData)
const onEdit = (value: LocatorsData) => {
  locatorsValue.value = value
  visible.value = true
}
</script>

<template>
  <div class="page">
    <el-card header="Project Detaile">
      <div class="page-top">
        <div class="page-info">
          <div class="info-item">
            <span class="label">Project ID:</span>
            <span class="value">
              {{ panelStore.panelConfig.panelValue?.id }}
            </span>
          </div>
          <div class="info-item">
            <span class="label">Project Name:</span>
            <span class="value">
              {{ panelStore.panelConfig.panelValue?.name }}
            </span>
          </div>
        </div>
      </div>
      <el-divider />
      <div class="page-bottom">
        <el-button type="primary" class="add-btn" @click="onAdd">
          新增
        </el-button>
        <el-table :data="tableData" row-key="id" highlight-current-row border>
          <el-table-column width="50">
            <template #default="{ row }">
              <el-radio-group v-model="currentRow" @change="onSelected">
                <el-radio :value="row.id" />
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column
            v-for="col in tableColumn"
            :key="col.prop"
            :prop="col.prop"
            :label="col.label"
            :min-width="col.minWidth"
          />
        </el-table>
      </div>
    </el-card>
    <el-divider />
    <div class="page-locators">
      <el-row :gutter="16">
        <el-col v-for="item in locatorsData" :key="item.id" :span="8">
          <el-card class="locator-card">
            <template #header>
              <div class="platform-header">
                <div class="platform-title">
                  {{ panelStore.panelConfig.platformDict[item.platformId] }}
                </div>
                <el-button
                  type="primary"
                  icon="Edit"
                  link
                  @click="onEdit(item)"
                >
                  Edit
                </el-button>
              </div>
            </template>
            <div class="info-item">
              <span class="label">ID:</span>
              <span class="value">{{ item.id }}</span>
            </div>
            <div class="info-item">
              <span class="label">Name:</span>
              <span class="value">{{ item.value }}</span>
            </div>
            <div class="info-item">
              <span class="label">Locator Value:</span>
              <span class="value">{{ item.value }}</span>
            </div>
            <div class="info-item">
              <span class="label">Is Featured:</span>
              <el-switch :model-value="!!item.isFeatured" disabled />
            </div>
            <div class="info-item">
              <span class="label">Comment:</span>
              <span class="value">{{ item.comment || '-' }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <LocatorsDetails v-model="visible" :data="locatorsValue" />
  </div>
</template>

<style lang="scss" scoped>
.page-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  .info-item {
    display: flex;
    align-items: center;
    .label {
      width: 120px;
      font-weight: 600;
      color: #555;
    }
    .value {
      flex: 1;
      color: #333;
      word-break: break-word;
    }
  }
}

.page-bottom {
  margin-top: 10px;
  .add-btn {
    margin-bottom: 12px;
  }
  .current-row {
    background-color: #e6f7ff !important;
  }
}

.page-locators {
  margin-top: 24px;
  .locator-card {
    margin-bottom: 20px;
    padding: 16px;
    .platform-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .platform-title {
        font-size: 18px;
        font-weight: bold;
        color: #1890ff;
        border-left: 4px solid #1890ff;
        padding-left: 8px;
      }
      .el-button.is-link {
        font-size: 14px;
      }
    }
    .info-item {
      display: flex;
      margin-bottom: 12px;
      align-items: center;
      .label {
        width: 120px;
        font-weight: 600;
        color: #555;
      }
      .value {
        flex: 1;
        color: #333;
        word-break: break-word;
      }
    }
  }
}
</style>
