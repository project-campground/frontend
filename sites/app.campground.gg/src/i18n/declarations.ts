import { defineMessage } from "react-intl";

const globalIntlDeclarations = {
    // Common everywhere
    "common.copy": defineMessage({
        id: "common.copy",
        defaultMessage: "Copy",
        description: "Text of button for copying text"
    }),
    "common.delete": defineMessage({
        id: "common.delete",
        defaultMessage: "Delete",
        description: "Delete content"
    }),
    "common.cancel": defineMessage({
        id: "common.cancel",
        defaultMessage: "Cancel",
        description: "Cancelling an action in settings, modals and content"
    }),
    "common.infinite": defineMessage({
        id: "common.infinite",
        defaultMessage: "Infinite",
        description: "Infinite amount of something. Used in invite creation placeholder when assigning the amount of times invite can be used"
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
    "info.description": defineMessage({
        id: "info.description",
        defaultMessage: "Description",
        description: "Description in campsites, bonfires and elsewhere",
    }),

    "form.login": defineMessage({
        id: "form.login",
        defaultMessage: "Login",
        description: "Login button and page title",
    }),
    "form.confirmDelete": defineMessage({
        id: "form.confirmDelete",
        defaultMessage: "Confirm deletion",
        description: "Button for confirming deletion of content",
    }),

    // App common
    "app.common.createdAt": defineMessage({
        id: "app.common.createdAt",
        defaultMessage: "Created at",
        description: "Content created when"
    }),
    "app.common.joinedAt": defineMessage({
        id: "app.common.createdAt",
        defaultMessage: "Joined at",
        description: "Member joined sometime ago"
    }),
    "app.common.createdBy": defineMessage({
        id: "app.common.createdBy",
        defaultMessage: "Created by",
        description: "Content created by who"
    }),
    "app.common.expiresAt": defineMessage({
        id: "app.common.expiresAt",
        defaultMessage: "Expires",
        description: "Content expires"
    }),
    // Generally just reused
    "app.roles": defineMessage({
        id: "app.roles",
        defaultMessage: "Roles",
        description: "Roles header in settings and whatnot in plural form"
    }),
    "app.members": defineMessage({
        id: "app.members",
        defaultMessage: "Members",
        description: "Members pseudo-tent name, members tab in the right sidebar"
    }),
    "app.threads": defineMessage({
        id: "app.threads",
        defaultMessage: "Threads",
        description: "Message threads tab in the right sidebar"
    }),

    "app.tents.text": defineMessage({
        id: "app.tents.text",
        defaultMessage: "Text",
        description: "Text tent type"
    }),
    "app.tents.bulletin": defineMessage({
        id: "app.tents.bulletin",
        defaultMessage: "Bulletin Board",
        description: "Bulletin Board pseudo-tent name"
    }),
    "app.tents.settings": defineMessage({
        id: "app.tents.settings",
        defaultMessage: "Tent settings",
        description: "The menu button for opening tent settings and the title of tent settings"
    }),
    "app.tents.create": defineMessage({
        id: "app.tents.create",
        defaultMessage: "Create tent",
        description: "Create tent button at the bottom of tent list, as well as the title of tent creation modal",
    }),
    "app.tents.delete": defineMessage({
        id: "app.tents.delete",
        defaultMessage: "Delete tent",
        description: "The menu button for deleting tent"
    }),

    "app.tentCategories.settings": defineMessage({
        id: "app.tentCategories.settings",
        defaultMessage: "Category settings",
        description: "The menu button for opening tent category settings and the title of category settings"
    }),
    "app.tentCategories.create": defineMessage({
        id: "app.tentCategories.create",
        defaultMessage: "Create category",
        description: "The menu button for creating tent categories"
    }),
    "app.tentCategories.delete": defineMessage({
        id: "app.tentCategories.delete",
        defaultMessage: "Delete category",
        description: "The menu button for deleting tent categories"
    }),

    "app.bonfires.settings": defineMessage({
        id: "app.bonfires.settings",
        defaultMessage: "Campsite settings",
        description: "The menu button for opening bonfire settings and the title of bonfire settings"
    }),
    "app.bonfires.create": defineMessage({
        id: "app.bonfires.create",
        defaultMessage: "Create bonfire",
        description: "The menu button for creating bonfires"
    }),
    "app.bonfires.delete": defineMessage({
        id: "app.bonfires.delete",
        defaultMessage: "Delete bonfire",
        description: "The menu button for deleting bonfires"
    }),
    "app.bonfires.settings.name": defineMessage({
        id: "app.bonfires.settings.name",
        defaultMessage: "Bonfire name",
        description: "The header of the bonfire name field in settings"
    }),
    
    "app.campsites.members": defineMessage({
        id: "app.campsites.members",
        defaultMessage: "{count, number} {count, plural, one { member } other { members }}",
        description: "Displays the amount of members campsite has",
        values: { count: 0 }
    }),
    "app.campsites.name": defineMessage({
        id: "app.campsites.name",
        defaultMessage: "Campsite name",
        description: "The header of the campsite name field in settings"
    }),
    "app.campsites.settings": defineMessage({
        id: "app.campsites.settings",
        defaultMessage: "Campsite settings",
        description: "The menu button for opening campsite settings and the title of campsite settings"
    }),
    "app.campsites.create": defineMessage({
        id: "app.campsites.Create",
        defaultMessage: "Create a Campsite",
        description: "The campsite creation page title"
    }),
    "app.campsites.delete": defineMessage({
        id: "app.campsites.delete",
        defaultMessage: "Delete campsite",
        description: "The settings page for deleting campsite"
    }),

    "app.permissions.plural": defineMessage({
        id: "app.permissions.plural",
        defaultMessage: "Permissions",
        description: "Permissions in settings as plural"
    }),

    "app.invites.allowedAmount": defineMessage({
        id: "app.invites.allowedAmount",
        defaultMessage: "Allowed times of use",
        description: "The amount of times the invite can be used",
    }),
    "app.invites.code": defineMessage({
        id: "app.invites.code",
        defaultMessage: "Invite code",
        description: "The placeholder for yet uncreated invite code or invite code in the invite list",
    }),
};
export default globalIntlDeclarations;