import type { Snippet } from 'svelte';
import type { ClassValue } from 'svelte/elements';

export default interface PagePlaceholderProps {
	status?: number;
	icon: PagePlaceholderIcon;
	title: Snippet;
	class?: ClassValue;
	children: Snippet;
}
export enum PagePlaceholderIcon {
	Welcome = '(￣▽￣)ノ',
	Error = '(✖╭╮✖)',
	NotFound = '┐(￣ ヘ￣)┌',
	NoMore = '(づ ◕‿◕ )づ',
	Empty = 'd(￣◇￣)b',
	WIP = '（◞‸◟）',
	NotOk = '(╥﹏╥)',
	Unrecognized = '(>⌓<｡)',
	Appreciation = '(ɔˆ ³(ˆ⌣ˆc)',
	Ok = '(｡^‿^｡)',
}
