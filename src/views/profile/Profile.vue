<template>
  <q-page class="q-pa-lg">
    <page-header showPrev>
      個人資料
    </page-header>
    <q-card class="shadow-7">
      <card-header>
        帳號資訊
      </card-header>
      <card-body class="q-pt-none">
        <q-form ref="form">
          <div class="row q-col-gutter-x-md q-col-gutter-y-xs">
            <div class="col-xs-12 col-sm-6 col-md-6">
              <input-text
                v-model="formData.account"
                class="full-width"
                label="帳號 *"
                placeholder="請輸入帳號"
                :rules="[$rules.required('帳號必填')]"
                disable
              />
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
              <input-email
                v-model="formData.email"
                class="full-width"
                label="Email *"
                placeholder="請輸入Email"
                :rules="[$rules.required('Email必填')]"
              />
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
              <input-textarea
                v-model="formData.remark"
                class="full-width"
                label="備註"
              />
            </div>
          </div>
        </q-form>
      </card-body>
    </q-card>
  </q-page>
  <fixed-footer @save="onSubmit" />
</template>

<script>

import { defineComponent, reactive } from 'vue-demi'
import { useUser } from '@/stores/user'
import useCRUD from '@/use/useCRUD'
import useGoBack from '@/use/useGoBack'

export default defineComponent({
  setup () {
    // data
    const store = useUser()
    const formData = reactive({ ...store.info })

    // methods
    const updateFetch = async (payload) => {
      return await store.profile(payload)
    }
    const onSubmit = async () => {
      form.value.validate().then(async (success) => {
        if (success) {
          const payload = { ...formData }
          const urlObj = {
            edit: () => {
              return callUpdateFetch({ ...payload })
            },
          }
          const [res, error] = await urlObj.edit()
          if (res) goBack()
        }
      })
    }

    // use
    const { goBack } = useGoBack()
    const { form, callUpdateFetch } = useCRUD({
      updateFetch: updateFetch,
    })

    return {
      formData,
      form,
      onSubmit,
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
