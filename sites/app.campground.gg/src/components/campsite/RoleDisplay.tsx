import { styled } from "@mui/joy";
import type { CampsiteRoleView } from "types/campsites";
import { decimalToHexColor, getColorFromSet } from "~/util/color";

const RoleDisplayBadge = styled("span", {
    name: "RoleDisplay",
    slot: "root"
})<{ colors?: string[] | undefined; }>(({ colors, theme }) => ({
    display: "flex",
    // color: colors?.length ?? theme.vars.palette.text.secondary,
    WebkitTextFillColor: "transparent",
    background: colors?.length ? colors.length > 1 ? `linear-gradient(to right, ${colors.join(", ")}) text` : `${colors[0]} text` : `${theme.vars.palette.text.secondary} text`,
    // border: color ? "none" : `dashed 1px ${theme.vars.palette.neutral[400]}`,
    fontWeight: 700,
    padding: `2px 8px`,
    width: "max-content",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    position: "relative",
    "::after": {
        content: "''",
        position: "absolute",
        opacity: 0.20,
        borderRadius: theme.vars.radius.xl,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        background: colors?.length ? colors.length > 1 ? `linear-gradient(to right, ${colors.join(", ")})` : colors[0] : `transparent`,
    }
}));
const RoleDisplayCircle = styled("span", {
    name: "RoleDisplay",
    slot: "root"
})<{ colors?: string[] | undefined; }>(({ colors, theme }) => ({
    display: "block",
    width: 16,
    height: 16,
    borderRadius: "100%",
    background: colors?.length ? colors.length > 1 ? `linear-gradient(to right, ${colors.join(", ")})` : `${colors[0]}` : theme.vars.palette.neutral[400],
}));

export default function RoleDisplay(role: CampsiteRoleView) {
    const colors = getColorFromSet(role.color, role.colorSecondary);
    return (
        <RoleDisplayBadge colors={colors}>
            <RoleDisplayCircle colors={colors} />
            <span>
                {role.name}
            </span>
        </RoleDisplayBadge>
    );
}