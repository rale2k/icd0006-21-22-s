import React, { useContext, useEffect, useState } from "react";
import { IAmenity } from "../../domain/IAmenity";
import AmenityService from "../../services/AmenityService";

const AmenitiesEdit = () => {
    const [amenities, setAmenities] = useState<IAmenity[]>([]);
    const [selectedAmenityId, setSelectedAmenityId] = useState("");

    const [amenityFormData, setAmenityFormData] = useState<IAmenity>(
        { 
            name: "",
        });

    useEffect(() => {
        async function fetchData() {
            let res = await AmenityService.getAll().then(res => {
                if (res.data != null) {
                    setAmenities(res.data);
                }    
            });
        }

        fetchData()
    },[])
    
    const handleCreateAmenity = async () => {
        await AmenityService.post(amenityFormData)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                setAmenities(amenities.concat(res.data!));
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    }

    const handleEditAmenity = async () => {
        await AmenityService.put(selectedAmenityId!, amenityFormData)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                let items = [...amenities];
                items[items.findIndex(e => e.id == selectedAmenityId!)] = {...amenityFormData, id: selectedAmenityId};
                setAmenities(items);
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    }

    const handleDeleteAmenity = async () => {
        await AmenityService.delete(selectedAmenityId!)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                let filteredArray = amenities.filter(s => s.id !== selectedAmenityId!)
                console.log(filteredArray)
                setAmenities(filteredArray);
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    }

    const handleSelectAmenity = (amenity: IAmenity) => {
        console.log("handleselectamenity")
        setAmenityFormData({ name: amenity.name })
        setSelectedAmenityId(amenity.id!)
    }

    const renderFormControls = () => { 
        if (selectedAmenityId != ""){ 
            return(<>
                    <button className="btn btn-primary w-50 ms-3" onClick={handleEditAmenity}>Edit</button>
                    <button className="btn btn-danger ms-3" onClick={handleDeleteAmenity}>Delete</button>
                </>)
        }
    }

    return(
        <>
            <h1 className="h3 mb-3 fw-normal">Amenities</h1>
            <div className="container">
                <div className="flex-grow-1 me-3">
                    <div className="form-floating">
                        <input type="text" className="form-control form-control"
                        value={amenityFormData.name}
                        onChange={(e) => {setAmenityFormData(amenity => ({...amenity, ...{ name: e.target.value}}))}}/>
                        <label htmlFor="floatingInput">Name</label>
                    </div>
                    <div className="checkbox mb-3">
                    </div>
                    <div className="d-flex">
                        <button className="flex-grow-1 w-50 btn btn-primary" onClick={handleCreateAmenity}>Create New</button>
                        <>{renderFormControls()}</>
                    </div>
                </div>
                <div className="mt-3">
                    <div className="list-group overflow-auto">
                    {amenities.map(function(amenity, x){
                        return (
                            <a href="#" key={amenity.id} className={`list-group-item list-group-item-action ${selectedAmenityId == amenity.id ? "active" : ""}`}
                            onClick={() => {handleSelectAmenity(amenity)}}>
                                <div key={amenity.id} className="d-flex w-100 justify-content-between">
                                    <h5 key={amenity.id} className="mb-1">{amenity.name}</h5>
                                    <div className="d-flex align-items-center">
                                        <object className="me-2" data="https://www.svgrepo.com/show/387164/click-tap.svg" type="image/svg+xml" width="24" height="24"></object>
                                        Click to edit!
                                    </div>
                                </div>
                            </a>
                        )})
                    }
                    </div>
                </div>
            </div>
        </> 
    )
}

export default AmenitiesEdit;