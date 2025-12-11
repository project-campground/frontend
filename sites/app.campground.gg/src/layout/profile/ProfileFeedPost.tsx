import { Alert, Box } from "@mui/joy";
import { useState } from "react";
import { IconTrashFilled } from "@tabler/icons-react";
import type { EitherUserPost, UserPostParented } from "types/user";
import ProfilePost, { appearAnimation } from "./ProfilePost";
import { ThreadLineItem, ThreadLineWrapper } from "~/components/ThreadLine";

type Props = {
    appear?: boolean;
    post: UserPostParented;
    isOwnPost?: boolean;
    opacity?: number;
    onPostDelete: (uri: string) => void | Promise<any>;
    onPostUpdate: (uri: string, content: string) => void | Promise<any>;
};

export default function ProfileFeedPost(props: Props) {
    const { appear } = props;
    const { parent, parentUri } = props.post as EitherUserPost;
    const [parentPost, setParentPost] = useState(parent);

    if (parentUri)
        return (
            <Box sx={{ animation: `${appearAnimation} ${appear ? 0.75 : 0}s`, }}>
                <ThreadLineWrapper >
                    {parent
                    ? <ProfilePost
                        showComments
                        post={parentPost!}
                        onPostUpdate={(_, content) => setParentPost({ ...parentPost!, content })}
                        onPostDelete={() => setParentPost(null)}
                    />
                    : <Alert variant="soft" color="danger" startDecorator={<IconTrashFilled />}>This post has been deleted.</Alert>}
                    <ThreadLineItem>
                        <ProfilePost
                            showComments
                            onPostUpdate={props.onPostUpdate}
                            onPostDelete={props.onPostDelete}
                            post={props.post}
                            mt={0.5}
                        />
                    </ThreadLineItem>
                </ThreadLineWrapper>
            </Box>
        );
        
    return (
        <Box sx={{ animation: `${appearAnimation} ${appear ? 0.75 : 0}s`, }}>
            <ProfilePost onPostUpdate={props.onPostUpdate} onPostDelete={props.onPostDelete} showComments post={props.post} />   
        </Box>
    );
}