<template>
  <q-dialog v-model="observeValue" :persistent="persistent" @show="onShow" @hide="onHide">
    <q-card>
      <q-card-section class="row items-center dialog-header">
        <slot name="title">
          <div class="text-h6">{{ title }}</div>
        </slot>
        <q-space />
        <q-btn v-close-popup icon="close" flat round dense />
      </q-card-section>

      <q-separator />

      <q-card-section class="scroll q-dialog-body">
        <slot />
      </q-card-section>

      <q-separator />

      <q-card-actions class="q-dialog-footer" align="right">
        <slot name="footer" class="text-primary">
          <q-btn
            v-close-popup
            class="shadow-1 q-mr-xs"
            outline
            :color="cancelButtonColor"
            :label="cancelButtonText"
            padding="sm 2.5em"
            @click="onCancel"
          />
          <q-btn
            class="shadow-1"
            :color="confirmButtonColor"
            :label="confirmButtonText"
            padding="sm 2.5em"
            @click="onSave"
          />
        </slot>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useVModel } from '@vueuse/core'
import { defineComponent } from 'vue-demi'
export default defineComponent({
  props: {
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: '標題' },
    cancelButtonText: { type: String, default: '關閉' },
    cancelButtonColor: { type: String, default: 'primary' },
    confirmButtonText: { type: String, default: '儲存' },
    confirmButtonColor: { type: String, default: 'primary' },
    persistent: { type: Boolean, default: false },
  },
  emits: ['save', 'cancel', 'show', 'hide'],
  setup (props, { emit }) {
    // data
    const observeValue = useVModel(props, 'modelValue', emit)

    // methods
    const onSave = () => {
      emit('save')
    }

    const onCancel = () => {
      emit('cancel')
    }

    const onShow = () => {
      emit('show')
    }

    const onHide = () => {
      emit('hide')
    }

    return {
      observeValue,
      onSave,
      onCancel,
      onShow,
      onHide,
    }
  },
})

</script>

<style lang="scss" scoped>
.q-card {
  .q-dialog-body {
    @apply min-h-27rem max-h-40em;
  }
}
</style>
