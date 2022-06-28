import type { IClient } from './IClient';

export interface IReservation {
    id?: string,
    roomTypeId: string,
    client: IClient,
    start: string,
    end: string
}