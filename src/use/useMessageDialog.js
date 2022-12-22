import { useMessageDialogStore } from '@/stores/messageDialog'
import { useI18n } from 'vue-i18n'

export default function useMessageDialog () {
  const store = useMessageDialogStore()

  const { t } = useI18n()

  const messageDelete = ({ title, message, confirmButtonText, cancelButtonText }) => store.alert({
    title: title || t('g.dialog.default-title'),
    status: 'error',
    message,
    persistent: true,
    confirmButtonText: confirmButtonText || t('g.btn.delete'),
    confirmButtonColor: 'negative',
    cancelButtonText: cancelButtonText || t('g.btn.cancel'),
  })

  return {
    messageDelete,
  }
}
