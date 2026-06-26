import type { Component } from 'svelte';
import type { ComponentSize } from '../types/attributes.ts';
import type { HTMLButtonAttributes } from 'svelte/elements';
import type { IconsProps } from '@tabler/icons-svelte/icons/icons';
import type { IconCheck } from '@tabler/icons-svelte';

type IconComponentModern = Component<IconsProps>;
type IconComponentDeprecated = typeof IconCheck;
type IconComponent = IconComponentModern | IconComponentDeprecated | undefined | null;

export default interface SwitchProps extends Omit<HTMLButtonAttributes, 'size' | 'value'> {
	value?: boolean;
	size?: ComponentSize;
	checkedIcon?: IconComponent;
	uncheckedIcon?: IconComponent;
	inputDisabled?: boolean;
}
