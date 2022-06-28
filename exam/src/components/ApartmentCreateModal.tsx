import { useEffect, useState } from "react";
import { IAmenity } from "../domain/IAmenity";
import { IApartment } from "../domain/IApartment";
import AmenityService from "../services/AmenityService";
import ApartmentService from "../services/ApartmentService";

interface IApartmentCreateModalParams {
    buildingId: string,
    onCreated: Function
}

const ApartmentCreateModal =  (params: IApartmentCreateModalParams) => {
    const [amenities, setAmenities] = useState<IAmenity[]>([]);

    const [apartmentFormData, setApartmentFormData] = useState<IApartment>({
        description: "",
        roomCount: 1,
        surfaceArea: 1,
        amenities: []
    });

    useEffect(() => {
        async function fetchData() {
            let res = await AmenityService.getAll();

            if (res.data != null) {
                setAmenities(res.data);
            }
        }
        fetchData()
    },[])

    const handleCreateApartment = async () => {
        await ApartmentService.post({...apartmentFormData, buildingId: params.buildingId})
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }

                params.onCreated(res.data!);
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    }

    const handleSelectRoomAmenity = async (amenity: IAmenity) => {
        if (apartmentFormData.amenities == undefined) {
            apartmentFormData.amenities = [];
        }

        // if exists
        let index = apartmentFormData.amenities.findIndex(e => e.id == amenity.id);
        if (index > -1) {
            let newArr = apartmentFormData.amenities;
            newArr.splice(index, 1);
            setApartmentFormData({...apartmentFormData, amenities: newArr});
            return;
        }

        setApartmentFormData({...apartmentFormData, amenities: [...apartmentFormData.amenities, amenity]});
    }

    return (
        <>
        <div className="modal fade" id="create-apartment-modal" tabIndex={-1} aria-labelledby="ModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="ModalLabel">Create Apartment</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="form-floating">
                                <input v-model="newSection.name" type="text" className="form-control form-control-top"
                                onChange={(e) => setApartmentFormData(apartment => ({...apartment, ...{ description: e.target.value}}))}/>
                                <label>Description</label>
                            </div>
                            <div className="form-floating">
                                <input v-model="newSection.name" type="number" className="form-control form-control-middle"
                                onChange={(e) => setApartmentFormData(apartment => ({...apartment, ...{ roomCount: parseInt(e.target.value)}}))}/>
                                <label>Room Count</label>
                            </div>
                            <div className="d-flex">
                                <div className="form-floating  flex-grow-1">
                                    <input v-model="newSection.name" type="number" className="form-control form-control-bottom"
                                    onChange={(e) => setApartmentFormData(apartment => ({...apartment, ...{ name: parseInt(e.target.value)}}))}/>
                                    <label>Surface Area</label>
                                </div>
                                <div className="dropup my-auto ms-2">
                                    <a className="btn btn-outline-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                        Select Amenities
                                    </a>
                                    <div className="dropdown-menu overflow-auto" aria-label=".form-select-sm example">
                                        {amenities.map(function(amenity, x) {
                                            return (
                                                <option key={amenity.id!}
                                                className={`dropdown-item ${ (apartmentFormData.amenities != undefined && 
                                                    apartmentFormData.amenities?.some(e => e.id == amenity.id) ? "active" : "") }`} 
                                                value="amenity.id"
                                                onClick={() => {handleSelectRoomAmenity(amenity)}}>
                                                {amenity.name}
                                            </option>

                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#create-section-modal" onClick={handleCreateApartment}>Add section</button>
                    </div>
                </div>
            </div>
        </div>
</>
    )
}

export default ApartmentCreateModal;