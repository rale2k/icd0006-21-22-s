import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IBuilding } from "../../domain/IBuilding";
import BuildingService from "../../services/BuildingService";
import { AppContext } from "../../state/AppContext";

const BuildingEdit = () => {
    const navigate = useNavigate();
    const params = useParams();
    const appState = useContext(AppContext);

    const [BuildingFormData, setBuildingFormData] = useState<IBuilding>(
        { 
            name: "",
            description: "",
            address: "",
            floors: 0,
        });


    useEffect(() => {
        async function fetchData() {
            let res = await BuildingService.get(params.buildingId!);
            if (res.data != null) {
                setBuildingFormData(res.data);
            }
        }

        fetchData()
    },[])

    const handleEditBuilding = async () => {
        await BuildingService.put(params.buildingId!, BuildingFormData)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                let items = [...appState.buildings];
                items[items.findIndex(e => e.id == params.buildingId!)] = BuildingFormData;
                appState.setBuildings(items);
                navigate(`../${params.buildingId!}`)
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    } 

    const handleDeleteBuilding = async () => {
        await BuildingService.delete(params.buildingId!)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                let filteredArray = appState.buildings.filter(s => s.id !== params.buildingId!)
                appState.setBuildings(filteredArray);
                navigate(`../`)
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    } 

    return(
        <>
        <div className="container">
            <div>
                <h1 className="h3 mb-3 fw-normal">Details</h1>
                <div className="form-floating">
                    <input type="text" className="form-control form-control-top"
                    value={BuildingFormData.name}
                    onChange={(e) => setBuildingFormData(Building => ({...Building, ...{ name: e.target.value}}))}/>
                    <label>Name</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control form-control-middle"
                    value={BuildingFormData.description}
                    onChange={(e) => setBuildingFormData(Building => ({...Building, ...{ description: e.target.value}}))}/>
                    <label>Description</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control form-control-middle"
                    value={BuildingFormData.address}
                    onChange={(e) => setBuildingFormData(Building => ({...Building, ...{ address: e.target.value}}))}/>
                    <label>Address</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control form-control-bottom"
                    value={BuildingFormData.floors}
                    onChange={(e) => setBuildingFormData(Building => ({...Building, ...{ floors: parseInt(e.target.value)}}))}/>
                    <label>Floors</label>
                </div>
                <div className="d-flex">
                    <button className="w-100 me-3 btn btn-lg btn-primary" onClick={handleEditBuilding}>Edit Building</button>
                    <button className="w-100 ms-3 btn btn-lg btn-danger" onClick={handleDeleteBuilding}>Delete Building</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default BuildingEdit;