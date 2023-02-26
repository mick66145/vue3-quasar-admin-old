<template>
  <q-img
    loading="lazy"
    spinner-color="white"
    :src="src"
    :ratio="ratio"
    :alt="alt"
    :height="height"
    :width="width"
  >
    <template #error>
      <div class="bg-dark flex flex-center text-white absolute-full">
        載入失敗
      </div>
    </template>
  </q-img>
</template>

<script>
import { defineComponent } from 'vue-demi'

export default defineComponent({
  props: {
    src: { type: String },
    ratio: { type: Number, default: 1 },
    alt: { type: String, default: '' },
    height: { type: String, default: '100%' },
    width: { type: String, default: '100%' },
  },
  setup () {
    return {
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
