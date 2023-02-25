<template>
  <q-img
    loading="lazy"
    spinner-color="white"
    style="height: 150px; width: 150px;"
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
    height: { type: String, default: '150px' },
    width: { type: String, default: '150px' },
  },
  setup () {
    return {
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
