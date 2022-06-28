<template>
    <h1 class="h3 mb-3 fw-normal">Details</h1>
    <div class="form-floating">
        <input v-model="hotelFormData.name" type="text" class="form-control form-control-top"/>
        <label for="floatingInput">Name</label>
    </div>
    <div class="form-floating">
        <input v-model="hotelFormData.description" type="text" class="form-control form-control-bottom"/>
        <label for="floatingInput">Description</label>
    </div>
    <div class="checkbox mb-3">
    </div>
    <div class="d-flex">
        <button class="w-100 me-3 btn btn-lg btn-primary" @click="handleEditHotel()">Edit Hotel</button>
        <button class="w-100 ms-3 btn btn-lg btn-danger" @click="handleDeleteHotel()">Delete Hotel</button>
    </div>
</template>

<script lang="ts">
import type { IHotel } from "@/domain/IHotel";
import HotelService from "@/services/HotelService";
import { useHotelStore } from "@/stores/Hotel";
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        hotel: Object as unknown as IHotel
    },
    watch: {
        hotel() {
            this.hotelFormData.id = this.hotel.id;
            this.hotelFormData.name = this.hotel.name;
            this.hotelFormData.description = this.hotel.description;
        }
    }
})
export default class HotelEditForm extends Vue {
    hotelStore = useHotelStore();
    hotel!: IHotel;

    hotelFormData: IHotel = {
        name: '',
        description: ''
    }

    async handleEditHotel() {
        await HotelService.put(this.hotel.id!, this.hotelFormData)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                this.hotelStore.updateHotel(this.hotel.id!, this.hotelFormData)
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    }

    async handleDeleteHotel() {
        await HotelService.delete(this.hotel.id!)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                this.hotelStore.deleteHotel(this.hotel.id!);
                this.$router.push('/dashboard');
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