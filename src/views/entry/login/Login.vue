<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-image flex flex-center">
        <q-card
          :style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
        >
          <q-card-section>
            <q-avatar size="103px" class="shadow-10 absolute-center">
              <img src="@/assets/images/login-images/profile.svg">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">{{ $t('login.title') }}</div>
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
                @keyup.enter="handleLogin"
              />

              <div class="text-right">
                <q-btn :label="$t('login.btn.login')" type="button" color="primary" @click.prevent="handleLogin" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, reactive, watch } from 'vue-demi'
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
    const redirect = ref(undefined)
    const otherQuery = ref({})

    // methods
    const createFetch = async (payload) => {
      return await store.login(payload)
    }
    const getOtherQuery = (query) => {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    const handleLogin = () => {
      form.value.validate().then(async (success) => {
        if (success) {
          const payload = { ...formData }
          const urlObj = {
            login: () => { return callCreateFetch({ ...payload }) },
          }
          const [res, error] = await urlObj.login()
          if (res) router.push({ path: redirect.value || '/', query: otherQuery.value })
        }
      })
    }

    // use
    const { form, callCreateFetch } = useCRUD({
      createSuccess: '登入成功',
      createFetch: createFetch,
    })

    // watch
    watch(() => router, () => {
      const query = router.query
      if (query) {
        redirect.value = query.redirect
        otherQuery.value = getOtherQuery(query)
      }
    })

    return {
      form,
      formData,
      redirect,
      otherQuery,
      getOtherQuery,
      handleLogin,
    }
  },
})
</script>

<style lang="scss" scoped>
.bg-image {
  background-image: linear-gradient(180deg, #7417ff 63.41%, #f8e1ff 100.66%);
}
</style>
