<template>
  <div v-if="!item.hidden && item.children && !onlyOneChild?.noShowingChildren">
    <template v-if="onlyOneChild && !item.alwaysShow">
      <q-item
        :to="resolvePath(onlyOneChild.path)"
        active-class="q-item-no-link-highlighting"
      >
        <q-item-section avatar>
          <q-icon :name="onlyOneChild.meta.icon" size="2rem" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ onlyOneChild.meta.title }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>

    <q-expansion-item
      v-else
      :icon="item.meta?.icon"
      :label="item.meta?.title"
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
      </q-list>
    </q-expansion-item>
  </div>
</template>

<script>
import path from 'path'
import { defineComponent, toRefs, computed } from 'vue-demi'
export default defineComponent({
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
