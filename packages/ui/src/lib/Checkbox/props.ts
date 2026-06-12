import type { Component, SvelteComponentTyped } from 'svelte';
import type { ComponentSize } from '../types/attributes.ts';
import type { HTMLInputAttributes } from 'svelte/elements';
import type { IconsProps } from '@tabler/icons-svelte/icons/icons';
import type { IconCheck } from '@tabler/icons-svelte';

type IconComponentModern = Component<IconsProps>;
type IconComponentDeprecated = typeof IconCheck;
type IconComponent = IconComponentModern | IconComponentDeprecated | undefined | null;

export default interface TextInputProps extends Omit<HTMLInputAttributes, 'size'> {
	size?: ComponentSize;
	icon?: IconComponent;
}
