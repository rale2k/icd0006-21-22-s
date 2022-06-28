<template>
<div class="container align-self-center">
    <div>
        <h3>Details</h3>
        <TicketEditForm :ticket="ticket"/>
    </div>
</div>
</template>

<script lang="ts">
import TicketEditForm from "@/components/dashboard/Hotel/TicketEditForm.vue";
import type { ITicket } from "@/domain/ITicket";
import TicketService from "@/services/TicketService";
import { Options, Vue } from "vue-class-component"

@Options({
    props: {
        ticketId: String
    },
    components: {
        TicketEditForm
    }
})
export default class TicketEdit extends Vue {
    ticketId!: string;
    
    ticket: ITicket | null = null;

    async mounted() {
        await TicketService.get(this.ticketId).then((res) => {
            if (res.data != null) {
                console.log("got ticket")
                this.ticket = res.data
            }
        });

    }
}
</script>

<style>

</style>