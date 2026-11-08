import type { PermissionViewDetailed } from '#lib/types/campground/permissions.js';
import type { RoleView } from '#lib/types/campground/roles.js';
import { ItemListSettingsContext } from '../context.svelte.ts';

export type PermissionViewSettings = Omit<
	PermissionViewDetailed,
	'tentId' | 'bonfireId' | 'categoryId' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'
>;

export class PermissionSettingsContext extends ItemListSettingsContext<PermissionViewSettings> {
	private _defaultUndefinedPermission: PermissionViewSettings;

	public permissionsOutput: PermissionViewDetailed[];
	public defaultPermission: PermissionViewSettings;
	public permissions: PermissionViewSettings[];

	constructor(defaultRole: RoleView) {
		const defaultUndefinedPermission = PermissionSettingsContext.createDefault(defaultRole);

		super(defaultUndefinedPermission);

		this._defaultUndefinedPermission = defaultUndefinedPermission;

		this.permissionsOutput = $state([]);

		this.defaultPermission = $derived(
			this.permissionsOutput?.find((x) => x.role?.id === defaultRole.id)
				?? this._defaultUndefinedPermission,
		);

		this.permissions = $derived(
			this.defaultPermission !== this._defaultUndefinedPermission ?
				(this.permissionsOutput ?? [])
			:	[...(this.permissionsOutput ?? []), this.defaultPermission],
		);
	}
	public static createDefault(defaultRole: RoleView): PermissionViewSettings {
		return { role: defaultRole, permissions: 0n };
	}
}
