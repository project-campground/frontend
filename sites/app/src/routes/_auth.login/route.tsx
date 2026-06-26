import type { Route } from './+types/route';
import LoginPage from './LoginPage';

export function meta(_routes: Route.MetaArgs) {
	return [
		{ title: 'Campground — Login' },
		{ name: 'description', content: 'Gather around the fire, friends' },
	];
}

export default function Index() {
	return <LoginPage />;
}
