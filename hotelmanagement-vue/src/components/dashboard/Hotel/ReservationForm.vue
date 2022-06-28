<template>
      <div class="form-reserve my-auto" v-if="reservationFormData != undefined">
        <h4>Contact Information</h4>
        <div class="form-floating">
            <input :disabled="reservationFormData.client.id != undefined" v-model="reservationFormData.client.firstName" type="text" class="form-control form-control-top">
            <label for="floatingInput">First Name</label>
        </div>
        <div class="form-floating">
            <input :disabled="reservationFormData.client.id != undefined" v-model="reservationFormData.client.lastName" type="text" class="form-control form-control-middle">
            <label for="floatingInput">Last Name</label>
        </div>
        <div class="form-floating">
            <input :disabled="reservationFormData.client.id != undefined" v-model="reservationFormData.client.email" type="text" class="form-control form-control-middle">
            <label for="floatingInput">Email</label>
        </div>
        <div class="form-floating">
            <input :disabled="reservationFormData.client.id != undefined" v-model="reservationFormData.client.phoneNumber" type="text" class="form-control form-control-bottom">
            <label for="floatingInput">Phone Number</label>
        </div>
        <h4>Room Type</h4>
        <template v-if="roomTypes.length != 0">
            <div class="mb-3">
                <div class="list-group overflow-auto" style="height: 200px">
                    <template v-bind:key="roomType.id" v-for="roomType in roomTypes">
                    <a href="#" class="list-group-item list-group-item-action" :class="{ active: reservationFormData.roomTypeId == roomType.id }"
                    @click="handleSelectRoomType(roomType)">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">{{ roomType.name }}</h5>
                            <small>
                                {{ roomType.capacity }}
                                <object class="me-2" data="https://www.svgrepo.com/show/391937/person.svg" type="image/svg+xml" width="12" height="12"></object>
                            </small>
                        </div>
                        <p class="mb-1">{{ roomType.description }}</p>
                    </a>
                    </template>
                </div>
            </div>
        </template>
        <h4>Duration</h4>
        <div class="form-floating">
            <input v-model="reservationFormData.start" type="datetime-local" class="form-control form-control-top">
            <label for="floatingInput">Start</label>
        </div>
        <div class="form-floating">
            <input v-model="reservationFormData.end" type="datetime-local" class="form-control form-control-bottom">
            <label for="floatingInput">End</label>
        </div>
    </div>
</template>

<script lang="ts">
import type { IReservation } from "@/domain/IReservation";
import type { IRoomType } from "@/domain/IRoomType";
import RoomTypeService from "@/services/RoomTypeService";
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        hotelId: String,
        clientId: String,
        reservationFormData: Object as unknown as IReservation
    }
})
export default class ReservationForm extends Vue {
    hotelId!: string;

    roomTypes: IRoomType[] = [];
    
    reservationFormData!: IReservation;
    
    handleSelectRoomType(roomType: IRoomType) {
        this.reservationFormData.roomTypeId = roomType.id!;
    }

    async mounted() {
        await RoomTypeService.getAllHotelRoomTypes(this.hotelId).then((res) => {
                if (res.data != null) {
                    this.roomTypes = res.data;
                }
        });
    }

}
</script>

<style>

</style>