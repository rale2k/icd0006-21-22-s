import type { IJWTResponse } from '../domain/IJWTResponse';
import type { IErrorResponse } from "../domain/IErrorResponse";
import type { IValidationErrorResponse } from '../domain/IValidationErrorResponse';

export function isJWTResponse(obj: any): obj is IJWTResponse {
    return 'token' in obj && 'refreshtoken' in obj;
}

export function isErrorResponse(obj: any): obj is IErrorResponse {
    return 'type' in obj && 'title' in obj && 'status' in obj  && 'detail' in obj && 'traceId' in obj;
}

export function isValidationErrorResponse(obj: any): obj is IValidationErrorResponse {
    return 'type' in obj && 'title' in obj && 'status' in obj && 'errors' in obj && 'traceId' in obj;
}
