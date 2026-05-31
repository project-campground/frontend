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
import { FormattedMessageGlobal } from "~/i18n";

export default function RolePagePermissions({
    defaultValues,
}: RolePageTabProps) {
    return (
        <FormFieldObject
            id="permissions"
            defaultValue={defaultValues.permissions}
        >
            <FormSection>
                <FormFieldFlags
                    id="general"
                    defaultValue={defaultValues.permissions.general}
                >
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
                            <FormattedMessageGlobal id="app.permissions.customization" />
                        }
                    >
                        <FormControl>
                            <FormFieldSwitch
                                id={
                                    GeneralPermissionConsts.MANAGE_SELF_IDENTITY
                                }
                                label={
                                    <FormattedMessageGlobal id="app.permissions.manageSelfIdentity" />
                                }
                                description={
                                    <FormattedMessageGlobal id="app.permissions.manageSelfIdentity.desc" />
                                }
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
                                label={
                                    <FormattedMessageGlobal id="app.permissions.manageOthersIdentity" />
                                }
                                description={
                                    <FormattedMessageGlobal id="app.permissions.manageOthersIdentity.desc" />
                                }
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
                <FormFieldFlags
                    id="content"
                    defaultValue={defaultValues.permissions.content}
                >
                    <FormSection
                        layout="divided"
                        startDecorator={<IconHash />}
                        header={
                            <FormattedMessageGlobal
                                id="app.permissions.tent"
                            />
                        }
                    >
                        <FormControl>
                            <FormFieldSwitch
                                id={ContentPermissionConsts.VIEW_CONTENT}
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
