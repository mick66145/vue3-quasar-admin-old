<template>
  <q-drawer
    v-model="sidebarOpened"
    show-if-above
    bordered
    :width="260"
    class="bg-white shadow-7 text-blue-grey-7"
  >
    <q-img
      class="h-150px absolute-top"
      src="https://cdn.quasar.dev/img/material.png"
    >
      <div class="bg-transparent absolute-bottom">
        <q-avatar size="56px" class="q-mb-sm">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>
        <div class="text-weight-bold">Razvan Stoenescu</div>
        <div>@rstoenescu</div>
      </div>
    </q-img>
    <q-scroll-area
      class="h-[calc(95%_-_150px)] mt-150px"
      style="border-right: 1px solid #ddd;"
    >
      <q-list>
        <q-item to="/" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t("meun.dashboard") }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-expansion-item icon="menu_open" label="人員管理">
          <q-list class="q-pl-lg">
            <q-item to="/company" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <svg-icon
                  icon="genderless-solid"
                  class="text-blue-grey-7"
                  size="24"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t("meun.company") }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-expansion-item icon="menu_open" label="帳號管理">
          <q-list class="q-pl-lg">
            <q-item
              to="/company-job"
              active-class="q-item-no-link-highlighting"
            >
              <q-item-section avatar>
                <svg-icon
                  icon="genderless-solid"
                  class="text-blue-grey-7"
                  size="24"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t("meun.company-job") }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/user" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <svg-icon
                  icon="genderless-solid"
                  class="text-blue-grey-7"
                  size="24"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t("meun.user") }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </q-list>
    </q-scroll-area>
    <div class="q-px-md q-py-sm" style="border-top: 1px solid #ddd;" />
  </q-drawer>
</template>

<script>
import { defineComponent, computed } from 'vue-demi'
import { useApp } from '@/stores/app'
export default defineComponent({
  emits: ['toggle'],
  setup (props, { emit }) {
    const store = useApp()
    const sidebarOpened = computed({
      get () {
        return store.sidebar.opened
      },
      set () {
        store.toggleSideBar()
      },
    })

    return {
      sidebarOpened,
    }
  },
})
</script>

<style lang="scss" scoped></style>
