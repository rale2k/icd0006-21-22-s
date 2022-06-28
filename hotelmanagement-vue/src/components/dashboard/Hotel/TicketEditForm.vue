<template>
    <div class="form-floating">
        <input v-model="ticketFormData.description" type="text" class="form-control form-control-top">
        <label for="floatingInput">Description</label>
    </div>
    <div class="form-floating">
        <select v-model="ticketFormData.priority" class="form-select form-control-middle" aria-label="Default select example" >
            <option disabled value="">Select a Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
        </select>
        <label for="floatingInput">Priority</label>
    </div>
    <div class="form-floating">
        <select v-model="ticketFormData.type" class="form-select form-control-middle" aria-label="Default select example" >
            <option disabled value="">Select a Type</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Housekeeping">Housekeeping</option>
            <option value="Other">Other</option>
        </select>
        <label for="floatingInput">Type</label>
    </div>
    <div class="form-floating">
        <select v-model="ticketFormData.status" class="form-select form-control-bottom" aria-label="Default select example" >
            <option disabled value="">Select a Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
        </select>
        <label for="floatingInput">Status</label>
    </div>

    <div class="d-flex">
        <button class="w-100 me-3 btn btn-lg btn-primary" @click="handleEditTicket()">Edit Ticket</button>
        <button class="w-100 ms-3 btn btn-lg btn-danger" @click="handleDeleteTicket()">Delete Ticket</button>
    </div>
</template>

<script lang="ts">
import type { ITicket } from "@/domain/ITicket";
import TicketService from "@/services/TicketService";
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        ticket: Object as unknown as ITicket
    },
    watch: {
        ticket() {
            this.ticketFormData.id = this.ticket.id;
            this.ticketFormData.description = this.ticket.description;
            this.ticketFormData.hotelId = this.ticket.hotelId;
            this.ticketFormData.roomId = this.ticket.roomId;
            this.ticketFormData.priority = this.ticket.priority;
            this.ticketFormData.type = this.ticket.type;
            this.ticketFormData.status = this.ticket.status;
        }
    }
})
export default class TicketEditForm extends Vue {
    ticket!: ITicket;

    ticketFormData: ITicket = {
        hotelId: "",
        roomId: "",
        priority: "",
        type: "",
        status: "",
        description: "",
    }

    async handleEditTicket() {
        await TicketService.put(this.ticket.id!, this.ticketFormData)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    }

    async handleDeleteTicket() {
        await TicketService.delete(this.ticket.id!)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                this.$router.back();
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