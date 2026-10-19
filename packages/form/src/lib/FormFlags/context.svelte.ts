import { Pick } from '@campground/ui';

export class FlagsPickContext extends Pick.PickContext {
	constructor(private _setIndex: (value: number) => unknown) {
		super();
	}

	public override setActiveIndex(index: number): void {
		this._setIndex(index);
		return super.setActiveIndex(index);
	}
}
