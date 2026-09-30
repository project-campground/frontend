import { createContext } from 'svelte';

export class RoleSettingsContext {
	public selected: string;

	constructor(public defaultSelected: string) {
		this.selected = $state(defaultSelected);
	}
}

export const [getRoleSettings, setRoleSettings] = createContext<RoleSettingsContext>();
