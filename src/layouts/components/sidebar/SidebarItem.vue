<template>
  <div v-if="!item.hidden && item.children && !onlyOneChild?.noShowingChildren">
    <template v-if="onlyOneChild && !item.alwaysShow">
      <sidebar-link
        :to="resolvePath(onlyOneChild.path)"
        :title="onlyOneChild.meta.title"
        :icon="onlyOneChild.meta.icon"
        @click="onclick(onlyOneChild)"
      />
    </template>

    <q-expansion-item
      v-else
      v-model="open"
      :group="item.groupName"
      :icon="item.meta.icon"
      :label="item.meta.title"
      :header-class="headerClassActive"
      :expand-icon-class="expandIconClassActive"
    >
      <q-list
        v-for="(childItem, childIndex) in visibleChildren"
        :key="childIndex"
        class="q-pl-lg"
      >
        <sidebar-item
          v-if="childItem.children && childItem.children.length > 0"
          :is-nest="true"
          :item="childItem"
          :base-path="resolvePath(childItem.path)"
        />
        <sidebar-link
          v-else
          :to="resolvePath(childItem.path)"
          :title="childItem.meta.title"
          :icon="childItem.meta.icon"
          @click="onclick(childItem)"
        />
      </q-list>
    </q-expansion-item>
  </div>
</template>

<script>
import SidebarLink from './SidebarLink.vue'
import path from 'path'
import { defineComponent, ref, toRefs, computed, onMounted, watch } from 'vue-demi'
import { useRoute } from 'vue-router'
import useEventsBus from '@/use/useEventsBus'

export default defineComponent({
  components: {
    SidebarLink,
  },
  props: {
    item: { type: Object },
    activeHeaderClass: { type: String },
    activeExpandIconClassClass: { type: String },
    isNest: { type: Boolean, default: false },
    basePath: { type: String },
  },
  setup (props, { emit }) {
    // data
    const route = useRoute()
    const { item, activeHeaderClass, activeExpandIconClassClass, basePath } = toRefs(props)
    const open = ref(false)
    const active = ref(false)
    const headerClassDefault = ref('bg-primary text-white')
    const expandIconClassDefault = ref('text-white')
    const headerClassActive = ref('')
    const expandIconClassActive = ref('')

    // use
    const { emit: busEmit, bus } = useEventsBus()

    // computed
    const visibleChildren = computed(() => {
      return item.value.children.filter((item) => !item.hidden)
    })
    const onlyOneChild = computed(() => {
      if (!item.value.children) {
        return item.value
      }
      let oneChild
      const showingChildren = item.value.children.filter((item) => {
        if (!item.hidden) {
          oneChild = item
        }
        return !item.hidden
      })
      if (item.value.meta.slug === 'link') return oneChild
      if (item.value.meta.slug === 'dropdown' && showingChildren.length !== 0) { return false }
      if (item.value.meta.slug === 'dropdown' && showingChildren.length === 0) {
        return { ...item.value, path: '', noShowingChildren: true }
      }

      return oneChild
    })

    // mounted
    onMounted(async () => {
      onclick(buildActiveItem(route.path))
      const currentItem = bus.value.get('activeItem')
      if (currentItem) {
        changeActiveHeaderStyle(currentItem[0])
      }
    })

    // methods
    const onclick = (nodeData) => {
      busEmit('activeItem', nodeData)
    }
    const activeItem = (currentItem) => {
      active.value = item.value.to === currentItem.to
      open.value = item.value.group ? item.value.group.includes(currentItem.group) : false
    }
    const buildActiveItem = (path) => {
      if (!path || path === '/') {
        path = '/dashboard'
      }
      const group = !path.substr(0, path.lastIndexOf('/')) ? path : path.substr(0, path.lastIndexOf('/'))
      return { to: path, group: group }
    }
    const changeActiveHeaderStyle = (currentItem) => {
      activeItem(currentItem)
      const isGroup = currentItem.group && item.value.group && item.value.group.includes(currentItem.group)
      if (!isGroup) {
        headerClassActive.value = {}
        return
      }
      headerClassActive.value = activeHeaderClass.value ? activeHeaderClass.value : headerClassDefault.value
      expandIconClassActive.value = activeExpandIconClassClass.value ? activeExpandIconClassClass.value : expandIconClassDefault.value
    }
    const resolvePath = (routePath) => {
      return path.resolve(basePath.value, routePath)
    }

    // watch
    watch(() => route, (newValue) => {
      onclick(buildActiveItem(newValue.path))
    }, { deep: true })

    return {
      open,
      headerClassActive,
      expandIconClassActive,
      onlyOneChild,
      visibleChildren,
      onclick,
      resolvePath,
    }
  },
})
</script>

<style lang="scss" scoped></style>
