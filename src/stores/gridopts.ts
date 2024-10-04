import { defineStore } from 'pinia'
import { save, get } from '@/util/save'

export const gridOptsStore = defineStore('gridOpts', {
	state: () => {
		return {
			roomImages: get('roomImages') ?? false,
      		godNames: get('godNames') ?? true,
			runMode: get('runMode') ?? false,
		}
	},
	actions: {
		toggleRoomImages() {
			this.roomImages = !this.roomImages
			save('roomImages', this.roomImages)
		},
		toggleGodNames() {
			this.godNames = !this.godNames
			save('godNames', this.godNames)
		},
		toggleRunMode() {
			this.runMode = !this.runMode
			document?.querySelector(':root')?.style?.setProperty('--mode-opacity', this.runMode ? 0 : 1)
			save('runMode', this.runMode)
		}
	}
})
