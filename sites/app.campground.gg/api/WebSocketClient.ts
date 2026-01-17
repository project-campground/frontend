import { decodeSequence } from "cbor2";

type Config = {
    url: string;
    auth: string;
};

interface WebSocketFrame<TOp extends number, TData> {
    op: TOp;
    data: TData;
}
interface WebSocketErrorFrame extends WebSocketFrame<-1, { error: string; message?: string; }> {}
interface WebSocketDataFrame<TType extends string, TData> extends WebSocketFrame<1, TData> {
    type: TType;
}

type WebSocketMessage = WebSocketErrorFrame | WebSocketDataFrame<string, any>;

type Subscription = (message: WebSocketMessage) => unknown;

export default class WebSocketClient {
    private _config: Config;
    private _subscriptions: Subscription[];
    private _client: WebSocket;
    constructor(config: Config) {
        this._config = config;
        this._subscriptions = [];
        this._client = new WebSocket(this._config.url);
        this._client.onmessage = this._onMessage.bind(this);
    }
    public subscribe(subscription: Subscription) {
        this._subscriptions.push(subscription);
    }
    private async _onMessage(msg: MessageEvent<any>) {
        const [header, payload] = [...decodeSequence(await (msg.data as Blob).bytes())] as WebSocketMessage[];
        const message: WebSocketMessage = {...header, ...payload};
        console.log("Got WS", message);
        await Promise.allSettled(
            this._subscriptions.map((x) =>
                x(message)
            )
        );
    }
}