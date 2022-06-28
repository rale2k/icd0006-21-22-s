import type { IAmenity } from './IAmenity';

export interface IRoomType {
    id?: string;
    hotelId?: string;
    name: string;
    description: string;
    capacity: number;
    amenities?: IAmenity[];
}