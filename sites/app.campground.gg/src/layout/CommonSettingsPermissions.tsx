import {
    CircularProgress,
    Dropdown,
    IconButton,
    FormControl,
    Divider,
    ListItemContent,
    ListItemDecorator,
    Menu,
    MenuButton,
    MenuItem,
    Stack,
    Typography,
} from "@mui/joy";
import type { CampsitePermissionViewBasic } from "types/permissions";
import type { CampsitePermissionView } from "types/permissions";
import type { RoleView } from "types/roles";
import { useContext, useMemo, useState } from "react";
import { GradientTypography, Group } from "components";
import {
    IconCampfireFilled,
    IconHash,
    IconPlus,
    IconUserFilled,
} from "@tabler/icons-react";
import Form from "~/components/form/Form";
import {
    GeneralPermissionConsts,
    ContentPermissionConsts,
} from "~/util/permissions";
import { CampsiteContextSuiteContext } from "~/routes/_global._campsite/context";
import type { SettingsComponentProps } from "./SettingsModal";
import PermissionItem from "./PermissionItem";
import type { TristateValue } from "~/components/Tristate";
import type { PermissionsDictionary } from "types/permissions";
import type PermissionsManager from "~/context/permissions/PermissionsManager";
import { colorToDecimal } from "~/util/color";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";
import FormFieldObject from "~/components/form/FormFieldObject";
import FormSection from "~/components/form/FormSection";
import FormFieldTristate from "~/components/form/FormFieldTristate";
import FormFieldTristateFlags, { type FormFieldTristateFlagsValue } from "~/components/form/FormFieldTristateFlags";

type CampsitePermissionViewSettings = Pick<
    CampsitePermissionViewBasic,
    "userId" | "roleId" | "permissions"
> & { new?: true };

function createNewPermission({
    roleId,
    userId,
}: {
    roleId?: string;
    userId?: string;
}): CampsitePermissionViewSettings {
    return {
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
            },
        },
    };
}

