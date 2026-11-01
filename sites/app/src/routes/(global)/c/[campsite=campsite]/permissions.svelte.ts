import { PermissionMax } from '#lib/util/constants.js';
import { createContext } from 'svelte';

export class PermissionsContext {
	public permissions: bigint = $state.raw(PermissionMax);
}

export const [getPermissions, setPermissions] = createContext<PermissionsContext>();
