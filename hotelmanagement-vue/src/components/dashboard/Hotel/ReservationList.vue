<template>
    <table class="table">
    <thead>
        <tr>
        <th scope="col">Client</th>
        <th scope="col">Start</th>
        <th scope="col">End</th>
        <th scope="col"></th>
        </tr>
    </thead>
    <tbody>
        <template v-bind:key="reservation.id" v-for="reservation in reservations">
            <tr>
                <td>{{`${reservation.client.firstName} ${reservation.client.lastName}`}}</td>
                <td>{{new Date(reservation.start!).toLocaleString()}}</td>
                <td>{{new Date(reservation.end!).toLocaleString()}}</td>
                <td style="width:25%">
                    <button class="btn btn-primary btn-sm" data-bs-toggle="modal" :data-bs-target="'#create-stay-modal'">
                        Create Stay
                    </button>
                    <StayCreateModal :client="reservation.client"/>
                    <RouterLink :to="{ name: 'reservationedit', params: { reservationId: reservation.id }}">
                        <button class="btn btn-primary ms-3 btn-sm">Manage</button>
                    </RouterLink>
                </td>
            </tr>
        </template>
    </tbody>
    </table>
</template>

<script lang="ts">
import type { IReservation } from "@/domain/IReservation";
import { Options, Vue } from "vue-class-component";
import StayCreateModal from "./StayCreateModal.vue";

@Options({
    props: {
        reservations: Object as unknown as IReservation[],
    },
    components: {
        StayCreateModal
    }
})
export default class ReservationList extends Vue {
    reservations!: IReservation[]
}
</script>

<style>

</style>