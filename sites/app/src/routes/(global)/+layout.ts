import type { SessionAuth } from '$lib/api/session/types.js';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types.js';
import { Session } from '$lib/api/session/Session.svelte.js';

export const load: LayoutLoad = () => {
	const auth = localStorage.getItem(Session.sessionStorageKey);

	if (!auth) return redirect(307, '/auth/login');

	const authParsed = JSON.parse(auth || '{}') as SessionAuth;
	if (!authParsed.authenticated) return redirect(307, '/auth/login');

	return { session: authParsed };
};
