<template>
  <div class="pan-zoom" ref="element">
    <slot></slot>
  </div>
</template>

<script setup>
import panzoom from 'panzoom'
import { ref, onMounted, onUnmounted } from 'vue'
import { save, get } from '@/util/save'

const element = ref(null)
let instance = null
let trX = null
let trY = null
let trScale = null

onMounted(() => {
  instance = panzoom(element.value, {
    smoothScroll: false,
    zoomSpeed: 0.05,
    zoomDoubleClickSpeed: 1,
    onTouch: function () {
      return false
    },
    autocenter: true
  })
  loadTransform();
  periodicallySaveTransform();
  console.log(instance)
})

const setTransform = (transform) => {
  instance.getTransform().x = transform.x
  instance.getTransform().y = transform.y
  instance.getTransform().scale = transform.scale

  trX = transform.x
  trY = transform.y
  trScale = transform.scale
}

const periodicallySaveTransform = () => {
  setInterval(() => {
    let trsfrm = instance.getTransform()
    // don't save if there is no change
    if (trX === trsfrm.x && trY === trsfrm.y && trScale === trsfrm.scale) {
      return;
    }
    save('transform', trsfrm)
  }, 1000) 
}

const loadTransform = () => {
  const transform = get('transform')
  if (transform) {
    setTransform(transform)
  }
}

onUnmounted(() => {
  instance.dispose()
})
</script>