export default function CommonSettingsPermissions({
    onValuesChanged,
    settingsProps: {
        tentId,
        bonfireId,
        categoryId
    },
}: SettingsComponentProps<{
    permissions: PermissionsManager;
    tentId?: string;
    categoryId?: string;
    bonfireId?: string;
}>) {
    const {
        campsite: { roles },
        // TODO!!!!
        permissions: { tentList: { value: tentListValue } },
        session,
        floaters,
    } = useContext(CampsiteContextSuiteContext);
    const defaultRole = roles.find((x) => (x.flags & 1) === 1)!;
    const [permissions, setPermissions] = useState(
        [] as CampsitePermissionViewSettings[],
    );
    const [loading, setLoading] = useState(true);
    const [openPermission, setOpenPermission] =
        useState<CampsitePermissionViewSettings>(null!);
    useMemo(() => {
        session.http.permissions
            .get({
                non_self: true,
                tent_id: tentId,
                bonfire_id: bonfireId,
                category_id: categoryId,
            } as
                | { bonfire_id: string }
                | { tent_id: string }
                | { category_id: string })
            .then((resp) => {
                if (!resp.ok) return floaters.notifyApiError(resp);

                const permissionsReceived = (
                    resp.content.permissions as CampsitePermissionViewBasic[]
                );
                const permissionsList = permissionsReceived.concat(tentListValue
                    ?.permissions
                    .filter((x) => bonfireId
                    ? x.bonfireId === bonfireId && !x.categoryId && !x.tentId
                    : x.categoryId === categoryId || x.tentId === tentId)
                    ?? []
                );

                const defaultRolePermission = permissionsList.find(
                    (x) => x.roleId === defaultRole.id,
                ) as CampsitePermissionViewSettings | undefined;
                const nonNullDefault =
                    defaultRolePermission ??
                    createNewPermission({ roleId: defaultRole.id });
                // Update it and make sure member role permission is selectable
                setPermissions(
                    defaultRolePermission
                        ? permissionsList
                        : (
                              permissionsList as CampsitePermissionViewSettings[]
                          ).concat(nonNullDefault),
                );
                // Default member role is selected
                setOpenPermission(nonNullDefault);
                return setLoading(false);
            });
    }, []);

    const onCreateRolePermission = (role: RoleView) => {
        const newPermission = createNewPermission({ roleId: role.id });
        const newPermissionList =
            openPermission.new && openPermission.roleId !== defaultRole.id
                ? permissions.filter(
                      (x) =>
                          x.userId !== openPermission.userId ||
                          x.roleId !== openPermission.roleId,
                  )
                : permissions;
        setPermissions(newPermissionList.concat(newPermission));
        return setOpenPermission(newPermission);
    };
    const changeOpenPermission = (
        permission: CampsitePermissionViewSettings,
    ) => {
        const oldOpenPermission = openPermission;
        setOpenPermission(permission);

        if (
            oldOpenPermission.new &&
            oldOpenPermission.roleId !== defaultRole.id
        )
            return setPermissions(
                permissions.filter(
                    (x) =>
                        x.userId !== oldOpenPermission.userId ||
                        x.roleId !== oldOpenPermission.roleId,
                ),
            );
    };

    if (loading) return <CircularProgress />;

    const existingRoleIds =
        permissions
            .filter((x) => x.roleId)
            .map((x) => x.roleId);

    console.log({ existingRoleIds, roles, permissions });

    return (
        <Group sx={{ width: "100%", height: "100%" }} gap={2}>
            <Stack sx={{ width: { xs: 128, lg: 256 }, height: "100%" }} gap={2}>
                <Group alignItems="center" gap={1}>
                    <Typography level="title-lg" flex={1}>
                        <FormattedMessageGlobal id="app.permissions.plural" />
                    </Typography>
                    <Dropdown>
                        <MenuButton
                            slots={{ root: IconButton }}
                            slotProps={{ root: { size: "sm" } }}
                        >
                            <IconPlus size={16} />
                        </MenuButton>
                        <Menu variant="soft">
                            {roles
                                .filter((x) => !existingRoleIds.includes(x.id))
                                .map((x) => (
                                    <MenuItem
                                        key={x.id}
                                        onClick={() =>
                                            onCreateRolePermission(x)
                                        }
                                    >
                                        <ListItemDecorator>
                                            <IconPlus size={16} />
                                        </ListItemDecorator>
                                        <ListItemContent>
                                            <GradientTypography
                                                colors={colorToDecimal(
                                                    x.colors,
                                                )}
                                            >
                                                {x.name}
                                            </GradientTypography>
                                        </ListItemContent>
                                    </MenuItem>
                                ))}
                        </Menu>
                    </Dropdown>
                </Group>
                <Stack sx={{ height: "100%" }}>
                    {permissions
                        .filter((x) => x.roleId)
                        .map(
                            (x) =>
                                [x, roles.find((y) => y.id === x.roleId)] as [
                                    CampsitePermissionViewSettings,
                                    RoleView | undefined,
                                ],
                        )
                        .sort(
                            (a, b) =>
                                (a[1]?.position ?? 0) - (b[1]?.position ?? 0),
                        )
                        .map(([permission, role]) => (
                            <PermissionItem
                                key={`${permission.userId}:${permission.roleId}`}
                                role={role}
                                active={openPermission === permission}
                                onClick={() => changeOpenPermission(permission)}
                                {...permission}
                            />
                        ))}
                </Stack>
            </Stack>
            <PermissionsPage
                role={
                    (openPermission.roleId &&
                        roles.find((x) => x.id === openPermission.roleId)) ||
                    null
                }
                permission={openPermission}
                onChanged={onValuesChanged}
                onDelete={() => null}
            />
        </Group>
    );
}

type FormValuesResult = Pick<CampsitePermissionViewSettings, "permissions">;
type PermissionsPageProps = {
    onDelete: () => unknown;
    permission: CampsitePermissionViewSettings;
    role: RoleView | null;
    onChanged: (
        valid: boolean,
        changed: boolean,
        values: FormValuesResult & { roleId?: string; userId?: string },
    ) => unknown;
};

function reducePermissionFields(entries: [keyof PermissionsDictionary, FormFieldTristateFlagsValue][]) {
    return entries.reduce(
        (perms, [key, value]) => (
            Object.assign(perms.allowed, { [key]: value.allowed }),
            Object.assign(perms.denied, { [key]: value.denied }),
            perms
        ),
        {
            allowed: { general: 0, content: 0 },
            denied: { general: 0, content: 0 },
        } satisfies CampsitePermissionView["permissions"],
    );
}

function getTristateValue(
    combinedValues: FormValuesResult,
    type: keyof PermissionsDictionary,
    value: number,
): TristateValue {
    return (combinedValues.permissions.allowed[type] & value) === value
        ? "on"
        : (combinedValues.permissions.denied[type] & value) === value
          ? "off"
          : "pass";
}

