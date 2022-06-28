import httpClient from '@/HttpClient';
import type { IServiceResult } from '@/domain/IServiceResult';
import type { IRoom } from './../domain/IRoom';
import { BaseService } from './BaseService';
import type { AxiosError } from 'axios';

const apiVersion: string = 'v1';

class RoomService extends BaseService<IRoom> {
    
    constructor() {
        super("room", apiVersion)
    }
    
    async getAllSectionRooms(sectionId: string) : Promise<IServiceResult<IRoom[]| null>> {
        let response;
        try {
            response = await httpClient.get(`${apiVersion}/section/rooms/${sectionId}`);
        } catch (e) {
            return this.handleErrorResponse((e as AxiosError));
        }

        return this.handleSuccessfulResponseArr(response);
    }

    async getAllHotelRooms(hotelId: string) : Promise<IServiceResult<IRoom[]| null>> {
        let response;
        try {
            response = await httpClient.get(`${apiVersion}/hotel/rooms/${hotelId}`);
        } catch (e) {
            return this.handleErrorResponse((e as AxiosError));
        }

        return this.handleSuccessfulResponseArr(response);
    }

}

export default new RoomService();