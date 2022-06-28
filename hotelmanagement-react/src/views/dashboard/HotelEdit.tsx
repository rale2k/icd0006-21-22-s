import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IHotel } from "../../domain/IHotel";
import HotelService from "../../services/HotelService";
import { AppContext } from "../../state/AppContext";

const HotelEdit = () => {
    const navigate = useNavigate();
    const params = useParams();
    const appState = useContext(AppContext);

    const [hotelFormData, setHotelFormData] = useState<IHotel>(
        { 
            name: "",
            description: "",
        });


    useEffect(() => {
        async function fetchHotel() {
            let res = await HotelService.get(params.hotelId!);
            if (res.data != null) {
                setHotelFormData(res.data);
            }
        }

        fetchHotel()
    },[])

    const handleEditHotel = async () => {
        await HotelService.put(params.hotelId!, hotelFormData)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                let items = [...appState.hotels];
                items[items.findIndex(e => e.id == params.hotelId!)] = hotelFormData;
                appState.setHotels(items);
                navigate(`../${params.hotelId!}`)
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    } 

    const handleDeleteHotel = async () => {
        await HotelService.delete(params.hotelId!)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                let filteredArray = appState.hotels.filter(s => s.id !== params.hotelId!)
                appState.setHotels(filteredArray);
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
                    value={hotelFormData.name}
                    onChange={(e) => setHotelFormData(hotel => ({...hotel, ...{ name: e.target.value}}))}/>
                    <label>Name</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control form-control-bottom"
                    value={hotelFormData.description}
                    onChange={(e) => setHotelFormData(hotel => ({...hotel, ...{ description: e.target.value}}))}/>
                    <label>Description</label>
                </div>
                <div className="d-flex">
                    <button className="w-100 me-3 btn btn-lg btn-primary" onClick={handleEditHotel}>Edit Hotel</button>
                    <button className="w-100 ms-3 btn btn-lg btn-danger" onClick={handleDeleteHotel}>Delete Hotel</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default HotelEdit;