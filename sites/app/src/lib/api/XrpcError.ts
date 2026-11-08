type PdsRecordErrorCode = 'RecordNotFound';
type BadRequestErrorCode = 'InvalidRequest' | 'ExpiredToken' | 'InvalidToken';
type UnauthorizedErrorCode = 'AuthMissing';
type AtprotoIdentityErrorCode = 'HandleNotFound';
type ErrorCode =
	| PdsRecordErrorCode
	| BadRequestErrorCode
	| UnauthorizedErrorCode
	| AtprotoIdentityErrorCode;

/**
 * Represents a successful requests that has returned HTTP error status code.
 *
 * This may contain additional data about the error, such as the code/title of the error, as well as the description, but not always.
 */
export default class XrpcError extends Error {
	public code: ErrorCode | null;
	public description: string | null;

	/**
	 * Constructs a new API HTTP XRPC error.
	 * @param response The response that yielded error status
	 * @param responseBody The response parsed body jSON
	 */
	constructor(
		public response: Response,
		public responseBody: Record<string, any> | null,
	) {
		const code = responseBody?.error ?? responseBody?.code ?? null;
		const description = responseBody?.message ?? responseBody?.error ?? null;

		super(`[${response.status}] ${code}: ${description}`, { cause: response });

		this.name = 'XRPCError';

		this.code = code;
		this.description = description;
	}
	public get status() {
		return this.response.status;
	}
	public get statusText() {
		return this.response.statusText;
	}
}
