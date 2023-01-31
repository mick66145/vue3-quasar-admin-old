<template>
  <q-page class="q-pa-lg">
    <page-header showPrev> 編輯Company </page-header>
    <q-card class="shadow-7 q-pa-lg">
      <card-header>
        公司資訊
      </card-header>
      <card-body>
        <q-form ref="form">
          <div class="row q-col-gutter-x-md q-col-gutter-y-md">
            <div class="col-xs-12 col-sm-6 col-md-6">
              <input-text
                v-model="formData.name"
                class="full-width"
                label="公司名稱 *"
                :rules="[$rules.required('Company is required')]"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3">
              <input-text
                v-model="formData.invoice"
                class="full-width"
                label="發票抬頭"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3">
              <input-text
                v-model="formData.vatnumber"
                class="full-width"
                label="統一編號"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3">
              <input-text
                v-model="formData.ceo"
                class="full-width"
                label="負責人"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3">
              <input-date
                v-model="formData.opendate"
                class="full-width"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3">
              <input-text
                v-model="formData.tel"
                type="tel"
                class="full-width"
                label="主要電話"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3">
              <input-text
                v-model="formData.tel_ext"
                class="full-width"
                label="分機"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3">
              <input-text
                v-model="formData.tel_service"
                type="tel"
                class="full-width"
                label="客服電話"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <input-text
                v-model="formData.service_time"
                class="full-width"
                label="客服時間"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3">
              <input-text
                v-model="formData.phone"
                class="full-width"
                label="手機"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3">
              <input-text
                v-model="formData.fax1"
                class="full-width"
                label="傳真1"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-9">
              <input-text
                v-model="formData.email"
                type="email"
                class="full-width"
                label="Email"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3">
              <input-select
                v-model="formData.city"
                class="full-width"
                :options="cityList"
                label="縣市"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3">
              <input-select
                v-model="formData.area"
                class="full-width"
                :options="areaList"
                label="鄉鎮區"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-2">
              <input-text
                v-model="formData.post_code"
                class="full-width"
                label="郵遞區號"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
              <input-text
                v-model="formData.address"
                class="full-width"
                label="地址"
              />
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
              <input-text
                v-model="formData.address_en"
                class="full-width"
                label="地址(英)"
              />
            </div>
          </div>
        </q-form>
      </card-body>
    </q-card>
  </q-page>
  <fixed-footer go-back-route="/company" @save="onSubmit" />
</template>

<script>
import { defineComponent, ref, toRefs, watchEffect } from 'vue-demi'
import { useRoute } from 'vue-router'
import { CompanyResource } from '@/api'
import useCRUD from '@/use/useCRUD'
import useGoBack from '@/use/useGoBack'

const companyResource = new CompanyResource()

export default defineComponent({
  props: {
    mode: { type: String, requred: true },
  },
  setup (props, { emit }) {
    // data
    const { mode } = toRefs(props)
    const route = useRoute()
    const formData = ref({
      name: '',
      invoice: '',
      vatnumber: '',
      ceo: '',
      opendate: '',
      tel: '',
      tel_ext: '',
      tel_service: '',
      service_time: '',
      phone: '',
      fax1: '',
      email: '',
      city: '',
      area: '',
      post_code: '',
      address: '',
      address_en: '',
    })
    const cityList = ref(['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'])
    const areaList = ref(['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'])
    const fallBack = { name: 'CompanyList' }
    const id = route.params.id || null

    // methods
    const readFetch = async (id, payload) => {
      return await companyResource.get(id, payload)
    }
    const createFetch = async (payload) => {
      return await companyResource.post(payload)
    }
    const updateFetch = async (id, payload) => {
      return await companyResource.patch(id, payload)
    }

    const onSubmit = async () => {
      form.value.validate().then(async (success) => {
        if (success) {
          const payload = { ...formData.value }
          let res, error
          if (mode.value === 'edit') {
            [res, error] = await callUpdateFetch(id, {
              ...payload,
            })
            if (res) goBack()
          } else if (mode.value === 'create') {
            [res, error] = await callCreateFetch({ ...payload })
          }
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

    // watch
    watchEffect(async () => {
      if (!id) return
      const [res, error] = await callReadFetch(id)
      formData.value = res
    })

    return {
      formData,
      cityList,
      areaList,
      form,
      onSubmit,
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
