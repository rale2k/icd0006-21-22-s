<template>
      <div class="container">
        <h1 class="h3 mb-3 fw-normal">Create New Hotel</h1>
        <div class="form-floating">
            <input v-model="hotelCreateFormData.name" type="text" class="form-control form-control-top"/>
            <label for="floatingInput">Name</label>
        </div>
        <div class="form-floating">
            <input v-model="hotelCreateFormData.description" type="text" class="form-control form-control-bottom"/>
            <label for="floatingInput">Description</label>
        </div>
        <div class="checkbox mb-3">
        <!-- <label>
            <input type="checkbox" value="remember-me"> Remember me
        </label> -->
        </div>
        <button class="w-100 btn btn-lg btn-primary" @click="handleCreateHotel()">Create Hotel</button>
    </div>
</template>

<script lang="ts">
import type { IHotel } from "@/domain/IHotel";
import HotelService from "@/services/HotelService";
import { useHotelStore } from "@/stores/Hotel";
import { Vue } from "vue-class-component";

export default class HotelCreate extends Vue {
    hotelStore = useHotelStore();

    hotelCreateFormData: IHotel = {
        name: "",
        description: ""
    }

    async handleCreateHotel() {
        await HotelService.post(this.hotelCreateFormData)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                this.hotelStore.addHotel(res.data!);
                this.$router.push(`/dashboard/${res.data?.id}`);
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