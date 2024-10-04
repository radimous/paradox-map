<template>
    <svg
      @click="toggle"
      class="mode-toggle-button"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      v-tooltip="{
      content: runMode ? 'Run Mode' : 'Build Mode',
      theme: 'info-tooltip'
    }"
    >
      <g v-if="runMode">
        <text x="2" y="20" font-size="24" font-family="sans-serif" fill="black">R</text>
      </g>
      <g v-else>
        <text x="2" y="20" font-size="24" font-family="sans-serif" fill="black">B</text>
      </g>
    </svg>
  </template>
  <script setup>
  import { gridOptsStore } from '@/stores/gridopts'
  import { computed } from 'vue'
  
  const gridOpts = gridOptsStore()
  const runMode = computed(() => {
    return gridOpts.runMode
  })
  const toggle = () => {
    gridOpts.toggleRunMode()
  }
  document?.querySelector(':root')?.style?.setProperty('--mode-opacity', runMode ? 0 : 1)

  </script>
  <style scoped>
  .mode-toggle-button {
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
  