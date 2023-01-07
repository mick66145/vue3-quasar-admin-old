import { reactive, ref, watch } from 'vue-demi'
import useLocalStorage from './useLocalStorage'
import XEUtils from 'xe-utils'
import _ from 'lodash-es'
export default function useClientDataTable ({
  searchParames = {},
  localStorageKey = 'dashboardClientDataTable',
  tableFields = [],
}) {
  const { setLocalStorage, getLocalStorage } = useLocalStorage()
  let localStorage = getLocalStorage(localStorageKey)
  if (!localStorage) {
    const localStorageObj = {
      search: {
        page: 1,
        page_size: 10,
      },
    }
    setLocalStorage(localStorageKey, localStorageObj)
    localStorage = getLocalStorage(localStorageKey)
  }
  for (const [key, value] of Object.entries(searchParames)) {
    !localStorage.search[key] && (localStorage.search[key] = value)
    key === 'page_size' && (localStorage.search[key] = value)
  }
  setLocalStorage(localStorageKey, localStorage)

  const search = reactive(localStorage.search)
  const originalData = ref(localStorage.data)
  const data = ref([])
  const total = ref(0)

  const onChangePage = (page) => {
    search.page = page
    setLocalStorage(localStorageKey, { search })
  }

  const onChangeFilter = () => {
    search.page = 1
    setLocalStorage(localStorageKey, { search })
  }

  const onKeywordSearch = (keyword) => {
    const filterName = XEUtils.toValueString(keyword).trim().toLowerCase()
    if (filterName) {
      const searchProps = _(tableFields).map('field').value()
      const rest = originalData.value.filter(item => searchProps.some(key => XEUtils.toValueString(item[key]).toLowerCase().indexOf(filterName) > -1))
      data.value = rest.map(row => {
        const item = Object.assign({}, row)
        searchProps.forEach(key => {
          item[key] = XEUtils.toValueString(item[key])
        })
        return item
      })
    } else {
      data.value = originalData.value
    }
    setLocalStorage(localStorageKey, { search, keyword: keyword })
  }

  const onReset = () => {
    search.page = 1
    setLocalStorage(localStorageKey, { search })
  }

  // watch
  watch(() => originalData.value, (newValue) => {
    data.value = newValue
  })

  return {
    search,
    data,
    originalData,
    total,
    onChangePage,
    onChangeFilter,
    onReset,
    onKeywordSearch,
  }
}
