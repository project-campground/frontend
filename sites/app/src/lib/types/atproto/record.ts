export interface PutRecordResponse {
	uri: string;
	cid: string;
	commit: { cid: string; rev: string };
	validationStatus: 'unknown';
}
export interface GetRecordListResponse<T> {
	records: Array<AtprotoRecord<T>>;
	cursor: string;
}
export interface AtprotoRecord<T> {
	uri: string;
	cid: string;
	value: T;
}
