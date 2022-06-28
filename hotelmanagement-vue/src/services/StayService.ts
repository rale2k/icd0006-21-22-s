import httpClient from '@/HttpClient';
import type { IServiceResult } from '@/domain/IServiceResult';
import type { IStay } from './../domain/IStay';
import { BaseService } from './BaseService';
import type { AxiosError } from 'axios';

const apiVersion: string = 'v1';

class StayService extends BaseService<IStay> {
    
    constructor() {
        super("stay", apiVersion)
    }
    
    async getAllRoomStays(roomId: string) : Promise<IServiceResult<IStay[]| null>> {
        let response;
        try {
            response = await httpClient.get(`${apiVersion}/room/stays/${roomId}`);
        } catch (e) {
            return this.handleErrorResponse((e as AxiosError));
        }

        return this.handleSuccessfulResponseArr(response);
    }
}

export default new StayService();