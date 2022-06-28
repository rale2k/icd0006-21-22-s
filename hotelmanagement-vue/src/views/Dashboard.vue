<template>
<div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <object class="me-2" data="https://www.svgrepo.com/show/49263/building.svg" type="image/svg+xml" width="24" height="24"></object>
      <span class="fs-4">Hotel Dashboard</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item" v-if="$route.params.hotelId != undefined">
            <RouterLink class="px-2 nav-link link-dark d-flex align-items-center" 
                :to="{ name: 'hotelstructure', params: { hotelId: $route.params.hotelId } }"
                :class="{ active: $route.name == 'hotelstructure'}">
                <object class="me-4" data="https://www.svgrepo.com/show/342786/room.svg" type="image/svg+xml" width="16" height="16"></object>
                Rooms
            </RouterLink>
        </li>
        <li class="nav-item" v-if="$route.params.hotelId != undefined">
            <RouterLink class="px-2 nav-link  link-dark d-flex align-items-center" 
                :to="{ name: 'hoteltickets', params: { hotelId: $route.params.hotelId } }"
                :class="{ active: $route.name == 'hoteltickets'}">
                <object class="me-4" data="https://www.svgrepo.com/show/145173/alert.svg" type="image/svg+xml" width="16" height="16"></object>
                Tickets
            </RouterLink>
        </li>
        <li class="nav-item" v-if="$route.params.hotelId != undefined">
            <RouterLink class="px-2 nav-link  link-dark d-flex align-items-center" 
                :to="{ name: 'hotelreservations', params: { hotelId: $route.params.hotelId } }"
                :class="{ active: $route.name == 'hotelreservations'}">
                <object class="me-4" data="https://www.svgrepo.com/show/355174/plan.svg" type="image/svg+xml" width="16" height="16"></object>
                Reservations
            </RouterLink>
        </li>
    </ul>
    <RouterLink class="h6 mb-3 d-flex align-items-center link-dark text-decoration-none" v-if="$route.params.hotelId != undefined"
        :to="{ name: 'hotelreserve', params: { hotelId: $route.params.hotelId } }"
        :class="{ active: $route.name == 'hotelreservations'}">
        <object class="me-4" data="https://www.svgrepo.com/show/84870/link.svg" type="image/svg+xml" width="16" height="16"></object>
        Public reservation form
    </RouterLink>

    <div class="dropup">
        <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownHotel" data-bs-toggle="dropdown" aria-expanded="false">
            <h5>Hotels</h5>
        </a>
        <HotelDropdown />
    </div>
    <hr>
    <div>
      <span class="d-flex align-items-center justify-content-between link-dark text-decoration-none">
        <div class="d-flex align-items-center">
            <object class="me-2" data="https://www.svgrepo.com/show/5319/user.svg" type="image/svg+xml" width="24" height="24"></object>
            <strong>{{ name }}</strong>
        </div>
        <button type="button" class="btn btn-danger" @click="handleLogout()">Log Out</button>
      </span>
    </div>
</div>
<div class="d-flex my-3 flex-fill flex-grow-1 justify-content-center overflow-auto container">
    <router-view :key="$route.path"></router-view>
</div>
</template>

<script lang="ts">
import HotelService from "@/services/HotelService";
import IdentityService from "@/services/IdentityService";
import { useHotelStore } from "@/stores/Hotel";
import { Options, Vue } from "vue-class-component";
import HotelDropdown from "../components/dashboard/HotelDropdown.vue";

@Options({
    components: {
        HotelDropdown
    },
})
export default class Dashboard extends Vue {
    hotelStore = useHotelStore();
    
    name = `${IdentityService.getFirstName()} ${IdentityService.getLastName()}`

    async mounted(): Promise<void> {
        let res = await HotelService.getAll();

        if (res.data != null) {
            this.hotelStore.$state.data = res.data;
        }
    }

    beforeCreate() {
        if (!IdentityService.loggedIn()) {
            window.location.href = '/';
        }
    }

    handleLogout() {
        window.location.href = '/';
        IdentityService.logout();
    }
}
</script>

<style>

#app, main {
  display: flex;
  height: 100%;
  width: 100%;

}
</style>