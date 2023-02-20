<template>
  <div class="row q-col-gutter-x-md q-col-gutter-y-md">
    <div
      v-for="(fileItem, fileIndex) in observeValue"
      :key="fileIndex"
      class="col-md-3 col-sm-4 col-xs-12"
    >
      <div class="input-image">
        <div>
          <img
            v-if="preview(fileItem)"
            class="object-cover h-202px w-full transform scale-98"
            :src="preview(fileItem)"
          >
          <span class="input-image-upload-actions">
            <div class="flex flex-center h-full">
              <div class="flex-center w-full row">
                <q-icon
                  class="q-mr-md"
                  name="fas fa-light fa-magnifying-glass-plus"
                  size="1.75rem"
                  @click="onPreview(fileItem)"
                />
                <q-icon
                  name="fas fa-solid fa-trash-can"
                  size="1.75rem"
                  @click="onDelete(fileIndex)"
                />
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>

    <div class="col-md-3 col-sm-4 col-xs-12">
      <input-image-upload
        ref="imageUpload"
        class="full-width"
        @on-file="onFile"
      />
    </div>
    <preview-dialog ref="dialog" />
  </div>
</template>

<script>
import PreviewDialog from './components/PreviewDialog.vue'
import { defineComponent, computed, ref } from 'vue-demi'
import useImgStorage from '@/use/useImgStorage'

export default defineComponent({
  components: {
    PreviewDialog,
  },
  props: {
    modelValue: { type: Array, default () { return [] } },
    accept: { type: String, default: 'image/png, image/jpeg, image/jpg' },
    aspect: { type: Number },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const dialog = ref()
    const imageUpload = ref()

    // computed
    const observeValue = computed({
      get () {
        return props.modelValue
      },
      set (value) {
        emit('update:modelValue', value)
      },
    })
    const preview = computed(() => (data) => {
      const { blobURL, url, base64, filename } = data.image || {}
      if (blobURL) return blobURL
      if (url) return url
      if (base64) return base64
      return getImageSrc({ filename, size: '200x' })
    })

    // methods
    const onFile = async (fileObj) => {
      const { file, base64 } = fileObj
      const state = {
        alt: '',
        title: '',
        image: {
          blobURL: URL.createObjectURL(file),
          raw: file,
          base64: base64,
          filename: '',
        },
      }
      observeValue.value.push(state)
    }
    const onPreview = (item) => {
      dialog.value.showDialog({ data: item })
    }
    const onDelete = (index) => {
      observeValue.value.splice(index, 1)
    }

    // use
    const { getImageSrc } = useImgStorage()

    return {
      dialog,
      imageUpload,
      observeValue,
      preview,
      onFile,
      onPreview,
      onDelete,
    }
  },
})
</script>

<style lang="scss" scoped>
.input-image {
  @apply h-full w-full;
  @apply relative;
  @apply border border-solid border-gray-500;

  .input-image-upload-actions {
    @apply h-full w-full;
    @apply top-0 left-0 absolute;
    @apply text-white;
    @apply opacity-0;

    &:hover {
      @apply opacity-100;
      @apply bg-dark-500/50;
    }

    &::after {
      display: inline-block;
      content: "";
      height: 100%;
      vertical-align: middle;
    }
  }
}
</style>
