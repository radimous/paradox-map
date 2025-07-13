<template>
  <transition name="purchased-rooms">
    <section class="purchased-rooms-item">
        <div class="button-group">
          <BaseButton
            v-for="item in styles"
            :key="item.value"
            :style="{ 'outline': `1px solid`, 'outline-color' : `var(--${item.value})`, 'border-color': `var(--${item.value})`}"
            @click=""
          >
            {{ getGodCount(item.value) }}
          </BaseButton>
        </div>
        <div v-if="showModifiers" style="margin-top: var(--spacing-200);">
          <div
            v-for="(amount, type) in getModifiers()"
            :key="type"
            class="modifier-icon-row"
          >
            <span class="modifier-amount">{{ amount }}x</span>
            <div style="display:inline-block;">
                <ModifierIcon :name="type" style="height:20px !important; width:20px !important;"/>
            </div>
            
            {{ MODIFIER_LABELS[type] }}
          </div>
        </div>

        
      <BaseButton @click="toggleModifiers" class="toggle-button">
          M
      </BaseButton>
    </section>
  </transition>
</template>

<script setup>

import { ref } from 'vue';
import { useGridStore } from '@/stores/grid'
import RoomModifiers from '@/components/EditItem/RoomModifiers.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { ROOM_LABELS, ROOM_TYPES, GODS, GOD_LABELS } from '@/util/room'
import { MODIFIER_LABELS, NEGATIVE_MODIFIERS, POSITIVE_MODIFIERS } from '@/util/modifiers'
import ModifierIcon from '@/components/GridItem/ModifierIcon.vue'
import { save, get } from '@/util/save'



const grid = useGridStore()
var showModifiers = ref(get('showModifiers') || false)

const getGodCount = (god) => {
  return grid.grid.flat().filter((item) => item && item.purchased && item.style === god).length
}

const getModifiers = () => {
  let modifierList = grid.grid.flat().filter((item) => item?.modifiers?.length > 0 && item.purchased).map((item) => item?.modifiers)

  let modifierMap = {}
  modifierList.forEach((modifiers) => {
    modifiers.forEach((modifier) => {
      if (!modifier || !modifier.type) return
      if (!modifierMap[modifier.type]) {
        modifierMap[modifier.type] = 0
      }
      modifierMap[modifier.type] += modifier.amount
    })
  })
  // Sort by count (amount) descending, then alphabetically by type
  return Object.fromEntries(
    Object.entries(modifierMap).sort((a, b) => {
      if (b[1] !== a[1]) {
        return b[1] - a[1];
      }
      return a[0].localeCompare(b[0]);
    })
  );
}

const styles = Object.values(GODS)
  .sort()
  .map((name) => {
    return {
      label: GOD_LABELS[name],
      value: name
    }
  })

const toggleModifiers = () => {
  showModifiers.value = !showModifiers.value
  save('showModifiers', showModifiers.value)
}
</script>

<style scoped>

.purchased-rooms-item {
  padding: var(--spacing-400);
  background: #fffc;
  border-radius: 4px;
  box-shadow: 0 0 4px rgb(0 0 0 / 0.1);
  width: 200px;
}


.button-group {
  display: flex;
  gap: var(--spacing-100);
  > * {
    flex-grow: 1;
    font-size: smaller;
    pointer-events: none;
    &:hover {
      filter: none;
      pointer-events: none;
      
    }
  }
  
}

.modifier-amount {
  text-align: right;
  width: 28px; 
}
.modifier-icon {
  display: flex;
  margin: 0 var(--spacing-100);
}
.modifier-icon-row {
  display: flex;
  align-items: center;
}

.toggle-button {
  position: absolute;
  width: 10px;
  height: 16px;
  line-height: 4px;
  font-size: 10px;
  bottom: 0;
  left: 0;
}
</style>
