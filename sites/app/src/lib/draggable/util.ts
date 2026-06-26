import { useMemo } from 'react';
import { useDragDrop } from './context';

export function useDragging() {
	const dragContext = useDragDrop();
	return useMemo(() => dragContext.draggableId !== null, [dragContext.draggableId]);
}
