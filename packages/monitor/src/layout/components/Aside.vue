<template>
  <a-menu v-model:selectedKeys="selectedKeys2" v-model:openKeys="openKeys" mode="inline" @click="clickMenu" :style="{ height: '100%', borderRight: 0 }">
    <a-sub-menu key="sub2">
      <template #title>
        <span>
          <laptop-outlined />
          subnav 2
        </span>
      </template>
      <a-menu-item key="home">home</a-menu-item>
      <a-menu-item key="about">about</a-menu-item>
      <a-menu-item key="error">error</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const toHome = (e: Event) => {
  router.push('/platform/home')
}
const toAbout = (e: Event) => {
  router.push('/platform/about')
}
const toError = (e: Event) => {
  router.push('/error/404')
}

const clickMenu = (e: any) => {
  switch (e.key) {
    case 'home':
      toHome(e)
      return
    case 'about':
      toAbout(e)
      return
    case 'error':
      toError(e)
      return
  }
}
</script>

<style lang="less" scoped></style>
