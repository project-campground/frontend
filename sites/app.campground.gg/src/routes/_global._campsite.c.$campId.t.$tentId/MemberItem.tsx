import { ListItem, ListItemButton, ListItemContent, ListItemDecorator, Typography } from "@mui/joy";
import type { MouseEvent } from "react";
import type { CampsiteMemberViewBasic, CampsiteRoleView } from "types/campsites";
import UserAvatar from "~/components/UserAvatar";
import { decimalToHexColor } from "~/util/color";

type Props = {
    member: CampsiteMemberViewBasic;
    roles: CampsiteRoleView[];
    onClick: (ev: MouseEvent<HTMLDivElement>) => unknown;
};

export default function MemberItem({ member, roles, onClick }: Props) {
    const colorRoles = roles.filter((x) => (x.color || x.colorSecondary) && member.roles.includes(x.id));

    return (
        <ListItem sx={{ userSelect: "none" }}>
            <ListItemButton onClick={onClick}>
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