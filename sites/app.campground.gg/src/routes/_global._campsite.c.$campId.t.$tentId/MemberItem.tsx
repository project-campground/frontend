import { ListItem, ListItemButton, ListItemContent, ListItemDecorator, Typography } from "@mui/joy";
import type { CampsiteMemberViewBasic, CampsiteRoleView } from "types/campsites";
import UserAvatar from "~/components/UserAvatar";
import { decimalToHexColor } from "~/util/color";

type Props = {
    member: CampsiteMemberViewBasic;
    roles: CampsiteRoleView[];
};

export default function MemberItem({ member, roles }: Props) {
    const colorRoles = roles.filter((x) => (x.color || x.colorSecondary) && member.roles.includes(x.id));

    return (
        <ListItem>
            <ListItemButton>
                <ListItemDecorator>
                    <UserAvatar withStatus size="md" did={member.user.did} avatar={member.user.avatar} />
                </ListItemDecorator>
                <ListItemContent>
                    <Typography fontWeight={700} sx={{ color: colorRoles.length ? decimalToHexColor(colorRoles[0].color || colorRoles[0].colorSecondary) : null }}>
                        {member.nickname ?? member.user.displayName}
                    </Typography>
                </ListItemContent>
            </ListItemButton>
        </ListItem>
    );
}