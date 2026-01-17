import { Group, loremIpsum } from "components";
import type { TentMessageViewBasic } from "types/content";
import UserDisplay, { UserDisplaySkeleton } from "../UserDisplay";
import { Skeleton, styled, Typography } from "@mui/joy";

type Props = {
    message: TentMessageViewBasic;
};

const TentMessageReplyWrapper = styled(Group, {
    name: "TentMessageReply",
    slot: "root",
})(() => ({
    gap: 4,
    padding: 2,
    paddingLeft: 24,
    alignItems: "center",
    // ".ThreadLineItem-wrapper:last-child &": {
    //     paddingBottom: 2,
    // }
}));

export default function TentMessageReply({ message }: Props) {
    return (
        <TentMessageReplyWrapper>
            <UserDisplay
                size="sm"
                user={message.createdBy}
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