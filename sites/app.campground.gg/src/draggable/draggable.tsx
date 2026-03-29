import { useMemo, useState, type DOMAttributes, type HTMLAttributes } from "react";
import { useDragDrop } from "./context";

export interface DraggableProps {
    id: string;
    disabled?: boolean;
}
export interface Draggable<T> {
    dragging: boolean;
    attributes: Pick<DOMAttributes<T> & HTMLAttributes<T>, "draggable" | "onDragStart" | "onDragEnd">;
}
export function useDraggable<T>({ id, disabled }: DraggableProps): Draggable<T> {
    if (disabled)
        return { dragging: false, attributes: {}, };
    const draggingContext = useDragDrop();

    const [dragging, setDragging] = useState(false);
    const attributes: Draggable<T>["attributes"] = useMemo(() => ({
        draggable: "true",
        onDragStart(ev) {
            setDragging(true);
            ev.dataTransfer.setData("text/plain", id);
            draggingContext.onDragStart(id);
        },
        onDragEnd() {
            setDragging(false);
            draggingContext.onDragEnd();
        },
    }), [id]);

    return {
        dragging,
        attributes,
    };
}