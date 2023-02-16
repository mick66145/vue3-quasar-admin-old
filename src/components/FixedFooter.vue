<template>
  <div class="fixed-footer">
    <div class="row items-center justify-between q-px-lg q-py-md">
      <div />
      <div>
        <base-button
          v-if="showCancel"
          class="q-mr-md q-px-xl q-mb-xs"
          outline
          :color="cancelButtonColor"
          :label="$t('g.btn.go-back')"
          @click="onCancel"
        />
        <slot name="button" />
        <base-button
          v-if="showSave"
          class="q-px-xl q-mb-xs"
          :color="confirmButtonColor"
          :label="confirmButtonText"
          @click="onSave"
        />
      </div>
    </div>
    <div class="q-layout__shadow absolute-full overflow-hidden no-pointer-events" />
  </div>
</template>

<script>
import { defineComponent } from 'vue-demi'
import useGoBack from '@/use/useGoBack'
import BaseButton from './button/BaseButton.vue'

export default defineComponent({
  components: { BaseButton },
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
.fixed-footer {
  @apply bg-white w-full ;
  @apply right-0 bottom-0 z-200 fixed;

  box-shadow: 0 0 10px 2px rgb(0 0 0 / 4%), 0 0 10px rgb(0 0 0 / 4%);

  .q-layout__shadow {
    @apply -top-10px;

    &::after {
      @apply top-10px;
    }
  }
}
</style>
