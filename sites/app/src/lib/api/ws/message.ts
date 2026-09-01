import type { WSMessageTypeToPayload } from './types.ts';

// Headers
export interface WSFrameHeader<TOp extends number> {
	op: TOp;
}
export interface WSFrameHeaderTyped<
	TOp extends number,
	TType extends string,
> extends WSFrameHeader<TOp> {
	t: TType;
}
// Payload
export interface WSFrameWithPayload<TData> {
	payload: TData;
}
// Existing frames
export interface WSErrorFrame<T extends string>
	extends WSFrameHeader<-1>, WSFrameWithPayload<{ error: T; message?: string }> {}

// States
export type WSStateMessage = WSStateFrame<'open'>;
export type WSStateFrame<T extends string> = WSFrameHeaderTyped<0, T>;

// Data
export interface WSDataFrame<TType extends string, TData>
	extends WSFrameHeaderTyped<1, TType>, WSFrameWithPayload<TData> {}

export type WSDataMessage = WSDataFrame<
	keyof WSMessageTypeToPayload,
	WSMessageTypeToPayload[keyof WSMessageTypeToPayload]
>;

export type WSMessage = WSStateMessage | WSErrorFrame<string> | WSDataMessage;
