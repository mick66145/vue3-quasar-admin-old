<template>
  <q-btn
    flat
    padding="0"
    :size="size"
    :color="color"
    :label="label"
  />
</template>

<script>
import { defineComponent } from 'vue-demi'

export default defineComponent({
  props: {
    label: { type: String, default: '' },
    color: { type: String, default: 'blue' },
    size: { type: String, default: '16px' },
  },
  setup () {
    return {
    }
  },
})
</script>

<style lang="scss" scoped></style>
