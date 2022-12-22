<template>
  <div class="input-editor">
    <vue-editor
      ref="quill"
      v-model:content="observeValue"
      :placeholder="placeholder"
      theme="snow"
      :readOnly="disabled"
      :toolbar="toolbarOptions"
      :modules="modules"
      :options="options"
    />
  </div>
</template>

<script>
// import { uploadFile } from '@/api/file'
// import useImgStorage from '@/use/useImgStorage'
// import useMessage from '@/use/useMessage'
import { useAsyncState, useVModel, watchOnce } from '@vueuse/core'
import { ImageActions } from '@xeger/quill-image-actions'
import { ImageFormats } from '@xeger/quill-image-formats'
import LoadingImage from 'quill-image-uploader/src/blots/image'
import { defineComponent, reactive, ref } from 'vue-demi'
import { ImageBlotAlt, MyImageUploader } from './quillModule'
import isEmpty from 'lodash-es/isEmpty'

export default defineComponent({
  props: {
    modelValue: { type: [Object, File, String, Number] },
    nativeType: { type: String, default: 'text' },
    placeholder: { type: String, default: '請輸入' },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    let tempRaw = null
    let resolveUpload, rejectUpload
    const quill = ref()
    const tempCropper = ref()
    const observeValue = useVModel(props, 'modelValue', emit)
    const toolbarOptions = [
      [
        { header: 1 },
        { header: 2 },
      ],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ size: ['small', false, 'large', 'huge'] }],

      ['bold', 'italic', 'underline'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image', 'clean'],
    ]
    const options = {
      formats: ['align', 'background', 'bold', 'color', 'float', 'font', 'header', 'height', 'image', 'italic', 'link', 'script', 'strike', 'size', 'underline', 'list', 'width', LoadingImage.blotName, ImageBlotAlt.blotName],
    }
    const state = reactive({
      alt: '',
      caption: '',
    })
    const showDialog = ref(false)

    // methods
    const onFile = (file) => {
      tempRaw = file
      const reader = new FileReader()

      reader.onload = (event) => {
        tempCropper.value = event.target.result
        showDialog.value = true
      }
      reader.onerror = () => {
        // message({ message: '圖片讀取失敗', type: 'error' })
        rejectUpload(new Error('圖片讀取失敗'))
      }

      reader.readAsDataURL(file)
    }

    const upload = (file) => {
      console.log('🚀 ~ upload ~ file', file)
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        // message({ message: '圖片格式錯誤', type: 'error' })
        return Promise.reject(new Error('格式錯誤'))
      }
      if (file.size / 1024 / 1024 > 2) {
        // message({ message: '圖片大小超過 2 MB', type: 'error' })
        return Promise.reject(new Error('尺寸錯誤'))
      }
      return new Promise((resolve, reject) => {
        resolveUpload = resolve
        rejectUpload = reject
        onFile(file)
      })
    }

    const setContents = () => {
      quill.value.setContents(props.modelValue, 'user')
    }

    // data
    const modules = [
      {
        name: 'ImageActions',
        module: ImageActions,
        options: {
        },
      },
      {
        name: 'ImageFormats',
        module: ImageFormats,
        options: {
        },
      },
      {
        name: 'MyImageUploader',
        module: MyImageUploader,
        options: {
          upload,
        },
      },
    ]

    // use
    // const { getImageSrc } = useImgStorage()
    // const { message, messageAPIError } = useMessage()
    // const { isLoading, execute, error } = useAsyncState(uploadFile, {}, { immediate: false })

    // watch
    watchOnce(() => props.modelValue, (newV, oldV) => {
      isEmpty()
      if (!oldV || isEmpty(oldV)) {
        setContents()
      }
    })

    return {
      quill,
      tempCropper,
      observeValue,
      toolbarOptions,
      options,
      modules,
      state,
      showDialog,
      onFile,
      upload,
    }
  },
})

</script>

<style lang="scss">
.input-editor {
  @apply h-[450px] w-full;

  .ql-toolbar,
  .ql-container {
    @apply bg-white;
  }

  .ql-toolbar {
    @apply rounded-t border-b-0;
  }

  .ql-container {
    @apply rounded-b;
    @apply font-sans;
    @apply overflow-hidden;

    height: calc(100% - 50px);
  }

  .ql-snow .ql-tooltip {
    @apply z-100;
  }
}
</style>
