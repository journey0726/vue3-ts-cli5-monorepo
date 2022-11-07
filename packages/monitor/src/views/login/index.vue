<template>
  <div>
    <a-button @click="ToLogin"  type="primary">登录</a-button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

import { useRoles } from '@monitor/store/modules/roles'

const store = useRoles()
const router = useRouter()
const ToLogin = (e: Event) => {
  store.login('this is a token', [1])
  router.push('/platform')
}
</script>

<style>

</style>