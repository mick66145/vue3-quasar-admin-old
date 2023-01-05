import { ref } from 'vue-demi'
import useCRUD from '@/use/useCRUD'
import useQuickState from '@/use/useQuickState'
import mapKeys from 'lodash-es/mapKeys'
export default function useDialog ({
  formData,
  createFetch,
  createSuccess = '新增成功',
  createFail = '新增失敗',

  readFetch,
  readSuccess = '讀取成功',
  readFail = '讀取失敗',

  updateFetch,
  updateSuccess = '編輯成功',
  updateFail = '編輯失敗',

  deleteFetch,
  deleteSuccess = '刪除成功',
  deleteFail = '刪除失敗',

  readListFetch,
  readListSuccess = '讀取列表成功',
  readListFail = '讀取列表失敗',

}) {
  // data
  const form = ref()
  const data = useQuickState(formData)
  const id = ref(null)
  const isShowDialog = ref(false)

  // methods
  const showDialog = async (row = null) => {
    if (row?.id) {
      id.value = row?.id
      const [res, error] = await callReadFetch(id.value)
      if (res) {
        mapKeys(data.state, (_, key) => {
          data.state[key] = res[key] === undefined ? '' : res[key]
        })
      }
    }
    isShowDialog.value = true
  }
  const hideDialog = () => {
    isShowDialog.value = false
  }
  const save = async () => {
    return await form.value.validate().then(async (success) => {
      if (success) {
        const payload = { ...data.state }
        const urlObj = {
          creat: () => { return callCreateFetch({ ...payload }) },
          edit: () => {
            return callUpdateFetch(id.value, { ...payload })
          },
        }
        const [res, error] = !id.value ? await urlObj.creat() : await urlObj.edit()
        hideDialog()
        return [res, error]
      } else {
        return [null, null]
      }
    })
  }

  // use
  const { callCreateFetch, callReadFetch, callUpdateFetch, callReadListFetch } = useCRUD({
    readFetch,
    createFetch,
    updateFetch,
    readListFetch,
    createSuccess,
    readSuccess,
    updateSuccess,
    deleteSuccess,
    readListSuccess,
  })

  return {
    form,
    data,
    isShowDialog,
    showDialog,
    save,
  }
}
