import { styled } from "@mui/joy";
import RoleDisplay from "../campsite/RoleDisplay";
import { useCampsite } from "~/routes/_global._campsite/context";
import type { CampsiteRoleView } from "types/campsites";
import { IconAt } from "@tabler/icons-react";

type Props = {
    id: string;
};

const RoleMentionWrapper = styled("span", {
    name: "ActorMention",
    slot: "root",
})(() => ({
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: theme.vars.palette.neutral[700],
    // padding: `${theme.spacing(0.5)} ${theme.spacing(1.25)}`,
    // borderRadius: theme.vars.radius.xl,
}));

const defaultUnknownRole: Omit<CampsiteRoleView, "id" | "campsiteId"> = {
    name: "Unknown role",
    color: 0,
    colorSecondary: 0,
    displaySeparately: false,
    mentionable: false,
    permissions: {
        campsite: 0,
        tent: 0,
    },
    priority: 0,
    flags: 0,
    createdAt: new Date().toISOString(),
    createdBy: "did:null",
    updatedAt: new Date().toISOString(),
    updatedBy: "did:null",
};

export default function RoleMention({ id }: Props) {
    const campsite = useCampsite();
    const role = campsite.roles.find((x) => x.id === id) ?? {...defaultUnknownRole, id, campsiteId: campsite.id};

    return (
        <RoleMentionWrapper>
            <RoleDisplay startDecorator={<IconAt size={20} />} size="sm" role={role} radius="md" />
        </RoleMentionWrapper>
    );
}