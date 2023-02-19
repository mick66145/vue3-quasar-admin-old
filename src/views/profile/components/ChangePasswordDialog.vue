<template>
  <input-dialog
    v-model="isShowDialog"
    title="修改密碼"
    confirmButtonText="送出"
    @save="onSave"
    @hide="onHide"
  >
    <q-form ref="form">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
          <q-item>
            <input-password
              v-model="data.state.old_password"
              class="full-width"
              label="舊密碼 *"
              placeholder="請輸入舊密碼"
              :rules="[$rules.required('舊密碼必填')]"
            />
          </q-item>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12">
          <q-item>
            <input-password
              v-model="data.state.new_password"
              class="full-width"
              label="新密碼 *"
              placeholder="請輸入新密碼"
              :rules="[$rules.required('新密碼必填')]"
            />
          </q-item>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12">
          <q-item>
            <input-password
              v-model="data.state.confirm_password"
              class="full-width"
              label="確認新密碼 *"
              placeholder="請輸入確認新密碼"
              :rules="[
                $rules.required('確認新密碼必填'),
                $rules.sameAs(data.state.new_password,'與新密碼不相符')
              ]"
            />
          </q-item>
        </div>
      </div>
    </q-form>
  </input-dialog>
</template>

<script>
import { defineComponent } from 'vue-demi'
import { useUser } from '@/stores/user'
import useDialog from '@/use/useDialog'
import useLogout from '@/use/useLogout'

export default defineComponent({
  emits: ['save'],
  setup (props, { emit }) {
    // data
    const store = useUser()

    // methods
    const createFetch = async (payload) => {
      return await store.changePassword(payload)
    }
    const onSave = async () => {
      const [res, error] = await save()
      if (res) {
        resetStore()
      }
    }
    const onHide = () => {
      data.reset()
    }

    // use
    const { form, mode, data, isShowDialog, showDialog, save } = useDialog({
      formData: {
        old_password: '',
        new_password: '',
        confirm_password: '',
      },
      createSuccess: '修改密碼成功',
      createFetch: createFetch,
    })
    // use
    const { resetStore } = useLogout()

    return {
      form,
      mode,
      data,
      isShowDialog,
      showDialog,
      onSave,
      onHide,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
