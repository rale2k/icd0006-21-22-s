<template>
<div class="modal fade" :id="'create-section-modal'" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ModalLabel">Create Section</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="form-floating">
                        <input v-model="newSection.name" type="text" class="form-control form-control-top"/>
                        <label for="floatingInput">Name</label>
                    </div>
                    <div class="form-floating">
                        <input v-model="newSection.description" type="text" class="form-control form-control-bottom"/>
                        <label for="floatingInput">Description</label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" @click="handleCreateSection()" data-bs-toggle="modal" :data-bs-target="'#create-section-modal'">Add section</button>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import type { IHotelSection } from "@/domain/IHotelSection";
import HotelSectionService from "@/services/HotelSectionService";
import { useSectionStore } from "@/stores/Section";
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        hotelId: String
    }
})
export default class HotelSectionCreate extends Vue {
    sectionStore = useSectionStore();

    hotelId!: string;

    newSection: IHotelSection = {
        name: '',
        description: ''
    }

    async handleCreateSection() {
        this.newSection.hotelId = this.hotelId;

        await HotelSectionService.post(this.newSection)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                this.newSection = {
                    name: '',
                    description: ''
                };  

                this.sectionStore.addSection(res.data!);
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