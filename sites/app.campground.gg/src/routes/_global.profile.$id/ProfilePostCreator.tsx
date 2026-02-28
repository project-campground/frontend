import { CardContent, Link, Typography } from "@mui/joy";
import type { SxProps } from "@mui/joy/styles/types";
import { useState } from "react";
import type { ProfileView } from "types/user";
import UserAvatar from "../../components/UserAvatar";
import { Group } from "components";
import BasicPostEditor from "~/components/editor/BasicPostEditor";
import { IconPencil } from "@tabler/icons-react";
import { ProfilePostCard } from "./ProfilePost";

type Props = {
    user: ProfileView;
    content?: string;
    placeholder?: string;
    sx?: SxProps;
    onPost: (content: string) => void | Promise<any>;
};

export default function ProfilePostCreator({ user, placeholder, onPost, sx }: Props) {
    const [open, setOpen] = useState(false);
    const finalPlaceholder = placeholder ?? "What are you thinking?";

    return (
        <ProfilePostCard variant="soft" sx={{ py: 1.5, px: 2, ...sx, }}>
            <CardContent>
                {open
                    ? <Group gap={1.5} alignItems="center">
                        <UserAvatar withStatus did={user.did} avatar={user.avatar} size="lg" />
                        <BasicPostEditor onConfirm={(content) => (setOpen(false), onPost(content))} onCancel={() => setOpen(false)} sx={{ flex: 1 }} placeholder={finalPlaceholder} />
                    </Group>
                    : <Link overlay underline="none" component="button" level="body-md" onClick={() => setOpen(!open)} gap={1.5} color="neutral" startDecorator={<UserAvatar withStatus did={user.did} avatar={user.avatar} size="lg" />}>
                        <Typography level="title-lg" startDecorator={<IconPencil />}>
                            {finalPlaceholder}
                        </Typography>
                      </Link>
                }
            </CardContent>
        </ProfilePostCard>
    );
}