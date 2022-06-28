<template>
<div class="container">
    <div class="d-flex justify-content-between">
        <span class="fs-4 link-dark">Reservations</span>
        <button type="button" class="btn btn-primary btn-sm">
            Create New
        </button>
    </div>
    <hr/>
    <ReservationList :reservations="reservations"/>
</div>
</template>

<script lang="ts">
import type { IReservation } from "@/domain/IReservation";
import ReservationService from "@/services/ReservationService";
import { Options, Vue } from "vue-class-component";
import ReservationList from "@/components/dashboard/Hotel/ReservationList.vue";

@Options({
    props: {
        hotelId: String,
    },
    components: {
        ReservationList,
    },
    provide() {
        return {hotelId: this.hotelId}
    }
})
export default class Reservations extends Vue{
    hotelId!: string;
    reservations: IReservation[] = [];

    async mounted() {
        await ReservationService.getAllHotelReservations(this.hotelId)
            .then((res) => {
                if (res.data != null) {
                    this.reservations = res.data
                }
            }
        );
    }
}
</script>

<style>

</style>