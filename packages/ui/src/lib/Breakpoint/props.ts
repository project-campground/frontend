import type { Snippet } from "svelte";
import type { ClassValue } from "svelte/elements";

type HasOnly = '-only';
type HasSelf = '';
type HasAboveAndDown = '-up' | '-down' | HasOnly;

export default interface BreakpointProps {
	value:
		| `mobile${HasOnly}`
		| `tablet${HasAboveAndDown}`
		| `desktop-sm${HasAboveAndDown}`
		| `desktop-md${HasAboveAndDown}`
		| `desktop-lg${HasSelf}`;
    class: ClassValue;
    children: Snippet;
}
