import { Alert, Box, Button, Card, IconButton, Stack, TabPanel, Tabs, Typography } from "@mui/joy";
import type { SettingsComponentProps } from "../SettingsModal";
import type { CampsiteRoleView, CampsiteViewDetailed, GetRolesOutput } from "types/campsites";
import RoleItem, { RoleItemGap } from "./RoleItem";
import React, { useContext, useMemo, useState } from "react";
import { Group, SmoothTabList } from "components";
import { IconExclamationCircleFilled, IconListCheck, IconPaletteFilled, IconPlus, IconSettings2 } from "@tabler/icons-react";
import Form from "~/components/form/Form";
import { CampsitePermissionConsts, TentPermissionConsts } from "~/util/permissions";
import { useSession } from "~/context/session";
import { useSnackbars } from "~/context/snackbar";
import { DndContext } from "@dnd-kit/core";
import ContentDeleteModal from "../ContentDeleteModal";
import type { HttpResponseWithContent } from "api/HTTPResponse";
import { CampsiteContextSuiteContext } from "~/routes/_global._campsite/context";
import TentMessage from "~/components/tents/TentMessage";

type NewRole = CampsiteRoleView & { added: true; };
type SettingsRole = CampsiteRoleView | NewRole;

export default function CampsiteSettingsRoles({ onValuesChanged, settingsProps: { campsite } }: SettingsComponentProps<{ campsite: CampsiteViewDetailed }>) {
    const { updateCampsite } = useContext(CampsiteContextSuiteContext);
    const roles = useMemo<SettingsRole[]>(() =>
        campsite.roles,
    [campsite, campsite.roles]);
    const [openRole, setOpenRole] = useState(roles.slice(-1)[0]);
    const session = useSession();
    const snackbars = useSnackbars();
    const createNewRole = () =>
        session
            .http
            .createRole(campsite.id, {
                name: "New role",
                color: 0,
                colorSecondary: 0,
                displaySeparately: false,
                mentionable: false,
                campsitePermissions: 0,
                tentPermissions: 0,
            })
            .then((resp) => {
                if (!resp.ok)
                    return snackbars.notifyError(`${resp.status} ${resp.errorHeader}: ${resp.errorDescription}`);

                const newRole = {...resp.content, added: true};
                updateCampsite({ roles: [...roles, newRole] });
                return setOpenRole(newRole);
            });
    const moveRole = (roleMoved: string, movedTo: string) => {
        if (roleMoved === movedTo)
            return;

        const movedToIndex = roles.findIndex((x) => x.id === movedTo);
        // Move a single role, because it is at the top or there is space between priorities that the role can be nudged to
        if (!movedToIndex || Math.abs(roles[movedToIndex - 1].priority - roles[movedToIndex].priority) > 1)
            return session
                .http
                .moveRoles(campsite.id, {
                    roleByPriority: { [roleMoved]: roles[movedToIndex]!.priority - 1 },
                })
                .then(onRolesMoved);
        
        const newPriority = roles[movedToIndex].priority;
        const rolesToAdditionallyMove = roles
            .slice(movedToIndex)
            .filter((x) => x.id !== roleMoved)
            .map((role, i) => ([role.id, newPriority + 1 + i]));
        const newPriorities = Object.assign(Object.fromEntries(rolesToAdditionallyMove), { [roleMoved]: newPriority });

        return session
            .http
            .moveRoles(campsite.id, {
                roleByPriority: newPriorities,
            })
            .then(onRolesMoved);
    }
    const onRolesMoved = (updatedRoles: HttpResponseWithContent<GetRolesOutput>) => {
        if (!updatedRoles.ok)
            return snackbars.notifyApiError(updatedRoles);
        const updatedRoleIds = updatedRoles.content.roles.map((x) => x.id);
        const withoutUpdated = roles.filter((x) => !updatedRoleIds.includes(x.id));
        const withUpdated = withoutUpdated.concat(updatedRoles.content.roles);
        return updateCampsite({ roles: withUpdated });
    };
    const deleteRole = async (roleToDelete: SettingsRole) => {
        const roleIndex = roles.indexOf(roleToDelete);

        return session
            .http
            .deleteRole(campsite.id, roleToDelete.id)
            .then((resp) => {
                if (!resp.ok)
                    return snackbars.notifyApiError(resp);

                updateCampsite({ roles: roles.filter((x) => x.id !== roleToDelete.id) });
                setOpenRole(roles[roleIndex + 1]);
            });
    }

    return (
        <Group sx={{ width: "100%", height: "100%", }} gap={2}>
            <Stack sx={{ width: { xs: 128, lg: 256 }, height: "100%" }} gap={2}>
                <Group alignItems="center" gap={1}>
                    <Typography level="title-lg" flex={1}>Roles</Typography>
                    <IconButton size="sm" onClick={createNewRole}>
                        <IconPlus size={16} />
                    </IconButton>
                </Group>
                <DndContext onDragEnd={(event) => event.over && moveRole(event.active.id as string, event.over!.id as string)}>
                    <Stack sx={{ height: "100%" }}>
                        {roles.map((role) =>
                            <React.Fragment key={role.id}>
                                <RoleItemGap id={role.id} />
                                <RoleItem immovable={Boolean(role.flags & 1)} active={openRole === role} onClick={() => setOpenRole(role)} {...role} />
                            </React.Fragment>
                        )}
                    </Stack>
                </DndContext>
            </Stack>
            <RolePage
                role={openRole}
                onChanged={onValuesChanged}
                onRoleDelete={deleteRole}
            />
        </Group>
    )
}

