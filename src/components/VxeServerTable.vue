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
      :sort-config="{ trigger: 'cell',remote:true}"
      @sort-change="OnChangeSort"
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
  emits: ['sort-change', 'update:current'],
  setup (props, { emit }) {
    const dataTable = ref()
    const sort = (item) => {
      dataTable.value.sort(item)
    }
    const OnChangeSort = ({ column, property, order, sortBy, sortList, $event }) => {
      emit('sort-change', { column, property, order, sortBy, sortList, $event })
    }

    const OnUpdateCurrent = (current) => {
      emit('update:current', current)
    }

    return {
      dataTable,
      sort,
      OnChangeSort,
      OnUpdateCurrent,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
