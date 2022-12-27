<template>
  <q-footer class="bg-white" reveal elevated>
    <div class="row items-center justify-between q-px-lg q-py-md">
      <slot name="footer">
        <div />
        <div>
          <q-btn
            class="shadow-1 q-mr-md q-px-xl"
            outline
            color="primary"
            :label="$t('g.btn.cancel')"
            @click="onCancel"
          />
          <q-btn
            class="shadow-1 q-px-xl"
            color="primary"
            :label="$t('g.btn.save')"
            @click="onSave"
          />
        </div>
      </slot>
    </div>
  </q-footer>
</template>

<script>
import { defineComponent } from 'vue-demi'
import useGoBack from '@/use/useGoBack'

export default defineComponent({
  props: {
    goBackRoute: { type: String, default: '' },
    autoBack: { type: Boolean, default: true },
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
