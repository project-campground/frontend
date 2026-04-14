import { Chip } from "@mui/joy";
import { GradientTypography } from "components";
import type { CampsitePermissionView } from "types/campground/permissions";
import type { RoleView } from "types/campground/roles";
import { colorToDecimal } from "~/util/color";
import { RoleButton } from "./campsite/RoleItem";
import { IconBadgeFilled } from "@tabler/icons-react";

type Props = { active?: boolean; onClick?: () => unknown; role: RoleView | undefined; } & Pick<CampsitePermissionView, "permissions" | "roleId" | "userId"> & { added?: true; };

export default function PermissionItem({ onClick, active, added, userId, roleId, role }: Props) {
    const badge = role && (role.flags & 1) === 1
        ? <Chip color="primary" variant="soft">Default</Chip>
        : added
        ? <Chip color="danger" variant="soft">NEW</Chip>
        : null;
    const colors = (role && colorToDecimal(role.colors)) ?? undefined;

    return (
        <RoleButton startDecorator={<IconBadgeFilled />} onClick={onClick} colors={colors} className={active ? "active" : ""} endDecorator={badge} variant={active ? "soft" : "plain"} color="neutral">
            <GradientTypography colors={colors} sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                {role?.name ?? roleId ?? userId}
            </GradientTypography>
        </RoleButton>
    )
}