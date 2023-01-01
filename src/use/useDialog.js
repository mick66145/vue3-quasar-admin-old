import { ref, watchEffect } from 'vue-demi'
import useCRUD from '@/use/useCRUD'

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
  const data = ref(formData)
  const id = ref(null)
  const isShowDialog = ref(false)

  // methods
  const showDialog = (row = null) => {
    id.value = row?.id
    isShowDialog.value = true
  }
  const hideDialog = () => {
    isShowDialog.value = false
  }
  const save = async () => {
    return await form.value.validate().then(async (success) => {
      if (success) {
        const payload = { ...data.value }
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
    readFetch: readFetch,
    createFetch: createFetch,
    updateFetch: updateFetch,
    readListFetch: readListFetch,
  })

  watchEffect(async () => {
    if (!id.value) return
    const [res, error] = await callReadFetch(id.value)
    data.value = res
  })

  return {
    form,
    data,
    isShowDialog,
    showDialog,
    save,
  }
}
