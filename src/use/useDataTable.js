import { useDataTableStore } from '@/stores/dataTable'
import { reactive, ref } from 'vue-demi'

export default function useDataTable (searchParames = {}, callback = () => {}) {
  const store = useDataTableStore()

  for (const [key, value] of Object.entries(searchParames)) {
    !store.search[key] && (store.search[key] = value)
  }

  const search = reactive(store.search)
  const data = ref(store.data)
  const total = ref(store.total)

  const onChangePage = (page) => {
    search.page = page
    if (callback && typeof (callback) === 'function') {
      callback()
    }
  }

  const onChangeFilter = () => {
    search.page = 1
    if (callback && typeof (callback) === 'function') {
      callback()
    }
  }

  const onReset = () => {
    search.page = 1
    if (callback && typeof (callback) === 'function') {
      callback()
    }
  }

  return {
    search,
    data,
    total,
    onChangePage,
    onChangeFilter,
    onReset,
  }
}
