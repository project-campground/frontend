import { Chip, List, Menu, Stack, Typography } from "@mui/joy";
import type { CampsiteMemberViewBasic, CampsiteRoleView } from "types/campsites";
import MemberItem from "./MemberItem";
import ContentCategory from "~/components/content/ContentCategory";
import { decimalToHexColor } from "~/util/color";
import UserProfileCard from "~/components/UserProfileCard";
import { useState, type MouseEvent } from "react";

type Props = {
    memberCount: number;
    members: CampsiteMemberViewBasic[];
    roles: CampsiteRoleView[];
};

export default function MemberList({ members, roles }: Props) {
    const displayedRoles = roles.filter((x) => x.displaySeparately);
    const defaultRole = roles.slice(-1)[0];
    const [cardMember, setCardMember] = useState<{ x: number, y: number, member: CampsiteMemberViewBasic } | null>(null);

    // Make sure it always exists
    if (!defaultRole.displaySeparately)
        displayedRoles.push(defaultRole);

    const sortedMembers = members
        .sort((a, b) => (a.nickname ?? a.user.displayName ?? a.user.did).localeCompare(b.nickname ?? b.user.displayName ?? b.user.did))
        .map((member) => {
            // Single display role ensures no duplicates
            const displayedRole = displayedRoles.filter((role) => member.roles.includes(role.id))[0];

            return { member, displayedRole, };
        });
    const displayMember = (ev: MouseEvent<HTMLDivElement>, member: CampsiteMemberViewBasic) =>
        cardMember
        ? setCardMember(null)
        : setCardMember({ member, x: document.body.clientWidth - 300, y: ev.clientY + 8 });

    return (
        <>
            {cardMember && <Menu open variant="soft" style={{ top: cardMember.y, left: cardMember.x }}>
                <UserProfileCard did={cardMember.member.user.did} user={cardMember.member.user} member={cardMember.member} campsiteRoles={roles} />
            </Menu>}
            <Stack gap={2}>
                {displayedRoles.map((role) => {
                    const roleMembers = sortedMembers.filter((x) => x.displayedRole == role);
                    return (
                        <ContentCategory key={role.id} header={
                            <>
                                <Typography level="title-md" fontWeight={700} sx={{ color: role.color || role.colorSecondary ? decimalToHexColor(role.color || role.colorSecondary) : null }}>{role.name}</Typography>
                                <Chip variant="soft" sx={{ fontWeight: 700 }}>{roleMembers.length}</Chip>
                            </>
                        }>
                            <List sx={(theme) => ({ "--List-padding": 0, "--ListItem-paddingY": "0.5rem", "--ListItem-radius": theme.vars.radius.md, })}>
                                {roleMembers.map(({ member }) =>
                                    <MemberItem key={member.user.did} member={member} roles={roles} onClick={(ev) => displayMember(ev, member)} />
                                )}
                            </List>
                        </ContentCategory>
                    );
                })}
            </Stack>
        </>
    );
}