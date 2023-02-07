<template>
  <base-button
    :label="buttonLabel"
    icon="add_circle"
  />
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue-demi'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    label: { type: String },
  },
  setup (props) {
    // data
    const { t } = useI18n()
    const { label } = toRefs(props)

    // computed
    const buttonLabel = computed(() => {
      return label.value ? label.value : t('g.btn.add')
    })

    return {
      buttonLabel,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
