import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import HotelListDropdown from "../components/HotelListDropdown";
import { IHotel } from "../domain/IHotel";
import HotelService from "../services/HotelService";
import IdentityService from "../services/IdentityService";
import { AppContext } from "../state/AppContext";
import HotelCreate from "./dashboard/HotelCreate";
import HotelEdit from "./dashboard/HotelEdit";
import HotelStructure from "./dashboard/HotelStructure";

const Dashboard = () => {
    const navigate = useNavigate();
    const params = useParams();

    const appState = useContext(AppContext);
    
    useEffect(() => {
        async function fetchHotels() {
            let res = await HotelService.getAll();

            if (res.data != null) {
                appState.setHotels(appState.hotels.concat(res.data));
            }
        }
        fetchHotels()

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
                    <span className="fs-4">Hotel Dashboard</span>               
                </a>
                <hr/>
                <ul className="nav nav-pills flex-column mb-auto">
                {params['*'] == "createhotel" || params['*'] == "" ? "" :
                    <li className="nav-item">
                            <Link className="px-2 nav-link link-dark d-flex align-items-center active" 
                            to={ params['*']!.indexOf('/') == -1 ? params['*']! : params['*']!.slice(0, params['*']!.indexOf('/')) }>
                                <object className="me-4" data="https://www.svgrepo.com/show/342786/room.svg" type="image/svg+xml" width="16" height="16"></object>
                                Rooms
                            </Link>
                    </li>
                }
                </ul>
                <div className="dropup">
                    <a href="" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownHotel" data-bs-toggle="dropdown" aria-expanded="false">
                        <h5>Hotels</h5>
                    </a>
                    <HotelListDropdown />
                </div>
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
            <div className="d-flex my-3 flex-fill flex-grow-1 justify-content-center overflow-auto container">
                <Routes>
                    <Route path="" element={ <><h3>Select a hotel from the sidebar!</h3></>}  />
                    <Route path="hotelcreate" element={ <HotelCreate />} />
                    <Route path=":hotelId" element={ <HotelStructure /> } />
                    <Route path=":hotelId/details" element={ <HotelEdit />} />
                </Routes>
            </div>
        </>
    )
}

export default Dashboard;