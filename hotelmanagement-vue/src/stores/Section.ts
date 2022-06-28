import type { IHotelSection } from './../domain/IHotelSection';
import { defineStore } from 'pinia'
import type { IRoom } from '@/domain/IRoom';

export const useSectionStore = defineStore({
    id: 'sectionstore',

    state: () => ({
        data: [] as IHotelSection[]
    }),

    getters: {
        getSectionById: (state) => {
            return (sectionId: string) => state.data.find((section) => section.id === sectionId)
        },
    },

    actions: {
        addSection(section: IHotelSection) {
            this.data.push(section);
        },

        updateSection(id: string, section: IHotelSection) { 
            let res = this.data[this.data.findIndex(e => e.id == id)];
            if (res != null) {
                res.hotelId = section.hotelId;
                res.name = section.name;
                res.description = section.description;
            }
        },

        deleteSection(id: string) {
            this.data = this.data.filter(e => e.id !== id)
        },
    }
})
