<template>
<h1 class="h3 mb-3 fw-normal">Room Types</h1>
<div class="d-flex">
    <div class="flex-grow-1 w-50 me-3">
        <div class="form-floating">
            <input type="text" v-model="roomTypeFormData.name" class="form-control form-control-top">
            <label for="floatingInput">Name</label>
        </div>
        <div class="form-floating">
            <input type="text" v-model="roomTypeFormData.description" class="form-control form-control-middle">
            <label for="floatingInput">Description</label>
        </div>
        <div class="d-flex">
            <div class="form-floating flex-grow-1">
                <input type="number" v-model="roomTypeFormData.capacity" class="form-control mb-0 form-control-bottom">
                <label for="floatingInput">Capacity</label>
            </div>
            <div class="dropup my-auto ms-2">
                <a class="btn btn-outline-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    Select Amenities
                </a>
                <div class="dropdown-menu overflow-auto" multiple aria-label=".form-select-sm example" style="height: 200px">
                    <template v-bind:key="'select-'+ amenity.id" v-for="amenity in amenityStore.$state.data">
                    <!-- This solution sucks -->
                        <option class="dropdown-item" 
                            :class="{ active: (roomTypeFormData.amenities != undefined && 
                                    roomTypeFormData.amenities?.some(e => e.id == amenity.id)) }" 
                            :value="amenity.id"
                            @click="handleSelectRoomAmenity(amenity)">
                            {{ amenity.name }}
                        </option>
                    </template>
                </div>
            </div>
        </div>
        <div class="d-flex mt-3">
            <button class="flex-grow-1 w-50 btn btn-primary" @click="handleCreateRoomType()">Create New</button>
            <template v-if="selectedRoomTypeId != null">
                    <button class="btn btn-primary w-50 ms-3" @click="handleEditRoomType()">Edit</button>
                    <button class="btn btn-danger ms-3" @click="handleDeleteRoomType()">Delete</button>
            </template>
        </div>
    </div>
    <template v-if="roomTypeStore.$state.data.length != 0">
        <div class="w-50">
            <div class="list-group overflow-auto" style="height: 200px">
                <template v-bind:key="roomType.id" v-for="roomType in roomTypeStore.$state.data">
                <a href="#" class="list-group-item list-group-item-action" :class="{ active: selectedRoomTypeId == roomType.id }"
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
</div>
</template>

<script lang="ts">
import type { IRoomType } from "@/domain/IRoomType";
import RoomTypeService from "@/services/RoomTypeService";
import { useRoomTypeStore } from "@/stores/RoomType";
import { useAmenityStore } from "@/stores/Amenity";
import { Options, Vue } from "vue-class-component";
import type { IAmenity } from "@/domain/IAmenity";

@Options({
    props: {
        hotelId: String
    }
})
export default class HotelRoomTypesEdit extends Vue {
    amenityStore = useAmenityStore();
    roomTypeStore = useRoomTypeStore();

    selectedRoomTypeId: string | null = null;

    hotelId!: string;
    roomTypeFormData: IRoomType = {
        name: "",
        description: "",
        capacity: 1,
    }

    mounted() {
        this.roomTypeFormData.hotelId = this.hotelId;
    }

    handleSelectRoomType(roomType: IRoomType) {
        this.selectedRoomTypeId = (this.selectedRoomTypeId == roomType.id!) ? null : roomType.id!;
        this.roomTypeFormData.name = roomType.name;
        this.roomTypeFormData.description = roomType.description;
        this.roomTypeFormData.capacity = roomType.capacity;
        this.roomTypeFormData.amenities = roomType.amenities;
    }

    handleSelectRoomAmenity(amenity: IAmenity) {
        if (this.roomTypeFormData.amenities == undefined) {
            this.roomTypeFormData.amenities = [];
        }
        if (this.roomTypeFormData.amenities?.some(e => e.id == amenity.id)) {
            let index = this.roomTypeFormData.amenities.findIndex(e => e.id == amenity.id);
            if (index > -1) {
                this.roomTypeFormData.amenities.splice(index, 1);
            }
            return;
        }

        this.roomTypeFormData.amenities.push(amenity);
    }

    async handleCreateRoomType() {
        await RoomTypeService.post(this.roomTypeFormData)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                this.clearFormData();
                this.roomTypeStore.addRoomType(res.data!);
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    }

    async handleEditRoomType() {
        await RoomTypeService.put(this.selectedRoomTypeId!, this.roomTypeFormData)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                this.roomTypeStore.updateRoomType(this.selectedRoomTypeId!, this.roomTypeFormData!);
                this.clearFormData();
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    }

    async handleDeleteRoomType() {

        await RoomTypeService.delete(this.selectedRoomTypeId!)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                this.roomTypeStore.deleteRoomType(this.selectedRoomTypeId!);
                this.clearFormData();
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    }

    clearFormData() {
        this.selectedRoomTypeId = null;
        this.roomTypeFormData.name = "";
        this.roomTypeFormData.description = "";
        this.roomTypeFormData.capacity = 1;
        this.roomTypeFormData.amenities = undefined;

    }
}
</script>

<style>

</style>