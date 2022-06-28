import httpClient from '@/HttpClient';
import type { IServiceResult } from '@/domain/IServiceResult';
import type { ITicket } from './../domain/ITicket';
import { BaseService } from './BaseService';
import type { AxiosError } from 'axios';

const apiVersion: string = 'v1';

class TicketService extends BaseService<ITicket> {
    
    constructor() {
        super("ticket", apiVersion)
    }
    
    async getAllHotelTickets(hotelId: string) : Promise<IServiceResult<ITicket[]| null>> {
        let response;
        try {
            response = await httpClient.get(`${apiVersion}/hotel/tickets/${hotelId}`);
        } catch (e) {
            return this.handleErrorResponse((e as AxiosError));
        }

        return this.handleSuccessfulResponseArr(response);
    }
    
    async getAllRoomTickets(roomId: string) : Promise<IServiceResult<ITicket[]| null>> {
        let response;
        try {
            response = await httpClient.get(`${apiVersion}/room/tickets/${roomId}`);
        } catch (e) {
            return this.handleErrorResponse((e as AxiosError));
        }

        return this.handleSuccessfulResponseArr(response);
    }
}

export default new TicketService();