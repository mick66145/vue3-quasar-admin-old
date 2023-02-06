<template>
  <div>
    <vxe-table
      ref="dataTable"
      :key="refreshKey"
      class="q-mb-md"
      auto-resize
      round
      stripe
      :row-config="{ isHover: true }"
      :data="data"
      :sort-config="{ trigger: 'cell',remote:true}"
      :show-footer="showFooter"
      :footer-span-method="footerSpanMethod"
      :footer-method="footerMethod"
      @sort-change="onChangeSort"
      @checkbox-all="onCheckboxAll"
      @checkbox-change="onCheckboxChange"
    >
      <slot />
    </vxe-table>
    <pagination
      v-if="total > 0 && showPagination"
      :total="total"
      :current="current"
      @update:current="onUpdateCurrent"
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
    showFooter: { type: Boolean, default: false },
    footerSpanMethod: { type: Function },
    footerMethod: { type: Function },
  },
  emits: ['sort-change', 'checkbox-all', 'checkbox-change', 'update:current'],
  setup (props, { emit }) {
    // data
    const dataTable = ref()
    const refreshKey = ref(0)

    // methods
    const sort = (item) => {
      dataTable.value.sort(item)
    }
    const refresh = () => {
      refreshKey.value++
    }
    const updateFooter = () => {
      dataTable.value.updateFooter()
    }
    const getCheckboxRecords = () => {
      return dataTable.value.getCheckboxRecords()
    }
    const setCheckboxRow = (rows, checked) => {
      return dataTable.value.setCheckboxRow(rows, checked)
    }
    const toggleCheckboxRow = (row) => {
      return dataTable.value.toggleCheckboxRow(row)
    }
    const setAllCheckboxRow = (checked) => {
      return dataTable.value.setAllCheckboxRow(checked)
    }
    const clearCheckboxRow = () => {
      return dataTable.value.clearCheckboxRow()
    }
    const onChangeSort = ({ column, property, order, sortBy, sortList, $event }) => {
      emit('sort-change', { column, property, order, sortBy, sortList, $event })
    }
    const onCheckboxAll = ({ checked }) => {
      emit('checkbox-all', { checked })
    }
    const onCheckboxChange = ({ checked }) => {
      emit('checkbox-change', { checked })
    }
    const onUpdateCurrent = (current) => {
      emit('update:current', current)
    }

    return {
      dataTable,
      refreshKey,
      sort,
      refresh,
      updateFooter,
      getCheckboxRecords,
      setCheckboxRow,
      toggleCheckboxRow,
      setAllCheckboxRow,
      clearCheckboxRow,
      onChangeSort,
      onCheckboxAll,
      onCheckboxChange,
      onUpdateCurrent,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
