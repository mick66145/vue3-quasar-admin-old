<template>
  <q-layout view="lHh Lpr lFf">
    <app-header />
    <app-sidebar />
    <q-page-container class="bg-indigo-1">
      <transition name="slide-fade">
        <router-view />
      </transition>
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
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s  ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
