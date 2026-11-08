export const PermissionPosition = {
	ManageCampsite: 0n,
	ManageBonfires: 1n,
	ManageTents: 2n,
	ManageRoles: 3n,
	GiveRoles: 4n,
	MuteMembers: 5n,
	KickMembers: 6n,
	BanMembers: 7n,
	ManageSelfIdentity: 8n,
	ManageOthersIdentity: 9n,
	CreateInvites: 10n,
	ManageInvites: 11n,
	ViewContent: 16n,
	CreateContent: 17n,
	LabelContent: 18n,
	ManageContent: 19n,
	MentionMany: 20n,
	CreatePrivateContent: 21n,
};
export const PermissionFlag = {
	ManageCampsite: 1n << PermissionPosition.ManageCampsite,
	ManageBonfires: 1n << PermissionPosition.ManageBonfires,
	ManageTents: 1n << PermissionPosition.ManageTents,
	ManageRoles: 1n << PermissionPosition.ManageRoles,
	GiveRoles: 1n << PermissionPosition.GiveRoles,
	MuteMembers: 1n << PermissionPosition.MuteMembers,
	KickMembers: 1n << PermissionPosition.KickMembers,
	BanMembers: 1n << PermissionPosition.BanMembers,
	ManageSelfIdentity: 1n << PermissionPosition.ManageSelfIdentity,
	ManageOthersIdentity: 1n << PermissionPosition.ManageOthersIdentity,
	CreateInvites: 1n << PermissionPosition.CreateInvites,
	ManageInvites: 1n << PermissionPosition.ManageInvites,
	ViewContent: 1n << PermissionPosition.ViewContent,
	CreateContent: 1n << PermissionPosition.CreateContent,
	LabelContent: 1n << PermissionPosition.LabelContent,
	ManageContent: 1n << PermissionPosition.ManageContent,
	MentionMany: 1n << PermissionPosition.MentionMany,
	CreatePrivateContent: 1n << PermissionPosition.CreatePrivateContent,
};
export const PermissionMaxCampsite =
	PermissionFlag.ManageCampsite
	| PermissionFlag.ManageBonfires
	| PermissionFlag.ManageTents
	| PermissionFlag.ManageRoles;

export const PermissionMaxMembership =
	PermissionFlag.GiveRoles
	| PermissionFlag.MuteMembers
	| PermissionFlag.KickMembers
	| PermissionFlag.BanMembers;

export const PermissionMaxIdentity =
	PermissionFlag.ManageSelfIdentity | PermissionFlag.ManageOthersIdentity;

export const PermissionMaxInvites = PermissionFlag.CreateInvites | PermissionFlag.ManageInvites;

export const PermissionMaxGeneral =
	PermissionMaxCampsite | PermissionMaxMembership | PermissionMaxIdentity | PermissionMaxInvites;

export const PermissionMaxContent =
	PermissionFlag.ViewContent
	| PermissionFlag.CreateContent
	| PermissionFlag.LabelContent
	| PermissionFlag.ManageContent
	| PermissionFlag.MentionMany
	| PermissionFlag.CreatePrivateContent;

export const PermissionMax = PermissionMaxGeneral | PermissionMaxContent;

export const enum RoleFlag {
	Default = 1 << 0,
}
