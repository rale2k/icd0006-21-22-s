<template>
<div class="container" v-if="hotel != null">
    <div>
        <HotelEditForm :hotel="hotel"/>
    </div>
    <br/>
    <div>
        <HotelAmenitiesEdit :hotelId="hotelId"/>
    </div>
        <br/>
    <div>
        <HotelRoomTypesEdit :hotelId="hotelId"/>
    </div>
</div>
</template>

<script lang="ts">
import { useHotelStore } from "@/stores/Hotel";
import { useAmenityStore } from "@/stores/Amenity"
import { useRoomTypeStore } from "@/stores/RoomType"
import { Options, Vue } from "vue-class-component"

import HotelAmenitiesEdit from "@/components/dashboard/Hotel/HotelAmenitiesEdit.vue";
import HotelRoomTypesEdit from "@/components/dashboard/Hotel/HotelRoomTypesEdit.vue";
import HotelEditForm from "@/components/dashboard/Hotel/HotelEditForm.vue";

import HotelService from "@/services/HotelService";
import AmenityService from "@/services/AmenityService";
import RoomTypeService from "@/services/RoomTypeService";
import type { IHotel } from "@/domain/IHotel";

@Options({
    components: {
        HotelEditForm,
        HotelAmenitiesEdit,
        HotelRoomTypesEdit
    },
    props: {
        hotelId: String
    }
})
export default class HotelEdit extends Vue {
    hotelStore = useHotelStore();
    amenityStore = useAmenityStore();
    roomTypeStore = useRoomTypeStore();

    hotelId!: string;

    hotel: IHotel = {
        name: "",
        description: ""
    };

    async mounted() {
        await HotelService.get(this.hotelId).then((res) => {
            if (res.data != null) {
                this.hotelStore.updateHotel(this.hotelId, res.data);
                this.hotel = res.data
            }
        });
        await AmenityService.getAllHotelAmenities(this.hotelId).then((res) => {
            if (res.data != null) {
                this.amenityStore.$state.data = res.data;
            }
        })
        await RoomTypeService.getAllHotelRoomTypes(this.hotelId).then((res) => {
                if (res.data != null) {
                    this.roomTypeStore.$state.data = res.data;
                }
        });
    }
}
</script>

<style>

</style>