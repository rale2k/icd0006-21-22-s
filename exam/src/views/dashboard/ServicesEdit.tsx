import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../state/AppContext";
import { IService } from "../../domain/IService";
import ServiceService from "../../services/ServiceService";

const ServicesEdit = () => {
    const [services, setServices] = useState<IService[]>([]);
    const [selectedServiceId, setSelectedServiceId] = useState("");

    const [serviceFormData, setServiceFormData] = useState<IService>(
        { 
            name: "",
            serviceType: "",
            price: 0
        });

    useEffect(() => {
        async function fetchData() {
            let res = await ServiceService.getAll().then(res => {
                if (res.data != null) {
                    setServices(res.data);
                }    
            });
        }

        fetchData()
    },[])
    
    const handleCreateService = async () => {
        await ServiceService.post({...serviceFormData, id: undefined})
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                setServices(services.concat(res.data!));
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    }

    const handleEditService = async () => {
        await ServiceService.put(selectedServiceId!, serviceFormData)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                let items = [...services];
                items[items.findIndex(e => e.id == selectedServiceId!)] = {...serviceFormData, id: selectedServiceId};
                setServices(items);
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    }

    const handleDeleteService = async () => {
        await ServiceService.delete(selectedServiceId!)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                let filteredArray = services.filter(s => s.id !== selectedServiceId!)
                console.log(filteredArray)
                setServices(filteredArray);
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    }

    const handleSelectService = (service: IService) => {
        console.log("handleselectservice")
        setServiceFormData({ ...service })
        setSelectedServiceId(service.id!)
    }

    const renderFormControls = () => { 
        if (selectedServiceId != ""){ 
            return(<>
                    <button className="btn btn-primary w-50 ms-3" onClick={handleEditService}>Edit</button>
                    <button className="btn btn-danger ms-3" onClick={handleDeleteService}>Delete</button>
                </>)
        }
    }

    return(
        <>
            <h1 className="h3 mb-3 fw-normal">Services</h1>
            <div className="container">
                <div className="flex-grow-1 me-3">
                    <div className="form-floating">
                        <input type="text" className="form-control form-control-top"
                        value={serviceFormData.name}
                        onChange={(e) => {setServiceFormData(service => ({...service, ...{ name: e.target.value}}))}}/>
                        <label htmlFor="floatingInput">Name</label>
                    </div>
                    <div className="form-floating">
                        <select className="form-select form-control-middle" 
                        value={serviceFormData.serviceType}
                        onChange={(e) => {setServiceFormData(service => ({...service, ...{ serviceType: e.target.value}}))}}>
                                <option disabled value="">Select a Type</option>
                                <option value="UnitBased">Unit Based Service</option>
                                <option value="Single">Single</option>
                        </select>
                        <label htmlFor="floatingInput">Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="number" className="form-control form-control-bottom"
                        value={serviceFormData.price}
                        onChange={(e) => {setServiceFormData(service => ({...service, ...{ price: parseFloat(e.target.value)}}))}}/>
                        <label htmlFor="floatingInput">Value</label>
                    </div>
                    <div className="d-flex">
                        <button className="flex-grow-1 w-50 btn btn-primary" onClick={handleCreateService}>Create New</button>
                        <>{renderFormControls()}</>
                    </div>
                </div>
                <div className="mt-3">
                    <div className="list-group overflow-auto">
                    {services.map(function(service, x){
                        return (
                            <a href="#" key={service.id} className={`list-group-item list-group-item-action ${selectedServiceId == service.id ? "active" : ""}`}
                            onClick={() => {handleSelectService(service)}}>
                                <div key={service.id} className="d-flex w-100 justify-content-between">
                                    <h5 key={service.id} className="mb-1">{service.name}</h5>
                                    <div className="d-flex align-items-center">
                                        <object className="me-2" data="https://www.svgrepo.com/show/387164/click-tap.svg" type="image/svg+xml" width="24" height="24"></object>
                                        Click to edit!
                                    </div>
                                </div>
                                <div>
                                    <object className="me-2" data="https://www.svgrepo.com/show/374799/change-record-type.svg" type="image/svg+xml" width="24" height="24"></object>
                                    {service.serviceType}
                                </div>
                                <div>
                                    <object className="me-2" data="https://www.svgrepo.com/show/34089/price-tag.svg" type="image/svg+xml" width="24" height="24"></object>
                                    {service.price}
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

export default ServicesEdit;