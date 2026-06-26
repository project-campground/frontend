import type HTTPAtprotoClient from './HTTPAtprotoClient';

export default class HTTPAtprotoObjectManager {
	protected client: HTTPAtprotoClient;
	constructor(client: HTTPAtprotoClient) {
		this.client = client;
	}
}
