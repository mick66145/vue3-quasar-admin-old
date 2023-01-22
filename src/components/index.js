import SvgIcon from './SvgIcon.vue'
import PageHeader from './PageHeader.vue'
import InputText from './form/InputText.vue'
import InputSelect from './form/InputSelect.vue'
import InputMultipleSelect from './form/InputMultipleSelect.vue'
import InputPassword from './form/InputPassword.vue'
import InputDate from './form/InputDate.vue'
import InputEditor from './form/InputEditor/InputEditor.vue'
import InputDialog from './form/InputDialog.vue'
import InputImageUpload from './form/InputImageUpload.vue'
import InputImage from './form/InputImage.vue'
import InputOptionGroup from './form/InputOptionGroup.vue'
import InputDateRange from './form/InputDateRange.vue'
import InputToggle from './form/InputToggle.vue'
import InputSearch from './form/InputSearch.vue'
import BaseButton from './button/BaseButton.vue'
import AddButton from './button/AddButton.vue'
import DeleteButton from './button/DeleteButton.vue'
import EditButton from './button/EditButton.vue'
import ResetButton from './button/ResetButton.vue'
import ViewButton from './button/ViewButton.vue'
import LangSelect from './LangSelect.vue'
import MessageDialog from './MessageDialog.vue'
import ScShadow from './shadow/ScShadow.vue'
import FixedFooter from './FixedFooter.vue'
import Pagination from './Pagination.vue'
import VxeServerTable from './VxeServerTable.vue'
export default {
  install (app) {
    app.component('SvgIcon', SvgIcon)
    app.component('PageHeader', PageHeader)
    app.component('InputText', InputText)
    app.component('InputSelect', InputSelect)
    app.component('InputMultipleSelect', InputMultipleSelect)
    app.component('InputPassword', InputPassword)
    app.component('InputDate', InputDate)
    app.component('InputEditor', InputEditor)
    app.component('InputDialog', InputDialog)
    app.component('InputImageUpload', InputImageUpload)
    app.component('InputImage', InputImage)
    app.component('InputOptionGroup', InputOptionGroup)
    app.component('InputDateRange', InputDateRange)
    app.component('InputToggle', InputToggle)
    app.component('InputSearch', InputSearch)
    app.component('BaseButton', BaseButton)
    app.component('AddButton', AddButton)
    app.component('DeleteButton', DeleteButton)
    app.component('EditButton', EditButton)
    app.component('ResetButton', ResetButton)
    app.component('ViewButton', ViewButton)
    app.component('LangSelect', LangSelect)
    app.component('MessageDialog', MessageDialog)
    app.component('ScShadow', ScShadow)
    app.component('FixedFooter', FixedFooter)
    app.component('Pagination', Pagination)
    app.component('VxeServerTable', VxeServerTable)
  },
}
