import {
    Card,
    CardContent,
    CardOverflow,
    Divider,
    ListItemContent,
    ListItemDecorator,
    MenuItem,
    Skeleton,
    Stack,
    styled,
    Typography,
} from "@mui/joy";
import { useState } from "react";
import UserDisplay, { UserDisplaySkeleton } from "~/components/UserDisplay";
import { IconMessage, IconPencil, IconTrashFilled } from "@tabler/icons-react";
import Datestamp from "~/components/Datestamp";
import type {
    EitherProfilePostView,
    ProfilePostView,
} from "types/campground/user";
import Link from "~/components/Link";
import MarkdownWrapper from "~/components/markdown/MarkdownWrapper";
import { LargeContentMarkdown } from "~/components/markdown/Markdown";
import { keyframes } from "@emotion/react";
import ContentOverflow from "~/components/content/ContentOverflow";
import BasicPostEditor from "~/components/editor/BasicPostEditor";
import { Group, loremIpsum } from "campground-ui";
import { useSession } from "~/context/session";

type Props = {
    appear?: boolean;
    post: ProfilePostView;
    showComments?: boolean;
    bigger?: boolean;
    opacity?: number;
    mb?: number;
    mt?: number;
    onPostDelete?: (uri: string) => void | Promise<any>;
    onPostUpdate?: (uri: string, content: string) => void | Promise<any>;
};

export const appearAnimation = keyframes`
    0% {
        opacity: 0%;
        transform: translateY(-20px);
    }
    100% {
        opacity: 100%;
        transform: translateY(0px);
    }
`;

export const ProfilePostCard = styled(Card, {
    name: "ProfilePost",
    slot: "root",
})(({ theme }) => ({
    zIndex: 2,
    border: `solid 1px ${theme.vars.palette.neutral.border}`,
    backgroundColor: theme.vars.palette.background.level2,
}));

export default function ProfilePost({
    post,
    showComments: showCommentsLink,
    bigger,
    appear,
    onPostDelete,
    onPostUpdate,
    opacity,
    mb,
    mt,
}: Props) {
    const session = useSession();
    const { uri, content, createdAt, replies, replyCount, author } =
        post as EitherProfilePostView;
    const postTid = uri.split("/")[4];
    const [editing, setEditing] = useState(false);
    const createdAtDate = new Date(createdAt);
    const isOwnPost =
        session.auth.authenticated && session.auth.user.did === post.author.did;

    return (
        <ProfilePostCard
            orientation="horizontal"
            size={bigger ? "lg" : "md"}
            variant="soft"
            sx={{
                mb,
                mt,
                opacity,
                boxShadow: bigger ? "md" : "sm",
                animation: `${appearAnimation} ${appear ? 0.75 : 0}s`,
                py: 2,
            }}
        >
            <CardOverflow sx={{ alignItems: "start", pt: bigger ? 3 : 2, pl: bigger ? 3 : 2 }}>
                <UserDisplay
                    noUsernameDisplay
                    withStatus
                    noHoverBackground
                    user={author}
                    size={bigger ? "lg" : "md"}
                    avatarSize={bigger ? "xl" : "lg"}
                    align="top"
                />
            </CardOverflow>
            {isOwnPost && (onPostDelete || onPostUpdate) && (
                <ContentOverflow>
                    {onPostUpdate && (
                        <MenuItem onClick={() => setEditing(!editing)}>
                            <ListItemDecorator>
                                <IconPencil />
                            </ListItemDecorator>
                            <ListItemContent>Edit post</ListItemContent>
                        </MenuItem>
                    )}
                    {onPostDelete && (
                        <MenuItem
                            color="danger"
                            onClick={() => onPostDelete(uri)}
                        >
                            <ListItemDecorator>
                                <IconTrashFilled />
                            </ListItemDecorator>
                            <ListItemContent>Delete post</ListItemContent>
                        </MenuItem>
                    )}
                </ContentOverflow>
            )}
            <CardContent>
                <ProfilePostHeader author={post.author} createdAt={new Date(post.createdAt)} bigger={bigger ?? false} />
                <Stack gap={1}>
                    {editing ? (
                        <BasicPostEditor
                            placeholder="New post text"
                            content={content}
                            onConfirm={(newContent) => (
                                onPostUpdate!(uri, newContent),
                                setEditing(false)
                            )}
                            onCancel={() => setEditing(false)}
                            confirmButton="Edit"
                        />
                    ) : (
                        <MarkdownWrapper
                            sx={(theme) => ({
                                color: theme.vars.palette.text.secondary,
                            })}
                        >
                            <LargeContentMarkdown>
                                {content}
                            </LargeContentMarkdown>
                        </MarkdownWrapper>
                    )}
                    {bigger && (
                        <Stack gap={1} sx={{ mt: 1 }}>
                            <Divider />
                            <Group>
                                <Datestamp date={createdAtDate} />
                            </Group>
                            <Divider />
                        </Stack>
                    )}
                    <Group gap={1} alignItems="center">
                        <Stack direction="row" gap={1.5} flex={1}>
                            {showCommentsLink && (
                                <Link
                                    href={`/profile/${author.did}/posts/${postTid}`}
                                    color="neutral"
                                    startDecorator={<IconMessage />}
                                >
                                    {replyCount ?? replies.length}{" "}
                                </Link>
                            )}
                        </Stack>
                    </Group>
                </Stack>
            </CardContent>
        </ProfilePostCard>
    );
}

