import { Box, Stack, CircularProgress, styled } from "@mui/joy";
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

const ProfilePostViewRoot = styled(Box)(({ theme }) => ({
    overflowY: "auto",
    scrollSnapAlign: "start",
    flex: 1,
    width: "100%",
    backgroundColor: theme.vars.palette.background.level1,
    minHeight: "100%",
    paddingBottom: theme.spacing(16),
    paddingTop: theme.spacing(4),
    [theme.breakpoints.up("lg")]: {
        paddingLeft: theme.spacing(64),
        paddingRight: theme.spacing(64),
        gridColumn: "1 / 4"
    }
}));
const ProfilePostViewSidebar = styled(Box)(({ theme }) => ({
    overflowY: "auto",
    scrollSnapAlign: "start",
    flex: 1,
    width: "100%",
    backgroundColor: theme.vars.palette.background.level1,
    [theme.breakpoints.up("lg")]: {
        gridColumn: "1 / 4",
        display: "none",
    }
}));

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
        <>
            <ProfilePostViewSidebar />
            <ProfilePostViewRoot>
                <Stack
                    gap={2}
                    sx={{ px: 2, width: "100%", overflow: "hidden" }}
                >
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
            </ProfilePostViewRoot>
            <ProfilePostViewSidebar />
        </>
    );
}
