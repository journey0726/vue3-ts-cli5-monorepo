<template>
  <a-button type="primary" @click="showModal">Open Modal</a-button>
  <a-drag-modal v-model:visible="visible" title="15454" :afterClose="afterClose">
    <div>123123</div>
    <div>123123</div>
    <div>123123</div>
  </a-drag-modal>
  <networkTopo />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { getUserInfo } from '@monitor/api'
import networkTopo from '@monitor/components/network-topo/Index.vue'

const visible = ref<boolean>(false)

const showModal = () => {
  visible.value = !visible.value
}
const afterClose = () => {
  console.log(123)
}
</script>
