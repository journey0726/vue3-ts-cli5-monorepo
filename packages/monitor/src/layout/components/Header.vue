<template>
  <div class="header">
    monitor1 模块
    <div>
      <a-popover title="Title">
        <template #content>
          <input type="color" @input="changeColor" />
        </template>
        <a-button type="primary">改变主题</a-button>
      </a-popover>
    </div>
    <a-button @click="logoutMethod">退出</a-button>
    <div>{{currentTime}}</div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { changeTheme } from '@monitor/style/theme'
import { useNow, useDateFormat } from '@vueuse/core'
import { useRouter } from 'vue-router'

import { useRoles } from '@monitor/store/modules/roles'
import { useAuthority } from '@monitor/store/modules/authority'

const currentTime = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')

const store = useRoles()
const router = useRouter()
const { resetRouter, setReadyUseRouters } = useAuthority()

onMounted(() => {
  let themeColor = localStorage.getItem('pages-theme') || '#1890ff'
  changeTheme(themeColor)
})

const logoutMethod = (e: Event) => {
  store.logout()
  resetRouter()
  setReadyUseRouters([])
  router.push('/login')
}

const changeColor = (e: Event) => {
  let value = (e.target as HTMLInputElement).value
  changeTheme(value)
}



</script>

<style lang="less" scoped>

.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>