type FormValues = Pick<CampsiteRoleView, "id" | "name" | "color" | "colorSecondary" | "mentionable" | "displaySeparately" | "tentPermissions" | "campsitePermissions">;
type RolePageProps = { onRoleDelete: (role: SettingsRole) => unknown; role: SettingsRole; onChanged: (valid: boolean, changed: boolean, values: FormValues) => unknown; };
type RolePageTabProps = { value: FormValues, role: SettingsRole; onChanged: (valid: boolean, values: Partial<FormValues>) => unknown; };

function RolePage({ onRoleDelete, role, onChanged }: RolePageProps) {
    const { defaultValues, combinedValues }: { defaultValues: Omit<FormValues, "id">, combinedValues: FormValues } = useMemo(() => ({
        defaultValues: {
            color: role.color,
            name: role.name,
            colorSecondary: role.colorSecondary,
            mentionable: role.mentionable,
            displaySeparately: role.displaySeparately,
            campsitePermissions: role.campsitePermissions,
            tentPermissions: role.tentPermissions,
        },
        combinedValues: {
            id: role.id,
            name: role.name,
            color: role.color,
            colorSecondary: role.colorSecondary,
            mentionable: role.mentionable,
            displaySeparately: role.displaySeparately,
            campsitePermissions: role.campsitePermissions,
            tentPermissions: role.tentPermissions,
        }
    }), [role.id]);
    const validForTabs = [true, true];
    const defaultValueList = Object.keys(defaultValues) as (keyof Omit<FormValues, "id">)[];

    const onTabValuesChanged = (page: number, valid: boolean, values: Record<string, any>) => {
        validForTabs[page] = valid; 
        Object.assign(combinedValues, values);
        const allTabsValid = validForTabs.every((x) => x);
        const anyValueChanged = defaultValueList.some((x) => combinedValues[x as typeof defaultValueList[number]] !== defaultValues[x as typeof defaultValueList[number]]);
        const valuesChanged = defaultValueList.map((x) => [x, combinedValues[x as typeof defaultValueList[number]] !== defaultValues[x as typeof defaultValueList[number]]]);

        console.log({ allTabsValid, anyValueChanged, combinedValues, valuesChanged, defaultValues, defaultValueList });
        return onChanged(allTabsValid, anyValueChanged, combinedValues);
    }

    return (
        <Stack flex={1} gap={2} sx={{ overflow: "hidden", height: "100%" }}>
            <Typography level="title-lg">{role.name}</Typography>
            <Tabs sx={{ height: "100%" }}>
                <SmoothTabList
                    tabs={[
                        {
                            id: 0,
                            name: "Display",
                            startDecorator: <IconPaletteFilled />,
                        },
                        {
                            id: 1,
                            name: "Permissions",
                            startDecorator: <IconListCheck />,
                        },
                        {
                            id: 2,
                            name: "Manage",
                            startDecorator: <IconSettings2 />,
                        },
                    ]}
                />
                <TabPanel value={0} sx={{ overflowY: "auto" }}>
                    <RolePageDisplay role={role} value={combinedValues} onChanged={onTabValuesChanged.bind(null, 0)} />
                </TabPanel>
                <TabPanel value={1} sx={{ overflowY: "auto" }}>
                    <RolePagePermissions role={role} value={combinedValues} onChanged={onTabValuesChanged.bind(null, 0)} />
                </TabPanel>
                <TabPanel value={2} sx={{ overflowY: "auto" }}>
                    <RolePageManage role={role} onRoleDelete={onRoleDelete} />
                </TabPanel>
            </Tabs>
        </Stack>
    );
}

