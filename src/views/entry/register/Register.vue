<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-image flex flex-center">
        <q-card
          class="w-3/10 <sm:w-4/5 <md:w-3/5 "
        >
          <q-card-section>
            <q-avatar size="103px" class="shadow-10 absolute-center">
              <img src="@/assets/images/login-images/profile.svg">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h4 ellipsis">{{ $t('g.system.system-name') }}</div>
              <div class="col text-h6 ellipsis">{{ $t('entry.register.title') }}</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form ref="form" class="q-gutter-md">
              <input-text
                v-model="formData.account"
                :label="$t('login.loginForm.account')"
                lazy-rules
                :rules="[
                  $rules.required('帳號必填'),
                ]"
              />

              <input-password
                v-model="formData.password"
                :label="$t('login.loginForm.password')"
                lazy-rules
                :rules="[
                  $rules.required('密碼必填'),
                ]"
                @keyup.enter="handleRegister"
              />

              <div>
                <base-button class="w-full q-mb-md" :label="$t('entry.register.btn.register')" @click.prevent="handleRegister" />
                <div class="text-center"><router-link class="text-black no-underline" to="/login">返回登入</router-link></div>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, reactive } from 'vue-demi'
import { useRouter } from 'vue-router'
import { useUser } from '@/stores/user'
import useCRUD from '@/use/useCRUD'

export default defineComponent({
  setup () {
    const router = useRouter()
    const store = useUser()

    // data
    const formData = reactive({
      account: '',
      password: '',
    })

    // methods
    const createFetch = async (payload) => {
      return await store.register(payload)
    }
    const handleRegister = () => {
      form.value.validate().then(async (success) => {
        if (success) {
          const payload = { ...formData }
          const urlObj = {
            register: () => { return callCreateFetch({ ...payload }) },
          }
          const [res, error] = await urlObj.register()
          if (res) router.push('/login')
        }
      })
    }

    // use
    const { form, callCreateFetch } = useCRUD({
      createSuccess: '註冊成功',
      createFetch: createFetch,
    })

    return {
      form,
      formData,
      handleRegister,
    }
  },
})
</script>

<style lang="scss" scoped>
.bg-image {
  background-image: linear-gradient(180deg, #7417ff 63.41%, #f8e1ff 100.66%);
}
</style>
