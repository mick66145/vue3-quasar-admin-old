<template>
  <q-tree
    ref="tree"
    v-model:ticked="observeValue"
    v-model:selected="observeValue"
    v-model:expanded="expanded"
    :nodes="nodes"
    :node-key="nodeKey"
    :label-key="labelKey"
    :default-expand-all="defaultExpandAll"
    :tick-strategy="tickStrategy"
  />
</template>

<script>
import { defineComponent, ref, computed } from 'vue-demi'

export default defineComponent({
  props: {
    modelValue: { type: [Array, Object, String, Number] },
    nodes: { type: Array, default () { return [] } },
    nodeKey: { type: String, default: 'id' },
    labelKey: { type: String, default: 'name' },
    defaultExpandAll: { type: Boolean, default: true },
    tickStrategy: { type: String },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const tree = ref()
    const expanded = ref([])

    // computed
    const observeValue = computed({
      get () { return props.modelValue },
      set (value) { emit('update:modelValue', value) },
    })

    // methods
    const expandAll = () => {
      tree.value.expandAll()
    }

    return {
      tree,
      observeValue,
      expanded,
      expandAll,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
