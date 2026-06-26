export default class HTTPError extends Error {
	#header: string | null;
	status: number | null;
	constructor(message: string, status: number | null = null, header: string | null = null) {
		super(message);
		this.#header = header;
		this.status = status;
		this.name = 'HTTPError';
	}
	get header() {
		return this.#header ?? (this.status ? `Error ${this.status}` : null) ?? this.message;
	}
}
