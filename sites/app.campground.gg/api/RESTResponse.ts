export type RestResponse = RestResponseOk | RestResponseError;
export type RestResponseWithContent<T> = RestResponseOkWithContent<T> | RestResponseError;

interface RestResponseBase<TOk extends boolean> {
    ok: TOk;
    status: number;
    url: string;
}
export interface RestResponseError extends RestResponseBase<false> {
    errorHeader?: string;
    errorDescription: string;
    content: undefined;
} 
export interface RestResponseOk extends RestResponseOkWithContent<any | null> {
}
export interface RestResponseOkWithContent<T> extends RestResponseBase<true> {
    errorHeader: undefined;
    errorDescription: undefined;
    content: T;
}