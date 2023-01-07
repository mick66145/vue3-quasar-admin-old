<template>
  <q-header elevated class="bg-white text-blue-grey-7">
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggle"
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
</template>

<script>
import { defineComponent } from 'vue-demi'
import { useApp } from '@/stores/app'
import useLogout from '@/use/useLogout'
export default defineComponent({
  setup (props, { emit }) {
    const storeApp = useApp()
    // methods
    const toggle = () => {
      storeApp.toggleSideBar()
    }

    const logout = () => {
      resetStore()
    }

    // use
    const { resetStore } = useLogout()

    return {
      toggle,
      logout,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
