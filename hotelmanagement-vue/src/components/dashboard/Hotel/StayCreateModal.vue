<template>
<div class="modal fade" :id="'create-stay-modal'" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ModalLabel">Create Stay</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <StayForm :stayFormData="stayFormData"/>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#create-stay-modal'"
                @click="handleCreateStay()">
                    Create
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import type { IClient } from "@/domain/IClient";
import type { IStay } from "@/domain/IStay";
import StayService from "@/services/StayService";
import { Options, Vue } from "vue-class-component";
import StayForm from "./StayForm.vue";

@Options({
    props: {
        client: Object as unknown as IClient,
        roomId: String,
        stays: Object as unknown as IStay[]
    },
    components: {
        StayForm
    }
})
export default class StayCreateModal extends Vue {
    client!: IClient;
    roomId!: string;
    stays!: IStay[];

    stayFormData: IStay = {
        roomId: "",
        client: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: ""
        },
        start: "",
        end: ""
    };

    async mounted() {
        if (this.roomId != undefined) {
            this.stayFormData.roomId = this.roomId;
        }
        if (this.client != undefined) {
            this.stayFormData.client = this.client;
        }
    }

    async handleCreateStay() {
        await StayService.post(this.stayFormData)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                if (this.stays != undefined) {
                    this.stays.push(res.data!);
                }
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