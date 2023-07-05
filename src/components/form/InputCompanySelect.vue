<template>
  <input-select
    v-model="observeValue"
    :options="companyList"
  />
</template>

<script>
import { CompanyResource } from '@/api'
import { useVModel } from '@vueuse/core'
import { defineComponent, ref, onMounted } from 'vue-demi'
import useCRUD from '@/hooks/useCRUD'

const companyResource = new CompanyResource()

export default defineComponent({
  props: {
    modelValue: { type: [String, Object] },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const observeValue = useVModel(props, 'modelValue', emit)
    const companyList = ref([])

    // mounted
    onMounted(async () => {
      await callReadListFetch()
    })

    // methods
    const fetchData = async (payload) => {
      return await companyResource.list(payload).then((res) => {
        companyList.value = []
        companyList.value = res.list
      })
    }

    // use
    const { callReadListFetch } = useCRUD({
      readListFetch: fetchData,
    })

    return {
      observeValue,
      companyList,
      fetchData,
    }
  },
})

</script>

<style lang="scss" scoped>
</style>
