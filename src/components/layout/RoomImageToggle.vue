<template>
  <svg
    @click="toggle"
    class="image-toggle-button"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    v-tooltip="{
      content: roomImages ? 'Room type images' : 'Room type text',
      theme: 'info-tooltip'
    }"
  >
    <g v-if="roomImages" class="imageMode">
        <!-- Frame of the image -->
      <rect x="1" y="1" width="22" height="22" stroke="black" fill="none" stroke-width="2"/>
      <!-- Sun or circle to represent the sky or a sun -->
      <circle cx="7" cy="7" r="2" fill="none"/>
      <!-- Triangle to represent mountains -->
      <polygon points="2,22 10,12 18,22" fill="white" stroke="black"/>

      <!-- Smaller triangle to represent another mountain -->
      <polygon points="10,22 15,15 22,22" fill="white" stroke="black"/>
    </g>
    <g v-else class="textMode">
      <rect x="5" y="4" width="14" height="2" fill="black" />
      <rect x="11" y="4" width="2" height="16" fill="black" />
    </g>
  </svg>
</template>
<script setup>
import { gridOptsStore } from '@/stores/gridopts'
import { computed } from 'vue'

const gridOpts = gridOptsStore()
const roomImages = computed(() => {
  return gridOpts.roomImages
})
const toggle = () => {
  gridOpts.toggleRoomImages()
}

</script>
<style scoped>
.image-toggle-button {
  cursor: pointer;
  width: 24px;
  height: 24px;
  transition: transform 0.2s;
  margin: var(--spacing-100) min(var(--spacing-200), 1vw);
  &:hover {
    transform: scale(1.2);
  }
  /* border: red 1px solid; */
}
</style>
