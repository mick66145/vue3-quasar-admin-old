<template>
  <base-icon-button
    icon="visibility"
    :outline="outline"
    :label="buttonLabel"
  />
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue-demi'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    label: { type: String },
    outline: { type: Boolean, default: true },
  },
  setup (props) {
    // data
    const { t } = useI18n()
    const { label } = toRefs(props)

    // computed
    const buttonLabel = computed(() => {
      return label.value ? label.value : t('g.btn.view')
    })

    return {
      buttonLabel,
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
