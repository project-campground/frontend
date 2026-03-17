import { useMemo, useState, type DOMAttributes, type HTMLAttributes } from "react";
import { useDragDrop } from "./context";

export interface DroppableProps {
    id: string;
    ignoreIds?: string[];
}
export interface Droppable<T> {
    isOver: boolean;
    draggableOver: string | null;
    attributes: DOMAttributes<T> & HTMLAttributes<T>;
}
export function useDroppable<T>({ id }: DroppableProps): Droppable<T> {
    const draggingContext = useDragDrop();
    const [over, setOver] = useState<string | null>(null);
    const attributes: Droppable<T>["attributes"] = useMemo(() => ({
        onDragEnter(ev) {
            const draggableId = ev.dataTransfer.getData("text/plain");
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
            const draggableId = ev.dataTransfer.getData("text/plain");
            return draggingContext.onDropped(draggableId, id);
        },
    }), [id]);
    return {
        isOver: over !== null,
        draggableOver: over,
        attributes,
    };
}