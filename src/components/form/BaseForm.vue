<template>
  <q-form @submit="onSubmit" @reset="onReset">
    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>
  </q-form>
</template>

<script>
import { defineComponent } from 'vue-demi'

export default defineComponent({
  props: { },
  emits: ['submit', 'reset'],
  setup (props, { emit }) {
    const onSubmit = () => {
      emit('submit')
    }
    const onReset = () => {
      emit('reset')
    }
    return {
      onSubmit,
      onReset,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
