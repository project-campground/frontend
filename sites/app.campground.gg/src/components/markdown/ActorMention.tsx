import { styled } from "@mui/joy";
import UserDisplay from "../UserDisplay";
import { useCampsiteContext } from "~/routes/_global._campsite/context";
import { useMemo, useState } from "react";
import type { MemberViewDetailed } from "types/membership";
import { colorToDecimal } from "~/util/color";

type Props = {
    did: string;
};

const ActorMentionWrapper = styled("span", {
    name: "ActorMention",
    slot: "root",
})(({ theme }) => ({
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.vars.palette.neutral[800],
    padding: `2px 8px`,
    borderRadius: theme.vars.radius.md,
    transition: "background 0.3s",
    ":hover": {
        backgroundColor: theme.vars.palette.neutral[750],
    }
}));

export default function ActorMention({ did }: Props) {
    const { campsite, session } = useCampsiteContext();
        const [member, setMember] = useState<MemberViewDetailed | null>(null);
        useMemo(() => {
            return (
                session
                    .http
                    .members.get(campsite.id, did)
                    .then((resp) => resp.ok ? setMember(resp.content) : null)
            );
        }, [did]);
    const colorRole = member ? campsite.roles.find((x) => member.roles.includes(x.id) && x.colors.length) : null;

    return (
        <ActorMentionWrapper>
            <UserDisplay
                noHoverBackground
                avatarSize="sm"
                user={member?.user ?? {
                    did,
                    handle: did,
                    displayName: did,
                    description: did,
                    tagline: did,
                    location: did,
                    avatar: null,
                    banner: null,
                    createdAt: new Date().toISOString(),
                }}
                colors={colorToDecimal(colorRole?.colors)}
                member={member}
                campsiteRoles={campsite.roles}
            />
        </ActorMentionWrapper>
    );
}