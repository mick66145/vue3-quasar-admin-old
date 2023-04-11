<template>
  <q-page class="q-pa-lg">
    <page-header>
      {{ $t('mail-log.title') }}
    </page-header>

    <q-card class="shadow-7 q-pa-lg">
      <div class="row items-center justify-between q-mb-md q-col-gutter-x-md q-col-gutter-y-md">
        <div class="col-md-10 col-sm-9 col-xs-12 ">
          <div class="row q-col-gutter-x-md q-col-gutter-y-xs">
            <div class="col-md-3 col-sm-6 col-xs-12">
              <input-date-range
                v-model="search.date_range"
                class="full-width"
                dense
                @update:modelValue="onChangeFilter"
              />
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
              <input-search
                v-model="search.keyword"
                class="full-width"
                dense
                @update:modelValue="onChangeFilter"
              />
            </div>
          </div>
        </div>
        <div class="col-md-2 col-sm-3 col-xs-12">
          <div class="row q-col-gutter-x-md q-col-gutter-y-xs">
            <div class="col-12">
              <reset-button
                class="w-full"
                @click="onReset"
              />
            </div>
          </div>
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
      </vxe-server-table>
    </q-card>
  </q-page>
</template>

<script>
import { MailLogResource } from '@/api'
import { defineComponent, ref, reactive } from 'vue-demi'
import useCRUD from '@/use/useCRUD'
import useVxeServerDataTable from '@/use/useVxeServerDataTable'

const mailLogResource = new MailLogResource()

export default defineComponent({
  setup () {
    // data
    const filter = reactive({
      keyword: null,
    })
    const tableFields = ref([
      { title: '寄送日期', field: 'send_datetime', min_width: '130' },
      { title: '寄件人信箱', field: 'from', min_width: '130' },
      { title: '收件人信箱', field: 'to', min_width: '130' },
      { title: '副本信箱', field: 'cc', min_width: '130' },
      { title: '密件副本信箱', field: 'bcc', min_width: '130' },
      { title: '信件主旨', field: 'subject', min_width: '130' },
      { title: '摘要', field: 'content', min_width: '130' },
      { title: '狀態', field: 'state_text', min_width: '130' },
    ])

    // methods
    const fetchData = async (payload) => {
      return await mailLogResource.list(payload).then((res) => {
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
      sessionStorageKey: 'dashboardMailLogServerDataTable',
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
