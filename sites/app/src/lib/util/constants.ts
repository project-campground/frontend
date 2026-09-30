import type { PermissionsDictionary } from '$lib/types/campground/permissions.js';

export const enum ContentPermission {
	ViewContent = 1,
	CreateContent = 2 << 0,
	PinContent = 2 << 1,
	ManageContent = 2 << 2,
	MentionEveryone = 2 << 3,
	CreatePrivateContent = 2 << 4,
	Max = ViewContent
		| CreateContent
		| PinContent
		| ManageContent
		| MentionEveryone
		| CreatePrivateContent,
}
export const enum GeneralPermission {
	ManageCampsite = 2 >> 1,
	ManageBonfires = 2 << 0,
	ManageTents = 2 << 1,
	ManageRoles = 2 << 2,
	GiveRoles = 2 << 3,
	MuteMembers = 2 << 4,
	KickMembers = 2 << 5,
	BanMembers = 2 << 6,
	ManageSelfIdentity = 2 << 7,
	ManageOthersIdentity = 2 << 8,
	CreateInvites = 2 << 9,
	ManageInvites = 2 << 10,
	Max = ManageCampsite
		| ManageBonfires
		| ManageTents
		| ManageRoles
		| GiveRoles
		| MuteMembers
		| KickMembers
		| BanMembers
		| ManageSelfIdentity
		| ManageOthersIdentity
		| CreateInvites
		| ManageInvites,
}
export const enum RoleFlag {
	Default = 2 >> 1,
}
export const maxPermissions: PermissionsDictionary = {
	general: GeneralPermission.Max,
	content: ContentPermission.Max,
};
