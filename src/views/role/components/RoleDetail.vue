<template>
  <q-page class="q-pa-lg">
    <page-header showPrev>權限詳情</page-header>
    <q-form ref="form">
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        <div class="col-12">
          <q-card class="shadow-7">
            <card-header>
              權限資訊
            </card-header>
            <card-body class="q-pt-none">
              <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <input-text
                    v-model="formData.name"
                    class="full-width"
                    label="權限群組名稱*"
                    placeholder="請輸入權限群組名稱"
                    :rules="[$rules.required('權限群組名稱必填')]"
                  />
                </div>
              </div>
            </card-body>
          </q-card>
        </div>
        <div class="col-12">
          <q-card class="shadow-7">
            <card-header>
              權限設定
            </card-header>
            <card-body class="q-pt-none">
              <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                <div v-for="menuPermissionItem in menuPermissionList" :key="menuPermissionItem" class="col-12">
                  <q-card
                    class="shadow-0 permissions-card"
                    bordered
                  >
                    <q-card-section class="bg-gray-100">
                      <div class="text-h6">{{ menuPermissionItem.name }}</div>
                    </q-card-section>
                    <q-card-section vertical class="p-0">
                      <div v-for="(childItem,index) in menuPermissionItem.childs" :key="childItem">
                        <div class="p-2 row items-center">
                          <span class="h-full col-md-2 col-sm-3 permissions-title ">
                            {{ childItem.name }}
                          </span>
                          <div
                            v-for="permissionItem in childItem.permissions"
                            :key="permissionItem"
                            class="flex col-md-2 col-sm-3"
                          >
                            <input-checkbox
                              v-model="permissionItem.is_active"
                              :label="permissionItem.display_name"
                              :val="permissionItem"
                            />
                          </div>
                        </div>
                        <q-separator v-show="menuPermissionItem.childs.length - 1 !== index" class="w-full" />
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </card-body>
          </q-card>
        </div>
      </div>
    </q-form>
  </q-page>
  <fixed-footer @save="onSubmit" />
</template>

<script>
import { defineComponent, ref, toRefs, onMounted } from 'vue-demi'
import { useRoute } from 'vue-router'
import { RoleResource, MenuPermissionResource } from '@/api'
import { Role } from '@/class'
import { breadthFirstSearch } from '@/utils/tree'
import useCRUD from '@/use/useCRUD'
import useGoBack from '@/use/useGoBack'
import _ from 'lodash-es'

const roleResource = new RoleResource()
const menuPermissionResource = new MenuPermissionResource()

export default defineComponent({
  props: {
    mode: { type: String, requred: true },
  },
  setup (props) {
    // data
    const { mode } = toRefs(props)
    const route = useRoute()
    const formData = ref(new Role())
    const menuPermissionList = ref([])
    const permissionsIdList = ref([])
    const id = route.params.id || null

    // mounted
    onMounted(async () => {
      await callMenuPermissionListFetch()
      if (id) {
        const [res, error] = await callReadFetch(id)
        formData.value = res
        permissionsIdList.value = _(res.permissions).map('id').value()
        breadthFirstSearch(menuPermissionList.value, node => {
          node.permissions.forEach(element => {
            (permissionsIdList.value.includes(element.id)) && (element.is_active = true)
          })
        })
      }
    })

    // methods
    const readFetch = async (id, payload) => {
      return await roleResource.get(id, payload)
    }
    const createFetch = async (payload) => {
      return await roleResource.post(payload)
    }
    const updateFetch = async (id, payload) => {
      return await roleResource.patch(id, payload)
    }
    const fetchMenuPermissionData = async () => {
      return await menuPermissionResource.list().then((res) => {
        menuPermissionList.value = []
        menuPermissionList.value = res.list
      })
    }
    const onSubmit = async () => {
      form.value.validate().then(async (success) => {
        if (success) {
          const payload = { ...formData.value }
          payload.permissions = []
          breadthFirstSearch(menuPermissionList.value, node => {
            node.permissions.forEach(element => {
              (element.is_active) && (payload.permissions.push(element))
            })
          })
          const urlObj = {
            create: () => { return callCreateFetch({ ...payload }) },
            edit: () => {
              return callUpdateFetch(id, { ...payload })
            },
          }
          const [res, error] = mode.value === 'create' ? await urlObj.create() : await urlObj.edit()
          if (res) goBack()
        }
      })
    }

    // use
    const { goBack } = useGoBack()
    const { form, callReadFetch, callCreateFetch, callUpdateFetch } = useCRUD({
      readFetch: readFetch,
      createFetch: createFetch,
      updateFetch: updateFetch,
    })
    // role
    const { callReadListFetch: callMenuPermissionListFetch } = useCRUD({
      readListFetch: fetchMenuPermissionData,
    })

    return {
      form,
      formData,
      menuPermissionList,
      onSubmit,
    }
  },
})
</script>

<style lang="scss" scoped>
.permissions-card {
  @apply mb-4;

  .permissions-title {
    @apply m-0 pl-3  self-center;
  }
}
</style>
