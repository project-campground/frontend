import type { Snippet } from 'svelte';
import type { ComponentSize } from '../../types/attributes.ts';
import type { AriaAttributes, EventHandler, HTMLInputAttributes } from 'svelte/elements';

// Easier use of types; need to see if it significantly interferes with compilation time
type EventHandlerStripInput<T extends Event> = EventHandler<
	Omit<T, 'currentTarget'> & {
		currentTarget: EventTarget & (HTMLInputElement | HTMLTextAreaElement);
	},
	HTMLInputElement | HTMLTextAreaElement
>;

type OnEventFromInput<T> =
	T extends EventHandler<infer TEvent, any> ? EventHandlerStripInput<TEvent> : never;
type OnEventInfer<T extends keyof HTMLInputAttributes> = OnEventFromInput<HTMLInputAttributes[T]>;

export default interface TextInputProps
	extends
		AriaAttributes,
		Pick<HTMLInputAttributes, 'tabindex' | 'disabled' | 'class' | 'maxlength' | 'placeholder'> {
	type?: 'text' | 'password' | 'search' | 'email';

	top?: Snippet;
	bottom?: Snippet;
	left?: Snippet;
	right?: Snippet;

	onfocus?: OnEventInfer<'onfocus'>;
	onchange?: OnEventInfer<'onchange'>;
	onclick?: OnEventInfer<'onclick'>;

	// Value
	value?: string;
	error?: boolean;

	multirow?: boolean;
	maxrows?: number;

	// Appearance
	rows?: number;
	size?: ComponentSize;
}
