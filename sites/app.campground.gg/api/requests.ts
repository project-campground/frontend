import { defaultXrpcPrefix, homeApiUrl } from "api.config";

export type RequestOptions = {
    url?: string;
    routePrefix?: string;
    queries?: Record<string, string>;
    route: string;
    request?: RequestInit;
    method: "GET" | "POST" | "PUT" | "PATCH";
};

export function cgFetch({ url, route, routePrefix, request, queries, method }: RequestOptions) {
    const queriesString = queries ? `?${new URLSearchParams(queries)}` : ``;

    const resolvedUrl = `${url ?? homeApiUrl}${routePrefix ?? defaultXrpcPrefix}${route}${queriesString}`;

    console.log({ resolvedUrl, queriesString, method })

    return fetch(resolvedUrl, { 
        method,
        ...request
    });
}