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
              <div class="col text-h5 ellipsis">{{ $t('g.system.system-name') }}</div>
              <div class="col text-h6 ellipsis">{{ $t('entry.login.title') }}</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form ref="form" class="q-gutter-md">
              <input-text
                v-model="formData.account"
                :label="$t('entry.login.loginForm.account')"
                lazy-rules
                :rules="[
                  $rules.required('帳號必填'),
                ]"
              />
              <input-password
                v-model="formData.password"
                :label="$t('entry.login.loginForm.password')"
                lazy-rules
                :rules="[
                  $rules.required('密碼必填'),
                ]"
                @keyup.enter="handleLogin"
              />
              <div>
                <base-button class="w-full q-mb-md" :label="$t('entry.login.btn.login')" @click.prevent="handleLogin" />
                <base-button v-if="isShow.forgetPassword" class="text-white w-full q-mb-md" color="black" :label="$t('entry.login.btn.forget-password')" @click.prevent="showDialog({mode:'create'})" />
                <div v-if="isShow.register" class="text-center">還沒有帳號嗎? <span><router-link class="text-primary no-underline" to="/register">立即註冊</router-link></span></div>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
  <forget-password-dialog ref="dialog" />
</template>

<script>
import ForgetPasswordDialog from './components/ForgetPasswordDialog.vue'
import { defineComponent, ref, reactive, watch } from 'vue-demi'
import { useRouter } from 'vue-router'
import { useUser } from '@/stores/user'
import useCRUD from '@/hooks/useCRUD'

export default defineComponent({
  components: {
    ForgetPasswordDialog,
  },
  setup () {
    // data
    const router = useRouter()
    const store = useUser()
    const dialog = ref()
    const formData = reactive({
      account: '',
      password: '',
    })
    const redirect = ref(undefined)
    const otherQuery = ref({})
    const isShow = reactive({
      forgetPassword: false,
      register: false,
    })

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
    const showDialog = ({ data, mode }) => {
      dialog.value.showDialog({ data, mode })
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
      dialog,
      form,
      formData,
      redirect,
      otherQuery,
      isShow,
      getOtherQuery,
      showDialog,
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
