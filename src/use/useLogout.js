import { useUser } from '@/stores/user'
import { useRouter } from 'vue-router'
import useNotify from './useNotify'
export default function useLogout () {
  const router = useRouter()
  const { notify } = useNotify()
  const storeUser = useUser()

  const resetStore = () => {
    storeUser.logout()
    notify({ message: '登出成功', type: 'positive' })
    router.push('/login')
  }

  return {
    resetStore,
  }
}
