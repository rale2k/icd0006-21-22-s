import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ApartmentCreateModal from "../../components/ApartmentCreateModal";
import ApartmentList from "../../components/ApartmentList";
import { IApartment } from "../../domain/IApartment";
import { IBuilding } from "../../domain/IBuilding";
import ApartmentService from "../../services/ApartmentService";
import BuildingService from "../../services/BuildingService";
import { AppContext } from "../../state/AppContext";

const BuildingRooms = () => {
    const params = useParams();

    const [apartments, setApartments] = useState<IApartment[]>([]);

    useEffect(() => {
        async function fetchData() {
            let res = await ApartmentService.getAllBuildingApartments(params.buildingId!);

            if (res.data != null) {
                setApartments(apartments.concat(res.data));
            }
        }

        fetchData()
    },[])

    return(
        <>
        <div className="container align-self-start">
            <div className="d-flex justify-content-between">
                <span className="fs-4 link-dark">Structure</span>
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#create-apartment-modal">Create New</button>
                <ApartmentCreateModal buildingId={params.buildingId!} 
                onCreated={(section: IApartment) => {setApartments(apartments.concat(section))}}/>
            </div>
            <hr/>
            <ApartmentList apartments={apartments} setApartments={setApartments} />
        </div>
        </>
    )
}

export default BuildingRooms;