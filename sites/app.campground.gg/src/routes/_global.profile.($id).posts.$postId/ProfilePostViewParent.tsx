import { Alert } from "@mui/joy";
import type {
    ProfilePostViewBasic,
} from "types/campground/user";
import { FormattedMessage } from "react-intl";
import ProfilePost from "../_global.profile.$id/ProfilePost";
import { IconTrashFilled } from "@tabler/icons-react";

type Props = {
    post: ProfilePostViewBasic | null;
};

export default function ProfilePostViewParent({ post }: Props) {
    if (!post) {
        return (
            <Alert variant="soft" color="danger" startDecorator={<IconTrashFilled />}>
                <FormattedMessage
                    id="app.profilePosts.parentDeleted"
                    defaultMessage="The post that was being replied to has been likely deleted or does not exist."
                    description="Describes that the parent of the post has been deleted"
                />
            </Alert>
        );
    }

    return (
        <ProfilePost
            post={post}
            opacity={0.75}
            // TODO
            onPostUpdate={() => void 0}
            onPostDelete={() => void 0}
        />
    );
}
