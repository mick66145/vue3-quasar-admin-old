import { useDataTableStore } from '@/stores/dataTable'
import { reactive, ref, watch } from 'vue-demi'
import XEUtils from 'xe-utils'
import _ from 'lodash-es'
export default function useClientDataTable ({
  searchParames = {},
  tableFields = [],
}) {
  const store = useDataTableStore()
  for (const [key, value] of Object.entries(searchParames)) {
    !store.search[key] && (store.search[key] = value)
  }

  const search = reactive(store.search)
  const originalData = ref(store.data)
  const data = ref([])
  const total = ref(store.total)

  const onChangePage = (page) => {
    search.page = page
  }

  const onChangeFilter = () => {
    search.page = 1
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
  }

  const onReset = () => {
    search.page = 1
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
