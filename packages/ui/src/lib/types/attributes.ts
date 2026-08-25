// Custom props
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ComponentSizeWithNone = 'none' | ComponentSize;
export type ComponentColorAll = ComponentColor | 'neutral';
// Colours
export type StatusColor = 'mention' | 'dnd' | 'idle' | 'notification' | 'online' | 'offline';
export type GenericColor = 'red' | 'yellow' | 'green' | 'teal' | 'blue' | 'purple' | 'grey';
export type ComponentColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
// Position
export type ComponentOrientation = 'horizontal' | 'vertical';
export type PositionVertical = 'top' | 'bottom';
export type PositionHorizontal = 'left' | 'right';
// Flex
export type FlexAlignItem = 'start' | 'stretch' | 'center' | 'end';
export type FlexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse';
export type JustifyContent = 'center' | 'start' | 'end';
// Grid
export type GridArea = number | `${number}/${number}`;
