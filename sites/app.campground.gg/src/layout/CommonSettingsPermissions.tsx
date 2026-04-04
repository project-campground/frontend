import { CircularProgress, Dropdown, IconButton, ListItemContent, ListItemDecorator, Menu, MenuButton, MenuItem, Stack, Typography } from "@mui/joy";
import type { CampsitePermissionViewBasic } from "types/permissions";
import type { CampsitePermissionView } from "types/permissions";
import type { RoleView } from "types/roles";
import { useContext, useMemo, useState } from "react";
import { GradientTypography, Group } from "components";
import { IconCampfireFilled, IconHash, IconPlus, IconUserFilled } from "@tabler/icons-react";
import Form from "~/components/form/Form";
import { GeneralPermissionConsts, ContentPermissionConsts } from "~/util/permissions";
import { CampsiteContextSuiteContext } from "~/routes/_global._campsite/context";
import type { SettingsComponentProps } from "./SettingsModal";
import PermissionItem from "./PermissionItem";
import type { TristateValue } from "~/components/Tristate";
import type { PermissionsDictionary } from "types/permissions";
import type PermissionsManager from "~/context/permissions/PermissionsManager";
import { colorToDecimal } from "~/util/color";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";

type CampsitePermissionViewSettings = Pick<CampsitePermissionViewBasic, "userId" | "roleId" | "permissions"> & { new?: true; };

function createNewPermission({ roleId, userId }: { roleId?: string; userId?: string; }): CampsitePermissionViewSettings {
    return {
        // id: Math.floor((Math.random() * 9900) + 100).toString(),
        new: true,
        roleId,
        userId,
        permissions: {
            allowed: {
                general: 0,
                content: 0,
            },
            denied: {
                general: 0,
                content: 0,
            }
        }
    };
}

