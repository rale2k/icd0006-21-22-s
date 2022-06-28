export interface IValidationErrorResponse {
    type: string,
    title: string,
    status: number,
    errors: {[name: string] : string[] },
    traceId: string
}