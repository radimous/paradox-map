<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppGrid from '@/components/AppGrid.vue'
import EditItem from '@/components/EditItem.vue'
import { useGridStore } from '@/stores/grid'
import { useVaultsStore } from '@/stores/vaults'

const grid = useGridStore()
const vaults = useVaultsStore()

grid.init()
vaults.init()
</script>

<template>
  <AppHeader class="app-header" />
  <main class="app-canvas">
    <AppGrid />
    <EditItem class="edit-item" />
  </main>
</template>

<style scoped>
.app-header {
  flex-shrink: 0;
}

.app-canvas {
  overflow: hidden;
  flex-grow: 1;
  display: flex;
}

.edit-item {
  position: absolute;
  bottom: var(--spacing-400);
  right: var(--spacing-400);
}
</style>