export default function CommonSettingsPermissions({ onValuesChanged, settingsProps: { tentId, bonfireId, categoryId, permissions: permissionsManager } }: SettingsComponentProps<{ permissions: PermissionsManager, tentId?: string, categoryId?: string, bonfireId?: string }>) {
    const { campsite: { roles }, session, floaters } = useContext(CampsiteContextSuiteContext);
    const defaultRole = roles.find((x) => (x.flags & 1) === 1)!;
    const [permissions, setPermissions] = useState([] as CampsitePermissionViewSettings[]);
    const [loading, setLoading] = useState(true);
    const [openPermission, setOpenPermission] = useState<CampsitePermissionViewSettings>(null!);
    useMemo(() => {
        session
            .http
            .permissions
            .get({ non_self: true, tent_id: tentId, bonfire_id: bonfireId, category_id: categoryId } as ({ bonfire_id: string } | { tent_id: string } | { category_id: string }))
            .then((resp) => {
                if (!resp.ok)
                    return floaters.notifyApiError(resp);

                const permissionsReceived = (resp.content.permissions as CampsitePermissionViewBasic[]).concat(...(
                    permissionsManager
                        .tentList
                        .value
                        ?.permissions
                        .filter((x) => (x.bonfireId ?? null) === (bonfireId ?? null) && (x.tentId ?? null) === (tentId ?? null) && (x.categoryId ?? null) === (categoryId ?? null))
                    ?? []
                ));
                const defaultRolePermission = permissionsReceived.find((x) => x.roleId === defaultRole.id) as CampsitePermissionViewSettings | undefined;
                const nonNullDefault = defaultRolePermission ?? createNewPermission({ roleId: defaultRole.id });
                // Update it and make sure member role permission is selectable
                setPermissions(defaultRolePermission ? permissionsReceived : (permissionsReceived as CampsitePermissionViewSettings[]).concat(nonNullDefault));
                // Default member role is selected
                setOpenPermission(
                    nonNullDefault
                );
                return setLoading(false);
            });
    }, []);

    const onCreateRolePermission = (role: RoleView) => {
        const newPermission = createNewPermission({ roleId: role.id });
        const newPermissionList = openPermission.new && openPermission.roleId !== defaultRole.id ? permissions.filter((x) => x.userId !== openPermission.userId || x.roleId !== openPermission.roleId) : permissions;
        setPermissions(newPermissionList.concat(newPermission));
        return setOpenPermission(newPermission);
    }
    const changeOpenPermission = (permission: CampsitePermissionViewSettings) => {
        const oldOpenPermission = openPermission;
        setOpenPermission(permission);

        if (oldOpenPermission.new && oldOpenPermission.roleId !== defaultRole.id)
            return setPermissions(permissions.filter((x) => x.userId !== oldOpenPermission.userId || x.roleId !== oldOpenPermission.roleId));
    };

    if (loading)
        return <CircularProgress />;

    const existingRoleIds = permissions.filter((x) => x.roleId).map((x) => x.roleId);

    return (
        <Group sx={{ width: "100%", height: "100%", }} gap={2}>
            <Stack sx={{ width: { xs: 128, lg: 256 }, height: "100%" }} gap={2}>
                <Group alignItems="center" gap={1}>
                    <Typography level="title-lg" flex={1}>
                        <FormattedMessageGlobal id="app.permissions.plural" />,
                    </Typography>
                    <Dropdown>
                        <MenuButton slots={{ root: IconButton }} slotProps={{ root: { size: "sm" } }}>
                            <IconPlus size={16} />
                        </MenuButton>
                        <Menu variant="soft">
                            {roles.filter((x) => !existingRoleIds.includes(x.id)).map((x) =>
                                <MenuItem key={x.id} onClick={() => onCreateRolePermission(x)}>
                                    <ListItemDecorator>
                                        <IconPlus size={16} />
                                    </ListItemDecorator>
                                    <ListItemContent>
                                        <GradientTypography colors={colorToDecimal(x.colors)}>
                                            {x.name}
                                        </GradientTypography>
                                    </ListItemContent>
                                </MenuItem>
                            )}
                        </Menu>
                    </Dropdown>
                </Group>
                <Stack sx={{ height: "100%" }}>
                    {permissions
                        .filter((x) => x.roleId)
                        .map((x) => [x, roles.find((y) => y.id === x.roleId)] as [CampsitePermissionViewSettings, RoleView | undefined])
                        .sort((a, b) => (a[1]?.position ?? 0) - (b[1]?.position ?? 0))
                        .map(([permission, role]) =>
                            <PermissionItem key={`${permission.userId}:${permission.roleId}`} role={role} active={openPermission === permission} onClick={() => changeOpenPermission(permission)} {...permission} />
                        )
                    }
                </Stack>
            </Stack>
            <PermissionsPage
                role={openPermission.roleId && roles.find((x) => x.id === openPermission.roleId) || null}
                permission={openPermission}
                onChanged={onValuesChanged}
                onDelete={() => null}
            />
        </Group>
    )
}

type FormValues = Pick<CampsitePermissionViewSettings, "permissions">;
type PermissionsPageProps = { onDelete: () => unknown; permission: CampsitePermissionViewSettings; role: RoleView | null; onChanged: (valid: boolean, changed: boolean, values: FormValues & { roleId?: string, userId?: string; }) => unknown; };

function reduceTristateFields(entries: [string, TristateValue][]) {
    return entries.reduce(
        (perms, [key, value]) =>
            value === "pass"
            ? perms
            : (perms[value === "on" ? "allowed" : "denied"][key[0] === "c" ? "content" : "general"] |= 1 << (parseInt(key.slice(1))), perms),
        { allowed: { general: 0, content: 0 }, denied: { general: 0, content: 0 } } satisfies CampsitePermissionView["permissions"]
    );
}

function getTristateValue(combinedValues: FormValues, type: keyof PermissionsDictionary, value: number): TristateValue {
    return (
        (combinedValues.permissions.allowed[type] & value) === value
        ? "on"
        : (combinedValues.permissions.denied[type] & value) === value
        ? "off"
        : "pass"
    );
}

