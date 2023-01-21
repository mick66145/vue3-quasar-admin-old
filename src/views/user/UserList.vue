<template>
  <q-page class="q-pa-lg">
    <page-header>
      {{ $t('user.title') }}
      <template #action>
        <q-btn
          class="shadow-1"
          icon="add_circle"
          color="primary"
          :label="$t('g.btn.add')"
          to="/user/create"
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
        <vxe-column title="操作" fixed="right" :width="$q.screen.lt.sm ? 85 : 240">
          <template #default="{ row }">
            <q-btn
              class="shadow-1 q-mr-xs"
              outline
              rounded
              color="primary"
              :label="$t('g.btn.edit')"
              :to="'/user/edit/' + row.id"
            />
            <q-btn
              class="shadow-1 q-mr-xs"
              outline
              rounded
              color="red"
              :label="$t('g.btn.delete')"
              @click="onDelete(row)"
            />
            <q-btn
              class="shadow-1 q-mr-xs"
              outline
              rounded
              color="black"
              :label="$t('g.btn.reset-password')"
              @click="onResetPassword(row)"
            />
          </template>
        </vxe-column>
      </vxe-server-table>
    </q-card>
  </q-page>
</template>

<script>
import UserResource from '@/api/user'
import { defineComponent, ref, reactive } from 'vue-demi'
import useCRUD from '@/use/useCRUD'
import useVxeServerDataTable from '@/use/useVxeServerDataTable'
import useMessageDialog from '@/use/useMessageDialog'

const userResource = new UserResource()

export default defineComponent({
  setup () {
    // data
    const filter = reactive({
      keyword: null,
    })

    const tableFields = ref([
      { title: '姓名', field: 'name', min_width: '130' },
      { title: 'Email', field: 'email', min_width: '130' },
    ])

    // methods
    const fetchData = async (payload) => {
      return await userResource.list(payload).then((res) => {
        data.value = []
        data.value = res.list
        total.value = res.total
      })
    }

    const delFetch = async (id) => {
      return await userResource.delete(id)
    }

    const resetPasswordFetch = async (id) => {
      return await userResource.resetPassword(id)
    }

    const onDelete = async (row) => {
      const res = await messageDelete({ title: '刪除', message: '確認刪除人員？' })
      if (!res) return
      const [delRes] = await callDeleteFetch(row.id)
      if (delRes) {
        search.page = 1
        refreshFetch()
      }
    }

    const onResetPassword = async (row) => {
      const [res, error] = await callResetPasswordFetch(row.id)
      if (res) {
        await messageAlert({ title: '重置密碼成功', message: `密碼變更為 : ${res.data.password}` })
      }
    }

    const refreshFetch = async () => {
      await callReadListFetch({ ...search })
    }

    const { dataTable, search, data, total, onChangePage, onChangeFilter, OnChangeSort } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{
        field: 'id',
        order: 'desc',
      }],
      sessionStorageKey: 'dashboardUserServerDataTable',
      callback: refreshFetch,
    })
    const { messageAlert, messageDelete } = useMessageDialog()

    const { callCreateFetch: callResetPasswordFetch, callReadListFetch, callDeleteFetch } = useCRUD({
      createFetch: resetPasswordFetch,
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
      onResetPassword,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
