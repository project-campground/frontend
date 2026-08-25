import type {
	FlexAlignItem,
	FlexDirection,
	GridArea,
	JustifyContent,
} from '$lib/types/attributes.js';

export interface InGridLayout {
	gridColumn?: GridArea;
	gridRow?: GridArea;
}
export interface InFlexLayout {
	flex?: number;
}
export interface StackableProps {
	align?: FlexAlignItem;
	direction?: FlexDirection;
	directionMobile?: FlexDirection;
	justify?: JustifyContent;
	wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
}

export function stackableProps<T extends StackableProps>({
	align,
	direction,
	directionMobile,
	justify,
	wrap,
	...props
}: T) {
	return {
		'data-align': align,
		'data-direction': direction,
		'data-direction-mobile': directionMobile,
		'data-justify': justify,
		'data-wrap': wrap,
		...props,
	};
}
