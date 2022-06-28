import { IBuilding } from './../domain/IBuilding';
import { IAmenity } from '../domain/IAmenity';

export interface IAppState {
    loggedIn: boolean;
    setloggedIn: (status: boolean) => void;

    buildings: IBuilding[];
    setBuildings: (Buildings: IBuilding[]) => void;

    amenities: IAmenity[];
    setAmenities: (Amenities: IAmenity[]) => void;
}
