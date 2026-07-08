export class DebouncedValue<TValue, TDerived> {
	private timeout: NodeJS.Timeout | null = null;
	public value: TValue;

	constructor(
		defaultValue: TValue,
		public waitTime: number,
		private _onDebounce: (value: TDerived) => Promise<TValue>,
	) {
		this.value = $state(defaultValue);
	}

	derived(value: TDerived) {
		if (this.timeout !== null) clearTimeout(this.timeout);

		this.timeout = setTimeout(
			async () => (this.value = await this._onDebounce(value)),
			this.waitTime,
		);
	}
}
