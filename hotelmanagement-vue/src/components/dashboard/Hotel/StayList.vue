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
        <template v-bind:key="stay.id" v-for="stay in stays">
            <tr>
                <th>{{`${stay.client.firstName} ${stay.client.lastName}`}}</th>
                <td>{{new Date(stay.start!).toLocaleString()}}</td>
                <td>{{new Date(stay.end!).toLocaleString()}}</td>
                <td style="width: 10%">
                <RouterLink :to="{ name: 'stayedit', params: { stayId: stay.id }}">
                    <button class="btn btn-primary btn-sm">Manage</button>
                </RouterLink>
                </td>
            </tr>
        </template>
    </tbody>
    </table>
</template>

<script lang="ts">
import type { IStay } from "@/domain/IStay";
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        stays: Object as unknown as IStay[]
    },
    components: {
    }
})
export default class StayList extends Vue {
    stays!: IStay[];
}
</script>

<style>

</style>