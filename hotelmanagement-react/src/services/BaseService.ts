import httpClient from "../utils/HttpClient";
import type { AxiosError, AxiosResponse } from "axios";
import type { IServiceResult } from "../domain/IServiceResult";
import * as tg from '../utils/Typeguards';

export class BaseService<TEntity> {
    constructor(protected path: string, protected apiVersion: string) {
    }

    async post(entity: TEntity): Promise<IServiceResult<TEntity | null>> {
        let response;
        try {
            response = await httpClient.post(`${this.apiVersion}/${this.path}`, entity);
        } catch (e) {
            return this.handleErrorResponse((e as AxiosError));
        }

        return this.handleSuccessfulResponse(response);
    }

    async getAll() : Promise<IServiceResult<TEntity[]| null>> {
        let response;
        try {
            response = await httpClient.get(`${this.apiVersion}/${this.path}`);
        } catch (e) {
            return this.handleErrorResponse((e as AxiosError));
        }

        return this.handleSuccessfulResponseArr(response);
    }

    async get(id: number | string) : Promise<IServiceResult<TEntity | null>> {
        let response;
        try {
            response = await httpClient.get(`${this.apiVersion}/${this.path}/${id}`);
        } catch (e) {
            return this.handleErrorResponse((e as AxiosError));
        }

        return this.handleSuccessfulResponse(response);
    }

    async put(id: number | string, newEntity: TEntity) : Promise<IServiceResult<TEntity | null>> {
        let response;
        try {
            response = await httpClient.put(`${this.apiVersion}/${this.path}/${id}`, newEntity);
        } catch (e) {
            return this.handleErrorResponse((e as AxiosError));
        }

        return this.handleSuccessfulResponse(response);
    }

    async delete(id: number | string) : Promise<IServiceResult<TEntity | null>> {
        let response;
        try {
            response = await httpClient.delete(`${this.apiVersion}/${this.path}/${id}`);
        } catch (e) {
            return this.handleErrorResponse((e as AxiosError));
        }

        return this.handleSuccessfulResponse(response);
    }

    protected handleSuccessfulResponse(response: AxiosResponse): IServiceResult<TEntity | null> {
        let result : IServiceResult<TEntity | null> = {
            success: true,
            status: response!.status,
            data: response.data,
            errors: {}
        }

        return result;
    }

    protected handleSuccessfulResponseArr(response: AxiosResponse): IServiceResult<TEntity[] | null> {
        let result : IServiceResult<TEntity[] | null> = {
            success: true,
            status: response!.status,
            data: response.data,
            errors: {}
        }

        return result;
    }

    protected handleErrorResponse(e: AxiosError): IServiceResult<null> {
        let result : IServiceResult<null> = {
            success: false,
            status: (e as AxiosError).response!.status,
            errors: {}
        }
        
        let response = (e as AxiosError).response!.data;

        if (result.status == 400 && tg.isValidationErrorResponse(response)) { 
            result.errors = response.errors;
        }
        else if (tg.isErrorResponse(response)) {
            result.errors!["error"] = [response.detail];
        }

        // console.log(response);
        // console.log((e as AxiosError).response);

        return result;
    }

}