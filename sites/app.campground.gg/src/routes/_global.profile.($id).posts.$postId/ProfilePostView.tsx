import { Box, Stack, CircularProgress } from "@mui/joy";
import { useEffect, useState } from "react";
import type {
    ProfilePostViewDetailed,
} from "types/campground/user";
import ProfilePost from "../_global.profile.$id/ProfilePost";
import PagePlaceholder, {
    PagePlaceholderFromApi,
    PagePlaceholderIcon,
} from "~/components/pages/PagePlaceholder";
import { useSession } from "~/context/session";
import { useAccount } from "~/context/account";
import { ThreadLineWrapper } from "../../components/ThreadLine";
import { useBackendApi } from "~/context/api";
import type { HttpResponseError } from "~/api/http/HTTPResponse";
import { useSnackbars } from "~/context/snackbar";
import { useNavigate } from "react-router";
import ProfilePostViewReplies from "./ProfilePostViewReplies";
import ProfilePostViewParent from "./ProfilePostViewParent";

type Props = {
    profileId: string;
    postId: string;
};

export default function ProfilePostView({
    profileId,
    postId,
}: Props) {
    const session = useSession();
    const floating = useSnackbars();
    const account = useAccount<true>();
    const navigate = useNavigate();
    const api = useBackendApi();

    const [post, setPost] = useState<ProfilePostViewDetailed | null>(null);
    const [error, setError] = useState<HttpResponseError | null>(null);

    useEffect(() => {
        api
            .profilePosts
            .get(profileId, postId)
            .then((resp) => {
                if (!resp.ok)
                    return setError(resp);
                return setPost(resp.content);
            })
    }, [profileId, postId]);

    if (error)
        return (
            <PagePlaceholderFromApi response={error} />
        );

    const onPostDeleted = (uri: string) =>
        session.atproto.profilePostRecords
            .delete(uri)
            .then((resp) => {
                if (!resp.ok)
                    return floating.notifyApiError(resp);

                return navigate(`/profile/${account.sessionInfo.did}`);
            });
    const onPostUpdated = (uri: string, content: string) =>
        session.atproto.profilePostRecords
            .update(uri, { content })
            .then((resp) => {
                if (!resp.ok)
                    return floating.notifyApiError(resp);

                return setPost({ ...post!, content });
            });

    if (!post)
        return <CircularProgress />;

    return (
        <Box sx={{ overflowY: "auto", flex: 1, width: "100%" }}>
            <Stack
                className="ProfileLayout container"
                sx={(theme) => ({
                    pt: { md: 0, lg: 4 },
                    minHeight: "100%",
                    pb: 16,
                    backgroundColor: theme.vars.palette.background.level1,
                })}
            >
                <Stack
                    direction="row"
                    sx={{
                        flex: 1,
                        display: "grid",
                        gridTemplateColumns: {
                            md: "0 11fr 0",
                            lg: "2fr 7fr 2fr",
                        },
                        gap: 6,
                        px: { sm: 2, md: 8, lg: 35 },
                        pt: 2,
                    }}
                >
                    <Box></Box>
                    <Stack
                        gap={2}
                        sx={{ px: 2, width: "100%", overflow: "hidden" }}
                    >
                        {/* <Link href={`/profile/${post.author.did}`}>
                            <Typography level="body-md" fontWeight={900} startDecorator={<IconArrowNarrowLeft />}>View user profile</Typography>
                        </Link> */}
                        {post.parentUri && <ProfilePostViewParent post={post.parent} />}
                        <ThreadLineWrapper>
                            <ProfilePost
                                bigger
                                post={post!}
                                onPostDelete={onPostDeleted}
                                onPostUpdate={onPostUpdated}
                            />
                            <ProfilePostViewReplies
                                post={post}
                                topReplies={post.replies}
                            />
                        </ThreadLineWrapper>
                        <PagePlaceholder
                            sx={{ mt: 8 }}
                            icon={PagePlaceholderIcon.NoMore}
                            title="No more comments"
                        >
                            Come back later to see new comments!
                        </PagePlaceholder>
                    </Stack>
                    <Box></Box>
                </Stack>
            </Stack>
        </Box>
        // <ProfileLayout user={post.author}>
        // </ProfileLayout>
    );
}
