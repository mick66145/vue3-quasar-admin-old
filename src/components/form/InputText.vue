
<template>
  <q-input
    ref="input"
    v-model="observeValue"
    :label="inputLabel"
    :clearable="clearable"
    :outlined="outlined"
    :placeholder="placeholder"
    :rules="ruleList"
    @clear="clearFn"
    @change="changeFn"
  >
    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>

    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>

    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>

    <template v-if="$slots.before" #before>
      <slot name="before" />
    </template>
    <template v-if="$slots.after" #after>
      <slot name="after" />
    </template>
    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>
    <template v-if="$slots.error" #error>
      <slot name="error" />
    </template>
    <template v-if="$slots.hint" #hint>
      <slot name="hint" />
    </template>
    <template v-if="$slots.counter" #counter>
      <slot name="counter" />
    </template>
    <template v-if="$slots.loading" #loading>
      <slot name="loading" />
    </template>
  </q-input>
</template>

<script>
import { useVModel } from '@vueuse/core'
import { defineComponent, ref, computed, toRefs } from 'vue-demi'
import { vuelidate } from '@/plugins/vuelidate'

export default defineComponent({
  props: {
    label: { type: String },
    modelValue: { type: [String, Number, Object, null] },
    rules: { type: Array, default () { return [] } },
    clearable: { type: Boolean, default: true },
    outlined: { type: Boolean, default: true },
    placeholder: { type: String, default: '請輸入' },
    maxLength: { type: Number, default: 255 },
    useLabel: { type: Boolean, default: true },
  },
  emits: ['update:modelValue', 'change'],
  setup (props, { emit }) {
    // data
    const input = ref()
    const { label, rules, useLabel, maxLength } = toRefs(props)
    const observeValue = useVModel(props, 'modelValue', emit)

    // computed
    const ruleList = computed(() => {
      const rule = []
      rule.push(vuelidate.maxLength(maxLength.value, `長度不可超過${maxLength.value}字`))
      return rule.concat(rules.value)
    })
    const inputLabel = computed(() => {
      return useLabel.value ? label.value : undefined
    })

    // methods
    const focus = () => {
      input.value.focus()
    }
    const clearFn = (val) => {
      emit('change')
    }
    const changeFn = (val) => {
      emit('change', val)
    }
    return {
      input,
      observeValue,
      ruleList,
      inputLabel,
      focus,
      clearFn,
      changeFn,
    }
  },
})
</script>

<style lang="scss" scoped>
.q-input {
  @apply py-10px;
}
</style>
