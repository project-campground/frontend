import { ListItem, ListItemButton, ListItemContent, ListItemDecorator, Typography } from "@mui/joy";
import type { CampsiteMemberViewBasic } from "types/campsites";
import UserAvatar from "~/components/UserAvatar";

type Props = {
    member: CampsiteMemberViewBasic;
};

export default function MemberItem({ member }: Props) {
    return (
        <ListItem>
            <ListItemButton>
                <ListItemDecorator>
                    <UserAvatar withStatus size="md" did={member.user.did} avatar={member.user.avatar} />
                </ListItemDecorator>
                <ListItemContent>
                    <Typography fontWeight={700}>
                        {member.nickname ?? member.user.displayName}
                    </Typography>
                </ListItemContent>
            </ListItemButton>
        </ListItem>
    );
}