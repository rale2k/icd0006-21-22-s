<template>
<div class="container">
    <div>
        <h1 class="h3 mb-3 fw-normal">Details</h1>
        <h4>Contact Information</h4>
        <div class="form-floating">
            <input disabled v-model="stay.client.firstName" type="text" class="form-control form-control-top">
            <label for="floatingInput">First Name</label>
        </div>
        <div class="form-floating">
            <input disabled v-model="stay.client.lastName" type="text" class="form-control form-control-middle">
            <label for="floatingInput">Last Name</label>
        </div>
        <div class="form-floating">
            <input disabled v-model="stay.client.email" type="text" class="form-control form-control-middle">
            <label for="floatingInput">Email</label>
        </div>
        <div class="form-floating">
            <input disabled v-model="stay.client.phoneNumber" type="text" class="form-control form-control-bottom">
            <label for="floatingInput">Phone Number</label>
        </div>
        <h4>Duration</h4>
        <div class="form-floating">
            <input disabled v-model="stay.start" type="datetime-local" class="form-control form-control-top">
            <label for="floatingInput">Start</label>
        </div>
        <div class="form-floating">
            <input disabled v-model="stay.end" type="datetime-local" class="form-control form-control-bottom">
            <label for="floatingInput">End</label>
        </div>
        <button class="w-100 btn btn-lg btn-danger" @click="handleDeleteStay()">Delete Stay</button>
    </div>
</div>
</template>

<script lang="ts">
import type { IStay } from "@/domain/IStay";
import StayService from "@/services/StayService";
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        stayId: String
    }
})
export default class StayEdit extends Vue {
    stayId!: string;

    stay: IStay = {
        roomId: "",
        client: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: ""
        },
        start: "",
        end: ""
        }
    async mounted() {
        await StayService.get(this.stayId).then((res) => {
            if (res.data != null) {
                this.stay = res.data;

                let startDate = new Date(res.data.start);
                this.stay.start = (new Date(
                    startDate.getTime() - startDate.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);

                let endDate = new Date(res.data.end);
                this.stay.end = (new Date(
                    endDate.getTime() - endDate.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);

            }
        });
    }

    async handleDeleteStay() {
        await StayService.delete(this.stayId!)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }

                this.$router.push({ name: "roomedit", params: { roomId: this.stay.roomId}})
            }
            ).catch((res) => {
                console.log(res);
            }
        );

    }
}
</script>