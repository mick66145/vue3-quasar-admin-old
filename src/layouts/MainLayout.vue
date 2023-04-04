<template>
  <q-layout view="lHh Lpr lFf">
    <app-header />
    <sidebar />
    <q-page-container class="bg-indigo-1 !pb-16">
      <router-view v-slot="{ Component,route }">
        <transition name="slide-fade">
          <div :key="route">
            <component :is="Component" :key="route" />
          </div>
        </transition>
        <back-top />
      </router-view>
    </q-page-container>
    <app-footer />
  </q-layout>
</template>

<script>
import { AppHeader, AppFooter, Sidebar, BackTop } from './components'
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'MainLayout',
  components: {
    AppHeader,
    AppFooter,
    Sidebar,
    BackTop,
  },
  setup () {
    return {}
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
