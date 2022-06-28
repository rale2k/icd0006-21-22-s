<template>
<div class="container">
    <span class="fs-4 link-dark">Tickets</span>
    <hr/>
    <TicketList :tickets="tickets"/>
</div>
</template>

<script lang="ts">
import TicketList from "@/components/dashboard/Hotel/TicketList.vue";
import type { ITicket } from "@/domain/ITicket";
import TicketService from "@/services/TicketService";
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        hotelId: String,
    },
    components: {
        TicketList,
    }
})
export default class Tickets extends Vue{
    hotelId!: string;
    tickets: ITicket[] = [];

    async mounted() {
        await TicketService.getAllHotelTickets(this.hotelId)
            .then((res) => {
                if (res.data != null) {
                    this.tickets = res.data
                }
            }
        );
    }
}
</script>

<style>

</style>