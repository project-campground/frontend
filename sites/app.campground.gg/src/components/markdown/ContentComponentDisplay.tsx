import { Typography } from "@mui/joy";
import { IconHash, IconQuestionMark, type Icon, type IconProps } from "@tabler/icons-react";
import { Group } from "components";
import type { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
import type { CampsiteMemberViewAuthor, CampsiteRoleView } from "types/campsites";
import type { ContentComponent, ContentComponentType, SystemMessageComponent, SystemMessageType } from "types/content";
import { UserDisplayNoModal } from "../UserDisplay";
import type React from "react";
import { getColorFromSet } from "~/util/color";

type Props = {
    component: ContentComponent;
    createdBy: CampsiteMemberViewAuthor;
    colorRoles?: CampsiteRoleView[];
    onUserClick?: (event: React.MouseEvent<HTMLDivElement>, user: CampsiteMemberViewAuthor) => unknown;
};

const ContentComponentDisplayComponent: Record<ContentComponentType, (props: Props) => ReactNode[] | ReactNode> = {
    "system": SystemMessageComponentDisplay,
};

export function ContentComponentDisplay(props: Props) {
    const Component = ContentComponentDisplayComponent[props.component.type] ?? "div";

    return (
        <Component {...props} />
    );
}
const SystemMessageComponentDisplayComponent: Record<SystemMessageType, (props: Props) => ReactNode[] | ReactNode> = {
    "tentCreated": ({ onUserClick, createdBy, colorRoles }) => {
        const authorColorRole = colorRoles?.find((x) => createdBy.roles.includes(x.id));
        return (
            <>
                <UserDisplayNoModal
                    noAvatar
                    onClick={(ev) => onUserClick?.(ev, createdBy)}
                    user={createdBy.user}
                    member={createdBy}
                    colors={getColorFromSet(authorColorRole?.color, authorColorRole?.colorSecondary)}
                />
                {"created this tent."}
            </>
        )
    },
};
const SystemMessageComponentIcon: Record<SystemMessageType, ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>> = {
    "tentCreated": IconHash,
};
function SystemMessageComponentDisplay(props: Props) {
    const systemMessageType = (props.component as SystemMessageComponent).message;
    const IconComponent = SystemMessageComponentIcon[systemMessageType] ?? IconQuestionMark;
    const Component = SystemMessageComponentDisplayComponent[systemMessageType] ?? "div";

    return (
        <Group gap={5} alignItems="center">
            <Typography textColor="text.tertiary" sx={{ lineHeight: 0, display: { xs: "none", md: "block" } }}>
                <IconComponent />
            </Typography>
            <Typography textColor="text.secondary" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1.125, flexWrap: "wrap" }}>
                <Component {...props} />
            </Typography>
        </Group>
    );
}