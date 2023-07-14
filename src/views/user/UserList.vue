<template>
  <q-page class="q-pa-lg">
    <page-header>
      {{ $t('user.title') }}
      <template #action>
        <add-button
          v-permission="['create user']"
          to="/user/create"
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
          <vxe-column title="操作" fixed="right" :width="$q.screen.lt.sm ? 115 : 171">
            <template #default="{ row }">
              <div class="flex-center row">
                <edit-icon-button
                  v-permission="['update user']"
                  class="q-mr-xs q-mb-xs"
                  :to="'/user/edit/' + row.id"
                />
                <delete-icon-button
                  v-permission="['delete user']"
                  class="q-mr-xs q-mb-xs"
                  @click="onDelete(row)"
                />
                <base-icon-button
                  v-permission="['update user']"
                  icon="key"
                  class="q-mr-xs q-mb-xs"
                  color="black"
                  :label="$t('g.btn.reset-password')"
                  @click="onResetPassword(row)"
                />
              </div>
            </template>
          </vxe-column>
        </vxe-server-table>
      </card-body>
    </q-card>
  </q-page>
</template>

<script>
import { baseApiModules } from '@/api'
import { defineComponent, ref, reactive } from 'vue-demi'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'
import useMessageDialog from '@/hooks/useMessageDialog'

const userResource = new baseApiModules.UserResource()

export default defineComponent({
  setup () {
    // data
    const filter = reactive({
      keyword: null,
    })

    const tableFields = ref([
      { title: '帳號', field: 'account', min_width: '130' },
      { title: '姓名', field: 'name', min_width: '130' },
      { title: 'Email', field: 'email', min_width: '130' },
      { title: '所屬公司', field: 'company.name', min_width: '130' },
      { title: '權限群組', field: 'role.name', min_width: '130' },
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
      const res = await messageDelete({ title: '刪除', message: '確認刪除帳號？' })
      if (!res) return
      const [delRes] = await callDeleteFetch(row.id)
      if (delRes) {
        search.page = 1
        refreshFetch()
      }
    }

    const onResetPassword = async (row) => {
      const res = await messageConfirm({ title: '重置密碼', message: '確認重置密碼？' })
      if (!res) return
      const [resetPasswordRes] = await callResetPasswordFetch(row.id)
      if (resetPasswordRes) {
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
    const { messageAlert, messageConfirm, messageDelete } = useMessageDialog()

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
