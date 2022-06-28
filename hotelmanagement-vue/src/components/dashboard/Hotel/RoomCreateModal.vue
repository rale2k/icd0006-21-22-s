<template>
<div class="modal fade" :id="'createRoomModal-'+sectionId" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ModalLabel">Create Room</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="form-floating">
                        <input v-model="roomFormData.name" type="text" class="form-control form-control-top">
                        <label for="floatingInput">Name</label>
                    </div>
                    <div>
                        <select v-model="roomFormData.roomTypeId" class="form-select form-control-bottom" aria-label="Default select example" >
                            <option disabled value="">Select a Room Type</option>
                            <template v-bind:key="roomType.id" v-for="roomType in roomTypeStore.$state.data">
                                <option :value="roomType.id">{{ roomType.name }}</option>
                            </template>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#createRoomModal-'+sectionId"
                @click="handleCreateRoom()">
                    Add
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import type { IRoom } from "@/domain/IRoom";
import RoomService from "@/services/RoomService";
import { useRoomTypeStore } from "@/stores/RoomType";
import { useSectionStore } from "@/stores/Section";
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        rooms: Object as unknown as IRoom[],
        sectionId: String
    }
})
export default class RoomCreateModal extends Vue {
    roomTypeStore = useRoomTypeStore();
    sectionStore = useSectionStore();

    sectionId!: string;
    rooms!: IRoom[]

    roomFormData: IRoom = {
        name: "",
        roomTypeId: "",
        sectionId: "",
        status: "Available"
    };

    mounted() {
        this.roomFormData.sectionId = this.sectionId;
    }

    async handleCreateRoom() {
        await RoomService.post(this.roomFormData)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                this.rooms.push(res.data!);
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