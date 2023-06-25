import { computed } from 'vue-demi'
import { useRoute } from 'vue-router'

export const modeTypes = {
  create: 'create',
  edit: 'edit',
  view: 'view',
}

const prefixNames = {
  [modeTypes.create]: '新增',
  [modeTypes.edit]: '編輯',
  [modeTypes.view]: '檢視',
}

export default function useEditTitle (mode) {
  const route = useRoute()
  const pageTitle = computed(() => {
    const metaTitle = route.meta.title
    return `${prefixNames[mode.value]}${metaTitle}`
  })
  return {
    pageTitle,
  }
}
