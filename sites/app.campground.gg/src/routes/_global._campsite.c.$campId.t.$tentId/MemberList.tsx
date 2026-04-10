import { Chip, List, Menu, Stack } from "@mui/joy";
import type { MemberViewBasic } from "types/membership";
import type { RoleView } from "types/roles";
import MemberItem from "./MemberItem";
import ContentCategory from "~/components/content/ContentCategory";
import { colorToDecimal } from "~/util/color";
import UserProfileCard from "~/layout/UserProfileCard";
import { useState, type MouseEvent } from "react";
import { GradientTypography } from "components";

type Props = {
    campsiteId: string;
    memberCount: number;
    members: MemberViewBasic[];
    roles: RoleView[];
};

export default function MemberList({ campsiteId, members, roles }: Props) {
    const displayedRoles = roles.filter((role) => role.raised);
    const defaultRole = roles.find((x) => x.flags & 1)!;
    const [cardMember, setCardMember] = useState<{
        x: number;
        y: number;
        member: MemberViewBasic;
    } | null>(null);

    // Make sure it always exists
    if (!defaultRole.raised) displayedRoles.push(defaultRole);

    const sortedMembers = members
        .sort((a, b) =>
            (a.nickname ?? a.user.displayName ?? a.user.did).localeCompare(
                b.nickname ?? b.user.displayName ?? b.user.did,
            ),
        )
        .map((member) => {
            // Single display role ensures no duplicates
            const displayedRole = displayedRoles.filter((role) =>
                member.roles.includes(role.id),
            )[0];

            return { member, displayedRole };
        });
    const groupRoles = displayedRoles
        .map((role) => ({ role, members: sortedMembers.filter((x) => x.displayedRole === role) }))
        .filter((x) => x.members.length);
    const displayMember = (
        ev: MouseEvent<HTMLDivElement>,
        member: MemberViewBasic,
    ) =>
        cardMember
            ? setCardMember(null)
            : setCardMember({
                    member,
                    x: document.body.clientWidth - 320,
                    y: ev.clientY + 8,
                });

    return (
        <>
            {cardMember && (
                <Menu
                    open
                    variant="soft"
                    style={{ top: cardMember.y, left: cardMember.x }}
                >
                    <UserProfileCard
                        did={cardMember.member.user.did}
                        user={cardMember.member.user}
                        member={cardMember.member}
                        campsiteRoles={roles}
                    />
                </Menu>
            )}
            <Stack gap={2}>
                {groupRoles.map(({ role, members }) => {
                    return (
                        <ContentCategory
                            key={role.id}
                            header={
                                <>
                                    <GradientTypography
                                        motion={role.motion}
                                        colors={colorToDecimal(role.colors)}
                                        level="title-md"
                                        fontWeight={700}
                                        sx={{ width: "max-content" }}
                                    >
                                        {role.name}
                                    </GradientTypography>
                                    <Chip
                                        variant="soft"
                                        sx={{ fontWeight: 700 }}
                                    >
                                        {members.length}
                                    </Chip>
                                </>
                            }
                        >
                            <List
                                sx={(theme) => ({
                                    "--List-padding": 0,
                                    "--ListItem-paddingY": "0.5rem",
                                    "--ListItem-radius": theme.vars.radius.md,
                                })}
                            >
                                {members.map(({ member }) => (
                                    <MemberItem
                                        key={member.user.did}
                                        campsiteId={campsiteId}
                                        member={member}
                                        roles={roles}
                                        onClick={(ev) =>
                                            displayMember(ev, member)
                                        }
                                    />
                                ))}
                            </List>
                        </ContentCategory>
                    );
                })}
            </Stack>
        </>
    );
}
