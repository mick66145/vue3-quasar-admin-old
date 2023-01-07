<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white text-blue-grey-7">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-space />
        <div class="row text-blue-grey-7 q-gutter-sm items-center no-wrap">
          <!-- <q-btn
            v-if="$q.screen.gt.sm"
            round
            dense
            flat
            color="white"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen.toggle()"
          /> -->
          <lang-select />
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <q-menu
              transition-show="scale"
              transition-hide="scale"
            >
              <q-list class="min-w-100px">
                <q-item
                  to="/profile"
                  clickable
                >
                  <q-item-section>{{ $t('meun.profile') }}</q-item-section>
                </q-item>

                <q-item
                  to="/"
                  clickable
                >
                  <q-item-section>{{ $t('meun.dashboard') }}</q-item-section>
                </q-item>

                <q-separator />
                <q-item clickable>
                  <q-item-section @click="logout">{{ $t('meun.logout') }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="260"
      class="bg-white shadow-7 text-blue-grey-7"
    >
      <q-img class="h-150px absolute-top" src="https://cdn.quasar.dev/img/material.png">
        <div class="bg-transparent absolute-bottom">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <div class="text-weight-bold">Razvan Stoenescu</div>
          <div>@rstoenescu</div>
        </div>
      </q-img>
      <q-scroll-area class="h-[calc(95%_-_150px)] mt-150px" style="border-right: 1px solid #ddd;">
        <q-list>
          <q-item to="/" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('meun.dashboard') }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-expansion-item
            icon="menu_open"
            label="人員管理"
          >
            <q-list class="q-pl-lg">
              <q-item to="/company" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <svg-icon icon="genderless-solid" class="text-blue-grey-7" size="24" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ $t('meun.company') }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-expansion-item
            icon="menu_open"
            label="帳號管理"
          >
            <q-list class="q-pl-lg">
              <q-item to="/company-job" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <svg-icon icon="genderless-solid" class="text-blue-grey-7" size="24" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ $t('meun.company-job') }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/user" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <svg-icon icon="genderless-solid" class="text-blue-grey-7" size="24" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ $t('meun.user') }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
      <div class="q-px-md q-py-sm" style="border-top: 1px solid #ddd;" />
    </q-drawer>

    <q-page-container class="bg-indigo-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue-demi'
import useLogout from '@/use/useLogout'

export default defineComponent({
  name: 'MainLayout',
  setup () {
    // data
    const leftDrawerOpen = ref(false)

    // methods
    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }
    const logout = async () => {
      resetStore()
    }

    // use
    const { resetStore } = useLogout()

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      logout,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