function RolePageDisplay({ role, value, onChanged }: RolePageTabProps) {
    const fakeMessage = {
        id: "",
        campsiteId: "",
        bonfireId: "",
        tentId: "",
        replyingTo: [],
        replyingToCount: 0,
        content: "This is an example text.",
        createdAt: new Date().toISOString(),
        createdBy: {
            isMember: true,
            nickname: null,
            user: {
                did: "",
                displayName: "Example User",
                handle: "",
                description: "",
                tagline: "",
                location: "",
                avatar: null,
                banner: null,
                createdAt: new Date().toISOString(),
            },
            roles: [value.id],
        },
    };

    return (
        <Form
            sections={[
                {
                    id: "preview",
                    ReactiveHeader(values) {
                        const colorRole = {...role, ...values};
                        return (
                            <Group withMobile gap={2} sx={{ flexDirection: { xs: "column", lg: "row" } }}>
                                <Card data-joy-color-scheme="dark" sx={{ px: 1, py: 1, flex: 1 }}>
                                    <TentMessage
                                        hideToolbar
                                        unhoverable
                                        promptDelete={() => null}
                                        addReply={() => null}
                                        colorRoles={[colorRole]}
                                        message={fakeMessage}
                                    />
                                </Card>
                                <Card data-joy-color-scheme="light" sx={{ px: 1, py: 1, flex: 1 }}>
                                    <TentMessage
                                        hideToolbar
                                        unhoverable
                                        promptDelete={() => null}
                                        addReply={() => null}
                                        colorRoles={[colorRole]}
                                        message={fakeMessage}
                                    />
                                </Card>
                            </Group>
                        );
                    },
                    fields: [],
                },
                {
                    id: "name",
                    fields: [
                        {
                            id: "name",
                            type: "text",
                            header: "Role name",
                            defaultValue: value.name,
                        },
                    ],
                },
                {
                    id: "colors",
                    layout: "inline",
                    gap: 4,
                    fields: [
                        {
                            id: "color",
                            type: "color",
                            header: "Role color",
                            defaultValue: value.color,
                            allowAlpha: true,
                        },
                        {
                            id: "colorSecondary",
                            type: "color",
                            header: "Secondary color",
                            defaultValue: value.colorSecondary,
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
                            defaultValue: value.displaySeparately,
                            description: "Displays the members that have this role separately from the rest of the members in the member list"
                        },
                        {
                            id: "mentionable",
                            type: "switch",
                            label: "Mentionable by anyone",
                            defaultValue: value.mentionable,
                            description: "Allows any member with permission to create content to mention other members that have this role"
                        },
                    ]
                }
            ]}
            onChange={onChanged}
        />
    );
}

