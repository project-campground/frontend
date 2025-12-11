export default class RestError extends Error {
    #header: string | null;
    status: number | null;
    constructor(message: string, status: number | null = null, header: string | null = null) {
        super(message);
        this.#header = header;
        this.status = status;
        this.name = "RestError";
    }
    get header() {
        return this.#header ?? (this.status ? `Error ${this.status}` : null) ?? this.message;
    }
}