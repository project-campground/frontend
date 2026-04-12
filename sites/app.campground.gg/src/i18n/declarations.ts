import { defineMessage } from "react-intl";

const globalIntlDeclarations = {
    // Common everywhere
    "common.copy": defineMessage({
        id: "common.copy",
        defaultMessage: "Copy",
        description: "Text of button for copying text",
    }),
    "common.create": defineMessage({
        id: "common.create",
        defaultMessage: "Create",
        description: "Create content",
    }),
    "common.edit": defineMessage({
        id: "common.edit",
        defaultMessage: "Edit",
        description: "Edit content",
    }),
    "common.delete": defineMessage({
        id: "common.delete",
        defaultMessage: "Delete",
        description: "Delete content",
    }),
    "common.cancel": defineMessage({
        id: "common.cancel",
        defaultMessage: "Cancel",
        description: "Cancelling an action in settings, modals and content",
    }),
    "common.infinite": defineMessage({
        id: "common.infinite",
        defaultMessage: "Infinite",
        description:
            "Infinite amount of something. Used in invite creation placeholder when assigning the amount of times invite can be used",
    }),

    info: defineMessage({
        id: "info",
        defaultMessage: "Information",
        description: "The title of the information section",
    }),
    "info.username": defineMessage({
        id: "info.username",
        defaultMessage: "Username",
        description: "Display name of the user",
    }),
    "info.password": defineMessage({
        id: "info.password",
        defaultMessage: "Password",
        description: "Password as a login detail",
    }),
    "info.password.placeholder": defineMessage({
        id: "info.password.placeholder",
        defaultMessage: "Password here",
        description: "Placeholder in the password field when registering",
    }),
    "info.password.confirm": defineMessage({
        id: "info.password.confirm",
        defaultMessage: "Confirm password",
        description: "Confirm a password when registering or changing password",
    }),
    "info.handle": defineMessage({
        id: "info.handle",
        defaultMessage: "Handle",
        description: "User handles",
    }),
    "info.handleOrEmail": defineMessage({
        id: "info.handleOrEmail",
        defaultMessage: "Handle or Email",
        description: "User handles or email as login detail",
    }),
    "info.email": defineMessage({
        id: "info.email",
        defaultMessage: "Email",
        description: "User email as login detail",
    }),
    "info.name": defineMessage({
        id: "info.name",
        defaultMessage: "Name",
        description: "The name of the content, objects, tents, etc.",
    }),
    "info.title": defineMessage({
        id: "info.title",
        defaultMessage: "Title",
        description: "The title of the content, objects, tents, etc.",
    }),
    "info.topic": defineMessage({
        id: "info.topic",
        defaultMessage: "Topic",
        description: "Topic header in settings and tents",
    }),
    "info.about": defineMessage({
        id: "info.about",
        defaultMessage: "About",
        description: "About header in settings and tents",
    }),
    "info.desc": defineMessage({
        id: "info.desc",
        defaultMessage: "Description",
        description: "Description in campsites, bonfires and elsewhere",
    }),

    "form.submit": defineMessage({
        id: "form.submit",
        defaultMessage: "Submit",
        description: "Submit button in forms",
    }),
    "form.uploadImage": defineMessage({
        id: "form.uploadImage",
        defaultMessage: "Upload image",
        description: "Upload image modal header",
    }),
    "form.login": defineMessage({
        id: "form.login",
        defaultMessage: "Login",
        description: "Login button and page title",
    }),
    "form.register": defineMessage({
        id: "form.register",
        defaultMessage: "Register",
        description: "Register button and page title",
    }),
    "form.confirmDelete": defineMessage({
        id: "form.confirmDelete",
        defaultMessage: "Confirm deletion",
        description: "Button for confirming deletion of content",
    }),

    // App common
    "app.discovery": defineMessage({
        id: "app.discovery",
        defaultMessage: "Discovery",
        description: "Campsite settings discovery section header",
    }),

    "app.common.createdAt": defineMessage({
        id: "app.common.createdAt",
        defaultMessage: "Created at",
        description: "Content created when",
    }),
    "app.common.joinedAt": defineMessage({
        id: "app.common.createdAt",
        defaultMessage: "Joined at",
        description: "Member joined sometime ago",
    }),
    "app.common.createdBy": defineMessage({
        id: "app.common.createdBy",
        defaultMessage: "Created by",
        description: "Content created by who",
    }),
    "app.common.expiresAt": defineMessage({
        id: "app.common.expiresAt",
        defaultMessage: "Expires",
        description: "Content expires",
    }),
    // Generally just reused
    "app.threads": defineMessage({
        id: "app.threads",
        defaultMessage: "Threads",
        description: "Message threads tab in the right sidebar",
    }),
    // Settings
    "app.settings.other": defineMessage({
        id: "app.settings.other",
        defaultMessage: "Other settings",
        description: "Section for deleting campsites, tents, etc.",
    }),
    // Roles
    "app.roles": defineMessage({
        id: "app.roles",
        defaultMessage: "Roles",
        description: "Roles header in settings and whatnot in plural form",
    }),
    "app.roles.accusativeCase": defineMessage({
        id: "app.roles.accusativeCase",
        defaultMessage: "role",
        description:
            "Role in accusative case for role deletion: ''Delete this **role**''",
    }),
    "app.roles.nominativeCase": defineMessage({
        id: "app.roles.nominativeCase",
        defaultMessage: "role",
        description:
            "Role in nominative case for role deletion: ''The **role** is being deleted''",
    }),
    // Members
    "app.members": defineMessage({
        id: "app.members",
        defaultMessage: "Members",
        description:
            "Members pseudo-tent name, members tab in the right sidebar",
    }),
    "app.members.ban": defineMessage({
        id: "app.members.ban",
        defaultMessage: "Ban member",
        description: "Ban member menu item",
    }),
    "app.members.kick": defineMessage({
        id: "app.members.kick",
        defaultMessage: "Kick member",
        description: "Kick member menu item",
    }),
    "app.members.nickname.change": defineMessage({
        id: "app.members.nickname.change",
        defaultMessage: "Change nickname",
        description: "Members name changing modal header and menu item",
    }),

    "app.bans": defineMessage({
        id: "app.bans",
        defaultMessage: "Member bans",
        description: "Member bans header",
    }),
    "app.bans.reason": defineMessage({
        id: "app.bans.reason",
        defaultMessage: "Ban reason",
        description: "Reason for a member ban",
    }),
    // Tents
    "app.tents.accusativeCase": defineMessage({
        id: "app.tents.accusativeCase",
        defaultMessage: "tent",
        description:
            "Tent in accusative case for tent deletion: ''Delete this **tent**''",
    }),
    "app.tents.nominativeCase": defineMessage({
        id: "app.tents.nominativeCase",
        defaultMessage: "tent",
        description:
            "Tent in nominative case for tent deletion: ''The **tent** is being deleted''",
    }),
    "app.tents.text": defineMessage({
        id: "app.tents.text",
        defaultMessage: "Text",
        description: "Text tent type",
    }),
    "app.tents.bulletin": defineMessage({
        id: "app.tents.bulletin",
        defaultMessage: "Bulletin Board",
        description: "Bulletin Board pseudo-tent name",
    }),
    "app.tents.settings": defineMessage({
        id: "app.tents.settings",
        defaultMessage: "Tent settings",
        description:
            "The menu button for opening tent settings and the title of tent settings",
    }),
    "app.tents.create": defineMessage({
        id: "app.tents.create",
        defaultMessage: "Create tent",
        description:
            "Create tent button at the bottom of tent list, as well as the title of tent creation modal",
    }),
    "app.tents.delete": defineMessage({
        id: "app.tents.delete",
        defaultMessage: "Delete tent",
        description: "The menu button for deleting tent",
    }),
    // Messages
    "app.messages.accusativeCase": defineMessage({
        id: "app.tents.accusativeCase",
        defaultMessage: "message",
        description:
            "Message in accusative case for message deletion: ''Delete this **message**''",
    }),
    "app.messages.nominativeCase": defineMessage({
        id: "app.tents.nominativeCase",
        defaultMessage: "message",
        description:
            "Message in nominative case for message deletion: ''The **message** is being deleted''",
    }),
    // Tent categories
    "app.tentCategories.settings": defineMessage({
        id: "app.tentCategories.settings",
        defaultMessage: "Category settings",
        description:
            "The menu button for opening tent category settings and the title of category settings",
    }),
    "app.tentCategories.create": defineMessage({
        id: "app.tentCategories.create",
        defaultMessage: "Create category",
        description: "The menu button for creating tent categories",
    }),
    "app.tentCategories.delete": defineMessage({
        id: "app.tentCategories.delete",
        defaultMessage: "Delete category",
        description: "The menu button for deleting tent categories",
    }),
    // Bonfires
    "app.bonfires.settings": defineMessage({
        id: "app.bonfires.settings",
        defaultMessage: "Bonfire settings",
        description:
            "The menu button for opening bonfire settings and the title of bonfire settings",
    }),
    "app.bonfires.create": defineMessage({
        id: "app.bonfires.create",
        defaultMessage: "Create bonfire",
        description: "The menu button for creating bonfires",
    }),
    "app.bonfires.delete": defineMessage({
        id: "app.bonfires.delete",
        defaultMessage: "Delete bonfire",
        description: "The menu button for deleting bonfires",
    }),
    "app.bonfires.settings.name": defineMessage({
        id: "app.bonfires.settings.name",
        defaultMessage: "Bonfire name",
        description: "The header of the bonfire name field in settings",
    }),

    "app.campsites.members": defineMessage({
        id: "app.campsites.members",
        defaultMessage:
            "{count, number} {count, plural, one { member } other { members }}",
        description: "Displays the amount of members campsite has",
        values: { count: 0 },
    }),
    "app.campsites.name": defineMessage({
        id: "app.campsites.name",
        defaultMessage: "Campsite name",
        description: "The header of the campsite name field in settings",
    }),
    "app.campsites.settings": defineMessage({
        id: "app.campsites.settings",
        defaultMessage: "Campsite settings",
        description:
            "The menu button for opening campsite settings and the title of campsite settings",
    }),
    "app.campsites.create": defineMessage({
        id: "app.campsites.Create",
        defaultMessage: "Create a Campsite",
        description: "The campsite creation page title",
    }),
    "app.campsites.delete": defineMessage({
        id: "app.campsites.delete",
        defaultMessage: "Delete campsite",
        description: "The settings page for deleting campsite",
    }),
    // Permissions
    "app.permissions.plural": defineMessage({
        id: "app.permissions.plural",
        defaultMessage: "Permissions",
        description: "Permissions in settings as plural",
    }),

    "app.permissions.campsites": defineMessage({
        id: "app.permissions.campsites",
        defaultMessage: "Campsite permissions",
        description: "Header for campsite permissions in the permission list",
    }),

    "app.permissions.manageCampsites": defineMessage({
        id: "app.permissions.manageCampsites",
        defaultMessage: "Manage Campsite",
        description:
            "Header for managing campsites permission in the permission list",
    }),
    "app.permissions.manageCampsites.desc": defineMessage({
        id: "app.permissions.manageCampsites.desc",
        defaultMessage:
            "Allows members with this permission to edit the name of this campsite and other details.",
        description: "Describes what 'Manage Campsite' permission does",
    }),

    "app.permissions.manageBonfires": defineMessage({
        id: "app.permissions.manageBonfires",
        defaultMessage: "Manage Bonfires",
        description:
            "Header for managing bonfires permission in the permission list",
    }),
    "app.permissions.manageBonfires.desc": defineMessage({
        id: "app.permissions.manageBonfires.desc",
        defaultMessage:
            "Allows members with this permission to edit and delete bonfires.",
        description: "Describes what 'Manage Bonfires' permission does",
    }),

    "app.permissions.manageTents": defineMessage({
        id: "app.permissions.manageTents",
        defaultMessage: "Manage Tents",
        description:
            "Header for managing tents permission in the permission list",
    }),
    "app.permissions.manageTents.desc": defineMessage({
        id: "app.permissions.manageTents.desc",
        defaultMessage:
            "Allows members with this permission to edit and delete tents.",
        description: "Describes what 'Manage Tents' permission does",
    }),

    "app.permissions.managePermissions": defineMessage({
        id: "app.permissions.managePermissions",
        defaultMessage: "Manage Permissions",
        description:
            "Header for managing permissions permission in the permission list",
    }),
    "app.permissions.managePermissions.desc": defineMessage({
        id: "app.permissions.managePermissions.desc",
        defaultMessage:
            "Allows members with this permission to edit permissions below their highest role.",
        description: "Describes what 'Manage Permissions' permission does",
    }),

    "app.permissions.manageRoles": defineMessage({
        id: "app.permissions.manageRoles",
        defaultMessage: "Manage Roles",
        description:
            "Header for managing roles permission in the permission list",
    }),
    "app.permissions.manageRoles.desc": defineMessage({
        id: "app.permissions.manageRoles.desc",
        defaultMessage:
            "Allows members with this permission to edit and delete roles below their highest role.",
        description: "Describes what 'Manage Roles' permission does",
    }),

    "app.permissions.giveRoles": defineMessage({
        id: "app.permissions.giveRoles",
        defaultMessage: "Give Roles",
        description:
            "Header for managing roles permission in the permission list",
    }),
    "app.permissions.giveRoles.desc": defineMessage({
        id: "app.permissions.giveRoles.desc",
        defaultMessage:
            "Allows members with this permission to give and remove roles that are lower than their highest role from other members.",
        description: "Describes what 'Give Roles' permission does",
    }),

    "app.permissions.membership": defineMessage({
        id: "app.permissions.membership",
        defaultMessage: "Membership permissions",
        description: "Header for membership permissions in the permission list",
    }),

    "app.permissions.muteMembers": defineMessage({
        id: "app.permissions.muteMembers",
        defaultMessage: "Timeout Members",
        description:
            "Header for muting members permission in the permission list",
    }),
    "app.permissions.muteMembers.desc": defineMessage({
        id: "app.permissions.muteMembers.desc",
        defaultMessage:
            "Allows members with this permission to disallow other members from creating content.",
        description: "Describes what 'Timeout Members' permission does",
    }),

    "app.permissions.kickMembers": defineMessage({
        id: "app.permissions.kickMembers",
        defaultMessage: "Kick Members",
        description:
            "Header for muting members permission in the permission list",
    }),
    "app.permissions.kickMembers.desc": defineMessage({
        id: "app.permissions.kickMembers.desc",
        defaultMessage:
            "Allows members with this permission to remove other members with lower rank/roles from this campsite.",
        description: "Describes what 'Kick Members' permission does",
    }),

    "app.permissions.banMembers": defineMessage({
        id: "app.permissions.banMembers",
        defaultMessage: "Ban Members",
        description:
            "Header for banning members permission in the permission list",
    }),
    "app.permissions.banMembers.desc": defineMessage({
        id: "app.permissions.banMembers.desc",
        defaultMessage:
            "Allows members with this permission to remove other members with lower rank/roles from this campsite and disallow from them joining again or allow them to join again.",
        description: "Describes what 'Ban Members' permission does",
    }),

    "app.permissions.createInvites": defineMessage({
        id: "app.permissions.createInvites",
        defaultMessage: "Create Invites",
        description:
            "Header for creating invites permission in the permission list",
    }),
    "app.permissions.createInvites.desc": defineMessage({
        id: "app.permissions.createInvites.desc",
        defaultMessage:
            "Allows members with this permission to create invites to this campsite.",
        description: "Describes what 'Create Invites' permission does",
    }),

    "app.permissions.manageInvites": defineMessage({
        id: "app.permissions.manageInvites",
        defaultMessage: "Manage Invites",
        description:
            "Header for managing invites permission in the permission list",
    }),
    "app.permissions.manageInvites.desc": defineMessage({
        id: "app.permissions.createInvites.desc",
        defaultMessage:
            "Allows members with this permission to delete campsite's invites.",
        description: "Describes what 'Managing Invites' permission does",
    }),

    "app.permissions.customization": defineMessage({
        id: "app.permissions.customization",
        defaultMessage: "Customization permissions",
        description:
            "Header for customization permissions in the permission list",
    }),

    "app.permissions.manageSelfIdentity": defineMessage({
        id: "app.permissions.manageSelfIdentity",
        defaultMessage: "Manage Their Own Identity",
        description:
            "Header for managing their campsite-wide profile permission in the permission list",
    }),
    "app.permissions.manageSelfIdentity.desc": defineMessage({
        id: "app.permissions.manageSelfIdentity.desc",
        defaultMessage:
            "Allows members with this permission to change their own nickname and avatar that is only displayed in this campsite.",
        description:
            "Describes what 'Managing Their Own Identity' permission does",
    }),

    "app.permissions.manageOthersIdentity": defineMessage({
        id: "app.permissions.manageSelfIdentity",
        defaultMessage: "Manage Identity of Others",
        description:
            "Header for managing campsite-wide profile permission of other people in the permission list",
    }),
    "app.permissions.manageOthersIdentity.desc": defineMessage({
        id: "app.permissions.manageSelfIdentity.desc",
        defaultMessage:
            "Allows members with this permission to change nickname and avatar that is only displayed in this campsite of other members.",
        description:
            "Describes what 'Managing Identity of Others' permission does",
    }),

    "app.permissions.tentDivider": defineMessage({
        id: "app.permissions.tentDivider",
        defaultMessage: "Tent only",
        description:
            "Divider in the permission list that separates tent-only permissions from campsite-wide permissions",
    }),

    "app.permissions.tent": defineMessage({
        id: "app.permissions.tent",
        defaultMessage: "Tent permissions",
        description: "Header for tent permissions in the permission list",
    }),

    "app.permissions.viewContent": defineMessage({
        id: "app.permissions.viewContent",
        defaultMessage: "View Content",
        description:
            "Header for view content permission in the permission list",
    }),
    "app.permissions.viewContent.desc": defineMessage({
        id: "app.permissions.viewContent.desc",
        defaultMessage:
            "Allows members to see tents in the tent list, view tents and tent messages.",
        description: "Describes what 'View Content' permission does",
    }),

    "app.permissions.createContent": defineMessage({
        id: "app.permissions.createContent",
        defaultMessage: "Create Content",
        description:
            "Header for create content permission in the permission list",
    }),
    "app.permissions.createContent.desc": defineMessage({
        id: "app.permissions.createContent.desc",
        defaultMessage: "Allows members to create messages in tents.",
        description: "Describes what 'Create Content' permission does",
    }),

    "app.permissions.pinContent": defineMessage({
        id: "app.permissions.pinContent",
        defaultMessage: "Pin Content",
        description: "Header for pin content permission in the permission list",
    }),
    "app.permissions.pinContent.desc": defineMessage({
        id: "app.permissions.pinContent.desc",
        defaultMessage: "Allows members to pin messages in tents.",
        description: "Describes what 'Pin Content' permission does",
    }),

    "app.permissions.manageContent": defineMessage({
        id: "app.permissions.manageContent",
        defaultMessage: "Manage Content",
        description:
            "Header for manage content permission in the permission list",
    }),
    "app.permissions.manageContent.desc": defineMessage({
        id: "app.permissions.manageContent.desc",
        defaultMessage:
            "Allows members to delete messages in tents of other members.",
        description: "Describes what 'Manage Content' permission does",
    }),

    "app.permissions.mentionEveryone": defineMessage({
        id: "app.permissions.mentionEveryone",
        defaultMessage: "Mention @everyone and @here",
        description:
            "Header for mention @everyone and @here permission in the permission list",
    }),
    "app.permissions.mentionEveryone.desc": defineMessage({
        id: "app.permissions.mentionEveryone.desc",
        defaultMessage: "Allows members to mention everyone.",
        description:
            "Describes what 'Mention @everyone and @here' permission does",
    }),

    "app.permissions.createPrivateContent": defineMessage({
        id: "app.permissions.createPrivateContent",
        defaultMessage: "Create Private Content",
        description:
            "Header for create private content permission in the permission list",
    }),
    "app.permissions.createPrivateContent.desc": defineMessage({
        id: "app.permissions.createPrivateContent.desc",
        defaultMessage: "Allows members to create private messages in tents.",
        description: "Describes what 'Create Private Content' permission does",
    }),

    // Invites
    "app.invites": defineMessage({
        id: "app.invites",
        defaultMessage: "Invites",
        description: "Invite menu item in campsite settings",
    }),
    "app.invites.create": defineMessage({
        id: "app.invites.create",
        defaultMessage: "Create invite",
        description: "Invite creation menu item",
    }),
    "app.invites.allowedAmount": defineMessage({
        id: "app.invites.allowedAmount",
        defaultMessage: "Allowed times of use",
        description: "The amount of times the invite can be used",
    }),
    "app.invites.code": defineMessage({
        id: "app.invites.code",
        defaultMessage: "Invite code",
        description:
            "The placeholder for yet uncreated invite code or invite code in the invite list",
    }),
};
export default globalIntlDeclarations;