function PermissionsPage({ permission, role, onChanged }: PermissionsPageProps) {
    const { defaultValues, combinedValues }: { defaultValues: FormValues, combinedValues: FormValues } = useMemo(() => ({
        defaultValues: {
            permissions: permission.permissions,
        },
        combinedValues: {
            permissions: permission.permissions,
        }
    }), [permission.roleId, permission.userId]);

    const onValuesChanged = (isValid: boolean, values: Record<string, TristateValue>) => {
        const entries = Object.entries(values);

        console.log(entries);
        const permissions = reduceTristateFields(entries);
        const hasChanged =
            permissions.allowed.general !== defaultValues.permissions.allowed.general ||
            permissions.allowed.content !== defaultValues.permissions.allowed.content ||
            permissions.denied.general !== defaultValues.permissions.denied.general ||
            permissions.denied.content !== defaultValues.permissions.denied.content;

        combinedValues.permissions = permissions;
        return onChanged(isValid, hasChanged, { permissions, roleId: permission.roleId, userId: permission.userId });
    };

    return (
        <Stack flex={1} gap={2} sx={{ overflow: "hidden", height: "100%" }}>
            <Typography px={2} level="title-lg">{role?.name ?? permission.userId}</Typography>
            <Stack sx={{ overflowY: "auto" }} p={2}>
                <Form
                    gap={6}
                    sections={[
                        {
                            id: "general",
                            header: "Campsite permissions",
                            startDecorator: <IconCampfireFilled />,
                            layout: "divided",
                            fields: [
                                {
                                    id: "g1",
                                    type: "tristate",
                                    label: "Manage Bonfires",
                                    description: "Allows members with this role to edit and delete bonfires.",
                                    defaultValue: getTristateValue(combinedValues, "general", GeneralPermissionConsts.MANAGE_BONFIRES),
                                },
                                {
                                    id: "g2",
                                    type: "tristate",
                                    label: "Manage Tents",
                                    description: "Allows members with this role to edit and delete tents.",
                                    defaultValue: getTristateValue(combinedValues, "general", GeneralPermissionConsts.MANAGE_TENTS),
                                },
                                {
                                    id: "g3",
                                    type: "tristate",
                                    label: "Manage Permissions",
                                    description: "Allows members with this role to edit permissions below their highest role.",
                                    defaultValue: getTristateValue(combinedValues, "general", GeneralPermissionConsts.MANAGE_ROLES),
                                },
                            ],
                        },
                        {
                            id: "membership",
                            header: "Membership permissions",
                            startDecorator: <IconUserFilled />,
                            layout: "divided",
                            fields: [
                                {
                                    id: "g10",
                                    type: "tristate",
                                    label: "Create Invites",
                                    description: "Allows members with this role to create invites.",
                                    defaultValue: getTristateValue(combinedValues, "general", GeneralPermissionConsts.CREATE_INVITES),
                                },
                            ],
                        },
                        {
                            id: "content",
                            header: "Tent permissions",
                            startDecorator: <IconHash />,
                            layout: "divided",
                            fields: [
                                {
                                    id: "c0",
                                    type: "tristate",
                                    label: "View Content",
                                    description: "Allows members to view tents and tent messages.",
                                    defaultValue: getTristateValue(combinedValues, "content", ContentPermissionConsts.VIEW_CONTENT),
                                },
                                {
                                    id: "c1",
                                    type: "tristate",
                                    label: "Create Content",
                                    description: "Allows members with this role to send messages in tents.",
                                    defaultValue: getTristateValue(combinedValues, "content", ContentPermissionConsts.CREATE_CONTENT),
                                },
                                {
                                    id: "c2",
                                    type: "tristate",
                                    label: "Pin Content",
                                    description: "Allows members with this role to pin messages in tents.",
                                    defaultValue: getTristateValue(combinedValues, "content", ContentPermissionConsts.PIN_CONTENT),
                                },
                                {
                                    id: "c3",
                                    type: "tristate",
                                    label: "Manage Content",
                                    description: "Allows members with this role to delete messages of other members.",
                                    defaultValue: getTristateValue(combinedValues, "content", ContentPermissionConsts.MANAGE_CONTENT),
                                },
                                {
                                    id: "c4",
                                    type: "tristate",
                                    label: "Mention @everyone and @here",
                                    description: "Allows members with this role to mention @everyone and @here.",
                                    defaultValue: getTristateValue(combinedValues, "content", ContentPermissionConsts.MENTION_EVERYONE),
                                },
                                {
                                    id: "c5",
                                    type: "tristate",
                                    label: "Create Private Content",
                                    description: "Allows members with this role to send private messages in this campsite.",
                                    defaultValue: getTristateValue(combinedValues, "content", ContentPermissionConsts.CREATE_PRIVATE_CONTENT),
                                },
                            ],
                        },
                    ]}
                    onChange={onValuesChanged}
                />
            </Stack>
        </Stack>
    );
}