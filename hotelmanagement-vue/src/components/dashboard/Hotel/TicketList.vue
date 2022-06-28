<template>
    <table class="table">
    <thead>
        <tr>
        <th scope="col">Status</th>
        <th scope="col">Type</th>
        <th scope="col">Priority</th>
        <th scope="col">Description</th>
        <th scope="col">Modified</th>
        <th scope="col"></th>
        </tr>
    </thead>
    <tbody>
        <template v-bind:key="ticket.id" v-for="ticket in tickets">
            <tr>
                <th scope="row">{{ ticket.status }}</th>
                <td>{{ticket.type}}</td>
                <td>{{ticket.priority}}</td>
                <td>{{ticket.description}}</td>
                <td>{{new Date(ticket.updatedAt!).toLocaleString()}}</td>
                <td style="width:10%">
                    <RouterLink :to="{ name: 'ticketedit', params: { ticketId: ticket.id }}">
                        <button class="btn btn-primary btn-sm">Manage</button>
                    </RouterLink>
                </td>
            </tr>
        </template>
    </tbody>
    </table>
</template>

<script lang="ts">
import type { ITicket } from "@/domain/ITicket";
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        tickets: Object as unknown as ITicket[],
    },
})
export default class TicketList extends Vue {
    tickets!: ITicket[]
}
</script>

<style>

</style>