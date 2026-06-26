import { createContext, useContext } from 'react';

export interface DragDropContext {
	draggableId: string | null;
	onDragStart: (draggableId: string) => unknown;
	onDragEnd: () => unknown;
	onDropped: (
		draggedId: string,
		droppedId: string,
		group: string | undefined,
		draggableGroup: string | undefined,
	) => unknown;
}
export const DragDropContext = createContext<DragDropContext>(null!);
export const useDragDrop = () => useContext(DragDropContext);
