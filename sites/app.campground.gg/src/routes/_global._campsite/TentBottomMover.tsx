import { Box, styled } from "@mui/joy";
import { GeneralPermissionConsts } from "~/util/permissions";
import { useCampsiteContext } from "./context";
import { useDroppable } from "~/draggable";

const TentBottomMoverBox = styled(Box, {
    name: "TentBottomMoverBox",
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
    "&.TentBottomMover-over::before": {
        backgroundColor: theme.vars.palette.primary[500],
    },
}));

export default function TentBottomMover({ group, categoryId, bottomTentId }: { group?: "tent" | "category"; categoryId: string; bottomTentId?: string | undefined; }) {
    const { permissions } = useCampsiteContext();
    const { attributes: droppableAttributes, isOver } = useDroppable({
        id: `b:${categoryId}`,
        disabled: (permissions.bonfire.general & GeneralPermissionConsts.MANAGE_TENTS) !== GeneralPermissionConsts.MANAGE_TENTS,
        ignoreIds: bottomTentId ? [`t:${bottomTentId}`] : undefined,
        group: group ?? "tent",
    });

    return (
        <TentBottomMoverBox
            {...droppableAttributes}
            className={isOver ? "TentBottomMover-over" : ""}
        />
    )
}