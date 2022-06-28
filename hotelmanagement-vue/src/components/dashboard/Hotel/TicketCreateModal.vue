<template>
<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#createSectionModal">
    Create Ticket
</button>
<div class="modal fade" :id="'createSectionModal'" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ModalLabel">Create Ticket</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="form-floating">
                        <input v-model="ticketFormData.description" type="text" class="form-control form-control-top">
                        <label for="floatingInput">Description</label>
                    </div>
                    <select v-model="ticketFormData.priority" class="form-select form-control-middle" aria-label="Default select example" >
                        <option disabled value="">Select a Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <select v-model="ticketFormData.type" class="form-select form-control-bottom" aria-label="Default select example" >
                        <option disabled value="">Select a Type</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Housekeeping">Housekeeping</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#createSectionModal'"
                    @click="handleCreateTicket()">
                        Create
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import type { ITicket } from "@/domain/ITicket";
import TicketService from "@/services/TicketService";
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        tickets: Object as unknown as ITicket[],
        hotelId: String,
        roomId: String
    }
})
export default class TicketCreateModal extends Vue {
    tickets!: ITicket[]
    hotelId!: string;
    roomId!: string;

    ticketFormData: ITicket = {
        hotelId: "",
        roomId: "",
        priority: "",
        type: "",
        status: "Open",
        description: "",
    }

    mounted() {
        this.ticketFormData.roomId = this.roomId;
        this.ticketFormData.hotelId = this.hotelId;
    }

    async handleCreateTicket() {
        await TicketService.post(this.ticketFormData)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }

                this.tickets.push(res.data!);
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