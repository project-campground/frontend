import { decodeSequence, encode } from 'cbor2';
import type { KeyValueEncoded } from 'cbor2/sorts';
import { stringify } from 'uuid';
import type HTTPAtprotoClient from '../http/HTTPAtprotoClient.ts';
import { asapScheduler, observeOn, Subject, type Observable } from 'rxjs';
import type { WSFrameHeader, WSFrameHeaderTyped, WSMessage, WSStateMessage } from './message.ts';

type Config = { url: string; httpClient?: HTTPAtprotoClient };

const mapObjectValue = (value: unknown): unknown =>
	value instanceof Uint8Array ? stringify(value as Uint8Array)
	: Array.isArray(value) ? (value as unknown[]).map(mapObjectValue)
	: value;

const createObject = (kve: KeyValueEncoded[]) =>
	Object.fromEntries(kve.map(([key, value]) => [key as string, mapObjectValue(value)]));

export default class WSClient {
	private _config: Config;
	private _client: WebSocket;
	private _subject: Subject<WSMessage> = new Subject();

	constructor(config: Config) {
		this._config = config;
		this._client = new WebSocket(this._config.url);
		this._client.onopen = this._onOpen.bind(this);
		this._client.onmessage = this._onMessage.bind(this);
		this._client.onerror = this._onError.bind(this);
		this._client.onclose = this._onClose.bind(this);
	}

	/**
	 * Returns an observable (reactive stream) of WebSocket messages, states and non-critical errors.
	 * @returns Observable message stream
	 */
	public get messages(): Observable<WSMessage> {
		return this._subject.pipe(observeOn(asapScheduler));
	}

	public get isOpen() {
		return this._client.readyState === WebSocket.OPEN;
	}

	private async _onOpen() {
		if (!this._config.httpClient) return this._onOpenNoAuth();

		console.log('WebSocket Open');
		// Used for backends to know it's legitimate authentication
		const serviceAuth = await this._config.httpClient
			.getServiceAuth({
				aud: `did:web:${this._config.url.split('/')[2]}`,
				lxm: 'gg.campground.websocket.subscribe',
			})
			.then((resp) => ({ serviceAuth: resp.token }))
			.catch(
				(err) => (
					console.warn('Could not get service auth for WebSocket. Using unauthenticated WebSocket', err),
					undefined
				),
			);

		this.send(0, serviceAuth);

		console.log('Sent WebSocket auth frame');

		setTimeout(() => {
			this._onInit();
		}, 300);
	}
	private async _onOpenNoAuth() {
		this.send(0);
		return this._onInit();
	}

	private _onInit() {
		// Fake message to notify the observers that they can set actively viewed campsite and such.
		return this._subject.next({ op: 0, t: 'open' } satisfies WSStateMessage);
	}

	private _onClose() {
		this._subject.complete();
	}

	private _onError(err: Event) {
		return this._subject.error(err);
	}

	/**
	 * Changes the campsite that the events may be coming from. Global messages will still be streamed.
	 * @param campsite The new campsite to get message stream from.
	 */
	public setCampsite(campsite: string | null) {
		console.log('Set campsite in WS', campsite);
		this.send(1, { t: 'View', campsite });
	}
	/**
	 * Asks back-end to receive its calculated permissions that the user has.
	 */
	public fetchPermissions() {
		this.send(1, { t: 'ViewPermissions' });
	}
	/**
	 * Sends a message to the back-end.
	 * @param op The operation code of the message.
	 * @param payload The data sent as second in sequence cbor object.
	 */
	private send(op: 0 | 1, payload?: null | undefined | Record<string, unknown>) {
		this._client.send(new Uint8Array(encode({ op, payload })));
	}

	private async _onMessage(msg: MessageEvent<unknown>) {
		// Similar to how Atprotocol handles firehose (CBOR with sequenced objects (NOT ARRAY OBJECTS))
		const [header, payload] = [
			...decodeSequence(await (msg.data as Blob).bytes(), { createObject }),
		] as [WSFrameHeader<-1> | WSFrameHeaderTyped<1, string>, unknown];

		const message: WSMessage = { ...header, payload } as WSMessage;

		console.log('Message', message);
		return this._subject.next(message);
	}
}
