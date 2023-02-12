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
        <q-item class="text-right">
          <q-item-section>
            <q-item-label>{{ userInfo.name }}</q-item-label>
            <q-item-label caption lines="1">{{ userInfo.email }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-avatar>
              <q-btn round flat>
                <q-avatar size="44px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg">
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

                    <q-separator />
                    <q-item clickable>
                      <q-item-section @click="logout">{{ $t('meun.logout') }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-avatar>
          </q-item-section>
        </q-item>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent, reactive } from 'vue-demi'
import { useApp } from '@/stores/app'
import { useUser } from '@/stores/user'
import useLogout from '@/use/useLogout'
export default defineComponent({
  setup (props, { emit }) {
    // data
    const storeApp = useApp()
    const storeUser = useUser()
    const userInfo = reactive(storeUser.info)

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
      userInfo,
      toggle,
      logout,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
