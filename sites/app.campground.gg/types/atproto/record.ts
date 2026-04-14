export interface PutRecordResponse {
    uri: string;
    cid: string;
    commit: {
        cid: string;
        rev: string;
    };
    validationStatus: "unknown";
}
export interface GetRecordListResponse<T extends AtprotoValueBase> {
    records: Array<AtprotoRecord<T>>;
    cursor: string;
}
export interface AtprotoRecord<T extends AtprotoValueBase> {
    uri: string;
    cid: string;
    value: T;
}
export interface AtprotoValueBase {
    ["$type"]: string;
}