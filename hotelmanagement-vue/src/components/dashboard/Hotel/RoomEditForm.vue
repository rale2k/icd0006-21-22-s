<template>
<div>
    <div class="form-floating">
        <input v-model="roomFormData.name"  type="text" class="form-control form-control-top">
        <label for="floatingInput">Name</label>
    </div>
    <div class="form-floating">
    <select v-model="roomFormData.roomTypeId" class="form-select form-control-middle" aria-label="Default select example" >
        <option disabled value="">Select a Room Type</option>
        <template v-bind:key="roomType.id" v-for="roomType in roomTypeStore.$state.data">
            <option :value="roomType.id">{{ roomType.name }}</option>
        </template>
    </select>
    <label for="floatingInput">Room Type</label>
    </div>
    <div class="form-floating">
        <select v-model="roomFormData.status" class="form-select form-control-bottom" aria-label="Default select example" >
            <option disabled value="">Select a Status</option>
            <option value="Available">Available</option>
            <option value="AwaitingMaintenance">Awaiting Maintenance</option>
            <option value="Occupied">Occupied</option>
        </select>
        <label for="floatingInput">Status</label>
    </div>
    <div class="d-flex">
        <button class="w-100 me-3 btn btn-lg btn-primary" @click="handleEditRoom()">Edit Room</button>
        <button class="w-100 ms-3 btn btn-lg btn-danger" @click="handleDeleteRoom()">Delete Room</button>
    </div>
</div>
</template>

<script lang="ts">
import type { IRoom } from "@/domain/IRoom";
import RoomService from "@/services/RoomService";
import RoomTypeService from "@/services/RoomTypeService";
import { useRoomTypeStore } from "@/stores/RoomType";
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        hotelId: String,
        room: Object as unknown as IRoom
    },
    watch: {
        room() {
            this.roomFormData.id = this.room.id;
            this.roomFormData.name = this.room.name;
            this.roomFormData.roomTypeId = this.room.roomTypeId;
            this.roomFormData.sectionId = this.room.sectionId;
            this.roomFormData.status = this.room.status;
        }
    }
})
export default class RoomEditForm extends Vue {
    roomTypeStore = useRoomTypeStore();
    room!: IRoom;
    hotelId!: string;

    roomFormData: IRoom = {
        name: "",
        roomTypeId: "",
        sectionId: "",
        status: ""
    }

    async mounted() {
        let res = await RoomTypeService.getAllHotelRoomTypes(this.hotelId);

        if (res.data != null) {
            this.roomTypeStore.$state.data = res.data;
        }
    }

    async handleEditRoom() {
        await RoomService.put(this.room.id!, this.roomFormData)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    }

    async handleDeleteRoom() {
        await RoomService.delete(this.room.id!)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                this.$router.push({name: "hotelstructure", params: { hotelId: `${this.hotelId}`}});
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