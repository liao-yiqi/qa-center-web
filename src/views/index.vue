<script setup lang="ts">
const cardItems: { top: string; bottom: string }[] = [
  { top: 'Project', bottom: 'Management' },
  { top: 'UI Element', bottom: 'Management' },
]

const router = useRouter()
const onCheck = () => {
  router.push('/panel/panelDetail')
}
</script>

<template>
  <div class="page">
    <div class="work-header">
      <el-avatar
        src="https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640"
        :size="72"
      />
      <div class="center">
        <p class="welcome">
          Good Morning,<strong>QA-Center Admin</strong>,Start your day's work.
        </p>
      </div>
    </div>
    <div class="page-container">
      <el-row>
        <el-col :span="24">
          <el-card class="admin-card" shadow="never">
            <template #header>
              <span class="card-title">Admin Panel</span>
            </template>
            <el-row :gutter="16">
              <el-col :span="3" v-for="item in cardItems" :key="item.top">
                <div class="mini-card" @click="onCheck">
                  <div class="mini-card-item">{{ item.top }}</div>
                  <div class="mini-card-item">{{ item.bottom }}</div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: 15px;
  .work-header {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    padding: 24px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

    .center {
      margin-left: 20px;

      .welcome {
        font-size: 18px;
        color: #333;
        margin: 0;
      }

      strong {
        color: #1890ff;
      }
    }
  }

  .page-container {
    .admin-card {
      border-radius: 12px;

      .card-title {
        font-size: 18px;
        font-weight: 600;
        color: #222;
      }
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
