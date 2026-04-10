import {
    IconCampfireFilled,
    IconHash,
    IconPaletteFilled,
    IconUserFilled,
} from "@tabler/icons-react";
import type { RolePageTabProps } from ".";
import {
    ContentPermissionConsts,
    GeneralPermissionConsts,
} from "~/util/permissions";
import FormFieldFlags from "~/components/form/FormFieldFlags";
import FormSection from "~/components/form/FormSection";
import FormFieldObject from "~/components/form/FormFieldObject";
import { FormControl, Divider } from "@mui/joy";
import FormFieldSwitch from "~/components/form/FormFieldSwitch";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";

export default function RolePagePermissions({
    defaultValues,
}: RolePageTabProps) {
    return (
        <FormFieldObject id="permissions">
            <FormSection>
                <FormFieldFlags id="general">
                    <FormSection
                        layout="divided"
                        startDecorator={<IconCampfireFilled />}
                        header={
                            <FormattedMessageGlobal id="app.permissions.campsites" />
                        }
                    >
                        <FormControl>
                            <FormFieldSwitch
                                id={GeneralPermissionConsts.MANAGE_CAMPSITE}
                                label={
                                    <FormattedMessageGlobal id="app.permissions.manageCampsites" />
                                }
                                description={
                                    <FormattedMessageGlobal id="app.permissions.manageCampsites.desc" />
                                }
                                defaultValue={
                                    (defaultValues.permissions.general &
                                        GeneralPermissionConsts.MANAGE_CAMPSITE) ==
                                    GeneralPermissionConsts.MANAGE_CAMPSITE
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormFieldSwitch
                                id={GeneralPermissionConsts.MANAGE_BONFIRES}
                                label={
                                    <FormattedMessageGlobal id="app.permissions.manageBonfires" />
                                }
                                description={
                                    <FormattedMessageGlobal id="app.permissions.manageBonfires.desc" />
                                }
                                defaultValue={
                                    (defaultValues.permissions.general &
                                        GeneralPermissionConsts.MANAGE_BONFIRES) ==
                                    GeneralPermissionConsts.MANAGE_BONFIRES
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormFieldSwitch
                                id={GeneralPermissionConsts.MANAGE_TENTS}
                                label={
                                    <FormattedMessageGlobal id="app.permissions.manageTents" />
                                }
                                description={
                                    <FormattedMessageGlobal id="app.permissions.manageTents.desc" />
                                }
                                defaultValue={
                                    (defaultValues.permissions.general &
                                        GeneralPermissionConsts.MANAGE_TENTS) ==
                                    GeneralPermissionConsts.MANAGE_TENTS
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormFieldSwitch
                                id={GeneralPermissionConsts.MANAGE_ROLES}
                                label={
                                    <FormattedMessageGlobal id="app.permissions.manageRoles" />
                                }
                                description={
                                    <FormattedMessageGlobal id="app.permissions.manageRoles.desc" />
                                }
                                defaultValue={
                                    (defaultValues.permissions.general &
                                        GeneralPermissionConsts.MANAGE_ROLES) ==
                                    GeneralPermissionConsts.MANAGE_ROLES
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormFieldSwitch
                                id={GeneralPermissionConsts.GIVE_ROLES}
                                label={
                                    <FormattedMessageGlobal id="app.permissions.giveRoles" />
                                }
                                description={
                                    <FormattedMessageGlobal id="app.permissions.manageRoles.desc" />
                                }
                                defaultValue={
                                    (defaultValues.permissions.general &
                                        GeneralPermissionConsts.GIVE_ROLES) ==
                                    GeneralPermissionConsts.GIVE_ROLES
                                }
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
                            <FormFieldSwitch
                                id={GeneralPermissionConsts.MUTE_MEMBERS}
                                label={
                                    <FormattedMessageGlobal id="app.permissions.muteMembers" />
                                }
                                description={
                                    <FormattedMessageGlobal id="app.permissions.muteMembers.desc" />
                                }
                                defaultValue={
                                    (defaultValues.permissions.general &
                                        GeneralPermissionConsts.MUTE_MEMBERS) ==
                                    GeneralPermissionConsts.MUTE_MEMBERS
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormFieldSwitch
                                id={GeneralPermissionConsts.KICK_MEMBERS}
                                label={
                                    <FormattedMessageGlobal id="app.permissions.kickMembers" />
                                }
                                description={
                                    <FormattedMessageGlobal id="app.permissions.kickMembers.desc" />
                                }
                                defaultValue={
                                    (defaultValues.permissions.general &
                                        GeneralPermissionConsts.KICK_MEMBERS) ==
                                    GeneralPermissionConsts.KICK_MEMBERS
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormFieldSwitch
                                id={GeneralPermissionConsts.BAN_MEMBERS}
                                label={
                                    <FormattedMessageGlobal id="app.permissions.banMembers" />
                                }
                                description={
                                    <FormattedMessageGlobal id="app.permissions.banMembers.desc" />
                                }
                                defaultValue={
                                    (defaultValues.permissions.general &
                                        GeneralPermissionConsts.BAN_MEMBERS) ==
                                    GeneralPermissionConsts.BAN_MEMBERS
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormFieldSwitch
                                id={GeneralPermissionConsts.CREATE_INVITES}
                                label={
                                    <FormattedMessageGlobal id="app.permissions.createInvites" />
                                }
                                description={
                                    <FormattedMessageGlobal id="app.permissions.createInvites.desc" />
                                }
                                defaultValue={
                                    (defaultValues.permissions.general &
                                        GeneralPermissionConsts.CREATE_INVITES) ==
                                    GeneralPermissionConsts.CREATE_INVITES
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormFieldSwitch
                                id={GeneralPermissionConsts.MANAGE_INVITES}
                                label={
                                    <FormattedMessageGlobal id="app.permissions.manageInvites" />
                                }
                                description={
                                    <FormattedMessageGlobal id="app.permissions.manageInvites.desc" />
                                }
                                defaultValue={
                                    (defaultValues.permissions.general &
                                        GeneralPermissionConsts.MANAGE_INVITES) ==
                                    GeneralPermissionConsts.MANAGE_INVITES
                                }
                            />
                        </FormControl>
                    </FormSection>
                    <FormSection
                        layout="divided"
                        startDecorator={<IconPaletteFilled />}
                        header={
                            <FormattedMessage
                                id="app.permissions.customization"
                                defaultMessage="Customization permissions"
                                description="Header for customization permissions in the permission list"
                            />
                        }
                    >
                        <FormControl>
                            <FormFieldSwitch
                                id={
                                    GeneralPermissionConsts.MANAGE_SELF_IDENTITY
                                }
                                label="Manage Their Own Identity"
                                description="Allows members with this role to change their nicknames and avatars in this campsite."
                                defaultValue={
                                    (defaultValues.permissions.general &
                                        GeneralPermissionConsts.MANAGE_SELF_IDENTITY) ==
                                    GeneralPermissionConsts.MANAGE_SELF_IDENTITY
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormFieldSwitch
                                id={
                                    GeneralPermissionConsts.MANAGE_OTHERS_IDENTITY
                                }
                                label="Manage Identity of Others"
                                description="Allows members with this role to change nicknames and remove avatars of other members in this campsite."
                                defaultValue={
                                    (defaultValues.permissions.general &
                                        GeneralPermissionConsts.MANAGE_OTHERS_IDENTITY) ==
                                    GeneralPermissionConsts.MANAGE_OTHERS_IDENTITY
                                }
                            />
                        </FormControl>
                    </FormSection>
                </FormFieldFlags>
            </FormSection>
            <Divider>
                <FormattedMessageGlobal id="app.permissions.tentDivider" />
            </Divider>
            <FormSection>
                <FormFieldFlags id="content">
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
                            <FormFieldSwitch
                                id={ContentPermissionConsts.VIEW_CONTENT}
                                label="View Content"
                                description="Allows members to view tents and tent messages."
                                defaultValue={
                                    (defaultValues.permissions.content &
                                        ContentPermissionConsts.VIEW_CONTENT) ==
                                    ContentPermissionConsts.VIEW_CONTENT
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormFieldSwitch
                                id={ContentPermissionConsts.CREATE_CONTENT}
                                label="Create Content"
                                description="Allows members with this role to send messages in tents."
                                defaultValue={
                                    (defaultValues.permissions.content &
                                        ContentPermissionConsts.CREATE_CONTENT) ==
                                    ContentPermissionConsts.CREATE_CONTENT
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormFieldSwitch
                                id={ContentPermissionConsts.PIN_CONTENT}
                                label="Pin Content"
                                description="Allows members with this role to pin messages in tents."
                                defaultValue={
                                    (defaultValues.permissions.content &
                                        ContentPermissionConsts.PIN_CONTENT) ==
                                    ContentPermissionConsts.PIN_CONTENT
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormFieldSwitch
                                id={ContentPermissionConsts.MANAGE_CONTENT}
                                label="Manage Content"
                                description="Allows members with this role to delete messages of other members."
                                defaultValue={
                                    (defaultValues.permissions.content &
                                        ContentPermissionConsts.MANAGE_CONTENT) ==
                                    ContentPermissionConsts.MANAGE_CONTENT
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormFieldSwitch
                                id={ContentPermissionConsts.MENTION_EVERYONE}
                                label="Mention @everyone and @here"
                                description="Allows members with this role to mention @everyone and @here."
                                defaultValue={
                                    (defaultValues.permissions.content &
                                        ContentPermissionConsts.MENTION_EVERYONE) ==
                                    ContentPermissionConsts.MENTION_EVERYONE
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormFieldSwitch
                                id={
                                    ContentPermissionConsts.CREATE_PRIVATE_CONTENT
                                }
                                label="Create Private Content"
                                description="Allows members with this role to send private messages in this campsite."
                                defaultValue={
                                    (defaultValues.permissions.content &
                                        ContentPermissionConsts.CREATE_PRIVATE_CONTENT) ==
                                    ContentPermissionConsts.CREATE_PRIVATE_CONTENT
                                }
                            />
                        </FormControl>
                    </FormSection>
                </FormFieldFlags>
            </FormSection>
        </FormFieldObject>
    );
}
