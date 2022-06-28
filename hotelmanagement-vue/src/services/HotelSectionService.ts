import httpClient from '@/HttpClient';
import type { IServiceResult } from '@/domain/IServiceResult';
import type { IHotelSection } from './../domain/IHotelSection';
import { BaseService } from './BaseService';
import type { AxiosError } from 'axios';

const apiVersion: string = 'v1';

class HotelSectionService extends BaseService<IHotelSection> {
    
    constructor() {
        super("section", apiVersion)
    }
    
    async getAllHotelSections(hotelId: string) : Promise<IServiceResult<IHotelSection[]| null>> {
        let response;
        try {
            response = await httpClient.get(`${apiVersion}/hotel/sections/${hotelId}`);
        } catch (e) {
            return this.handleErrorResponse((e as AxiosError));
        }

        return this.handleSuccessfulResponseArr(response);
    }
}

export default new HotelSectionService();