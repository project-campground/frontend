import type { InFlexLayout } from '#lib/hierarchy/layout.js';
import type { Snippet } from 'svelte';
import type { ClassValue } from 'svelte/elements';

export interface RootProps extends InFlexLayout {
	status?: number;
	icon: PagePlaceholderIcon;
	title: Snippet;
	class?: ClassValue;
	fullHeight?: boolean;
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
