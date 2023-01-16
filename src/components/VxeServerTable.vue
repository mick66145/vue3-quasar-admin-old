<template>
  <vxe-table
    ref="dataTable"
    auto-resize
    round
    stripe
    :row-config="{ isHover: true }"
    :data="data"
    :sort-config="{ trigger: 'cell',remote:true}"
    @sort-change="OnChangeSort"
  >
    <slot />
  </vxe-table>
</template>

<script>
import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
  props: {
    data: { type: Array, default () { return [] } },
  },
  emits: ['sort-change'],
  setup (props, { emit }) {
    const dataTable = ref()
    const sort = (item) => {
      dataTable.value.sort(item)
    }
    const OnChangeSort = ({ column, property, order, sortBy, sortList, $event }) => {
      emit('sort-change', { column, property, order, sortBy, sortList, $event })
    }
    return {
      dataTable,
      sort,
      OnChangeSort,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
