import './assets/main.css'

import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { saveVaults, saveCurrentVault } from '@/util/save'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

const app = createApp(App)
const pinia = createPinia()
app.use(FloatingVue,{
  themes: {
    'info-tooltip': {
      $extend: 'tooltip',
      distance: 24,
      delay: { show: 0, hide: 0 },
      hideTriggers: events => [...events],
    },
  },
})

watch(
  pinia.state,
  (state) => {
    saveVaults(state.vaults)
    saveCurrentVault(state.grid)
  },
  { deep: true }
)

app.use(pinia)

app.mount('#app')
