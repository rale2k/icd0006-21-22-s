import { AxiosError } from 'axios';
import { IServiceResult } from '../domain/IServiceResult';
import HTTPClient from '../utils/HttpClient';
import type { IApartment } from './../domain/IApartment';
import { BaseService } from './BaseService';

const apiVersion: string = 'v1';

class ApartmentService extends BaseService<IApartment> {
    constructor() {
        super("Apartment", apiVersion)
    }

    async getAllBuildingApartments(buildingId: string) : Promise<IServiceResult<IApartment[]| null>> {
        let response;
        try {
            response = await HTTPClient.get(`${apiVersion}/building/${buildingId}/apartments`);
        } catch (e) {
            return this.handleErrorResponse((e as AxiosError));
        }

        return this.handleSuccessfulResponseArr(response);
    }

}

export default new ApartmentService();