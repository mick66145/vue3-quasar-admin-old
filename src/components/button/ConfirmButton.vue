<template>
  <base-button
    :outline="outline"
    :rounded="rounded"
    :label="buttonLabel"
    :color="color"
  />
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue-demi'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    label: { type: String },
    outline: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    color: { type: String, default: 'primary' },
  },
  setup (props) {
    // data
    const { t } = useI18n()
    const { label } = toRefs(props)

    // computed
    const buttonLabel = computed(() => {
      return label.value ? label.value : t('g.btn.confirm')
    })

    return {
      buttonLabel,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
