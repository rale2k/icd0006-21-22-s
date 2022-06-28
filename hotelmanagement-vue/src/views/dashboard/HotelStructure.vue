<template>
<div v-if="hotelId != undefined" class="container align-self-start">
    <div class="d-flex justify-content-between">
        <span class="fs-4 link-dark">Structure</span>
        <button class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#create-section-modal'">Create New</button>
        <HotelSectionCreate :hotelId="hotelId"/>
    </div>
    <hr/>
    <div class="accordion accordion-flush" id="accordionExample">
        <HotelSectionAccordion v-for="section in sectionStore.$state.data" v-bind:key="section.id" :section="section" />
    </div>
</div>
<div v-else>
    <h3>Select a hotel</h3>
</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import { useSectionStore } from "@/stores/Section";
import HotelSectionService from "@/services/HotelSectionService";

import HotelSectionAccordion from "@/components/dashboard/Hotel/HotelSectionAccordion.vue";
import HotelSectionCreate from "@/components/dashboard/Hotel/HotelSectionCreate.vue";
import { useHotelStore } from "@/stores/Hotel";

@Options({
    components: {
        HotelSectionCreate,
        HotelSectionAccordion
    },
    props: {
        hotelId: String
    }
})
export default class HotelStructure extends Vue {
    hotelStore = useHotelStore();
    sectionStore = useSectionStore();

    hotelId!: string;

    async mounted(): Promise<void> {
        let res = await HotelSectionService.getAllHotelSections(this.hotelId);

        if (res.data != null) {
            this.sectionStore.$state.data = res.data;
        }
    }
}
</script>

<style>

</style>