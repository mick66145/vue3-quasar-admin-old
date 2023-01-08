<template>
  <q-page class="q-pa-lg">
    <page-header showPrev>權限詳情</page-header>
    <q-card class="shadow-7 q-pa-lg">
      <q-card-section>
        <div class="text-h6 card-title">權限資訊</div>
      </q-card-section>
      <q-card-section>
        <q-form ref="form">
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
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
  <fixed-footer @save="onSubmit" />
</template>

<script>
import { defineComponent, ref, toRefs, watchEffect } from 'vue-demi'
import { useRoute } from 'vue-router'
import RoleResource from '@/api/role'
import useCRUD from '@/use/useCRUD'
import useGoBack from '@/use/useGoBack'

const roleResource = new RoleResource()

export default defineComponent({
  props: {
    mode: { type: String, requred: true },
  },
  setup (props) {
    // data
    const { mode } = toRefs(props)
    const route = useRoute()
    const formData = ref({
      name: '',
      menus: [],
    })

    const fallBack = { name: 'RoleList' }
    const id = route.params.id || null

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

    // watch
    watchEffect(async () => {
      if (!id) return
      const [res, error] = await callReadFetch(id)
      formData.value = res
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
