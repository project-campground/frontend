import type HTTPClient from "./HTTPClient";

export default class HTTPClientObjectManager {
    protected client: HTTPClient;
    constructor(client: HTTPClient) {
        this.client = client;
    }
}