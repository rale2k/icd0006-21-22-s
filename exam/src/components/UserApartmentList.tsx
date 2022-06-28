import { IApartment } from "../domain/IApartment"
import ApartmentEditModal from "./ApartmentEditModal"
import ContractCreateModal from "./ContractCreateModal"

interface IApartmentListParams {
    apartments: IApartment[]
    setApartments: Function
}
const UserApartmentList = (params: IApartmentListParams) => {

    const handleUpdateApartment = (section: IApartment) => {
        let items = [...params.apartments];
        items[items.findIndex(e => e.id == section.id)] = section;
        params.setApartments(items);
    }

    const handleDeleteApartment = (section: IApartment) => {
        let filteredArray = params.apartments.filter(s => s.id !== section.id!)
        params.setApartments(filteredArray);
    }

    const renderApartmentStatus = (apartment: IApartment) => {
        if (apartment.contractId != null) {
            return (
                <>
                    <span className="badge rounded-pill bg-danger">Occupied</span>
                    <div className="mt-3">
                        <button className="btn btn-primary">View Contract</button>
                    </div>
                </>
            )
        }
        else {
            return <span className="badge rounded-pill bg-success">Available</span>
        }
    }

    const renderApartmentControls = (apartment: IApartment) => {
        if (apartment.contractId == null) {
            return (
                <>
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#contract-create-modal-${apartment.id}`}>Create Contract</button>
                    <ContractCreateModal apartmentId={apartment.id!} />
                </>
            )
        }
        else {
            return <></>
        }
    }

    return(
        <>
        <div className="accordion accordion-flush" id="accordionExample">
        {
            params.apartments.map(function(apartment, x) {
                return(
                        <div className="accordion-item" key={apartment.id}>
                            <h2 className="accordion-header" id={'header-'+apartment.id}>
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={'#collapse-'+apartment.id} aria-expanded="false" aria-controls={'collapse-'+apartment.id}>
                                {apartment.description}
                            </button>
                            </h2>
                            <div id={'collapse-'+apartment.id} className="accordion-collapse collapse" aria-labelledby={'#header-'+apartment.id} data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className="container d-flex align-content-center">
                                        <div className="d-flex flex-grow-1 py-2">
                                            <div className="w-50">
                                                <h5>Amenities:</h5>
                                                <div>
                                                    {apartment.amenities.map(function(amenity, x) {
                                                        return <span key={amenity.id} className="badge rounded-pill bg-primary">{amenity.name}</span>

                                                    })}
                                                </div>
                                            </div>
                                            <div>
                                                <h5>Status: {renderApartmentStatus(apartment)}</h5>  
                                            </div>
                                        </div>
                                        <div>
                                            {renderApartmentControls(apartment)} 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            })
        }
        </div>
        </>
    )
}

export default UserApartmentList;