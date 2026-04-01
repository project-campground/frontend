import { Typography } from "@mui/joy";
import { IconHash, IconQuestionMark, IconSignature, type Icon, type IconProps } from "@tabler/icons-react";
import { TextBlock } from "components";
import type { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
import type { CampsiteMemberViewAuthor, CampsiteRoleView } from "types/campsites";
import type { ContentComponent, ContentComponentType, SystemMessageComponent, SystemMessageComponentTentNameUpdated, SystemMessageType } from "types/content";
import { UserDisplayNoModal } from "../UserDisplay";
import type React from "react";
import { colorToDecimal } from "~/util/color";

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
                <TextBlock>
                    <UserDisplayNoModal
                        noAvatar
                        onClick={(ev) => onUserClick?.(ev, createdBy)}
                        user={createdBy.user}
                        member={createdBy}
                        motion={authorColorRole?.motion}
                        colors={colorToDecimal(authorColorRole?.colors)}
                    />
                </TextBlock>
                {" created this tent."}
            </>
        )
    },
    "tentNameUpdated": ({ component, onUserClick, createdBy, colorRoles }) => {
        const systemComponent = component as SystemMessageComponentTentNameUpdated;
        const authorColorRole = colorRoles?.find((x) => createdBy.roles.includes(x.id));
        return (
            <>
                <TextBlock>
                    <UserDisplayNoModal
                        noAvatar
                        onClick={(ev) => onUserClick?.(ev, createdBy)}
                        user={createdBy.user}
                        member={createdBy}
                        motion={authorColorRole?.motion}
                        colors={colorToDecimal(authorColorRole?.colors)}
                    />
                </TextBlock>
                {" updated the name of this tent from "}
                <TextBlock>
                    <Typography level="title-md" fontWeight={700}>{systemComponent.previousName}</Typography>
                </TextBlock>
                {" to "}
                <TextBlock>
                    <Typography level="title-md" fontWeight={700}>{systemComponent.newName}</Typography>
                </TextBlock>
            </>
        )
    },
};
const SystemMessageComponentIcon: Record<SystemMessageType, ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>> = {
    "tentCreated": IconHash,
    "tentNameUpdated": IconSignature,
};
function SystemMessageComponentDisplay(props: Props) {
    const systemMessageType = (props.component as SystemMessageComponent).message;
    const IconComponent = SystemMessageComponentIcon[systemMessageType] ?? IconQuestionMark;
    const Component = SystemMessageComponentDisplayComponent[systemMessageType] ?? "div";

    return (
        <TextBlock>
            <TextBlock hideOnMobile>
                <Typography level="body-md" textColor="text.tertiary" mr={1}>
                    <IconComponent />
                </Typography>
            </TextBlock>
            {" "}
            <TextBlock>
                <Component {...props} />
            </TextBlock>
        </TextBlock>
    );
}