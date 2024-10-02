import { defineStore } from 'pinia'
import { save, get } from '@/util/save'

// roomImages is bool
export const roomImagesStore = defineStore('roomImages', {
	state: () => {
		return {
			roomImages: false
		}
	},
	actions: {
		toggleRoomImages() {
			this.roomImages = !this.roomImages
				save('roomImages', this.roomImages)
			},
      getRoomImages() {
        this.roomImages = get('roomImages') ?? false
			}
		}
	}
)
