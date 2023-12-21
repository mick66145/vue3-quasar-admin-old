<template>
  <photo-slider
    :items="options"
    :visible="isShowDialog"
    :index="slide"
    @clickMask="hideDialog"
    @closeModal="hideDialog"
  />
</template>

<script>
import { defineComponent, ref } from 'vue-demi'
import useDialog from '@/hooks/useDialog'

export default defineComponent({
  props: {
    options: { type: Array, default () { /* { src:"",key:"",intro:"" } */ return [] } },
  },
  setup () {
    // data
    const slide = ref(0)

    // methods
    const showDialog = async ({ slide: slideData = 0 }) => {
      slide.value = slideData
      isShowDialog.value = true
    }
    const { isShowDialog, hideDialog } = useDialog({})

    return {
      slide,
      isShowDialog,
      showDialog,
      hideDialog,
    }
  },
})

</script>

<style lang="postcss" scoped>
</style>
