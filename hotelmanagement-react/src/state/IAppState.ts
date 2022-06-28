import { IHotel } from './../domain/IHotel';
export interface IAppState {
    loggedIn: boolean;
    setloggedIn: (status: boolean) => void;

    hotels: IHotel[];
    setHotels: (hotels: IHotel[]) => void;

}
