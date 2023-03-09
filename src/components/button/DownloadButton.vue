<template>
  <base-button
    color="positive"
    :outline="outline"
    :rounded="rounded"
    :label="buttonLabel"
    :icon="icon"
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
    icon: { type: String, default: 'arrow_downward' },
    downloadUrl: { type: String },
  },
  setup (props) {
    // data
    const { t } = useI18n()
    const { label } = toRefs(props)

    // computed
    const buttonLabel = computed(() => {
      return label.value ? label.value : t('g.btn.dowload')
    })

    return {
      buttonLabel,
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
