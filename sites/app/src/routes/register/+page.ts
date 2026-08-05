import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types.d.ts';

export const load: PageLoad = () => {
	redirect(302, '/auth/register');
};
