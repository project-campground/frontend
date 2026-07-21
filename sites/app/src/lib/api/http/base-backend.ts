import type HTTPBackendClient from './HTTPBackendClient.js';

export default class HTTPBackendObjectManager {
	protected client: HTTPBackendClient;

	constructor(client: HTTPBackendClient) {
		this.client = client;
	}

	protected get atproto() {
		return this.client.atproto;
	}
}
