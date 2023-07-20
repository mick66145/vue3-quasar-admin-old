<template>
  <div class="row items-center q-col-gutter-x-md q-col-gutter-y-xs">
    <div class="col-md-3 col-xs-12">
      <input-search
        v-model="sourceData.keyword"
        class="full-width"
        dense
        @update:modelValue="onChangeFilter"
      />
    </div>
    <div class="col-md-1 col-sm-3 col-xs-12">
      <reset-button
        class="w-full"
        @click="onReset"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue-demi'
import { useVModel } from '@vueuse/core'

export default defineComponent({
  props: {
    modelValue: { type: [Object, String] },
  },
  emits: ['changeFilter', 'reset'],
  setup (props, { emit }) {
    // data
    const sourceData = useVModel(props, 'modelValue', emit)

    const onChangeFilter = () => {
      emit('changeFilter')
    }
    const onReset = () => {
      emit('reset')
    }
    return {
      sourceData,
      onChangeFilter,
      onReset,
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
