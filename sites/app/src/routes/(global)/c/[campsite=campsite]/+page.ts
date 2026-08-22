import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types.d.ts';

export const load: PageLoad = ({ params: { campsite } }) => {
	redirect(302, `/c/${campsite}/t/bulletin`);
};