function RolePageManage({ role, onRoleDelete }: { role: SettingsRole; onRoleDelete: (role: SettingsRole) => unknown; }) {
    const [promptDelete, setPromptDelete] = useState(false);
    const isDefaultRole = (role.flags & 1) === 1;
    
    return (
        <Stack>
            <Box>
                <Typography level="title-md">Delete role</Typography>
                <Typography level="body-md">Permanently deletes this role.</Typography>
                <Button color="danger" variant="outlined" sx={{ mt: 1 }} onClick={() => setPromptDelete(true)} disabled={isDefaultRole}>Delete</Button>
                {isDefaultRole && <Alert sx={{ mt: 2 }} variant="soft" color="warning" startDecorator={<IconExclamationCircleFilled />}>This role cannot be deleted, as it is the default member role for this campsite.</Alert>}
            </Box>
            <ContentDeleteModal
                title="role"
                open={promptDelete}
                onClose={() => setPromptDelete(false)}
                onConfirm={() => (setPromptDelete(false), onRoleDelete(role))}
                ContentRender={() => <RoleItem {...role} immovable={true} />}
            />
        </Stack>
    );
}

function RolePagePermissions({ value, onChanged }: RolePageTabProps) {
    const onValuesChanged = (isValid: boolean, values: Record<string, number>) => {
        const entries = Object.entries(values);
        const tentPermissions = entries.filter(([key]) => key[0] === "t").reduce((all, [_, current]) => all | current, 0);
        const campsitePermissions = entries.filter(([key]) => key[0] === "c").reduce((all, [_, current]) => all | current, 0);
        console.log({ tentPermissions, campsitePermissions, entries, });
        return onChanged(isValid, { tentPermissions, campsitePermissions } satisfies Pick<FormValues, "campsitePermissions" | "tentPermissions">);
    };

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
                            defaultValue: value.campsitePermissions & CampsitePermissionConsts.MANAGE_CAMPSITE,
                            checkedValue: CampsitePermissionConsts.MANAGE_CAMPSITE,
                        },
                        {
                            id: "c1",
                            type: "switch",
                            label: "Manage Bonfires",
                            description: "Allows members with this role to edit and delete bonfires.",
                            defaultValue: value.campsitePermissions & CampsitePermissionConsts.MANAGE_BONFIRES,
                            checkedValue: CampsitePermissionConsts.MANAGE_BONFIRES,
                        },
                        {
                            id: "c2",
                            type: "switch",
                            label: "Manage Tents",
                            description: "Allows members with this role to edit and delete tents.",
                            defaultValue: value.campsitePermissions & CampsitePermissionConsts.MANAGE_TENTS,
                            checkedValue: CampsitePermissionConsts.MANAGE_TENTS,
                        },
                        {
                            id: "c3",
                            type: "switch",
                            label: "Manage Roles",
                            description: "Allows members with this role to edit and delete roles below their highest role.",
                            defaultValue: value.campsitePermissions & CampsitePermissionConsts.MANAGE_ROLES,
                            checkedValue: CampsitePermissionConsts.MANAGE_ROLES,
                        },
                        {
                            id: "c4",
                            type: "switch",
                            label: "Give Roles",
                            description: "Allows members with this role to give and remove roles that are lower than their highest role from other members.",
                            defaultValue: value.campsitePermissions & CampsitePermissionConsts.GIVE_ROLES,
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
                            defaultValue: value.campsitePermissions & CampsitePermissionConsts.MUTE_MEMBERS,
                            checkedValue: CampsitePermissionConsts.MUTE_MEMBERS,
                        },
                        {
                            id: "c6",
                            type: "switch",
                            label: "Kick Members",
                            description: "Allows members with this role to remove other members with lower rank/roles from this campsite.",
                            defaultValue: value.campsitePermissions & CampsitePermissionConsts.KICK_MEMBERS,
                            checkedValue: CampsitePermissionConsts.KICK_MEMBERS,
                        },
                        {
                            id: "c7",
                            type: "switch",
                            label: "Ban Members",
                            description: "Allows members with this role to remove other members with lower rank/roles from this campsite and disallow from them joining again or allow them to join again.",
                            defaultValue: value.campsitePermissions & CampsitePermissionConsts.BAN_MEMBERS,
                            checkedValue: CampsitePermissionConsts.BAN_MEMBERS,
                        },
                        {
                            id: "c8",
                            type: "switch",
                            label: "Manage Their Own Identity",
                            description: "Allows members with this role to change their nicknames and avatars in this campsite.",
                            defaultValue: value.campsitePermissions & CampsitePermissionConsts.MANAGE_SELF_IDENTITY,
                            checkedValue: CampsitePermissionConsts.MANAGE_SELF_IDENTITY,
                        },
                        {
                            id: "c9",
                            type: "switch",
                            label: "Manage Identity of Others",
                            description: "Allows members with this role to change nicknames and remove avatars of other members in this campsite.",
                            defaultValue: value.campsitePermissions & CampsitePermissionConsts.MANAGE_OTHERS_IDENTITY,
                            checkedValue: CampsitePermissionConsts.MANAGE_OTHERS_IDENTITY,
                        },
                        {
                            id: "c10",
                            type: "switch",
                            label: "Create Invites",
                            description: "Allows members with this role to create invites to this campsite.",
                            defaultValue: value.campsitePermissions & CampsitePermissionConsts.CREATE_INVITES,
                            checkedValue: CampsitePermissionConsts.CREATE_INVITES,
                        },
                        {
                            id: "c11",
                            type: "switch",
                            label: "Manage Invites",
                            description: "Allows members with this role to delete campsite's invites.",
                            defaultValue: value.campsitePermissions & CampsitePermissionConsts.MANAGE_INVITES,
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
                            defaultValue: value.tentPermissions & TentPermissionConsts.VIEW_CONTENT,
                            checkedValue: TentPermissionConsts.VIEW_CONTENT,
                        },
                        {
                            id: "t2",
                            type: "switch",
                            label: "Create Content",
                            description: "Allows members with this role to send messages in tents.",
                            defaultValue: value.tentPermissions & TentPermissionConsts.CREATE_CONTENT,
                            checkedValue: TentPermissionConsts.CREATE_CONTENT,
                        },
                        {
                            id: "t3",
                            type: "switch",
                            label: "Pin Content",
                            description: "Allows members with this role to pin messages in tents.",
                            defaultValue: value.tentPermissions & TentPermissionConsts.PIN_CONTENT,
                            checkedValue: TentPermissionConsts.PIN_CONTENT,
                        },
                        {
                            id: "t4",
                            type: "switch",
                            label: "Manage Content",
                            description: "Allows members with this role to delete messages of other members.",
                            defaultValue: value.tentPermissions & TentPermissionConsts.MANAGE_CONTENT,
                            checkedValue: TentPermissionConsts.MANAGE_CONTENT,
                        },
                        {
                            id: "t5",
                            type: "switch",
                            label: "Mention @everyone and @here",
                            description: "Allows members with this role to mention @everyone and @here.",
                            defaultValue: value.tentPermissions & TentPermissionConsts.MENTION_EVERYONE,
                            checkedValue: TentPermissionConsts.MENTION_EVERYONE,
                        },
                        {
                            id: "t6",
                            type: "switch",
                            label: "Create Private Content",
                            description: "Allows members with this role to send private messages in this campsite.",
                            defaultValue: value.tentPermissions & TentPermissionConsts.CREATE_PRIVATE_CONTENT,
                            checkedValue: TentPermissionConsts.CREATE_PRIVATE_CONTENT,
                        },
                    ],
                },
            ]}
            onChange={onValuesChanged}
        />
    );
}