function PermissionsPage({
    permission,
    role,
    onChanged,
}: PermissionsPageProps) {
    const {
        defaultValues,
        combinedValues,
    }: { defaultValues: FormValuesResult; combinedValues: FormValuesResult & { hasEverChanged: boolean; }; } = useMemo(
        () => ({
            defaultValues: {
                permissions: permission.permissions,
            },
            combinedValues: {
                hasEverChanged: false,
                permissions: {
                    allowed: Object.assign({}, permission.permissions.allowed),
                    denied: Object.assign({}, permission.permissions.denied),
                },
            },
        }),
        [permission.roleId, permission.userId],
    );

    const onValuesChanged = (
        isValid: boolean,
        values: Record<string, any>,
    ) => {
        const entries = Object.entries(values.permissions) as [keyof PermissionsDictionary, FormFieldTristateFlagsValue][];

        const formValues = { permissions: reducePermissionFields(entries) };
        const hasChanged = entries
            .map(([key, value]) =>
                defaultValues.permissions.allowed[key] !== value.allowed ||
                defaultValues.permissions.denied[key] !== value.denied
            )
            .some((x) => x);

        Object.assign(combinedValues, formValues, { hasEverChanged: combinedValues.hasEverChanged || hasChanged });

        console.log(combinedValues.hasEverChanged, hasChanged, combinedValues, defaultValues);
        if (combinedValues.hasEverChanged)
            return onChanged(isValid, hasChanged, {
                ...formValues,
                roleId: permission.roleId,
                userId: permission.userId,
            });
    };

    const permissionDefault = useMemo(() => ({
        general: {
            allowed:
                defaultValues.permissions.allowed
                    .general,
            denied: defaultValues.permissions.denied
                .general,
        },
        content: {
            allowed:
                defaultValues.permissions.allowed
                    .content,
            denied: defaultValues.permissions.denied
                .content,
        } 
    }), [permission.roleId, permission.userId])

    return (
        <Stack flex={1} gap={2} sx={{ overflow: "hidden", height: "100%" }}>
            <Typography px={2} level="title-lg">
                {role?.name ?? permission.userId}
            </Typography>
            <Stack sx={{ overflowY: "auto" }} p={2}>
                <Form
                    gap={6}
                    onChange={onValuesChanged}
                >
                    <FormFieldObject
                        id="permissions"
                        defaultValue={permissionDefault}
                    >
                        <FormSection>
                            <FormFieldTristateFlags
                                id="general"
                                defaultValue={permissionDefault.general}
                            >
                                <FormSection
                                    layout="divided"
                                    startDecorator={<IconCampfireFilled />}
                                    header={
                                        <FormattedMessageGlobal id="app.permissions.campsites" />
                                    }
                                >
                                    <FormControl>
                                        <FormFieldTristate
                                            id={
                                                GeneralPermissionConsts.MANAGE_BONFIRES
                                            }
                                            label={
                                                <FormattedMessageGlobal id="app.permissions.manageBonfires" />
                                            }
                                            description={
                                                <FormattedMessageGlobal id="app.permissions.manageBonfires.desc" />
                                            }
                                            defaultValue={getTristateValue(
                                                combinedValues,
                                                "general",
                                                GeneralPermissionConsts.MANAGE_BONFIRES,
                                            )}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormFieldTristate
                                            id={
                                                GeneralPermissionConsts.MANAGE_TENTS
                                            }
                                            label={
                                                <FormattedMessageGlobal id="app.permissions.manageTents" />
                                            }
                                            description={
                                                <FormattedMessageGlobal id="app.permissions.manageTents.desc" />
                                            }
                                            defaultValue={getTristateValue(
                                                combinedValues,
                                                "general",
                                                GeneralPermissionConsts.MANAGE_TENTS,
                                            )}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormFieldTristate
                                            id={
                                                GeneralPermissionConsts.MANAGE_ROLES
                                            }
                                            label={
                                                <FormattedMessageGlobal id="app.permissions.managePermissions" />
                                            }
                                            description={
                                                <FormattedMessageGlobal id="app.permissions.managePermissions.desc" />
                                            }
                                            defaultValue={getTristateValue(
                                                combinedValues,
                                                "general",
                                                GeneralPermissionConsts.MANAGE_ROLES,
                                            )}
                                        />
                                    </FormControl>
                                </FormSection>
                                <FormSection
                                    layout="divided"
                                    startDecorator={<IconUserFilled />}
                                    header={
                                        <FormattedMessageGlobal id="app.permissions.membership" />
                                    }
                                >
                                    <FormControl>
                                        <FormFieldTristate
                                            id={
                                                GeneralPermissionConsts.CREATE_INVITES
                                            }
                                            label={
                                                <FormattedMessageGlobal id="app.permissions.createInvites" />
                                            }
                                            description={
                                                <FormattedMessageGlobal id="app.permissions.createInvites.desc" />
                                            }
                                            defaultValue={getTristateValue(
                                                combinedValues,
                                                "general",
                                                GeneralPermissionConsts.CREATE_INVITES,
                                            )}
                                        />
                                    </FormControl>
                                </FormSection>
                            </FormFieldTristateFlags>
                        </FormSection>
                        <Divider>
                            <FormattedMessageGlobal id="app.permissions.tentDivider" />
                        </Divider>
                        <FormSection>
                            <FormFieldTristateFlags
                                id="content"
                                defaultValue={permissionDefault.content}
                            >
                                <FormSection
                                    layout="divided"
                                    startDecorator={<IconHash />}
                                    header={
                                        <FormattedMessage
                                            id="app.permissions.tent"
                                            defaultMessage="Tent permissions"
                                            description="Header for tent permissions in the permission list"
                                        />
                                    }
                                >
                                    <FormControl>
                                        <FormFieldTristate
                                            id={
                                                ContentPermissionConsts.VIEW_CONTENT
                                            }
                                            label={
                                                <FormattedMessageGlobal
                                                    id="app.permissions.viewContent"
                                                />
                                            }
                                            description={
                                                <FormattedMessageGlobal
                                                    id="app.permissions.viewContent.desc"
                                                />
                                            }
                                            defaultValue={getTristateValue(
                                                combinedValues,
                                                "content",
                                                ContentPermissionConsts.VIEW_CONTENT,
                                            )}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormFieldTristate
                                            id={
                                                ContentPermissionConsts.CREATE_CONTENT
                                            }
                                            label={
                                                <FormattedMessageGlobal
                                                    id="app.permissions.createContent"
                                                />
                                            }
                                            description={
                                                <FormattedMessageGlobal
                                                    id="app.permissions.createContent.desc"
                                                />
                                            }
                                            defaultValue={getTristateValue(
                                                combinedValues,
                                                "content",
                                                ContentPermissionConsts.CREATE_CONTENT,
                                            )}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormFieldTristate
                                            id={
                                                ContentPermissionConsts.PIN_CONTENT
                                            }
                                            label={
                                                <FormattedMessageGlobal
                                                    id="app.permissions.pinContent"
                                                />
                                            }
                                            description={
                                                <FormattedMessageGlobal
                                                    id="app.permissions.pinContent.desc"
                                                />
                                            }
                                            defaultValue={getTristateValue(
                                                combinedValues,
                                                "content",
                                                ContentPermissionConsts.PIN_CONTENT,
                                            )}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormFieldTristate
                                            id={
                                                ContentPermissionConsts.MANAGE_CONTENT
                                            }
                                            label={
                                                <FormattedMessageGlobal
                                                    id="app.permissions.manageContent"
                                                />
                                            }
                                            description={
                                                <FormattedMessageGlobal
                                                    id="app.permissions.manageContent.desc"
                                                />
                                            }
                                            defaultValue={getTristateValue(
                                                combinedValues,
                                                "content",
                                                ContentPermissionConsts.MANAGE_CONTENT,
                                            )}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormFieldTristate
                                            id={
                                                ContentPermissionConsts.MENTION_EVERYONE
                                            }
                                            label={
                                                <FormattedMessageGlobal
                                                    id="app.permissions.mentionEveryone"
                                                />
                                            }
                                            description={
                                                <FormattedMessageGlobal
                                                    id="app.permissions.mentionEveryone.desc"
                                                />
                                            }
                                            defaultValue={getTristateValue(
                                                combinedValues,
                                                "content",
                                                ContentPermissionConsts.MENTION_EVERYONE,
                                            )}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormFieldTristate
                                            id={
                                                ContentPermissionConsts.CREATE_PRIVATE_CONTENT
                                            }
                                            label={
                                                <FormattedMessageGlobal
                                                    id="app.permissions.createPrivateContent"
                                                />
                                            }
                                            description={
                                                <FormattedMessageGlobal
                                                    id="app.permissions.createPrivateContent.desc"
                                                />
                                            }
                                            defaultValue={getTristateValue(
                                                combinedValues,
                                                "content",
                                                ContentPermissionConsts.CREATE_PRIVATE_CONTENT,
                                            )}
                                        />
                                    </FormControl>
                                </FormSection>
                            </FormFieldTristateFlags>
                        </FormSection>
                    </FormFieldObject>
                </Form>
            </Stack>
        </Stack>
    );
}
