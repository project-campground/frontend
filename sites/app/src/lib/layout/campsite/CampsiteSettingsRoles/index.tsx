import { IconButton, Stack, TabPanel, Tabs } from "@mui/joy";
import type { SettingsComponentProps } from "../../settings";
import type { CampsiteViewDetailed } from "types/campground/campsites";
import type { GetRolesOutput } from "types/campground/roles";
import type { RoleView } from "types/campground/roles";
import RoleItem, { RoleItemGap } from "../RoleItem";
import React, { useMemo, useState } from "react";
import { SmoothTabList } from "@campground/ui";
import {
    IconBadgesFilled,
    IconListCheck,
    IconPaletteFilled,
    IconPlus,
    IconSettingsFilled,
} from "@tabler/icons-react";
import Form from "~/components/form/Form";
import type { HttpResponseWithContent } from "~/api/http/HTTPResponse";
import { useCampsiteContext } from "~/routes/_global._campsite/context";
import { DragDropProvider } from "~/draggable";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";
import RolePagePermissions from "./permissions";
import RolePageDisplay from "./display";
import RolePageManage from "./manage";
import SettingsPageWrapper from "~/layout/settings/page";

type NewRole = RoleView & { added: true };
type SettingsRole = RoleView | NewRole;

export default function CampsiteSettingsRoles({
    setResetHandler,
    onValuesChanged,
    settingsProps: { campsite },
}: SettingsComponentProps<{ campsite: CampsiteViewDetailed }>) {
    const { api, updateCampsite, floaters } = useCampsiteContext();
    const roles = useMemo<SettingsRole[]>(
        () => campsite.roles,
        [campsite, campsite.roles],
    );
    const [openRole, setOpenRole] = useState(roles.slice(-1)[0]);

    const createNewRole = () =>
        api.roles
            .create(campsite.id, {
                name: "New role",
                colors: [],
                motion: "none",
                raised: false,
                pingable: false,
                permissions: {
                    general: 0,
                    content: 0,
                },
            })
            .then((resp) => {
                if (!resp.ok)
                    return floaters.notifyApiError(resp);

                const newRole = { ...resp.content, added: true };
                updateCampsite({ roles: [...roles, newRole] });
                return setOpenRole(newRole);
            });
    const moveRole = (roleMoved: string, movedTo: string) => {
        if (roleMoved === movedTo) return;

        const movedFromIndex = roles.findIndex((x) => x.id === roleMoved);
        const movedToIndex = roles.findIndex((x) => x.id === movedTo);

        if (movedFromIndex + 1 === movedToIndex) return;

        // Move a single role, because it is at the top or there is space between priorities that the role can be nudged to
        if (
            !movedToIndex ||
            Math.abs(
                roles[movedToIndex - 1].position - roles[movedToIndex].position,
            ) > 1
        )
            return api.roles
                .moveMany(campsite.id, {
                    rolesByPosition: {
                        [roleMoved]: roles[movedToIndex]!.position - 1,
                    },
                })
                .then(onRolesMoved);

        const newPriority = roles[movedToIndex].position;
        const rolesToAdditionallyMove = roles
            .slice(movedToIndex)
            .filter((x) => x.id !== roleMoved)
            .map((role, i) => [role.id, newPriority + 1 + i]);
        const newPriorities = Object.assign(
            Object.fromEntries(rolesToAdditionallyMove),
            { [roleMoved]: newPriority },
        );

        return api.roles
            .moveMany(campsite.id, {
                rolesByPosition: newPriorities,
            })
            .then(onRolesMoved);
    };
    const onRolesMoved = (
        updatedRoles: HttpResponseWithContent<GetRolesOutput>,
    ) => {
        if (!updatedRoles.ok) return floaters.notifyApiError(updatedRoles);
        const updatedRoleIds = updatedRoles.content.roles.map((x) => x.id);
        const withoutUpdated = roles.filter(
            (x) => !updatedRoleIds.includes(x.id),
        );
        const withUpdated = withoutUpdated.concat(updatedRoles.content.roles);
        return updateCampsite({ roles: withUpdated });
    };
    const deleteRole = async (roleToDelete: SettingsRole) => {
        const roleIndex = roles.indexOf(roleToDelete);

        return api.roles.delete(campsite.id, roleToDelete.id).then((resp) => {
            if (!resp.ok) return floaters.notifyApiError(resp);

            updateCampsite({
                roles: roles.filter((x) => x.id !== roleToDelete.id),
            });
            setOpenRole(roles[roleIndex + 1]);
        });
    };

    return (
        <SettingsPageWrapper
            startDecorator={<IconBadgesFilled />}
            endDecorator={
                <IconButton
                    size="sm"
                    onClick={createNewRole}
                    sx={{ "--IconButton-size": "1.5rem" }}
                >
                    <IconPlus size={16} />
                </IconButton>
            }
            header={<FormattedMessageGlobal id="app.roles" />}
            direction="row"
            sx={{ width: "100%", height: "100%" }}
            gap={2}
        >
            <Stack sx={{ width: { xs: 128, lg: 256 }, height: "100%" }} gap={2}>
                <DragDropProvider
                    onDropped={(draggedId, droppedId) =>
                        moveRole(draggedId, droppedId)
                    }
                >
                    <Stack sx={{ height: "100%" }}>
                        {roles.map((role) => (
                            <React.Fragment key={role.id}>
                                <RoleItemGap id={role.id} />
                                <RoleItem
                                    immovable={Boolean(role.flags & 1)}
                                    active={openRole === role}
                                    onClick={() => setOpenRole(role)}
                                    {...role}
                                />
                            </React.Fragment>
                        ))}
                    </Stack>
                </DragDropProvider>
            </Stack>
            <RolePage
                ref={(form) =>
                    (form as Form | undefined) && setResetHandler(form!.reset)
                }
                role={openRole}
                onChanged={onValuesChanged}
                onRoleDelete={deleteRole}
            />
        </SettingsPageWrapper>
    );
}

