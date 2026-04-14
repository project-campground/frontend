export type HttpResponse = HttpResponseOk | HttpResponseError;
export type HttpResponseWithContent<T> = HttpResponseOkWithContent<T> | HttpResponseError;

interface HttpResponseBase<TOk extends boolean> {
    ok: TOk;
    status: number;
    url: string;
}
export interface HttpResponseError extends HttpResponseBase<false> {
    errorHeader?: string;
    errorDescription: string;
    content: undefined;
} 
export interface HttpResponseOk extends HttpResponseOkWithContent<any | null> {
}
export interface HttpResponseOkWithContent<T> extends HttpResponseBase<true> {
    errorHeader: undefined;
    errorDescription: undefined;
    content: T;
}