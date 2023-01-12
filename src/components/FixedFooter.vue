<template>
  <q-footer class="bg-white" reveal elevated>
    <div class="row items-center justify-between q-px-lg q-py-md">
      <div />
      <div>
        <q-btn
          v-if="showCancel"
          class="shadow-1 q-mr-md q-px-xl"
          outline
          :color="cancelButtonColor"
          :label="$t('g.btn.go-back')"
          @click="onCancel"
        />
        <slot name="button" />
        <q-btn
          v-if="showSave"
          class="shadow-1 q-px-xl"
          :color="confirmButtonColor"
          :label="confirmButtonText"
          @click="onSave"
        />
      </div>
    </div>
  </q-footer>
</template>

<script>
import { defineComponent } from 'vue-demi'
import useGoBack from '@/use/useGoBack'

export default defineComponent({
  props: {
    cancelButtonColor: { type: String, default: 'primary' },
    cancelButtonText: { type: String, default: '返回' },
    confirmButtonColor: { type: String, default: 'primary' },
    confirmButtonText: { type: String, default: '儲存' },
    goBackRoute: { type: String, default: '' },
    autoBack: { type: Boolean, default: true },
    showCancel: { type: Boolean, default: true },
    showSave: { type: Boolean, default: true },
  },
  emits: ['cancel', 'save'],
  setup (props, { emit }) {
    const { goBack } = useGoBack({ autoBack: props.autoBack, fallBack: props.goBackRoute })
    const onCancel = () => {
      emit('cancel')
      goBack()
    }
    const onSave = () => {
      emit('save')
    }

    return {
      onCancel,
      onSave,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
