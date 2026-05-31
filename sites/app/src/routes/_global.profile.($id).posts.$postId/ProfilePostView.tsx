import { Box, CircularProgress, styled } from "@mui/joy";
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
import { ThreadLineWrapper } from "../../lib/components/ThreadLine";
import { useBackendApi } from "~/context/api";
import type { HttpResponseError } from "~/api/http/HTTPResponse";
import { useSnackbars } from "~/context/snackbar";
import { useNavigate } from "react-router";
import ProfilePostViewReplies from "./ProfilePostViewReplies";
import ProfilePostViewParent from "./ProfilePostViewParent";
import ProfilePostViewAuthorInfo from "./ProfilePostViewAuthorInfo";

type Props = {
    profileId: string;
    postId: string;
};

const ProfilePostViewRoot = styled(Box)(({ theme }) => ({
    scrollSnapAlign: "start",
    flex: 1,
    width: "100%",
    backgroundColor: theme.vars.palette.background.level1,
    minHeight: "100%",
    display: "grid",
    gridTemplateColumns: "1fr",
    [theme.breakpoints.up("lg")]: {
        paddingLeft: theme.spacing(24),
        paddingRight: theme.spacing(24),
        gridTemplateColumns: "400px 1fr 400px",
        gridColumn: "1 / 4"
    }
}));
const ProfilePostViewContent = styled(Box)(({ theme }) => ({
    overflowY: "auto",
    flex: 1,
    width: "100%",
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    overflowX: "hidden",
    paddingBottom: theme.spacing(16),
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    [theme.breakpoints.up("lg")]: {
    }
}));
const ProfilePostViewSidebar = styled(Box)(({ theme }) => ({
    overflowY: "auto",
    scrollSnapAlign: "start",
    flex: 1,
    width: "100%",
    backgroundColor: theme.vars.palette.background.level1,
    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
    paddingTop: theme.spacing(4),
    [theme.breakpoints.up("lg")]: {
        display: "none",
    }
}));
const ProfilePostViewContentSidebar = styled(Box)(({ theme }) => ({
    overflowY: "hidden",
    paddingTop: theme.spacing(4),
    [theme.breakpoints.down("lg")]: {
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
            <ProfilePostViewSidebar>
                <ProfilePostViewAuthorInfo author={post.author} />
            </ProfilePostViewSidebar>
            <ProfilePostViewRoot>
                <ProfilePostViewContentSidebar>
                    <ProfilePostViewAuthorInfo author={post.author} />
                </ProfilePostViewContentSidebar>
                <ProfilePostViewContent>
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
                </ProfilePostViewContent>
            </ProfilePostViewRoot>
            <ProfilePostViewSidebar />
        </>
    );
}
