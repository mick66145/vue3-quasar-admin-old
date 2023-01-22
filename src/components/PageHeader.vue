<template>
  <div class="row page-header items-center justify-between q-mb-md">
    <div class="flex items-center">
      <SvgIcon v-if="showPrev" icon="arrow-left" class="cursor-pointer" size="24" @click="onPrev" />
      <h1 class="page-title" :class="showPrev && 'cursor-pointer'" @click="onPrev">
        <slot />
      </h1>
    </div>
    <div v-if="$slots.action">
      <slot name="action" />
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { defineComponent } from 'vue-demi'
export default defineComponent({
  props: {
    showPrev: { type: Boolean, default: false },
    goBackRoute: { type: String, default: '' },
  },
  emits: ['click:prev'],
  setup (props, { emit }) {
    const router = useRouter()

    const onPrev = () => {
      if (props.showPrev) {
        emit('click:prev')
        if (props.goBackRoute) {
          return router.push(props.goBackRoute)
        }
        if (window.history.length === 2 && !window.history.state.back) {
          return router.replace('/')
        }
        router.go(-1)
      }
    }

    return {
      onPrev,
    }
  },
})
</script>

<style lang="scss" scoped>
.page-header {
  @apply min-h-10;

  .page-title {
    @apply font-700 my-0 text-2xl;
  }
}
</style>
