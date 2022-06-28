import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import BuildingService from "../services/BuildingService";
import IdentityService from "../services/IdentityService";
import { AppContext } from "../state/AppContext";
import UserBuildingRooms from "./userdashboard/UserBuildingRooms";

const UserDashboard = () => {
    const navigate = useNavigate();
    const params = useParams();

    const appState = useContext(AppContext);
    
    useEffect(() => {
        console.log(IdentityService.getRoles());
        async function fetchBuildings() {
            let res = await BuildingService.getAll();

            if (res.data != null) {
                appState.setBuildings(appState.buildings.concat(res.data));
            }
        }
        fetchBuildings()

        if (!IdentityService.loggedIn()) {
            navigate("../")
        }
    },[])

    const handlePressLogout = () => {
        IdentityService.logout()
        navigate("../")
    }   
    
    return(
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{width: "280px"}}>
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <object className="me-2" data="https://www.svgrepo.com/show/49263/building.svg" type="image/svg+xml" width="24" height="24"></object>
                    <span className="fs-4">Renting App</span>               
                </a>
                <hr/>
                <ul className="nav nav-pills flex-column mb-auto">
                {appState.buildings == null ? "" :
                        appState.buildings.map(function(building, x){
                            return (
                                <li key={building.id} className="my-1">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <Link className="dropdown-item px-1" to={`${building.id}`}>
                                            <p className="Building-name nav-link link-dark py-0 my-0">{building.name}</p>
                                        </Link>
                                    </div>
                                </li>
                            )
                        })
                        }
                <li><hr className="dropdown-divider"/></li>
                </ul>
                <div>
                <hr/>
                <span className="d-flex align-items-center justify-content-between link-dark text-decoration-none">
                    <div className="d-flex align-items-center">
                        <object className="me-2" data="https://www.svgrepo.com/show/5319/user.svg" type="image/svg+xml" width="24" height="24"></object>
                        <strong>{`${IdentityService.getFirstName()} ${IdentityService.getLastName()}`}</strong>
                    </div>
                    <button type="button" className="btn btn-danger" onClick={handlePressLogout}>Log Out</button>
                </span>
                </div>
            </div>
            <div className="my-3 flex-fill flex-grow-1 justify-content-center overflow-auto container">
                <Routes>
                    <Route path="" element={ <><h3>Select a Building from the sidebar!</h3></>}  />
                    <Route path=":buildingId" element={ <UserBuildingRooms />} />
                </Routes>
            </div>
        </>
    )
}

export default UserDashboard;