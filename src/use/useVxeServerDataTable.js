import { reactive, ref, onMounted } from 'vue-demi'
import useSessionStorage from './useSessionStorage'
import mapKeys from 'lodash-es/mapKeys'

export default function useVxeServerDataTable ({
  searchParames = {},
  sortParames = [],
  sessionStorageKey = 'dashboardVxeServerDataTable',
  callback = () => {},
}) {
  // use
  const { setSessionStorage, getSessionStorage } = useSessionStorage()

  // data
  let sessionStorage = getSessionStorage(sessionStorageKey)
  const dataTable = ref()
  const search = reactive({})
  const data = ref([])
  const total = ref(0)
  const sort = ref([])

  // methods

  const onChangePage = (page) => {
    search.page = page
    setSessionStorage(sessionStorageKey, { search, sort: sort.value })
    if (callback && typeof (callback) === 'function') {
      callback()
    }
  }
  const onChangeFilter = () => {
    search.page = 1
    setSessionStorage(sessionStorageKey, { search, sort: sort.value })
    if (callback && typeof (callback) === 'function') {
      callback()
    }
  }
  const OnChangeSort = async ({ sortList }) => {
    search.page = 1
    if (sortList.length > 0) {
      search.orderby = sortList.map((item) => `${item.field}:${item.order}`).join(',')
      sort.value = sortList
    } else {
      search.orderby = sortParames.map((item) => `${item.field}:${item.order}`).join(',')
      sort.value = sortParames
    }
    setSessionStorage(sessionStorageKey, { search, sort: sort.value })
    if (callback && typeof (callback) === 'function') {
      callback()
    }
  }
  const onReset = () => {
    search.page = 1
    setSessionStorage(sessionStorageKey, { search })
    if (callback && typeof (callback) === 'function') {
      callback()
    }
  }

  // mounted
  onMounted(async () => {
    if (!sessionStorage) {
      const sessionStorageObj = {
        search: {
          page: 1,
          page_size: 10,
        },
        sort: [],
      }
      setSessionStorage(sessionStorageKey, sessionStorageObj)
      sessionStorage = getSessionStorage(sessionStorageKey)
    }
    for (const [key, value] of Object.entries(searchParames)) {
      !sessionStorage.search[key] && (sessionStorage.search[key] = value)
      key === 'page_size' && (sessionStorage.search[key] = value)
    }
    if (!sessionStorage.search.orderby) {
      sessionStorage.search.orderby = sortParames.map((item) => `${item.field}:${item.order}`).join(',')
      sessionStorage.sort = sortParames
    }
    sort.value = sessionStorage.sort ? sessionStorage.sort : sortParames
    mapKeys(sessionStorage.search, (_, key) => {
      search[key] = sessionStorage.search[key]
    })
    setSessionStorage(sessionStorageKey, { search, sort: sort.value })
    if (callback && typeof (callback) === 'function') {
      await callback()
      dataTable.value && (sessionStorage.sort.forEach((item) => { dataTable.value.sort(item) }))
    }
  })

  return {
    dataTable,
    search,
    data,
    total,
    onChangePage,
    onChangeFilter,
    OnChangeSort,
    onReset,
  }
}
