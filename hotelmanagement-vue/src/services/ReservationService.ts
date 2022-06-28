import httpClient from '@/HttpClient';
import type { IServiceResult } from '@/domain/IServiceResult';
import type { IReservation } from './../domain/IReservation';
import { BaseService } from './BaseService';
import type { AxiosError } from 'axios';

const apiVersion: string = 'v1';

class ReservationService extends BaseService<IReservation> {
    
    constructor() {
        super("reservation", apiVersion)
    }
    
    async getAllHotelReservations(roomId: string) : Promise<IServiceResult<IReservation[]| null>> {
        let response;
        try {
            response = await httpClient.get(`${apiVersion}/hotel/reservations/${roomId}`);
        } catch (e) {
            return this.handleErrorResponse((e as AxiosError));
        }

        return this.handleSuccessfulResponseArr(response);
    }
}

export default new ReservationService();