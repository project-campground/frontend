import type { AriaAttributes } from 'svelte/elements';
import type { MenuPortal } from './portals.svelte.ts';

export default interface MenuPortalProps extends AriaAttributes {
	portal: MenuPortal;
}
