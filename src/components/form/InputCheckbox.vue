<template>
  <q-field
    v-model="observeValue"
    :rules="rules"
    borderless
  >
    <template #control>
      <q-checkbox
        v-model="observeValue"
        :label="label"
        :val="val"
        :checked-icon="checkedIcon"
        :unchecked-icon="uncheckedIcon"
        :left-label="leftLabel"
        dense
      >
        <template v-if="$slots.default" #default>
          <slot name="default" />
        </template>
      </q-checkbox>
    </template>
  </q-field>
</template>

<script>
import { useVModel } from '@vueuse/core'
import { defineComponent } from 'vue-demi'
export default defineComponent({
  props: {
    modelValue: { type: [Boolean, Array], default: false },
    rules: { type: Array },
    label: { type: String },
    val: {},
    checkedIcon: { type: String },
    uncheckedIcon: { type: String },
    leftLabel: { type: Boolean },
  },
  emits: [
    'update:modelValue',
  ],
  setup (props, { emit }) {
    const observeValue = useVModel(props, 'modelValue', emit)
    return {
      observeValue,
      emit,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
