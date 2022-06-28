<template>
<div class="container align-self-center">
    <ReservationForm :hotelId="hotelId" :reservationFormData="reservationFormData"/>
    <div class="d-flex">
        <button class="btn btn-primary w-50" @click="handleEditReservation()">Submit</button>
        <button class="btn btn-danger ms-3 w-50" @click="handleDeleteReservation()">Delete</button>
    </div>
</div>
</template>

<script lang="ts">
import ReservationForm from "@/components/dashboard/Hotel/ReservationForm.vue";
import type { IReservation } from "@/domain/IReservation";
import type { IRoomType } from "@/domain/IRoomType";
import ReservationService from "@/services/ReservationService";
import RoomTypeService from "@/services/RoomTypeService";
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        hotelId: String,
        reservationId: String
    },
    components: {
        ReservationForm
    }
})
export default class ReservationEdit extends Vue {
    hotelId!: string;
    reservationId!: string;

    roomTypes: IRoomType[] = []
    
    reservationFormData: IReservation = {
        roomTypeId: "",
        client: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: ""
        },
        start: "",
        end: ""
    }

    handleSelectRoomType(roomType: IRoomType) {
        this.reservationFormData.roomTypeId = roomType.id!;
    }

    async mounted() {
        await RoomTypeService.getAllHotelRoomTypes(this.hotelId).then((res) => {
                if (res.data != null) {
                    this.roomTypes = res.data;
                }
        });
        await ReservationService.get(this.reservationId).then((res) => {
            if (res.data != null) {
                this.reservationFormData = res.data;

                // abysmal
                // source: https://stackoverflow.com/a/66558369
                let startDate = new Date(res.data.start);
                this.reservationFormData.start = (new Date(
                    startDate.getTime() - startDate.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);

                let endDate = new Date(res.data.end);
                this.reservationFormData.end = (new Date(
                    endDate.getTime() - endDate.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);
            }
        });
    }

    async handleEditReservation() {
        await ReservationService.put(this.reservationId, this.reservationFormData)
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
    
    async handleDeleteReservation() {
        await ReservationService.delete(this.reservationId)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                this.$router.push({ name: 'hotelreservations', params: { hotelId: this.hotelId } });
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