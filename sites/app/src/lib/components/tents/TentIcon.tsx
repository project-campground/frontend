import {
	IconEyeOff,
	IconHash,
	IconLayoutDashboardFilled,
	IconUserFilled,
	type Icon,
	type IconProps,
} from '@tabler/icons-react';
import type { ForwardRefExoticComponent } from 'react';
import type { TentType } from 'types/campground/tent';
import type { PseudoTentType } from '~/util/pseudoTents';

type Type = TentType | PseudoTentType | 'unknown';
type Props = { type: Type; viewType: number; size?: number };

export const TentTypeToIcon: Record<
	Type,
	ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>
> = {
	bulletin: IconLayoutDashboardFilled,
	members: IconUserFilled,
	text: IconHash,
	unknown: IconEyeOff,
};

export default function TentIcon({ type, size }: Props) {
	const IconComponent = TentTypeToIcon[type];
	return <IconComponent size={size} />;
}
