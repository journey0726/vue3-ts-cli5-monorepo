<template>
  <a-layout style="width: 100%; height: 100%">
    <a-layout-header>
      <Header />
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <Aside />
      </a-layout-sider>
      <a-layout style="padding: 24px">
        <router-view />
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import Header from './components/Header.vue'
import Aside from './components/Aside.vue'
</script>
<style lang="less" scoped>
.ant-layout-header {
  background-color: var(--ant-primary-color, rgb(148, 186, 218));
}
</style>
