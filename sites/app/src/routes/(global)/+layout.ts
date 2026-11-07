import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types.js';
import { AuthContext, type AuthenticationAny } from '#lib/context/auth/index.js';

export const load: LayoutLoad = () => {
	const auth = localStorage.getItem(AuthContext.authStorageKey);

	if (!auth) return redirect(307, '/auth/login');

	const authParsed = JSON.parse(auth || '{}') as AuthenticationAny;
	if (!authParsed.authenticated) return redirect(307, '/auth/login');

	return { session: authParsed };
};
