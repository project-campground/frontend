import { redirect } from 'react-router';
import type { Route } from './+types/c._index';

export async function clientLoader({}: Route.ClientLoaderArgs) {
	throw redirect('/');
}

export default function Index() {
	return <></>;
}
