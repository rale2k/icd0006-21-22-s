export interface IServiceResult<TData> {
    success: boolean;
    status: number;
    data?: TData;
    errors?: {[name: string] : string[]};
}
