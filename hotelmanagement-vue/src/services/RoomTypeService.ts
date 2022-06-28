import httpClient from '@/HttpClient';
import type { IServiceResult } from '@/domain/IServiceResult';
import type { IRoomType } from './../domain/IRoomType';
import { BaseService } from './BaseService';
import type { AxiosError } from 'axios';

const apiVersion: string = 'v1';

class RoomTypeService extends BaseService<IRoomType> {
    
    constructor() {
        super("roomtype", apiVersion)
    }
    
    async getAllHotelRoomTypes(hotelId: string) : Promise<IServiceResult<IRoomType[]| null>> {
        let response;
        try {
            response = await httpClient.get(`${apiVersion}/hotel/roomtypes/${hotelId}`);
        } catch (e) {
            return this.handleErrorResponse((e as AxiosError));
        }

        return this.handleSuccessfulResponseArr(response);
    }
}

export default new RoomTypeService();