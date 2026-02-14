import { Group, loremIpsum } from "components";
import type { TentMessageViewBasic } from "types/content";
import UserDisplay, { UserDisplaySkeleton } from "../UserDisplay";
import { Skeleton, styled, Typography } from "@mui/joy";
import type { CampsiteRoleView } from "types/campsites";
import { decimalToHexColor } from "~/util/color";

type Props = {
    message: TentMessageViewBasic;
    colorRoles?: CampsiteRoleView[];
};

const TentMessageReplyWrapper = styled(Group, {
    name: "TentMessageReply",
    slot: "root",
})(() => ({
    gap: 4,
    padding: 2,
    paddingLeft: 24,
    alignItems: "center",
}));

export default function TentMessageReply({ message, colorRoles }: Props) {
    const colorRole = colorRoles?.find((x) => message.createdBy.roles.includes(x.id));
    const displayColors = colorRole?.color && colorRole?.colorSecondary
        ? [decimalToHexColor(colorRole.color), decimalToHexColor(colorRole.colorSecondary)]
        : colorRole?.color || colorRole?.colorSecondary
        ? [decimalToHexColor(colorRole?.color || colorRole?.colorSecondary)]
        : undefined;

    return (
        <TentMessageReplyWrapper>
            <UserDisplay
                size="sm"
                user={message.createdBy.user}
                colors={displayColors}
            />
            <Typography level="body-sm" textColor="text.secondary">
                {message.content.split("\n").join(" ").substring(0, 50)}{message.content.length > 50 ? "..." : ""}
            </Typography>
        </TentMessageReplyWrapper>
    );
}

export function TentMessageReplySkeleton() {
    return (
        <TentMessageReplyWrapper>
            <UserDisplaySkeleton
                size="sm"
            />
            <Typography level="body-sm" textColor="text.secondary">
                <Skeleton>
                    {loremIpsum.sm}
                </Skeleton>
            </Typography>
        </TentMessageReplyWrapper>
    );
}