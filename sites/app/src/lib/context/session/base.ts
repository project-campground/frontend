export class ContextBase<T> {
	public value: T | null;
	private onValueChange: Array<(newValue: T | null) => unknown>;
	constructor(value: T | null) {
		this.value = value;
		this.onValueChange = [];
	}
	setNewValue(value: T | null) {
		this.value = value;
		this.onValueChange.map((x) => x(value));
	}
	subscribeToChanges(onChange: (newValue: T | null) => unknown) {
		this.onValueChange.push(onChange);
	}
}
