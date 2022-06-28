<template>
<div class="modal fade" :id="'editModal-'+section.id" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ModalLabel">Edit Section</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="form-floating">
                        <input v-model="sectionFormData.name" type="text" class="form-control form-control-top">
                        <label for="floatingInput">Name</label>
                    </div>
                    <div class="form-floating">
                        <input v-model="sectionFormData.description" type="text" class="form-control form-control-bottom">
                        <label for="floatingInput">Description</label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" @click="handleUpdateSection()" data-bs-toggle="modal" :data-bs-target="'#editModal-'+section.id">Save changes</button>
                <button class="btn btn-danger ms-3" @click="handleDeleteSection()" data-bs-toggle="modal" :data-bs-target="'#editModal-'+section.id">Delete</button>
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
        section: Object as unknown as IHotelSection
    },
})
export default class SectionEditModal extends Vue {
    sectionStore = useSectionStore();
    section!: IHotelSection;

    sectionFormData: IHotelSection = {
        name: "",
        description: ""
    };

    mounted() {
        this.sectionFormData.name = this.section.name;
        this.sectionFormData.description = this.section.description;
    }

    async handleUpdateSection() {
        await HotelSectionService.put(this.section.id!, this.sectionFormData)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                this.sectionStore.updateSection(this.section.id!, this.sectionFormData);
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    }

    async handleDeleteSection() {
        await HotelSectionService.delete(this.section.id!)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                this.sectionStore.deleteSection(this.section.id!);
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