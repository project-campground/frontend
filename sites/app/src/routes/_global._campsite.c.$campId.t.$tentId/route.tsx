import type { Route } from './+types/route';
import { authMiddleware } from '~/middleware/auth';
import TentLayout from './TentLayout';

export function meta({ loaderData: { tentId } }: Route.MetaArgs) {
	return [
		{ title: `Campground — ${tentId}` },
		{ name: 'description', content: 'Gather around the fire, friends' },
	];
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [authMiddleware];

export async function clientLoader({ params: { campId, tentId } }: Route.ClientLoaderArgs) {
	return { campsiteId: campId, tentId };
}

export default function Index({ loaderData: { campsiteId, tentId } }: Route.ComponentProps) {
	return (
		<TentLayout
			campsiteId={campsiteId}
			tentId={tentId}
		/>
	);
}
