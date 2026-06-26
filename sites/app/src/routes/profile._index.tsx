import { redirect } from 'react-router';
import type { Route } from './+types/profile._index';
import { sessionRouterContext } from '~/context/session';
import { authMiddleware } from '~/middleware/auth';

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [authMiddleware];

export async function clientLoader({ context }: Route.ClientLoaderArgs) {
	const session = context.get(sessionRouterContext);

	throw redirect(session.auth.authenticated ? `/profile/${session.auth.user.did}` : `/`);
}

export default function Index() {
	return <></>;
}
