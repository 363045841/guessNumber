import { defineStore } from "pinia";
import axios from 'axios';
import picUrl from '@/assets/a4754a82ckef2a11a55447d8f48a81f7.jpg'

export const usePicData = defineStore("picData", {
    state: () => ({
        picUrl,
        accessKey: 'Smhr590tRtLSKaA1EbO2OJPvD1n-41wsoSr2s76DmAw'
    }),
    actions: {
        async getRandomPicUrl() {
            const response = await axios.get('https://api.unsplash.com/photos/random', {
                headers: {
                    'Authorization': `Client-ID ${this.accessKey}`
                },
                params: {
                    query: 'nature',
                    orientation: 'landscape'
                }
            })
            this.picUrl = response.data.urls.regular
            console.log(this.picUrl)
        }
    }
});