import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UserApartmentList from "../../components/UserApartmentList";
import { IApartment } from "../../domain/IApartment";
import ApartmentService from "../../services/ApartmentService";

const UserBuildingRooms = () => {
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
            </div>
            <hr/>
            <UserApartmentList apartments={apartments} setApartments={setApartments} />
        </div>
        </>
    )
}

export default UserBuildingRooms;