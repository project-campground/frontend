import { useMemo, useState, type DOMAttributes, type HTMLAttributes } from 'react';
import { useDragDrop } from './context';

export interface DroppableProps {
	id: string;
	disabled?: boolean;
	group?: string;
	allowAnyGroup?: boolean;
	ignoreIds?: string[];
}
export interface Droppable<T> {
	isOver: boolean;
	draggableOver: string | null;
	attributes: Pick<
		DOMAttributes<T> & HTMLAttributes<T>,
		'onDragEnter' | 'onDragLeave' | 'onDragOver' | 'onDrop'
	>;
}
export function useDroppable<T>({
	id,
	disabled,
	ignoreIds,
	allowAnyGroup,
	group,
}: DroppableProps): Droppable<T> {
	if (disabled) return { isOver: false, draggableOver: null, attributes: {} };

	const draggingContext = useDragDrop();
	const [over, setOver] = useState<string | null>(null);
	const attributes: Droppable<T>['attributes'] = useMemo(
		() => ({
			onDragEnter(ev) {
				const [draggableId, draggableGroup] = ev.dataTransfer.getData('text/plain').split('\n');
				if (ignoreIds?.includes(draggableId) || (group && draggableGroup !== group)) return;
				setOver(draggableId);
			},
			onDragLeave() {
				setOver(null);
			},
			onDragOver(ev) {
				ev.preventDefault();
			},
			onDrop(ev) {
				ev.preventDefault();
				setOver(null);

				const [draggableId, draggableGroup] = ev.dataTransfer.getData('text/plain').split('\n');
				if (ignoreIds?.includes(draggableId) || (!allowAnyGroup && group && draggableGroup !== group))
					return;

				return draggingContext.onDropped(draggableId, id, group, draggableGroup);
			},
		}),
		[id],
	);
	return { isOver: over !== null, draggableOver: over, attributes };
}
