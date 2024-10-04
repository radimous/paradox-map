<template>
  <svg
    @click="toggle"
    class="godname-toggle-button"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    v-tooltip="{
      content: godNames ? 'Show god names' : 'Hide god names',
      theme: 'info-tooltip'
    }"
  >
    <text x="2" y="20" font-size="24" font-family="sans-serif" fill="black">G</text>
    <g v-if="!godNames">
      <line x1="2" y1="2" x2="22" y2="22" stroke="red" stroke-width="2" />
      <line x1="2" y1="22" x2="22" y2="2" stroke="red" stroke-width="2" />
    </g>
  </svg>
</template>
<script setup>
import { gridOptsStore } from '@/stores/gridopts'
import { computed } from 'vue'

const gridOpts = gridOptsStore()
const godNames = computed(() => {
  return gridOpts.godNames
})
const toggle = () => {
  gridOpts.toggleGodNames()
}

</script>
<style scoped>
.godname-toggle-button {
  cursor: pointer;
  width: 24px;
  height: 24px;
  transition: transform 0.2s;
  margin: var(--spacing-100) min(var(--spacing-200), 1vw);
  &:hover {
    transform: scale(1.2);
  }
  user-select: none;
  /* border: red 1px solid; */
}
</style>
