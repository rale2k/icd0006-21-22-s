import jwt_decode from 'jwt-decode';
import type { IJWTResponse } from '../domain/IJWTResponse';
import type { IServiceResult } from '../domain/IServiceResult';
import { HTTPClient } from '../utils/HttpClient';
import type { AxiosError } from 'axios';
import * as tg from '../utils/Typeguards';
import { claimTypes } from '../utils/Claimtypes';

const apiVersion: string = 'v1';

class IdentityService {
    async login(email: string, password: string): Promise<IServiceResult<IJWTResponse>> {
        try {
            let loginInfo = { email, password };
            let result = await HTTPClient.post(`${apiVersion}/identity/account/login`, loginInfo);

            this.setIdentity(result.data);

            return {
                success: true,
                status: result.status,
                data: result.data as IJWTResponse
            }
        } catch (e) {
            return this.handleErrorResponse((e as AxiosError));
        }
    }

    async register(email: string,
                   password: string,
                   firstname: string,
                   lastname: string): Promise<IServiceResult<IJWTResponse>>  {
        try { 
            let registerInfo = { email, password, firstname, lastname };
            let result = await HTTPClient.post(`${apiVersion}/identity/account/register`, registerInfo);

            return {
                success: true,
                status: result.status,
                data: result.data as IJWTResponse
            }
        } catch (e) {
            return this.handleErrorResponse((e as AxiosError));
        }
    }
    
    async refresh() {
        try { 
            let result = await HTTPClient.post(`${apiVersion}/identity/account/refreshtoken`, this.getStoredIdentity());

            this.setIdentity(result.data);

            return {
                status: result.status,
                data: result.data as IJWTResponse
            }
        } catch (e) {
            return this.handleErrorResponse((e as AxiosError));
        }

    }

    async logout() {
        localStorage.removeItem("jwt");
        localStorage.removeItem("refreshtoken");
    }

    handleErrorResponse(e: AxiosError): IServiceResult<IJWTResponse> {
        let result : IServiceResult<IJWTResponse> = {
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
        return result;
    }

    getStoredIdentity(): IJWTResponse | null {
        let jwt : string | null = localStorage.getItem("jwt");
        let refreshToken : string | null = localStorage.getItem("refreshtoken");
        
        if (jwt != null && refreshToken != null) {
            return { jwt: jwt, refreshToken: refreshToken };
        }

        return null;
      }

    setIdentity(data : IJWTResponse) {
        localStorage.setItem("jwt", data.jwt);
        localStorage.setItem("refreshtoken", data.refreshToken);
    }

    getFirstName(): string {
        let result = this.getJWTClaims();

        if (result != undefined) {
            return (result as {[name: string] : string})[claimTypes.givenName];
        }
        return '';
    }

    getLastName(): string {
        let result = this.getJWTClaims();

        if (result != undefined) {
            return (result as {[name: string] : string})[claimTypes.surname];
        }
        return '';
    }

    getRoles(): unknown | void { // i cant typescript
        let result = this.getJWTClaims();

        if (result != undefined)
            return (result as { [name: string] : unknown })[claimTypes.microsoft.role]

        return null;
    }

    getJWTClaims(): {[name: string] : string} | void {
        let jwtResponse = this.getStoredIdentity();
        if (jwtResponse == null)
            return;

        let result = jwt_decode(jwtResponse.jwt)
        return (result as {[name: string] : string})
    }

    loggedIn(): boolean {
        return (this.getStoredIdentity() != null);
    }
}

export default new IdentityService();