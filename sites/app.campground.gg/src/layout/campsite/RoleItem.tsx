import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Box, Button, Chip, styled } from "@mui/joy";
import { IconGripVertical } from "@tabler/icons-react";
import { GradientTypography } from "components";
import type { CampsiteRoleView } from "types/campsites";
import { getColorFromSet } from "~/util/color";

const RoleButton = styled(Button, {
    name: "RoleItem",
    slot: "root",
})<{ colors?: string[]; }>(({ theme, colors, }) => ({
    position: "relative",
    paddingInline: "0.5rem",
    width: "100%",
    justifyContent: "start",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    border: "solid 1px transparent",
    transitionProperty: "background, border, color, box-shadow",
    "&.active": {
        border: `solid 1px ${theme.vars.palette.neutral.border}`,
        boxShadow: theme.vars.shadow.sm,
    },
    "& > .MuiButton-startDecorator": {
        opacity: 0,
        transition: "opacity 0.3s",
    },
    "&:hover > .MuiButton-startDecorator": {
        opacity: 1,
    },
    "::after": {
        content: "''",
        position: "absolute",
        borderRadius: theme.vars.radius.sm,
        transition: "opacity 0.3s",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        opacity: 0,
        background: colors?.length ? colors.length > 1 ? `linear-gradient(to right, ${colors.join(", ")})` : colors[0] : `transparent`,
    },
    "&.active::after": {
        opacity: 0.10,
    }
}));

export default function RoleItem({ onClick, active, id, added, flags, name, color, colorSecondary, immovable }: { active?: boolean; onClick?: () => unknown; } & Pick<CampsiteRoleView, "id" | "name" | "color" | "colorSecondary" | "flags"> & { added?: true, immovable?: boolean; }) {
    const {attributes, listeners, setNodeRef, transform} = immovable ? { transform: { x: 0, y: 0 } } : useDraggable({
        id,
    });
    const style = transform ? { transform: `translate3d(0px, ${transform.y}px, 0)` } : undefined;
    const badge = (flags & 1) === 1
        ? <Chip color="primary" variant="soft">Default</Chip>
        : added
        ? <Chip color="danger" variant="soft">NEW</Chip>
        : null;
    const colors = getColorFromSet(color, colorSecondary);

    return (
        <RoleButton onClick={onClick} colors={colors} className={active ? "active" : ""} startDecorator={immovable ? <Box sx={{ width: 20, }}></Box> : <IconGripVertical size="20px" {...listeners} />} endDecorator={badge} variant={active ? "soft" : "plain"} color="neutral" ref={setNodeRef} {...attributes} style={style}>
            <GradientTypography colors={colors} sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                {name}
            </GradientTypography>
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