/**
 * Delays function executions.
 * If there is intermission (executions within the non-elapsed delay), the waiting time on execution will be reset and
 * the old awaited executions will be ignored.
 */
export class Debounced {
	private timeout: NodeJS.Timeout | null = null;

	constructor(
		private _onDebounce: () => Promise<unknown> | unknown,
		public waitTime: number,
	) {}

	/**
	 * Waits specified debounce time and invokes the debounced function.
	 */
	invoke() {
		if (this.timeout !== null) clearTimeout(this.timeout);

		this.timeout = setTimeout(() => this._onDebounce(), this.waitTime);
	}
}
/**
 * Delays value changes using Svelte state `value`.
 * If there is intermission (executions within the non-elapsed delay), the waiting time on value changes will be reset and old changes will be be ignored.
 */
export class DebouncedValue<T> {
	private timeout: NodeJS.Timeout | null = null;
	public value: T;

	constructor(
		defaultValue: T,
		public waitTime: number,
	) {
		this.value = $state(defaultValue);
	}

	/**
	 * Waits specified debounce time and updates the value.
	 * @param value The value to change to.
	 */
	update(value: T) {
		if (this.timeout !== null) clearTimeout(this.timeout);

		this.timeout = setTimeout(() => (this.value = value), this.waitTime);
	}
}
