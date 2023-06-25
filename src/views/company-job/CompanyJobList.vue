<template>
  <q-page class="q-pa-lg">
    <page-header>
      {{ $t('company-job.title') }}
      <template #action>
        <add-button
          v-permission="['create company_job']"
          @click="showDialog({})"
        />
      </template>
    </page-header>

    <q-card class="shadow-7">
      <card-body>
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
          <vxe-column title="操作" fixed="right" width="115">
            <template #default="{ row }">
              <div class="flex-center row">
                <edit-icon-button
                  v-permission="['update company_job']"
                  class="q-mr-xs q-mb-xs"
                  @click="showDialog({ id:row.id, mode:'edit', callRead:true })"
                />
                <delete-icon-button
                  v-permission="['delete company_job']"
                  class="q-mr-xs q-mb-xs"
                  @click="onDelete(row)"
                />
              </div>
            </template>
          </vxe-column>
        </vxe-server-table>
      </card-body>
    </q-card>
    <company-job-dialog ref="dialog" @save="refreshFetch" />
  </q-page>
</template>

<script>
import CompanyJobDialog from './components/CompanyJobDialog.vue'
import { CompanyJobResource } from '@/api'
import { defineComponent, ref, reactive } from 'vue-demi'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'
import useMessageDialog from '@/hooks/useMessageDialog'

const companyJobResource = new CompanyJobResource()

export default defineComponent({
  components: {
    CompanyJobDialog,
  },
  setup () {
    // data
    const filter = reactive({
      keyword: null,
    })
    const tableFields = ref([
      { title: '職稱', field: 'name', min_width: '130' },
    ])
    const dialog = ref()

    // methods
    const fetchData = async (payload) => {
      return await companyJobResource.list(payload).then((res) => {
        data.value = []
        data.value = res.list
        total.value = res.total
      })
    }

    const delFetch = async (id) => {
      return await companyJobResource.delete(id)
    }

    const onDelete = async (row) => {
      const res = await messageDelete({ title: '刪除', message: '確認刪除職稱？' })
      if (!res) return
      const [delRes] = await callDeleteFetch(row.id)
      if (delRes) {
        search.page = 1
        refreshFetch()
      }
    }
    const showDialog = ({ id, mode, callRead }) => {
      dialog.value.showDialog({ id, mode, callRead })
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
      sessionStorageKey: 'dashboardCompanyJobServerDataTable',
      callback: refreshFetch,
    })
    const { messageDelete } = useMessageDialog()
    const { callDeleteFetch, callReadListFetch: getDataList } = useCRUD({
      deleteFetch: delFetch,
      readListFetch: fetchData,
    })

    return {
      dataTable,
      dialog,
      tableFields,
      filter,
      data,
      total,
      search,
      onChangePage,
      onChangeFilter,
      OnChangeSort,
      onDelete,
      showDialog,
      refreshFetch,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
