import { Box, styled } from "@mui/joy";
import { useDroppable } from "~/draggable";

const ItemBottomMoverBox = styled(Box, {
    name: "ItemBottomMoverBox",
    slot: "root",
})(({ theme }) => ({
    height: 12,
    position: "relative",
    backgroundColor: "transparent",
    "&::before": {
        content: "''",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        borderRadius: theme.vars.radius.md,
        backgroundColor: "transparent",
        transition: "background 0.3s",
    },
    "&.ItemBottomMover-over::before": {
        backgroundColor: theme.vars.palette.primary[500],
    },
}));

export default function ItemBottomMover({ disabled, group, categoryId, bottomItemId }: { disabled?: boolean; group?: "bonfire" | "tent" | "category"; categoryId: string; bottomItemId?: string | undefined; }) {
    const { attributes: droppableAttributes, isOver } = useDroppable({
        id: `b:${categoryId}`,
        disabled,
        ignoreIds: bottomItemId ? [bottomItemId] : undefined,
        group: group ?? "tent",
    });

    return (
        <ItemBottomMoverBox
            {...droppableAttributes}
            className={isOver ? "TentBottomMover-over" : ""}
        />
    )
}