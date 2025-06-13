<script setup lang="ts"></script>

<template>
  <el-scrollbar ref="verticalMenusRef" class="vertical-menus-scrollbar">
    <el-menu>
      <el-sub-menu index="1">
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title>item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>

<style lang="scss" scoped></style>