export function ProfilePostSkeleton({ mt, mb }: Pick<Props, "mt" | "mb">) {
    return (
        <ProfilePostCard
            size="md"
            variant="soft"
            sx={{ boxShadow: "sm", zIndex: 2, mt, mb }}
        >
            <CardOverflow sx={{ alignItems: "start", pt: 2 }}>
                <ProfilePostHeaderSkeleton />
            </CardOverflow>
            <CardContent sx={{ ml: 7.5 }}>
                <Stack gap={1}>
                    <MarkdownWrapper
                        sx={(theme) => ({
                            mt: -5,
                            color: theme.vars.palette.text.secondary,
                        })}
                    >
                        <Typography>
                            <Skeleton loading>{loremIpsum.xl}</Skeleton>
                        </Typography>
                    </MarkdownWrapper>
                    <Group gap={1} alignItems="center">
                        <Stack direction="row" gap={1.5} flex={1}>
                            <Typography>
                                <Skeleton loading>... 0 comments</Skeleton>
                            </Typography>
                        </Stack>
                    </Group>
                </Stack>
            </CardContent>
        </ProfilePostCard>
    );
}

function ProfilePostHeaderSkeleton() {
    return (
        <Stack gap={1} direction="row" flex={1}>
            <UserDisplaySkeleton
                withStatus
                showHandle
                size={"md"}
                avatarSize={"lg"}
                alignItems="start"
            />
            <Typography level="body-md" textColor="neutral.500">
                •
            </Typography>
            <Typography>
                <Skeleton loading>31d ago</Skeleton>
            </Typography>
        </Stack>
    );
}

function ProfilePostHeader({
    bigger,
    author,
    createdAt,
}: {
    bigger: boolean;
    author: ProfilePostView["author"];
    createdAt: Date;
}) {
    return (
        <Stack gap={1} direction="row" flex={1}>
            <UserDisplay
                withStatus
                showHandle
                noAvatar
                noHoverBackground
                user={author}
                size={bigger ? "lg" : "md"}
                avatarSize={bigger ? "xl" : "lg"}
                align="top"
            />
            {!bigger && (
                <Typography level="body-md" textColor="neutral.500">
                    •
                </Typography>
            )}
            {!bigger && <Datestamp date={createdAt} />}
        </Stack>
    );
}
