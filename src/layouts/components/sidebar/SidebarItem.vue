<template>
  <div v-if="!item.hidden && item.children && !onlyOneChild?.noShowingChildren">
    <template v-if="onlyOneChild && !item.alwaysShow">
      <sidebar-link
        :to="resolvePath(onlyOneChild.path)"
        :title="onlyOneChild.meta.title"
        :icon="onlyOneChild.meta.icon"
      />
    </template>

    <q-expansion-item
      v-else
      :icon="item.meta.icon"
      :label="item.meta.title"
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
        />
      </q-list>
    </q-expansion-item>
  </div>
</template>

<script>
import SidebarLink from './SidebarLink.vue'
import path from 'path'
import { defineComponent, toRefs, computed } from 'vue-demi'
export default defineComponent({
  components: {
    SidebarLink,
  },
  props: {
    item: { type: Object },
    isNest: { type: Boolean, default: false },
    basePath: { type: String },
  },
  setup (props, { emit }) {
    // data
    const { item, basePath } = toRefs(props)

    // computed
    const visibleChildren = computed(() => {
      return item.value.children.filter(item => !item.hidden)
    })

    const onlyOneChild = computed(() => {
      if (!item.value.children) {
        return item.value
      }
      let oneChild
      const showingChildren = item.value.children.filter(item => {
        if (!item.hidden) {
          oneChild = item
        }
        return !item.hidden
      })
      if (item.value.meta.slug === 'link') return oneChild
      if (item.value.meta.slug === 'dropdown' && showingChildren.length !== 0) return false
      if (item.value.meta.slug === 'dropdown' && showingChildren.length === 0) {
        return { ...item.value, path: '', noShowingChildren: true }
      }

      return oneChild
    })

    const resolvePath = (routePath) => {
      return path.resolve(basePath.value, routePath)
    }

    return {
      onlyOneChild,
      visibleChildren,
      resolvePath,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
