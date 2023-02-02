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
        <sidebar-item
          v-for="(routeItem, routeIndex) in routes"
          :key="routeIndex"
          :item="routeItem"
          :base-path="routeItem.path"
        />
      </q-list>
    </q-scroll-area>
    <div class="q-px-md q-py-sm" style="border-top: 1px solid #ddd;" />
  </q-drawer>
</template>

<script>
import SidebarItem from './SidebarItem.vue'
import { defineComponent, computed } from 'vue-demi'
import { useApp } from '@/stores/app'
import { usePermission } from '@/stores/permission'
export default defineComponent({
  components: {
    SidebarItem,
  },
  emits: ['toggle'],
  setup (props, { emit }) {
    // data
    const store = useApp()
    const storePermission = usePermission()

    // computed
    const sidebarOpened = computed({
      get () {
        return store.sidebar.opened
      },
      set () {
        store.toggleSideBar()
      },
    })
    const routes = computed(() => {
      return storePermission.routes
    })

    return {
      sidebarOpened,
      routes,
    }
  },
})
</script>

<style lang="scss" scoped></style>
