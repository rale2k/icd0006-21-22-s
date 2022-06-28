import { IAmenity } from './IAmenity';

export interface IApartment {
    id?: string,
    buildingId?: string,
    contractId?: string,
    description: string,
    roomCount: number,
    surfaceArea: number,
    amenities: IAmenity[];
}