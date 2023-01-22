<template>
  <q-page class="q-pa-lg">
    <page-header>
      {{ $t('role.title') }}
      <template #action>
        <add-button
          to="/role/create"
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
              :to="'/role/edit/' + row.id"
            />
            <delete-button
              class="q-mr-xs"
              @click="onDelete(row)"
            />
          </template>
        </vxe-column>
      </vxe-server-table>
    </q-card>
  </q-page>
</template>

<script>
import RoleResource from '@/api/role'
import { defineComponent, ref, reactive } from 'vue-demi'
import useCRUD from '@/use/useCRUD'
import useVxeServerDataTable from '@/use/useVxeServerDataTable'
import useMessageDialog from '@/use/useMessageDialog'

const roleResource = new RoleResource()

export default defineComponent({
  setup () {
    // data
    const filter = reactive({
      keyword: null,
    })
    const tableFields = ref([
      { title: '建立時間', field: 'created_at', min_width: '130' },
      { title: '權限群組名稱', field: 'name', min_width: '130' },
    ])

    // methods
    const fetchData = async (payload) => {
      return await roleResource.list(payload).then((res) => {
        data.value = []
        data.value = res.list
        total.value = res.total
      })
    }

    const delFetch = async (id) => {
      return await roleResource.delete(id)
    }

    const onDelete = async (row) => {
      const res = await messageDelete({ title: '刪除', message: '確認刪除權限群組？' })
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

    const { dataTable, search, data, total, onChangePage, onChangeFilter, OnChangeSort } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{
        field: 'id',
        order: 'desc',
      }],
      sessionStorageKey: 'dashboardRoleServerDataTable',
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
