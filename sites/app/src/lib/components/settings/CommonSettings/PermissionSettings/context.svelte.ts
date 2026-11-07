import type {
	PermissionViewDetailed,
	GetPermissionsOutput,
} from '#lib/types/campground/permissions.js';
import type { RoleView } from '#lib/types/campground/roles.js';
import { ItemListSettingsContext } from '../context.svelte.ts';

export type PermissionViewSettings = Omit<
	PermissionViewDetailed,
	'tentId' | 'bonfireId' | 'categoryId' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'
>;

export class PermissionSettingsContext extends ItemListSettingsContext<PermissionViewSettings> {
	private _defaultUndefinedPermission: PermissionViewSettings;

	public permissionsOutput: GetPermissionsOutput | null;
	public defaultPermission: PermissionViewSettings;
	public permissions: PermissionViewSettings[];

	constructor(defaultRole: RoleView) {
		const defaultUndefinedPermission = PermissionSettingsContext.createDefault(defaultRole);

		super(defaultUndefinedPermission);

		this._defaultUndefinedPermission = defaultUndefinedPermission;

		this.permissionsOutput = $state<GetPermissionsOutput | null>(null);

		this.defaultPermission = $derived(
			this.permissionsOutput?.permissions.find((x) => x.role?.id === defaultRole.id)
				?? this._defaultUndefinedPermission,
		);

		this.permissions = $derived(
			this.defaultPermission !== this._defaultUndefinedPermission ?
				(this.permissionsOutput?.permissions ?? [])
			:	[...(this.permissionsOutput?.permissions ?? []), this.defaultPermission],
		);
	}
	public static createDefault(defaultRole: RoleView): PermissionViewSettings {
		return { role: defaultRole, permissions: 0n };
	}
}
