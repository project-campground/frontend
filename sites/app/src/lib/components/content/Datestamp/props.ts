export interface DatestampProps {
	date: Date | string;
	when?: boolean;
	long?: boolean;
}
export type DatestampUnit = 'y' | 'mon' | 'w' | 'd' | 'h' | 'min' | 's' | 'ms';
