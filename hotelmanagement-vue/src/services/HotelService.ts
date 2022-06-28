import type { IHotel } from './../domain/IHotel';
import { BaseService } from './BaseService';

const apiVersion: string = 'v1';

class HotelService extends BaseService<IHotel> {
    constructor() {
        super("hotel", apiVersion)
    }
}

export default new HotelService();