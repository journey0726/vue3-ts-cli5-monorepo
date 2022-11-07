<template>
  <div>
    <a-modal ref="modalRef" v-model:visible="modalVisible" v-bind="{ ...copyOtherProps, ...attrs }">
      <slot></slot>
      <template #title v-if="slots.cancelText || props.title">
        <div ref="modalTitleRef" style="width: 100%; cursor: move">
          <slot name="title">{{ props.title }}</slot>
        </div>
      </template>
      <template #cancelText v-if="slots.cancelText">
        <slot name="cancelText"></slot>
      </template>
      <template #closeIcon v-if="slots.closeIcon">
        <slot name="closeIcon"></slot>
      </template>
      <template #footer v-if="slots.footer">
        <slot name="footer"></slot>
      </template>
      <template #okText v-if="slots.okText">
        <slot name="okText"></slot>
      </template>
      <template #modalRender="{ originVNode }">
        <div :style="transformStyle">
          <component :is="originVNode" />
        </div>
      </template>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, computed, CSSProperties, watch, watchEffect, toRefs } from 'vue'
import { useDraggable } from '@vueuse/core'
export default defineComponent({
  props: [
    'visible',
    'afterClose',
    'bodyStyle',
    'cancelButtonProps',
    'cancelText',
    'centered',
    'closable',
    'closeIcon',
    'confirmLoading',
    'destroyOnClose',
    'dialogClass',
    'dialogStyle',
    'footer',
    'forceRender',
    'getContainer',
    'keyboard',
    'mask',
    'maskClosable',
    'maskStyle',
    'okButtonProps',
    'okText',
    'okType',
    'title',
    'width',
    'wrapClassName',
    'zIndex',
  ],
  emits: ['update:visible'],
  setup(props, { attrs, slots, emit }) {
    const { visible, ...otherProps } = toRefs(props)
    const modalVisible = ref<boolean>(false)
    const modalTitleRef = ref<HTMLElement>(null!)

    // 处理props
    const copyOtherProps: { [key: string]: any } = reactive({})
    const canusePropsKeys = Object.keys(otherProps).filter((key) => (otherProps as any)[key].value !== undefined && key !== 'title')
    canusePropsKeys.forEach((key) => {
      copyOtherProps[key as any] = (otherProps as any)[key].value
    })

    const { x, y, isDragging } = useDraggable(modalTitleRef)

    const startX = ref<number>(0)
    const startY = ref<number>(0)
    const startedDrag = ref(false)
    const transformX = ref(0)
    const transformY = ref(0)
    const preTransformX = ref(0)
    const preTransformY = ref(0)
    const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 })
    watch([x, y], () => {
      if (!startedDrag.value) {
        startX.value = x.value
        startY.value = y.value
        const bodyRect = document.body.getBoundingClientRect()
        const titleRect = modalTitleRef.value.getBoundingClientRect()
        dragRect.value.right = bodyRect.width - titleRect.width
        dragRect.value.bottom = bodyRect.height - titleRect.height
        preTransformX.value = transformX.value
        preTransformY.value = transformY.value
      }
      startedDrag.value = true
    })
    watch(isDragging, () => {
      if (!isDragging) {
        startedDrag.value = false
      }
    })
    watch(visible, (newV) => {
      modalVisible.value = newV
    })
    watch(modalVisible, (newV) => {
      emit('update:visible', newV)
    })
    watchEffect(() => {
      if (startedDrag.value) {
        transformX.value = preTransformX.value + Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) - startX.value
        transformY.value = preTransformY.value + Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) - startY.value
      }
    })
    const transformStyle = computed<CSSProperties>(() => {
      return {
        transform: `translate(${transformX.value}px, ${transformY.value}px)`,
      }
    })
    return {
      modalVisible,
      modalTitleRef,
      transformStyle,
      copyOtherProps,
      slots,
      props,
      attrs,
    }
  },
})
</script>
