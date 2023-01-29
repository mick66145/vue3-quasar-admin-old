<template>
  <div>
    <vxe-table
      ref="dataTable"
      class="q-mb-md"
      auto-resize
      round
      stripe
      :row-config="{ isHover: true }"
      :data="data"
      :sort-config="{ trigger: 'cell'}"
    >
      <slot />
    </vxe-table>
    <pagination
      v-if="total > 0 && showPagination"
      :total="total"
      :current="current"
      @update:current="OnUpdateCurrent"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
  props: {
    data: { type: Array, default () { return [] } },
    total: { type: Number, default: 0 },
    current: { type: Number, default: 1 },
    showPagination: { type: Boolean, default: true },
  },
  emits: ['update:current'],
  setup (props, { emit }) {
    const dataTable = ref()
    const OnUpdateCurrent = (current) => {
      emit('update:current', current)
    }

    return {
      dataTable,
      OnUpdateCurrent,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
