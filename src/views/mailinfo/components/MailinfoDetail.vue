<template>
  <q-page class="q-pa-lg">
    <page-header showPrev>
      信件詳情
    </page-header>
    <q-form ref="form">
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        <div class="col-12">
          <q-card class="shadow-7">
            <card-header>
              信件資訊
            </card-header>
            <card-body class="q-pt-none">
              <div class="flex-center row q-col-gutter-x-md q-col-gutter-y-xs">
                <div class="col-12 col-md-6">
                  <input-text
                    v-model="formData.subject"
                    class="full-width"
                    label="信件主旨 *"
                    placeholder="請輸入信件主旨"
                    :rules="[$rules.required('信件主旨必填')]"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <input-text
                    v-model="formData.fromname"
                    class="full-width"
                    label="寄件者名稱"
                    placeholder="請輸入寄件者名稱"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <input-text
                    v-model="formData.repeatname"
                    class="full-width"
                    label="回覆者名稱"
                    placeholder="請輸入回覆者名稱"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <input-email
                    v-model="formData.repeatmail"
                    class="full-width"
                    label="回覆者信箱"
                    placeholder="請輸入回覆者信箱"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <input-text
                    v-model="formData.cc"
                    class="full-width"
                    label="副本信箱"
                    placeholder="請輸入副本信箱"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <input-text
                    v-model="formData.bcc"
                    class="full-width"
                    label="密件副本信箱"
                    placeholder="請輸入密件副本信箱"
                  />
                </div>
              </div>
            </card-body>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12">
          <q-card class="shadow-7">
            <card-header>
              信件內文
            </card-header>
            <card-body class="q-pt-none">
              <div class="row q-col-gutter-x-md q-col-gutter-y-xs">
                <div class="col-xs-12 col-sm-12 col-md-12">
                  <input-editor
                    v-model="formData.content_json"
                    class="full-width"
                  />
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
import { MailinfofoResource } from '@/api'
import { Mailinfo } from '@/class'
import useCRUD from '@/use/useCRUD'
import useGoBack from '@/use/useGoBack'
import useDeltaConvert from '@/use/useDeltaConvert'

const mailinfofoResource = new MailinfofoResource()

export default defineComponent({
  components: {
  },
  props: {
    mode: { type: String, requred: true },
  },
  setup (props) {
    // data
    const { mode } = toRefs(props)
    const route = useRoute()
    const formData = ref(new Mailinfo())
    const categoryId = route.params.categoryId || null
    const id = route.params.id || null

    // methods
    const readFetch = async (categoryId, id, payload) => {
      return await mailinfofoResource.getAnnouncement(categoryId, id, payload)
    }
    const createFetch = async (categoryId, payload) => {
      return await mailinfofoResource.postAnnouncement(categoryId, payload)
    }
    const updateFetch = async (idObj, payload) => {
      const { categoryId, id } = idObj
      return await mailinfofoResource.patchAnnouncement(categoryId, id, payload)
    }
    const onSubmit = async () => {
      form.value.validate().then(async (success) => {
        if (success) {
          const payload = { ...formData.value }
          payload.content = payload.content_json ? renderHtml(payload.content_json?.ops || []) : ''
          payload.content_json = JSON.stringify(payload.content_json)
          const urlObj = {
            create: () => { return callCreateFetch(categoryId, { ...payload }) },
            edit: () => {
              const idObj = { categoryId: categoryId, id: id }
              return callUpdateFetch(idObj, { ...payload })
            },
          }
          const [res, error] = mode.value === 'create' ? await urlObj.create() : await urlObj.edit()
          if (res) goBack()
        }
      })
    }

    // mounted
    onMounted(async () => {
      if (id) {
        const [res, error] = await callReadFetch(categoryId, id)
        formData.value = res
      }
    })

    // use
    const { goBack } = useGoBack()
    const { form, callReadFetch, callCreateFetch, callUpdateFetch } = useCRUD({
      readFetch: readFetch,
      createFetch: createFetch,
      updateFetch: updateFetch,
    })
    const { renderHtml } = useDeltaConvert()

    return {
      form,
      formData,
      onSubmit,
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
