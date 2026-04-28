import type { HttpResponseWithContent } from "~/api/http/HTTPResponse";
import { type SnackbarContextType } from "~/context/snackbar";

export function handleAnyRestErrorWith<T>(floating: SnackbarContextType) {
    return function then(resp: HttpResponseWithContent<T>) {
        if (resp.ok)
            return resp;

        return floating.notifyApiError(resp);
    }
}