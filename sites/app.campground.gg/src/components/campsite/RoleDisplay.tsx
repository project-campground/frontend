import { styled, type ButtonProps, type Radius } from "@mui/joy";
import { IconX, type ReactNode } from "@tabler/icons-react";
import type { CampsiteRoleView } from "types/campsites";
import { getColorFromSet } from "~/util/color";

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
    overflow: "hidden",
    position: "relative",
    borderRadius: theme.vars.radius.lg,
    "::after": {
        content: "''",
        position: "absolute",
        opacity: 0.20,
        top: 0,
        left: 0,
        border: `solid 1px transparent`,
        right: 0,
        bottom: 0,
        zIndex: 0,
        background: colors?.length ? colors.length > 1 ? `linear-gradient(to right, ${colors.join(", ")})` : colors[0] : `transparent`,
    },
    "&.uncolored::after": {
        opacity: 1,
        border: colors?.length ? `solid 1px transparent` : `dashed 1px ${theme.vars.palette.neutral[400]}`,
    },
}));
const RoleDisplayCircle = styled("div", {
    name: "RoleDisplay",
    slot: "circle"
})<{ colors?: string[] | undefined; }>(({ colors, theme }) => ({
    display: "block",
    width: 16,
    height: 16,
    minWidth: 16,
    borderRadius: "100%",
    background: colors?.length ? colors.length > 1 ? `linear-gradient(to right, ${colors.join(", ")})` : `${colors[0]}` : theme.vars.palette.neutral[400],
}));
const RoleDisplayDecorator = styled("span", {
    name: "RoleDisplay",
    slot: "remove"
})(() => ({
    zIndex: 4,
    lineHeight: 0,
    cursor: "pointer",
    padding: 2,
}));
const RoleDisplayName = styled("span", {
    name: "RoleDisplay",
    slot: "name",
})(() => ({
    width: "max-content",
}));

type Props = {
    role: CampsiteRoleView;
    radius?: keyof Radius;
    size?: ButtonProps["size"];
    startDecorator?: ReactNode[] | ReactNode;
    endDecorator?: ReactNode[] | ReactNode;
    onClick?: (role: CampsiteRoleView) => unknown;
    onRemove?: (role: CampsiteRoleView) => unknown;
};
const sizeToPadding = {
    "sm": "0px 6px",
    "md": "2px 8px",
};

export default function RoleDisplay({ radius, role, size, startDecorator, endDecorator, onClick, onRemove }: Props) {
    const colors = getColorFromSet(role.color, role.colorSecondary);
    const padding = sizeToPadding[size as "md" ?? "md"];
    return (
        <RoleDisplayBadge className={colors?.length ? "colored" : "uncolored"} colors={colors} onClick={onClick ? () => onClick(role) : undefined} sx={{ p: padding, borderRadius: radius, cursor: onClick ? "pointer" : undefined }}>
            {startDecorator || <RoleDisplayCircle colors={colors} />}
            <RoleDisplayName>
                {role.name}
            </RoleDisplayName>
            {endDecorator && <RoleDisplayDecorator>
                {endDecorator}
            </RoleDisplayDecorator>}
            {onRemove && !(role.flags & 1) && <RoleDisplayDecorator onClick={() => onRemove(role)}>
                <IconX size={16} />
            </RoleDisplayDecorator>}
        </RoleDisplayBadge>
    );
}