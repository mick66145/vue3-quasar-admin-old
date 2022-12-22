<template>
  <q-page class="q-pa-lg">
    <page-header>
      {{ $t('company-job.title') }}
    </page-header>

    <q-card class="shadow-7 q-pa-lg">
      <div class="row q-mb-sm q-col-gutter-x-md q-col-gutter-y-xs">
        <div class="col-md-3 col-xs-12">
          <input-text
            v-model="search.keyword"
            class="full-width"
            outlined
            clearable
            dense
            placeholder="請輸入搜尋文字"
            @update:modelValue="onChangeFilter"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </input-text>
        </div>
      </div>

      <vxe-table
        class="q-mb-md"
        auto-resize
        round
        stripe
        :row-config="{ isHover: true }"
        :data="data"
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
            <q-btn
              class="shadow-1 q-mr-xs"
              outline
              rounded
              color="red"
              :label="$t('g.btn.delete')"
              @click="onDelete(row)"
            />
          </template>
        </vxe-column>
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
import Pagination from '@/components/Pagination.vue'
import CompanyJobResource from '@/api/company-job'
import { defineComponent, ref, reactive, onMounted } from 'vue-demi'
import { useAsyncState } from '@vueuse/core'
import useCRUD from '@/use/useCRUD'
import useDataTable from '@/use/useDataTable'
import useMessageDialog from '@/use/useMessageDialog'

const companyJobResource = new CompanyJobResource()

export default defineComponent({
  components: {
    Pagination,
  },
  setup () {
    // data
    const filter = reactive({
      keyword: null,
    })
    const tableFields = ref([
      { title: '職稱', field: 'name', min_width: '130' },
    ])

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

    const refreshFetch = async () => {
      await getDataList(0, { ...search })
    }

    // use
    const { execute: getDataList } = useAsyncState(fetchData, {}, { immediate: false })

    const { search, data, total, onChangePage, onChangeFilter } = useDataTable(
      filter,
      refreshFetch,
    )
    const { messageDelete } = useMessageDialog()
    const { callDeleteFetch } = useCRUD({
      deleteFetch: delFetch,
    })

    // mounted
    onMounted(() => {
      refreshFetch()
    })

    return {
      tableFields,
      filter,
      data,
      total,
      search,
      onChangePage,
      onChangeFilter,
      onDelete,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
