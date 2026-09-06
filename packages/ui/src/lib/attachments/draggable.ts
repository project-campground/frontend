import type { DragAndDropContext } from '$lib/contexts/draggable.js';
import type { Attachment } from 'svelte/attachments';

export interface DraggableProps {
	id: string;
	groups: string[];
}

export function draggable<T extends HTMLElement>({ id, groups }: DraggableProps): Attachment<T> {
	return (element: T) => {
		element.setAttribute('draggable', 'true');

		const onDragStart = (ev: DragEvent) => {
			ev.dataTransfer?.setData('text/plain', `${id}\n${groups.join(';')}`);
			element.setAttribute('data-draggable-dragging', 'true');
		};
		const onDragEnd = () => element.setAttribute('data-draggable-dragging', 'false');

		element.addEventListener('dragstart', onDragStart);
		element.addEventListener('dragend', onDragEnd);

		return () => {
			element.removeEventListener('dragstart', onDragStart);
			element.removeEventListener('dragend', onDragEnd);
		};
	};
}

export interface DroppableProps {
	id: string;
	disallowIds?: string[];
	acceptGroups?: string[];
	onDrop: (draggedId: string, droppedOnId: string, groups: string[]) => unknown;
}
function getDraggableData(dataTransfer?: DataTransfer | null): [id: string, groups: string[]] {
	const [id, groupsWithDelimiters] = dataTransfer?.getData('text/plain').split('\n') ?? [];
	const groups = groupsWithDelimiters?.split(';') ?? [];

	return [id ?? 'null', groups];
}
export function droppable<T extends HTMLElement>({
	id,
	disallowIds,
	acceptGroups,
	onDrop,
}: DroppableProps): Attachment<T> {
	return (element: T) => {
		let enterTimes = 0;

		const onDragEnter = (ev: DragEvent) => {
			console.log('Drag enter', id);
			const [draggableId, groups] = getDraggableData(ev.dataTransfer);

			enterTimes++;
			if (
				disallowIds?.includes(draggableId!)
				|| (acceptGroups && !groups.some((x) => acceptGroups.includes(x)))
			)
				return;

			element.setAttribute('data-droppable-over', draggableId);
		};
		const onDragLeave = (ev: DragEvent) => {
			enterTimes--;
			console.log('Drag leave', id, ev);
			if (!enterTimes) element.removeAttribute('data-droppable-over');
		};
		const onDragOver = (ev: DragEvent) => {
			console.log('Drag over', id);
			ev.preventDefault();
		};
		const onDropEvent = (ev: DragEvent) => {
			console.log('Drag drop', id);

			ev.preventDefault();
			enterTimes = 0;
			element.removeAttribute('data-droppable-over');

			const [draggedId, groups] = getDraggableData(ev.dataTransfer);

			if (
				disallowIds?.includes(draggedId!)
				|| (acceptGroups && !groups.some((x) => acceptGroups.includes(x)))
			)
				return;

			onDrop(draggedId, id, groups);
		};
		element.addEventListener('dragenter', onDragEnter);
		element.addEventListener('dragleave', onDragLeave);
		element.addEventListener('dragover', onDragOver);
		element.addEventListener('drop', onDropEvent);

		return () => {
			element.removeEventListener('dragenter', onDragEnter);
			element.removeEventListener('dragleave', onDragLeave);
			element.removeEventListener('dragover', onDragOver);
			element.removeEventListener('drop', onDropEvent);
		};
	};
}
