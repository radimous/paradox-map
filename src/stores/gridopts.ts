import { defineStore } from 'pinia'
import { save, get } from '@/util/save'

export const gridOptsStore = defineStore('gridOpts', {
	state: () => {
		return {
			roomImages: get('roomImages') ?? false,
      		godNames: get('godNames') ?? true
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
		}
	}
})
