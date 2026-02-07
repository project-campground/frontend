import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Button, Chip, styled, Typography } from "@mui/joy";
import { IconGripVertical } from "@tabler/icons-react";
import type { CampsiteRoleView } from "types/campsites";
import { decimalToHexColor } from "~/util/color";

const RoleButton = styled(Button)(() => ({
    paddingInline: "0.5rem",
    "& > .MuiButton-startDecorator": {
        opacity: 0,
        transition: "opacity 0.3s",
    },
    "&:hover > .MuiButton-startDecorator": {
        opacity: 1,
    },
}));

export default function RoleItem({ onClick, active, id, added, name, color, colorSecondary, immovable }: { active?: boolean; onClick?: () => unknown; } & Pick<CampsiteRoleView, "id" | "name" | "color" | "colorSecondary"> & { added?: true, immovable?: boolean; }) {
    const {attributes, listeners, setNodeRef, transform} = immovable ? { transform: { x: 0, y: 0 } } : useDraggable({
        id,
    });
    const style = transform ? { transform: `translate3d(0px, ${transform.y}px, 0)` } : undefined;

    return (
        <RoleButton onClick={onClick} startDecorator={<IconGripVertical size="20px" {...listeners} />} endDecorator={added && <Chip color="neutral" variant="soft">NEW</Chip>} variant={active ? "soft" : "plain"} color="neutral" ref={setNodeRef} {...attributes} style={style} sx={{ width: "100%", justifyContent: "start" }}>
            <Typography sx={{ color: color || colorSecondary ? decimalToHexColor(color || colorSecondary) : null }}>
                {name}
            </Typography>
        </RoleButton>
    )
}
const RoleItemGapDivider = styled(`div`)(({ theme }) => ({
    width: "100%",
    height: 0,
    transitionDuration: "0.3s",
    transitionProperty: "height, opacity",
    border: `dashed 1px ${theme.vars.palette.neutral[500]}`,
    borderRadius: theme.vars.radius.md,
    opacity: 0,
    "&.over": {
        opacity: 1,
        // backgroundColor: theme.vars.palette.primary[500],
        height: 36,
    },
    "&.full-height.over": {
        height: "100%"
    }
}));
export function RoleItemGap({ id }: { id: string }) {
    const {isOver, setNodeRef} = useDroppable({
        id,
    });
    return (
        <RoleItemGapDivider ref={setNodeRef} className={`${isOver ? "over" : ""}`} />
    );
}