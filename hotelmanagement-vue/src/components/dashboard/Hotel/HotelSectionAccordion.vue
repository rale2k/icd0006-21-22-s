<template>
    <div class="accordion-item">
        <h2 class="accordion-header" :id="'header-'+section.id">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse'+section.id" aria-expanded="false" aria-controls="collapseOne"
        @click="handleSectionAccordionOpen()">
            {{section.name}}
        </button>
        </h2>
        <div :id="'collapse'+section.id" class="accordion-collapse collapse" :aria-labelledby="'header-'+section.id" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <div class="container d-flex align-content-center">
                    <div class="flex-grow-1 py-2">
                        {{section.description}}
                    </div>
                    <div>
                        <button class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#editModal-'+section.id">Edit</button>
                        <SectionEditModal v-bind:key="section.id" :section="section"/>
                    </div>
                </div>
                <hr />
                <div class="d-flex justify-content-between align-items-center">
                    <h3>Rooms</h3>
                    <div>
                        <button class="btn btn-primary btn-sm" data-bs-toggle="modal" :data-bs-target="'#createRoomModal-'+section.id"
                        @click="handleOpenRoomModal()">
                            Create New
                        </button>
                        <RoomCreateModal v-bind:key="section.id" :sectionId="section.id" :rooms="rooms"/>
                    </div>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Status</th>
                            <th scope="col">Name</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-bind:key="room.id" v-for="room in rooms">
                            <th scope="row" style="width: 10%;">
                                <span class="badge rounded-pill me-3 fs-6"
                                :class="{ 
                                'bg-success': room.status == 'Available',
                                'bg-warning': room.status == 'AwaitingMaintenance',
                                'bg-danger': room.status == 'Occupied'
                                }">
                                    {{ room.status }}
                                 </span>
                            </th>
                            <td>
                                <span>{{room.name}}</span>
                            </td>
                            <td style="width: 10%;">
                                <RouterLink :to="{ name: 'roomedit', params: { roomId:room.id } }">
                                    <button class="btn btn-primary btn-sm ms-4">Manage</button>
                                </RouterLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import type { IHotelSection } from "@/domain/IHotelSection";
import type { IRoom } from "@/domain/IRoom";

import { useRoomTypeStore } from "@/stores/RoomType";

import RoomTypeService from "@/services/RoomTypeService";
import RoomService from "@/services/RoomService";

import SectionEditModal from "./SectionEditModal.vue";
import RoomCreateModal from "./RoomCreateModal.vue";

@Options({
    components: {
        RoomCreateModal,
        SectionEditModal
    },
    props: {
        section: Object as unknown as IHotelSection
    }
})
export default class HotelSectionAccordion extends Vue {
    roomTypeStore = useRoomTypeStore();

    section!: IHotelSection;

    rooms: IRoom[] = [];

    open: boolean = false;

    async handleSectionAccordionOpen(): Promise<void> {
        if (this.open) {
            this.open = !this.open;
            return;
        }

        await RoomService.getAllSectionRooms(this.section.id!)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                if (res.data != null) {
                    this.rooms = res.data;
                }
            }
            ).catch((res) => {
                console.log(res);
            }
        );

        this.open = !this.open;
    }

    async handleOpenRoomModal() {
        await RoomTypeService.getAllHotelRoomTypes(this.section.hotelId!)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                if (res.data != null) {
                    this.roomTypeStore.$state.data = res.data;
                }
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    }
}
</script>

<style>

</style>