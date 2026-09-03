export interface DatestampProps {
	date: Date | string;
	/**
	 * Sets what is displayed by the Datestamp. Here is how these types are displayed:
	 * - `date-first` -- shows date as a text and time in the tooltip
	 * - `when` -- shows 'in X minutes' or 'X minutes ago' and date in the tooltip
	 * - `then` -- shows '12:01pm' and date in the tooltip
	 */
	type?: 'date-first' | 'when' | 'then';
}
export type DatestampUnit = 'y' | 'mon' | 'w' | 'd' | 'h' | 'min' | 's' | 'ms';
