import { decodeSequence, encode } from "cbor2";
import type { KeyValueEncoded } from "cbor2/sorts";
import { stringify } from "uuid";
import type RESTClient from "./RESTClient";
import type { TypeToPayload } from "types/ws";

type Config = {
    url: string;
};

interface WebSocketFrameHeader<TOp extends number> {
    op: TOp;
}
interface WebSocketFrameHeaderTyped<TOp extends number, TType extends string> extends WebSocketFrameHeader<TOp> {
    t: TType;
}
interface WebSocketFrame<TData> {
    payload: TData;
}
interface WebSocketErrorFrame extends WebSocketFrameHeader<-1>, WebSocketFrame<{ error: string; message?: string; }> {}
interface WebSocketDataFrame<TType extends string, TData> extends WebSocketFrameHeaderTyped<1, TType>, WebSocketFrame< TData> {
    t: TType;
}

type WebSocketMessage = WebSocketErrorFrame | WebSocketDataFrame<keyof TypeToPayload, TypeToPayload[keyof TypeToPayload]>;

export type WebSocketSubscriptionCallback = (message: WebSocketMessage) => unknown;

const mapObjectValue = (value: any): any =>
    value instanceof Uint8Array
    ? stringify(value as Uint8Array)
    : Array.isArray(value)
    ? (value as any[]).map(mapObjectValue)
    : value;

const createObject = (kve: KeyValueEncoded[]) =>
    Object.fromEntries(kve.map(([key, value]) => [key as string, mapObjectValue(value)]));

export interface WebSocketSubscription {
    callback: WebSocketSubscriptionCallback;
};

export default class WebSocketClient {
    private _config: Config;
    private _subscriptions: WebSocketSubscription[];
    private _client: WebSocket;
    private _onOpen: Array<() => unknown> = [];
    constructor(config: Config) {
        this._config = config;
        this._subscriptions = [];
        this._client = new WebSocket(this._config.url);
        this._client.onmessage = this._onMessage.bind(this);
        console.log("This", this);
    }
    public subscribe(callback: WebSocketSubscriptionCallback) {
        const subscription = {
            callback,
        };
        this._subscriptions.push(subscription);
        return subscription;
    }
    public unsubscribe(subscription: WebSocketSubscription) {
        this._subscriptions = this._subscriptions.filter((x) => x !== subscription);
    }
    public initWithAuth(restClient: RESTClient) {
        this._client.onopen = async () => {
            console.log("WS Open");
            const serviceAuth = await restClient.getServiceAuth({ lxm: "gg.campground.websocket.subscribe" });
            this._client.send(
                encode({
                    op: 0,
                    payload: serviceAuth.ok ? {
                        serviceAuth: serviceAuth.content.token,
                    } : undefined,
                })
            );
            console.log("Sent auth");
            setTimeout(() => {
                this._internalInitOnOpen();
            }, 300);
        };
    }
    public initWithoutAuth() {
        this._client.onopen = () => {
            this._client.send(
                encode({
                    op: 0,
                })
            );
            this._internalInitOnOpen();
        }
    }
    private _internalInitOnOpen() {
        console.log("Fully initializing WebSocket");
        for (const onOpen of this._onOpen)
            onOpen();
    }
    public setCampsite(campsiteId: string | null) {
        if (this._client.readyState !== this._client.OPEN)
            return this._onOpen.push(this._internalSetCampsite.bind(this, campsiteId));

        console.log("Set campsite", campsiteId);
        setTimeout(() => {
            this._internalSetCampsite(campsiteId);
        }, 100);
    }
    private _internalSetCampsite(campsiteId: string | null) {
        console.log("Set campsite after opening", campsiteId);
        this._client.send(
            encode({
                op: 1,
                payload: {
                    View: {
                        campsite: campsiteId || "",
                    }
                }
            })
        );
    }
    public switchCampsite(campsiteId: string) {
        this._client.send(
            encode({
                op: 1,
                t: "CampsiteView",
                payload: {
                    campsiteId,
                },
            })
        );
    }
    private async _onMessage(msg: MessageEvent<any>) {
        const [header, payload] = [...decodeSequence(await (msg.data as Blob).bytes(), { createObject })] as [WebSocketFrameHeader<-1> | WebSocketFrameHeaderTyped<1, string>, any];
        const message: WebSocketMessage = {...header, payload } as WebSocketMessage;
        console.log("Message", message);
        return await Promise.allSettled(
            this._subscriptions.map((x) =>
                x.callback(message)
            )
        );
    }
}