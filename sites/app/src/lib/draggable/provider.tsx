import type React from 'react';
import { DragDropContext } from './context';
import { useState } from 'react';

export default function DragDropProvider({
	children,
	...dragContext
}: Pick<DragDropContext, 'onDropped'> & React.PropsWithChildren) {
	const [draggable, setDraggable] = useState<string | null>(null);
	const onDragStart = (draggableId: string) => setDraggable(draggableId);
	const onDragEnd = () => setDraggable(null);

	return (
		<DragDropContext.Provider
			value={{ draggableId: draggable, onDragStart, onDragEnd, ...dragContext }}
		>
			{children}
		</DragDropContext.Provider>
	);
}
