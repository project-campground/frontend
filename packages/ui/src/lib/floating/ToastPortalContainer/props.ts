import type { AriaAttributes } from 'svelte/elements';
import type { ToastPortal } from './portals.svelte.ts';

export default interface ToastPortalProps extends AriaAttributes {
	zIndex?: number;
	portal: ToastPortal;
}
