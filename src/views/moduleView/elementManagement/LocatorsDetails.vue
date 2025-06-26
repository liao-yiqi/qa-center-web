<script setup lang="ts">
import { LocatorsData } from '@/types/dashboard'
import { ElMessage } from 'element-plus'

const { modelValue, data } = defineProps<{
  modelValue: boolean
  data: LocatorsData
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const onClose = () => {
  emit('update:modelValue', false)
}
const locatorsForm = ref<LocatorsData>({} as LocatorsData)

const onOpenDialog = () => {
  locatorsForm.value = data
}

const onSubmit = () => {
  ElMessage.warning('Function not yet developed!')
}
</script>

<template>
  <el-dialog
    :model-value="modelValue"
    @close="onClose"
    width="500"
    title="Platform iOS"
    @open="onOpenDialog"
  >
    <el-form v-model="locatorsForm">
      <el-form-item label="Name">
        <el-input v-model="locatorsForm.value" />
      </el-form-item>
      <el-form-item label="Locator">
        <el-input v-model="locatorsForm.value" />
      </el-form-item>
      <el-form-item label="Is Featured">
        <el-switch :model-value="!!locatorsForm.isFeatured" />
      </el-form-item>
      <el-form-item label="Comment">
        <el-input type="textarea" v-model="locatorsForm.comment" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onClose">Cancel</el-button>
        <el-button type="primary" @click="onSubmit">Confirm</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
