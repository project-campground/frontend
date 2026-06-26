import type HTTPBackendClient from './HTTPBackendClient';

export default class HTTPBackendObjectManager {
	protected client: HTTPBackendClient;

	constructor(client: HTTPBackendClient) {
		this.client = client;
	}

	protected get atproto() {
		return this.client.atproto;
	}
}
