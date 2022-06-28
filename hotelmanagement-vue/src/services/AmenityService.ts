import httpClient from '@/HttpClient';
import type { IAmenity } from '@/domain/IAmenity';
import type { IServiceResult } from '@/domain/IServiceResult';
import { BaseService } from './BaseService';
import type { AxiosError } from 'axios';

const apiVersion: string = 'v1';

class AmenityService extends BaseService<IAmenity> {
    constructor() {
        super("amenity", apiVersion)
    }

    async getAllHotelAmenities(hotelId: string) : Promise<IServiceResult<IAmenity[]| null>> {
        let response;
        try {
            response = await httpClient.get(`${apiVersion}/hotel/amenities/${hotelId}`);
        } catch (e) {
            return this.handleErrorResponse((e as AxiosError));
        }

        return this.handleSuccessfulResponseArr(response);
    }

}

export default new AmenityService();