import { createContext } from 'svelte';
import type { CampsiteContext } from '../../../../../routes/(global)/c/[campsite=campsite]/context.svelte.ts';
import type { RoleView } from '$lib/types/campground/roles.js';

export class RoleSettingsContext {
	public selected: string;
	public selectedRole: RoleView | undefined;

	constructor(
		public defaultSelected: string,
		public campsiteContext: CampsiteContext,
	) {
		this.selected = $state(defaultSelected);
		this.selectedRole = $derived(campsiteContext.roles?.find((x) => x.id === this.selected));
	}
}

export const [getRoleSettings, setRoleSettings] = createContext<RoleSettingsContext>();
