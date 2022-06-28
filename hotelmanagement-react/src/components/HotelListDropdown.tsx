import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IHotel } from "../domain/IHotel";
import { AppContext } from "../state/AppContext";

const HotelListDropdown = () => {
    const appState = useContext(AppContext);

    return(
        <>
            <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownHotel">
                {appState.hotels == null ? "" :
                        appState.hotels.map(function(hotel, x){
                            return (
                                <li key={hotel.id}>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <Link className="dropdown-item px-1" to={`${hotel.id}`}>
                                            <p className="hotel-name nav-link link-dark py-0 my-0">{hotel.name}</p>
                                        </Link>
                                        <Link to={`${hotel.id}/details`} >
                                            <button className="btn btn-sm btn-primary me-3">Edit</button>
                                        </Link>
                                    </div>
                                </li>
                            )
                        })
                        }
                <li><hr className="dropdown-divider"/></li>
                <li>
                    <Link to={"hotelcreate"} >
                        <span className="dropdown-item">Create New..</span>
                    </Link>
                </li>
            </ul>
        </>
    )
}

export default HotelListDropdown;