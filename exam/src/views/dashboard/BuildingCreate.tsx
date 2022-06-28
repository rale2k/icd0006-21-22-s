import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { IBuilding } from "../../domain/IBuilding";
import BuildingService from "../../services/BuildingService";
import { AppContext } from "../../state/AppContext";

const BuildingCreate = () => {
    const navigate = useNavigate();
    const appState = useContext(AppContext);

    const [name, setName] = useState("")
    const [descripton, setDescription] = useState("")
    const [address, setAddress] = useState("")
    const [floors, setFloors] = useState(1)

    const handleSubmitBuilding = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let building: IBuilding = {
            name: name,
            address: address,
            description: descripton,
            floors: floors
        }
        
        let res = await BuildingService.post(building);

        if (res.data != null) {
            appState.setBuildings(appState.buildings.concat(res.data));
            navigate(`../${res.data.id!}`)
        }
    }

    return(
        <>
            <div className="container">
                <form onSubmit={handleSubmitBuilding}>
                    <h1 className="h3 mb-3 fw-normal">Create New Building</h1>
                    <div className="form-floating">
                        <input type="text" className="form-control form-control-top"
                        onChange={(e) => {setName(e.target.value)}}/>
                        <label>Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control form-control-middle"
                        onChange={(e) => {setDescription(e.target.value)}}/>
                        <label>Description</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control form-control-middle"
                        onChange={(e) => {setAddress(e.target.value)}}/>
                        <label>Address</label>
                    </div>
                    <div className="form-floating">
                        <input type="number" className="form-control form-control-bottom"
                        onChange={(e) => {setFloors(parseInt(e.target.value))}}/>
                        <label>Floors</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary">Create Building</button>
                </form>
            </div>
        </>
    )
}

export default BuildingCreate;