import { styled } from "@mui/joy";
import type { CampsiteRoleView } from "types/campsites";
import { decimalToHexColor } from "~/util/color";

const RoleDisplayBadge = styled("span", {
    name: "RoleDisplay",
    slot: "root"
})<{ color?: string; }>(({ color, theme }) => ({
    display: "flex",
    backgroundColor: color ? `${color}33` : "transparent",
    color: color ?? theme.vars.palette.text.secondary,
    border: color ? "none" : `dashed 1px ${theme.vars.palette.neutral[400]}`,
    fontWeight: 700,
    padding: `2px 8px`,
    borderRadius: theme.vars.radius.xl,
    width: "max-content",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
}));
const RoleDisplayCircle = styled("span", {
    name: "RoleDisplay",
    slot: "root"
})<{ color?: string; }>(({ color, theme }) => ({
    display: "block",
    width: 16,
    height: 16,
    borderRadius: "100%",
    backgroundColor: color ?? theme.vars.palette.neutral[400],
}));

export default function RoleDisplay(role: CampsiteRoleView) {
    const color = role.color || role.colorSecondary ? decimalToHexColor(role.color || role.colorSecondary) : undefined;
    return (
        <RoleDisplayBadge color={color}>
            <RoleDisplayCircle color={color} />
            <span>
                {role.name}
            </span>
        </RoleDisplayBadge>
    );
}