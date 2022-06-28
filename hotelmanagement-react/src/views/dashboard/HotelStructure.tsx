import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import SectionCreateModal from "../../components/SectionCreateModal";
import SectionList from "../../components/SectionList";
import { IHotelSection } from "../../domain/IHotelSection";
import HotelSectionService from "../../services/HotelSectionService";


const HotelStructure = () => {
    const params = useParams();

    const [hotelSections, setHotelSections] = useState<IHotelSection[]>([]);

    useEffect(() => {
        async function fetchHotelSections() {
            let res = await HotelSectionService.getAllHotelSections(params.hotelId!);

            if (res.data != null) {
                setHotelSections(hotelSections.concat(res.data));
            }
        }

        fetchHotelSections()
    },[])

    return(
        <>
        <div className="container align-self-start">
            <div className="d-flex justify-content-between">
                <span className="fs-4 link-dark">Structure</span>
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#create-section-modal">Create New</button>
                <SectionCreateModal hotelId={params.hotelId!} 
                onCreated={(section: IHotelSection) => {setHotelSections(hotelSections.concat(section))}}/>
            </div>
            <hr/>
            <SectionList sections={hotelSections} setHotelSections={setHotelSections}/>
        </div>
        </>
    )
}

export default HotelStructure;