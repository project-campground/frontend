import type { PermissionsDictionary } from '$lib/types/campground/permissions.js';
import { maxPermissions } from '$lib/util/permissions.js';
import { createContext } from 'svelte';

export class PermissionsContext {
	public permissions: PermissionsDictionary = $state.raw(maxPermissions);
}

export const [getPermissions, setPermissions] = createContext<PermissionsContext>();
