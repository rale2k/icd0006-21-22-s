<template>
<div class="container">
    <div>
        <h3 class="fw-normal">Details</h3>
        <RoomEditForm :room="room" :hotelId="hotelId"/>
    </div>
    <div>
        <div class="d-flex justify-content-between align-items-center">
            <h3 class="mt-3 fw-normal">Tickets</h3>
            <div>
                <TicketCreateModal :tickets="roomTickets" :hotelId="hotelId" :roomId="roomId"/>
            </div>
        </div>
        <div>
            <TicketList :tickets="roomTickets" :hotelId="hotelId" :roomId="roomId"/>
        </div>
    </div>
    <div>
        <div class="d-flex justify-content-between align-items-center">
            <h3 class="mt-3 fw-normal">Stays</h3>
            <div>
                <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#create-stay-modal">
                    Create Stay
                </button>
                <StayCreateModal :stays="roomStays" :roomId="roomId"/>
            </div>
        </div>
        <div>
            <StayList :stays="roomStays"/>
        </div>
    </div>
</div>

</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import type { ITicket } from "@/domain/ITicket";
import type { IStay } from "@/domain/IStay";
import type { IRoom } from "@/domain/IRoom";

import RoomService from "@/services/RoomService";
import RoomEditForm from "../../components/dashboard/Hotel/RoomEditForm.vue";
import TicketService from "@/services/TicketService";
import StayService from "@/services/StayService";
import TicketList from "@/components/dashboard/Hotel/TicketList.vue";
import StayList from "@/components/dashboard/Hotel/StayList.vue";
import TicketCreateModal from "@/components/dashboard/Hotel/TicketCreateModal.vue";
import StayCreateModal from "@/components/dashboard/Hotel/StayCreateModal.vue";

@Options({
    props: {
        hotelId: String,
        roomId: String
    },
    components: {
        RoomEditForm,
        TicketList,
        StayList,
        TicketCreateModal,
        StayCreateModal
    }
})
export default class RoomEdit extends Vue{
    roomId!: string;
    hotelId!: string;

    room: IRoom | null = null;
    roomTickets: ITicket[] = [];
    roomStays: IStay[] = [];

    async mounted() {
        await RoomService.get(this.roomId).then((res) => {
            if (res.data != null) {
                this.room = res.data
            }
        });
        await TicketService.getAllRoomTickets(this.roomId).then((res) => {
            if (res.data != null) {
                this.roomTickets = res.data;
            }
        });
        await StayService.getAllRoomStays(this.roomId).then((res) => {
                if (res.data != null) {
                    this.roomStays = res.data;
                }
        });
    }
}
</script>

<style>

</style>