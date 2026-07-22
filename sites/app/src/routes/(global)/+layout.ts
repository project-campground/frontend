import type { SessionAuth } from '$lib/api/session/types.js';
import { redirect } from '@sveltejs/kit';

export function load() {
	const auth = localStorage.getItem('session');

	if (!auth) return redirect(307, '/auth/login');

	const authParsed = JSON.parse(auth || '{}') as SessionAuth;
	if (!authParsed.authenticated) return redirect(307, '/auth/login');

	redirect(307, '/home');
}
