<template>
<div class="d-flex flex-column mt-3 mx-auto justify-content-center col-sm-8">
    <div class="align-self-center" v-if="hotel != null">
        <h3>Submit a reservation to {{hotel.name}}!</h3>
        <p>{{hotel.description}}</p>
        <ReservationForm :hotelId="hotelId" :reservationFormData="reservationFormData"/>
        <button class="btn btn-primary w-100" @click="handleSubmitReservation()">Submit</button>
    </div>
    <div class="text-center align-self-center" v-else>
        <h3>
            Hotel not found!
        </h3>
    </div>
</div>
</template>

<script lang="ts">
import ReservationForm from "@/components/dashboard/Hotel/ReservationForm.vue";
import type { IHotel } from "@/domain/IHotel";
import type { IReservation } from "@/domain/IReservation";
import HotelService from "@/services/HotelService";
import ReservationService from "@/services/ReservationService";
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        hotelId: String
    },
    components: {
        ReservationForm
    }
})
export default class Reserve extends Vue {
    hotelId!: string;
    hotel: IHotel | null = null;

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
    };

    async mounted() {
        await HotelService.get(this.hotelId).then((res) => {
            if (res.data != null) {
                this.hotel = res.data;
            } else {

            }
        });
    }

    async handleSubmitReservation() {
        await ReservationService.post(this.reservationFormData!)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                this.$router.push({ name: "home" });
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    }
}
</script>

<style>
.form-reserve {
  width: 100%;
  max-width: 550px;
  padding: 15px;
  margin: auto;
}
</style>