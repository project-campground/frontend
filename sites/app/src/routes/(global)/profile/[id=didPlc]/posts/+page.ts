import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types.d.ts';

export const load: PageLoad = ({ params }) => {
	redirect(302, `/profile/${params.id}`);
};
