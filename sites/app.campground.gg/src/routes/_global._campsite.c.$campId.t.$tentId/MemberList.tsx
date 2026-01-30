import { Chip, List, Typography } from "@mui/joy";
import type { CampsiteMemberViewBasic, CampsiteRoleView } from "types/campsites";
import MemberItem from "./MemberItem";
import ContentCategory from "~/components/content/ContentCategory";
import { decimalToHexColor } from "~/util/color";

type Props = {
    memberCount: number;
    members: CampsiteMemberViewBasic[];
    roles: CampsiteRoleView[];
};

export default function MemberList({ members, roles }: Props) {
    const sortedRoles = roles.sort((a, b) => a.priority - b.priority);
    const displayedRoles = sortedRoles.filter((x) => x.displaySeparately);
    const defaultRole = sortedRoles.slice(-1)[0];

    // Make sure it always exists
    if (!defaultRole.displaySeparately)
        displayedRoles.push(defaultRole);

    const sortedMembers = members
        .sort((a, b) => (a.nickname ?? a.user.displayName ?? a.userId).localeCompare(b.nickname ?? b.user.displayName ?? b.userId))
        .map((member) => {
            // Single display role ensures no duplicates
            const displayedRole = displayedRoles.filter((role) => member.roles.includes(role.id))[0];

            return { member, displayedRole, };
        });

    return (
        <>
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
                                <MemberItem key={`member-${member.userId}`} member={member} roles={sortedRoles} />
                            )}
                        </List>
                    </ContentCategory>
                );
            }
            )}
        </>
    );
}