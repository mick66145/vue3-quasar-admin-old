<template>
  <q-page class="q-pa-lg">
    <page-header>
      Company
      <template #action>
        <add-button
          to="/company/create"
        />
      </template>
    </page-header>

    <q-card class="shadow-7 q-pa-lg">
      <div class="row q-mb-sm q-col-gutter-x-md q-col-gutter-y-xs">
        <div class="col-md-3 col-xs-12">
          <input-search
            v-model="search.keyword"
            class="full-width"
            dense
            @update:modelValue="onChangeFilter"
          />
        </div>
      </div>

      <vxe-server-table
        ref="dataTable"
        class="q-mb-md"
        :data="data"
        :total="total"
        :current="search.page"
        @sort-change="OnChangeSort"
        @update:current="onChangePage"
      >
        <vxe-column
          v-for="{ field, title, min_width } in tableFields"
          :key="field"
          :field="field"
          :title="title"
          sortable
          :min-width="$q.screen.lt.sm ? min_width : 'auto'"
        />
        <vxe-column title="操作" fixed="right" :width="$q.screen.lt.sm ? 85 : 150">
          <template #default="{ row }">
            <edit-button
              class="q-mr-xs"
              :to="'/company/edit/' + row.id"
            />
            <delete-button
              class="q-mr-xs"
              @click="onDelete(row)"
            />
          </template>
        </vxe-column>
      </vxe-server-table>

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
import CompanyResource from '@/api/company'
import { defineComponent, ref, reactive } from 'vue-demi'
import useCRUD from '@/use/useCRUD'
import useVxeServerDataTable from '@/use/useVxeServerDataTable'
import useMessageDialog from '@/use/useMessageDialog'

const companyResource = new CompanyResource()

export default defineComponent({
  setup () {
    // data
    const filter = reactive({
      keyword: null,
    })
    const tableFields = ref([
      { title: '公司名稱', field: 'name', min_width: '130' },
      { title: '聯絡電話', field: 'tel', min_width: '130' },
      { title: '客服電話', field: 'tel_service', min_width: '130' },
      { title: '地址', field: 'address', min_width: '130' },
      { title: 'Email', field: 'email', min_width: '130' },
    ])

    // methods
    const fetchData = async (payload) => {
      return await companyResource.list(payload).then((res) => {
        data.value = []
        data.value = res.list
        total.value = res.total
      })
    }

    const delFetch = async (id) => {
      return await companyResource.delete(id)
    }

    const onDelete = async (row) => {
      const res = await messageDelete({ title: '刪除', message: '確認刪除公司？' })
      if (!res) return
      const [delRes] = await callDeleteFetch(row.id)
      if (delRes) {
        search.page = 1
        refreshFetch()
      }
    }

    const refreshFetch = async () => {
      await getDataList({ ...search })
    }

    // use
    const { dataTable, search, data, total, onChangePage, onChangeFilter, OnChangeSort } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{
        field: 'id',
        order: 'desc',
      }],
      sessionStorageKey: 'dashboardCompanyServerDataTable',
      callback: refreshFetch,
    })
    const { messageDelete } = useMessageDialog()
    const { callDeleteFetch, callReadListFetch: getDataList } = useCRUD({
      deleteFetch: delFetch,
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
      onDelete,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
