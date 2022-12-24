<template>
  <q-page class="q-pa-lg">
    <page-header showPrev> 帳號詳情 </page-header>
    <q-card class="shadow-7 q-pa-lg">
      <q-card-section>
        <div class="text-h6 card-title">帳號資訊</div>
      </q-card-section>
      <q-card-section>
        <q-form ref="form">
          <div class="row q-col-gutter-x-md q-col-gutter-y-md">
            <div class="col-xs-12 col-sm-6 col-md-6">
              <input-text
                v-model="formData.account"
                class="full-width"
                label="帳號 *"
                placeholder="請輸入帳號"
                :rules="[$rules.required('帳號必填')]"
              />
            </div>
            <div v-if="mode==='create'" class="col-xs-12 col-sm-6 col-md-6">
              <div class="h-24">
                <input-password
                  v-model="formData.password"
                  class="full-width"
                  label="密碼 *"
                  placeholder="請輸入密碼"
                  :rules="[
                    $rules.required('密碼必填'),
                    $rules.regex(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)(?!.* ).{8,}$/i,'格式錯誤')
                  ]"
                >
                  <template #hint>
                    1. 密碼長度可為 8 至 255 個字元長度<br>
                    2. 密碼必須包含至少一個數字 (0-9) 、一個英文字母 (a-z A-Z) 及一個特殊符號 (()[]{}+-*/?,.:;"'_\|~`!@#$%^&=
                    ) ，但密碼第一個和最後一個字元不能為空格
                  </template>
                </input-password>
              </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <input-text
                v-model="formData.name"
                class="full-width"
                label="人員名稱 *"
                placeholder="請輸入人員名稱"
                :rules="[$rules.required('人員名稱必填')]"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <input-text
                v-model="formData.email"
                class="full-width"
                label="Email *"
                type="email"
                placeholder="請輸入Email"
                :rules="[
                  $rules.required('Email必填'),
                  $rules.email('必須是email格式')
                ]"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <input-select
                v-model="formData.role"
                :options="roleList"
                class="full-width"
                label="權限群組 *"
                placeholder="請選擇權限群組"
              />
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
              <input-text
                v-model="formData.remark"
                class="full-width"
                label="備註"
                placeholder="請輸入備註"
                type="textarea"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
  <fixed-footer go-back-route="/user" @save="onSubmit" />
</template>

<script>
import FixedFooter from '@/components/FixedFooter.vue'
import { defineComponent, ref, toRefs, watchEffect, onMounted } from 'vue-demi'
import { useRoute } from 'vue-router'
import UserResource from '@/api/user'
import RoleResource from '@/api/role'
import useCRUD from '@/use/useCRUD'
import useGoBack from '@/use/useGoBack'
import { asyncComputed } from '@vueuse/core'

const userResource = new UserResource()
const roleResource = new RoleResource()

export default defineComponent({
  components: {
    FixedFooter,
  },
  props: {
    mode: { type: String, requred: true },
  },
  setup (props) {
    // data
    const { mode } = toRefs(props)
    const route = useRoute()
    const formData = ref({
      account: '',
      password: '',
      name: '',
      email: '',
      remark: '',
      role: '',
    })
    const roleList = ref([])
    const fallBack = { name: 'UserList' }
    const id = route.params.id || null

    // mounted
    onMounted(async () => {
      await callRoleListFetch()
    })

    // methods
    const readFetch = async (id, payload) => {
      return await userResource.get(id, payload)
    }
    const createFetch = async (payload) => {
      return await userResource.post(payload)
    }
    const updateFetch = async (id, payload) => {
      return await userResource.patch(id, payload)
    }
    const fetchRoleData = async (payload) => {
      return await roleResource.list(payload).then((res) => {
        roleList.value = []
        roleList.value = res.list
      })
    }
    const onSubmit = async () => {
      form.value.validate().then(async (success) => {
        if (success) {
          const payload = { ...formData.value }
          const urlObj = {
            creat: () => { return callCreateFetch({ ...payload }) },
            edit: () => {
              return callUpdateFetch(id, { ...payload })
            },
          }
          const [res, error] = mode.value === 'create' ? await urlObj.creat() : await urlObj.edit()
          if (res) goBack()
        }
      })
    }

    // use
    const { goBack } = useGoBack({ fallBack })
    const { form, callReadFetch, callCreateFetch, callUpdateFetch } = useCRUD({
      readFetch: readFetch,
      createFetch: createFetch,
      updateFetch: updateFetch,
    })
    const { callReadListFetch: callRoleListFetch } = useCRUD({
      readListFetch: fetchRoleData,
    })

    // watch
    watchEffect(async () => {
      if (!id) return
      const [res, error] = await callReadFetch(id)
      formData.value = res
    })

    return {
      formData,
      form,
      roleList,
      onSubmit,
    }
  },
})
</script>

<style lang="scss" scoped>
.card-title {
  @apply p-l-11px;

  &::before {
    @apply content-[""];
    @apply top-[calc(50%_-_12px)] left-4 absolute;
    @apply h-28px w-3px ;
    @apply bg-primary;
  }
}
</style>
