import { IconButton, Stack, Tab, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
import type { SettingsComponentProps } from "../SettingsModal";
import type { CampsiteRoleView, CampsiteViewDetailed } from "types/campsites";
import RoleItem, { RoleItemGap } from "./RoleItem";
import React, { useState } from "react";
import { Group } from "components";
import { IconListCheck, IconPaletteFilled, IconPlus } from "@tabler/icons-react";
import Form from "~/components/form/Form";
import { CampsitePermissionConsts, TentPermissionConsts } from "~/util/permissions";

type NonCreatedRole = Pick<CampsiteRoleView, "id" | "name" | "displaySeparately" | "mentionable" | "campsitePermissions" | "tentPermissions" | "priority" | "color" | "colorSecondary"> & { added: true };
type SettingsRole = CampsiteRoleView | NonCreatedRole;

export default function CampsiteSettingsRoles({ settingsProps: { campsite } }: SettingsComponentProps<{ campsite: CampsiteViewDetailed }>) {
    const [roles, setRoles] = useState<SettingsRole[]>(campsite.roles.sort((a, b) => ((a.flags & b.flags) == 1) ? (a.priority - b.priority) : a.flags));
    const [openRole, setOpenRole] = useState(roles.slice(-1)[0]);
    const [newRoleCounter, setNewRoleCounter] = useState(-1);
    const createNewRole = () => {
        setNewRoleCounter(newRoleCounter + 1);
        const newId = newRoleCounter.toString();
        const newRole: SettingsRole = { id: newId, name: "New Role", priority: roles.slice(-2)[0].priority, displaySeparately: false, mentionable: false, campsitePermissions: 0, tentPermissions: 0, color: 0, colorSecondary: 0, added: true };
        setOpenRole(newRole);
        return setRoles([...roles.slice(0, -1), newRole, roles.slice(-1)[0]])
    };

    return (
        <Group sx={{ width: "100%", height: "100%", }} gap={2}>
            <Stack sx={{ width: 256, height: "100%" }} gap={2}>
                <Group alignItems="center" gap={1}>
                    <Typography level="title-lg" flex={1}>Roles</Typography>
                    <IconButton size="sm" onClick={createNewRole}>
                        <IconPlus size={16} />
                    </IconButton>
                </Group>
                <Stack sx={{ height: "100%" }}>
                    {roles.map((role) =>
                        <React.Fragment key={role.id}>
                            <RoleItemGap id={role.id} />
                            <RoleItem active={openRole === role} onClick={() => setOpenRole(role)} {...role} />
                        </React.Fragment>
                    )}
                </Stack>
            </Stack>
            <RolePage role={openRole} />
        </Group>
    )
}

function RolePage({ role }: { role: SettingsRole; }) {
    return (
        <Stack flex={1} gap={2}>
            <Typography level="title-lg">{role.name}</Typography>
            <Tabs sx={{ height: "100%" }}>
                <TabList>
                    <Tab value={0}>
                        <IconPaletteFilled />
                        Display
                    </Tab>
                    <Tab value={1}>
                        <IconListCheck />
                        Permissions
                    </Tab>
                </TabList>
                <TabPanel value={0} sx={{ overflowY: "auto" }}>
                    <RolePageDisplay role={role} />
                </TabPanel>
                <TabPanel value={1} sx={{ overflowY: "auto" }}>
                    <RolePagePermissions role={role} />
                </TabPanel>
            </Tabs>
        </Stack>
    );
}

function RolePageDisplay({ role }: { role: SettingsRole; }) {
    return (
        <Form
            sections={[
                {
                    id: "name",
                    fields: [
                        {
                            id: "name",
                            type: "text",
                            header: "Role name",
                            defaultValue: role.name,
                        },
                    ],
                },
                {
                    id: "colors",
                    fields: [
                        {
                            id: "color",
                            type: "color",
                            header: "Role color",
                            defaultValue: role.color,
                            allowAlpha: true,
                        },
                    ],
                },
                {
                    id: "attributes",
                    fields: [
                        {
                            id: "displaySeparately",
                            type: "switch",
                            label: "Display separately",
                            defaultValue: role.displaySeparately,
                            description: "Displays the members that have this role separately from the rest of the members in the member list"
                        },
                        {
                            id: "mentionable",
                            type: "switch",
                            label: "Mentionable by anyone",
                            defaultValue: role.mentionable,
                            description: "Allows any member with permission to create content to mention other members that have this role"
                        },
                    ]
                }
            ]}
        />
    );
}

function RolePagePermissions({ role }: { role: SettingsRole; }) {
    return (
        <Form
            sections={[
                {
                    id: "campsite",
                    header: "Campsite permissions",
                    layout: "divided",
                    fields: [
                        {
                            id: "c0",
                            type: "switch",
                            label: "Manage Campsite",
                            description: "Allows members with this role to edit the name of this campsite and other details.",
                            defaultValue: role.campsitePermissions & CampsitePermissionConsts.MANAGE_CAMPSITE,
                            checkedValue: CampsitePermissionConsts.MANAGE_CAMPSITE,
                        },
                        {
                            id: "c1",
                            type: "switch",
                            label: "Manage Bonfires",
                            description: "Allows members with this role to edit and delete bonfires.",
                            defaultValue: role.campsitePermissions & CampsitePermissionConsts.MANAGE_BONFIRES,
                            checkedValue: CampsitePermissionConsts.MANAGE_BONFIRES,
                        },
                        {
                            id: "c2",
                            type: "switch",
                            label: "Manage Tents",
                            description: "Allows members with this role to edit and delete tents.",
                            defaultValue: role.campsitePermissions & CampsitePermissionConsts.MANAGE_TENTS,
                            checkedValue: CampsitePermissionConsts.MANAGE_TENTS,
                        },
                        {
                            id: "c3",
                            type: "switch",
                            label: "Manage Roles",
                            description: "Allows members with this role to edit and delete roles below their highest role.",
                            defaultValue: role.campsitePermissions & CampsitePermissionConsts.MANAGE_ROLES,
                            checkedValue: CampsitePermissionConsts.MANAGE_ROLES,
                        },
                        {
                            id: "c4",
                            type: "switch",
                            label: "Give Roles",
                            description: "Allows members with this role to give and remove roles that are lower than their highest role from other members.",
                            defaultValue: role.campsitePermissions & CampsitePermissionConsts.GIVE_ROLES,
                            checkedValue: CampsitePermissionConsts.GIVE_ROLES,
                        },
                    ],
                },
                {
                    id: "membership",
                    header: "Membership permissions",
                    layout: "divided",
                    fields: [
                        {
                            id: "c5",
                            type: "switch",
                            label: "Mute Members",
                            description: "Allows members with this role to disallow other members from creating content.",
                            defaultValue: role.campsitePermissions & CampsitePermissionConsts.MUTE_MEMBERS,
                            checkedValue: CampsitePermissionConsts.MUTE_MEMBERS,
                        },
                        {
                            id: "c5",
                            type: "switch",
                            label: "Kick Members",
                            description: "Allows members with this role to remove other members with lower rank/roles from this campsite.",
                            defaultValue: role.campsitePermissions & CampsitePermissionConsts.KICK_MEMBERS,
                            checkedValue: CampsitePermissionConsts.KICK_MEMBERS,
                        },
                        {
                            id: "c5",
                            type: "switch",
                            label: "Ban Members",
                            description: "Allows members with this role to remove other members with lower rank/roles from this campsite and disallow from them joining again or allow them to join again.",
                            defaultValue: role.campsitePermissions & CampsitePermissionConsts.BAN_MEMBERS,
                            checkedValue: CampsitePermissionConsts.BAN_MEMBERS,
                        },
                        {
                            id: "c6",
                            type: "switch",
                            label: "Manage Their Own Identity",
                            description: "Allows members with this role to change their nicknames and avatars in this campsite.",
                            defaultValue: role.campsitePermissions & CampsitePermissionConsts.MANAGE_SELF_IDENTITY,
                            checkedValue: CampsitePermissionConsts.MANAGE_SELF_IDENTITY,
                        },
                        {
                            id: "c7",
                            type: "switch",
                            label: "Manage Identity of Others",
                            description: "Allows members with this role to change nicknames and remove avatars of other members in this campsite.",
                            defaultValue: role.campsitePermissions & CampsitePermissionConsts.MANAGE_OTHERS_IDENTITY,
                            checkedValue: CampsitePermissionConsts.MANAGE_OTHERS_IDENTITY,
                        },
                        {
                            id: "c7",
                            type: "switch",
                            label: "Create Invites",
                            description: "Allows members with this role to create invites to this campsite.",
                            defaultValue: role.campsitePermissions & CampsitePermissionConsts.CREATE_INVITES,
                            checkedValue: CampsitePermissionConsts.CREATE_INVITES,
                        },
                        {
                            id: "c8",
                            type: "switch",
                            label: "Manage Invites",
                            description: "Allows members with this role to delete campsite's invites.",
                            defaultValue: role.campsitePermissions & CampsitePermissionConsts.MANAGE_INVITES,
                            checkedValue: CampsitePermissionConsts.MANAGE_INVITES,
                        },
                    ],
                },
                {
                    id: "tent",
                    header: "Tent permissions",
                    layout: "divided",
                    fields: [
                        {
                            id: "t1",
                            type: "switch",
                            label: "View Content",
                            description: "Allows members to view tents and tent messages.",
                            defaultValue: role.tentPermissions & TentPermissionConsts.VIEW_CONTENT,
                            checkedValue: TentPermissionConsts.VIEW_CONTENT,
                        },
                        {
                            id: "t1",
                            type: "switch",
                            label: "Create Content",
                            description: "Allows members with this role to send messages in tents.",
                            defaultValue: role.tentPermissions & TentPermissionConsts.CREATE_CONTENT,
                            checkedValue: TentPermissionConsts.CREATE_CONTENT,
                        },
                        {
                            id: "t2",
                            type: "switch",
                            label: "Pin Content",
                            description: "Allows members with this role to pin messages in tents.",
                            defaultValue: role.tentPermissions & TentPermissionConsts.PIN_CONTENT,
                            checkedValue: TentPermissionConsts.PIN_CONTENT,
                        },
                        {
                            id: "t3",
                            type: "switch",
                            label: "Manage Content",
                            description: "Allows members with this role to delete messages of other members.",
                            defaultValue: role.tentPermissions & TentPermissionConsts.MANAGE_CONTENT,
                            checkedValue: TentPermissionConsts.MANAGE_CONTENT,
                        },
                        {
                            id: "t4",
                            type: "switch",
                            label: "Mention @everyone and @here",
                            description: "Allows members with this role to mention @everyone and @here.",
                            defaultValue: role.tentPermissions & TentPermissionConsts.MENTION_EVERYONE,
                            checkedValue: TentPermissionConsts.MENTION_EVERYONE,
                        },
                        {
                            id: "t5",
                            type: "switch",
                            label: "Create Private Content",
                            description: "Allows members with this role to send private messages in this campsite.",
                            defaultValue: role.tentPermissions & TentPermissionConsts.CREATE_PRIVATE_CONTENT,
                            checkedValue: TentPermissionConsts.CREATE_PRIVATE_CONTENT,
                        },
                    ],
                },
            ]}
        />
    );
}