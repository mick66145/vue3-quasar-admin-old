<template>
  <div class="row q-col-gutter-x-md q-col-gutter-y-md">
    <div
      v-for="(fileItem, fileIndex) in observeValue"
      :key="fileIndex"
      class="col-md-3 col-sm-4 col-xs-12"
    >
      <div class="input-image">
        <div>
          <base-image
            v-if="preview(fileItem)"
            class="object-cover h-202px w-full transform scale-98"
            :src="preview(fileItem)"
          />
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
                  v-if="showEdit"
                  class="q-mr-md"
                  name="edit"
                  size="1.75rem"
                  @click="onEdit(fileItem)"
                />
                <q-icon
                  v-if="showDelete"
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
      <image-multiple-uploader
        ref="imageUpload"
        class="full-width"
        :disable="disable"
        @on-file="onFile"
      />
    </div>

    <image-edit-dialog ref="editDialog" />
    <image-preview-dialog ref="previewDialog" />
  </div>
</template>

<script>
import ImageEditDialog from './components/ImageEditDialog.vue'
import { defineComponent, computed, ref } from 'vue-demi'
import useImgStorage from '@/hooks/useImgStorage'
import useMessageDialog from '@/hooks/useMessageDialog'

export default defineComponent({
  components: {
    ImageEditDialog,
  },
  props: {
    modelValue: { type: Array, default () { return [] } },
    accept: { type: String, default: 'image/png, image/jpeg, image/jpg' },
    aspect: { type: Number },
    disable: { type: Boolean, default: false },
    showEdit: { type: Boolean, default: true },
    showDelete: { type: Boolean, default: true },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const previewDialog = ref()
    const editDialog = ref()
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
    const onFile = async (files) => {
      files.forEach(fileItem => {
        const { file, base64 } = fileItem
        const state = {
          alt: '',
          title: '',
          sequence: 0,
          image: {
            blobURL: URL.createObjectURL(file),
            raw: file,
            base64: base64,
            filename: '',
          },
        }
        observeValue.value.push(state)
      })
    }
    const onPreview = (item) => {
      previewDialog.value.showDialog({ data: item })
    }
    const onEdit = (item) => {
      editDialog.value.showDialog({ data: item })
    }
    const onDelete = async (index) => {
      const res = await messageDelete({ title: '刪除', message: '確認刪除？' })
      if (!res) return
      observeValue.value.splice(index, 1)
    }

    // use
    const { messageDelete } = useMessageDialog()
    const { getImageSrc } = useImgStorage()

    return {
      previewDialog,
      editDialog,
      imageUpload,
      observeValue,
      preview,
      onFile,
      onPreview,
      onEdit,
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
