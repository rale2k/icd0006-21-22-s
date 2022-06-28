<template>
    <div class="form-reserve my-auto" v-if="stayFormData != undefined">
        <h4>Contact Information</h4>
        <div class="form-floating">
            <input :disabled="stayFormData.client.id != undefined" v-model="stayFormData.client.firstName" type="text" class="form-control form-control-top">
            <label for="floatingInput">First Name</label>
        </div>
        <div class="form-floating">
            <input :disabled="stayFormData.client.id != undefined" v-model="stayFormData.client.lastName" type="text" class="form-control form-control-middle">
            <label for="floatingInput">Last Name</label>
        </div>
        <div class="form-floating">
            <input :disabled="stayFormData.client.id != undefined" v-model="stayFormData.client.email" type="text" class="form-control form-control-middle">
            <label for="floatingInput">Email</label>
        </div>
        <div class="form-floating">
            <input :disabled="stayFormData.client.id != undefined" v-model="stayFormData.client.phoneNumber" type="text" class="form-control form-control-bottom">
            <label for="floatingInput">Phone Number</label>
        </div>
        <h4 v-if="rooms.length != 0">Room</h4>
        <div class="form-floating mb-2" v-if="rooms.length != 0">
            <select v-model="stayFormData.roomId" class="form-select form-control" aria-label="Default select example">
                <option disabled value="">Select a Room</option>
                <template v-for="room in rooms">
                    <option :value="room.id">{{room.name}}</option>
                </template> 
            </select>
            <label for="floatingInput">Room</label>
        </div>

        <h4>Duration</h4>
        <div class="form-floating">
            <input v-model="stayFormData.start" type="datetime-local" class="form-control form-control-top">
            <label for="floatingInput">Start</label>
        </div>
        <div class="form-floating">
            <input v-model="stayFormData.end" type="datetime-local" class="form-control form-control-bottom">
            <label for="floatingInput">End</label>
        </div>
    </div>

</template>

<script lang="ts">
import type { IRoom } from "@/domain/IRoom";
import type { IStay } from "@/domain/IStay";
import RoomService from "@/services/RoomService";
import { Options, Vue } from "vue-class-component";

@Options({
    props: { 
        stayFormData: Object as unknown as IStay
    },
    inject: ["hotelId"]
})
export default class StayForm extends Vue {
    hotelId!: string;
    stayFormData!: IStay;
    rooms: IRoom[] = [];
    
    async mounted() {
        if (this.hotelId != undefined && this.stayFormData.roomId == "") {
            await RoomService.getAllHotelRooms(this.hotelId).then((res) => {
                if (res.data != null) {
                    this.rooms = res.data;
                }
            });
        }
    }
}
</script>

<style>

</style>