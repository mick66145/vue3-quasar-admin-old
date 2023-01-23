<template>
  <q-page class="q-pa-lg">
    <page-header>
      {{ $t('system-log.title') }}
    </page-header>

    <q-card class="shadow-7 q-pa-lg">
      <div class="row q-mb-sm q-col-gutter-x-md q-col-gutter-y-xs" />

      <vxe-table
        ref="dataTable"
        class="q-mb-md"
        auto-resize
        round
        stripe
        :row-config="{ isHover: true }"
        :data="data"
        :sort-config="{ trigger: 'cell'}"
        @sort-change="OnChangeSort"
      >
        <vxe-column
          v-for="{ field, title, min_width } in tableFields"
          :key="field"
          :field="field"
          :title="title"
          sortable
          :min-width="$q.screen.lt.sm ? min_width : 'auto'"
        />
      </vxe-table>

      <pagination
        v-if="total > 0"
        :total="total"
        :current="search.page"
        @update:current="onChangePage"
      />
    </q-card>
  </q-page>
</template>

<script>
import { SystemResource } from '@/api'
import { defineComponent, ref, reactive } from 'vue-demi'
import useCRUD from '@/use/useCRUD'
import useVxeServerDataTable from '@/use/useVxeServerDataTable'

const systemResource = new SystemResource()

export default defineComponent({
  setup () {
    // data
    const filter = reactive({
      keyword: null,
    })
    const tableFields = ref([
      { title: '操作人員', field: 'user.name', min_width: '130' },
      { title: '帳號', field: 'user.account', min_width: '130' },
      { title: '操作日期', field: 'created_at', min_width: '130' },
      { title: '操作描述', field: 'description', min_width: '130' },
      { title: 'IP位置', field: 'sourceip', min_width: '130' },
    ])

    // methods
    const fetchData = async (payload) => {
      return await systemResource.recordLoglist(payload).then((res) => {
        data.value = []
        data.value = res.list
        total.value = res.total
      })
    }

    const refreshFetch = async () => {
      await getDataList({ ...search })
    }

    const { dataTable, search, data, total, onChangePage, onChangeFilter, OnChangeSort } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{
        field: 'id',
        order: 'desc',
      }],
      sessionStorageKey: 'dashboardSystemLogServerDataTable',
      callback: refreshFetch,
    })

    const { callReadListFetch: getDataList } = useCRUD({
      readListFetch: fetchData,
    })

    return {
      dataTable,
      tableFields,
      filter,
      data,
      total,
      search,
      onChangePage,
      onChangeFilter,
      OnChangeSort,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
