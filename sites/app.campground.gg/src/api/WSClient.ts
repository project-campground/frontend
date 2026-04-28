import { decodeSequence, encode } from "cbor2";
import type { KeyValueEncoded } from "cbor2/sorts";
import { stringify } from "uuid";
import type HTTPAtprotoClient from "./http/HTTPAtprotoClient";
import type { TypeToPayload } from "types/ws";
import { defaultBackendDomain } from "api.config";

type Config = {
    url: string;
};

interface WSFrameHeader<TOp extends number> {
    op: TOp;
}
interface WSFrameHeaderTyped<TOp extends number, TType extends string> extends WSFrameHeader<TOp> {
    t: TType;
}
interface WSFrame<TData> {
    payload: TData;
}
interface WSErrorFrame extends WSFrameHeader<-1>, WSFrame<{ error: string; message?: string; }> {}
interface WSDataFrame<TType extends string, TData> extends WSFrameHeaderTyped<1, TType>, WSFrame< TData> {
    t: TType;
}

type WSMessage = WSErrorFrame | WSDataFrame<keyof TypeToPayload, TypeToPayload[keyof TypeToPayload]>;

export type WSSubscriptionCallback = (message: WSMessage) => unknown;

const mapObjectValue = (value: any): any =>
    value instanceof Uint8Array
    ? stringify(value as Uint8Array)
    : Array.isArray(value)
    ? (value as any[]).map(mapObjectValue)
    : value;

const createObject = (kve: KeyValueEncoded[]) =>
    Object.fromEntries(kve.map(([key, value]) => [key as string, mapObjectValue(value)]));

export interface WSSubscription {
    callback: WSSubscriptionCallback;
};

export default class WSClient {
    private _config: Config;
    private _subscriptions: WSSubscription[];
    private _client: WebSocket;
    private _onOpen: Array<() => unknown> = [];
    constructor(config: Config) {
        this._config = config;
        this._subscriptions = [];
        this._client = new WebSocket(this._config.url);
        this._client.onmessage = this._onMessage.bind(this);
    }
    public subscribe(callback: WSSubscriptionCallback) {
        const subscription = {
            callback,
        };
        this._subscriptions.push(subscription);
        return subscription;
    }
    public unsubscribe(subscription: WSSubscription) {
        this._subscriptions = this._subscriptions.filter((x) => x !== subscription);
    }
    public initWithAuth(restClient: HTTPAtprotoClient) {
        this._client.onopen = async () => {
            console.log("WebSocket Open");
            const serviceAuth = await restClient.getServiceAuth({ aud: `did:web:${defaultBackendDomain}`, lxm: "gg.campground.websocket.subscribe" });
            this._client.send(
                encode({
                    op: 0,
                    payload: serviceAuth.ok ? {
                        serviceAuth: serviceAuth.content.token,
                    } : undefined,
                })
            );
            console.log("Sent WebSocket auth frame");
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

        console.log("Setting campsite in WS", campsiteId);
        setTimeout(() => {
            this._internalSetCampsite(campsiteId);
        }, 100);
    }
    private _internalSetCampsite(campsiteId: string | null) {
        console.log("Set campsite in WS", campsiteId);
        this._client.send(
            encode({
                op: 1,
                payload: {
                    t: "View",
                    campsite: campsiteId || "",
                }
            })
        );
    }
    public switchCampsite(campsiteId: string) {
        this._client.send(
            encode({
                op: 1,
                payload: {
                    t: "View",
                    campsiteId,
                },
            })
        );
    }
    public fetchPermissions() {
        this._client.send(
            encode({
                op: 1,
                payload: {
                    t: "ViewPermissions",
                },
            })
        );
    }
    private async _onMessage(msg: MessageEvent<any>) {
        const [header, payload] = [...decodeSequence(await (msg.data as Blob).bytes(), { createObject })] as [WSFrameHeader<-1> | WSFrameHeaderTyped<1, string>, any];
        const message: WSMessage = {...header, payload } as WSMessage;
        console.log("Message", message);
        return await Promise.allSettled(
            this._subscriptions.map((x) =>
                x.callback(message)
            )
        );
    }
}