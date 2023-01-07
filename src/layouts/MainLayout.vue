<template>
  <q-layout view="lHh Lpr lFf">
    <app-header />
    <app-sidebar />
    <q-page-container class="bg-indigo-1">
      <router-view />
    </q-page-container>
    <app-footer />
  </q-layout>
</template>

<script>
import { AppHeader, AppSidebar, AppFooter } from './components'
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'MainLayout',
  components: {
    AppHeader,
    AppSidebar,
    AppFooter,
  },
  setup () {
    return {
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
