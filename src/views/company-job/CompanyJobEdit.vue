<template>
  <company-job-detail mode="edit" />
</template>

<script>
import { defineComponent } from 'vue-demi'
import CompanyJobDetail from './components/CompanyJobDetail.vue'

export default defineComponent({
  components: {
    CompanyJobDetail,
  },
})
</script>

<style lang="scss" scoped>
</style>
