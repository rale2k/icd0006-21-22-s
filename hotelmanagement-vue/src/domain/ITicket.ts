export interface ITicket {
    id?: string;
    hotelId: string;
    roomId: string;
    priority: string;
    type: string;
    status: string;
    description: string;
    createdAt?: string,
    updatedAt?: string,
}