<script setup lang="ts">
import Aside from '../components/Aside.vue'
import Header from '../components/Header.vue'
import Main from '../components/Main.vue'
</script>

<template>
  <cl-container class="layout-container">
    <Aside />
    <container class="content-wrapper">
      <Header />
      <Main />
    </container>
  </cl-container>
</template>

<style lang="scss" scoped>
.layout-container {
  width: 100%;
  height: 100%;
  .content-wrapper {
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
}
</style>