export type FormValues = Pick<
    RoleView,
    "id" | "name" | "colors" | "motion" | "pingable" | "raised" | "permissions"
>;
export type RolePageProps = {
    ref: (form: Form | null) => void;
    onRoleDelete: (role: SettingsRole) => unknown;
    role: SettingsRole;
    onChanged: (
        valid: boolean,
        changed: boolean,
        values: FormValues,
    ) => unknown;
};
export type RolePageTabProps = {
    defaultValues: Omit<FormValues, "id">;
    role: SettingsRole;
};

function RolePage({ ref, onRoleDelete, role, onChanged }: RolePageProps) {
    const {
        defaultValues,
        combinedValues,
    }: { defaultValues: Omit<FormValues, "id">; combinedValues: FormValues } =
        useMemo(
            () => ({
                defaultValues: {
                    name: role.name,
                    colors: role.colors,
                    motion: role.motion,
                    pingable: role.pingable,
                    raised: role.raised,
                    permissions: role.permissions,
                },
                combinedValues: {
                    id: role.id,
                    name: role.name,
                    colors: role.colors,
                    motion: role.motion,
                    pingable: role.pingable,
                    raised: role.raised,
                    permissions: role.permissions,
                },
            }),
            [role.id],
        );
    const defaultValueList = Object.keys(defaultValues).filter(
        (x) => x !== "permissions" && x !== "colors",
    ) as (keyof Omit<FormValues, "id" | "permissions">)[];
    const defaultPermissionList = Object.keys(
        defaultValues.permissions,
    ) as (keyof FormValues["permissions"])[];

    const onValuesChanged = (valid: boolean, values: Record<string, any>) => {
        Object.assign(combinedValues, Object.assign({}, values));

        const permissionsChanged = defaultPermissionList.some(
            (x) =>
                combinedValues.permissions[x] !== defaultValues.permissions[x],
        );
        const colorsChanged =
            defaultValues.colors.length !== combinedValues.colors.length ||
            defaultValues.colors.some(
                (defaultColor, i) => combinedValues.colors[i] !== defaultColor,
            );
        const anyValueChanged =
            colorsChanged ||
            permissionsChanged ||
            defaultValueList.some(
                (x) =>
                    combinedValues[x as (typeof defaultValueList)[number]] !==
                    defaultValues[x as (typeof defaultValueList)[number]],
            );

        return onChanged(valid, anyValueChanged, combinedValues);
    };

    return (
        <Stack flex={1} gap={2} sx={{ overflow: "hidden", height: "100%" }}>
            <Form
                ref={ref}
                header={role.name}
                onChange={onValuesChanged}
                hideOverflow
            >
                <Tabs sx={{ height: "100%" }}>
                    <SmoothTabList
                        tabs={[
                            {
                                id: 0,
                                name: (
                                    <FormattedMessage
                                        id="app.roles.display"
                                        defaultMessage="Display"
                                        description="Display tab in role settings"
                                    />
                                ),
                                startDecorator: <IconPaletteFilled />,
                            },
                            {
                                id: 1,
                                name: (
                                    <FormattedMessageGlobal id="app.permissions.plural" />
                                ),
                                startDecorator: <IconListCheck />,
                            },
                            {
                                id: 2,
                                name: (
                                    <FormattedMessage
                                        id="app.roles.manage"
                                        defaultMessage="Manage"
                                        description="Manage role tab in role settings"
                                    />
                                ),
                                startDecorator: <IconSettingsFilled />,
                            },
                        ]}
                    />
                    <TabPanel value={0} sx={{ overflowY: "auto" }}>
                        <RolePageDisplay
                            role={role}
                            defaultValues={defaultValues}
                        />
                    </TabPanel>
                    <TabPanel value={1} sx={{ overflowY: "auto" }}>
                        <RolePagePermissions
                            role={role}
                            defaultValues={defaultValues}
                        />
                    </TabPanel>
                    <TabPanel value={2} sx={{ overflowY: "auto" }}>
                        <RolePageManage
                            role={role}
                            onRoleDelete={onRoleDelete}
                        />
                    </TabPanel>
                </Tabs>
            </Form>
        </Stack>
    );
}
