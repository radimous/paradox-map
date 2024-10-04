<template>
  <svg
    @click="toggleDarkMode"
    class="dark-toggle-button"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    v-tooltip="{
      content: isDarkMode ? 'Dark Theme' : 'Light Theme',
      theme: 'info-tooltip'
    }"
  >
    <g v-if="isDarkMode" class="moon">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 4.5 4.5 0 0 0 21 12.79z"></path>
    </g>
    <g v-else class="sun">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </g>
  </svg>
</template>
<script setup>
import { ref } from 'vue'
import { enable as enableDarkMode, disable as disableDarkMode } from 'darkreader'
import { save, get } from '@/util/save'
const toggleDarkMode = () => {
  isDarkMode.value ? disableDarkMode() : enableDarkMode()
  isDarkMode.value = !isDarkMode.value
  save('isDarkMode', isDarkMode.value)
}
const isDarkMode = ref(get('isDarkMode'))
isDarkMode.value ? enableDarkMode() : disableDarkMode()
</script>
<style scoped>
.dark-toggle-button {
  cursor: pointer;
  width: 24px;
  height: 24px;
  transition: transform 0.2s;
  margin-right: min(var(--spacing-400), 1vw);
  margin-top: var(--spacing-100);
  margin-left: min(var(--spacing-200), 1vw);
  &:hover {
    transform: scale(1.2);
  }
}
</style>
