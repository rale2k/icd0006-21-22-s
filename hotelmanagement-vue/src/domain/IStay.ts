import type { IClient } from './IClient';

export interface IStay {
    id?: string,
    client: IClient
    roomId: string,
    start: string,
    end: string
}
